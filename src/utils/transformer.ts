import { SelectOption } from 'schema-form-generator';
import { omit, pickBy, identity } from 'lodash';

import {
  Thing,
  GeoCoordninates,
  OpeningHoursSpecification,
  PostalAddress,
  HowTo,
  VideoObject,
  FAQPage,
  Connections,
  OrganizationType,
  WebPage,
  MainEntityType,
  Service,
  ItemList
} from 'types';

interface Schema {
  '@context': 'https://schema.org';
  '@graph': Record<string, any>[];
}

interface TransformEntityArgs {
  id: string;
  entity: Record<string, any>;
  connections?: Connections;
  spread?: string[];
}

interface TransformSchemaArgs {
  organization?: OrganizationType;
  webPage?: WebPage;
  mainEntity?: MainEntityType;
}

const mapType = (type: SelectOption) => type.value;

const mapThing = (thing: Thing) => ({
  '@type': 'Thing',
  ...thing
});

const transformer: Record<string, Function> = {
  type: mapType,

  geo: (coords: GeoCoordninates) => {
    if (!coords.latitude || !coords.longitude) return undefined;
    return {
      '@type': 'GeoCoordinates',
      ...coords
    };
  },

  openingHoursSpecification: (specs: OpeningHoursSpecification[]) => {
    return specs.map(spec => ({
      '@type': 'OpeningHoursSpecification',
      ...omit(spec, ['times', 'dayOfWeek']),
      ...spec.times,
      dayOfWeek: spec.dayOfWeek.map(mapType)
    }));
  },

  address: (address: PostalAddress) => {
    const values = pickBy(address, identity);
    if (Object.keys(values).length > 0) {
      return {
        '@type': 'PostalAddress',
        ...values
      };
    }
    return undefined;
  },

  about: (abouts: Thing[]) => {
    return abouts.map(mapThing);
  },

  mentions: (mentions: Thing[]) => {
    return mentions.map(mapThing);
  },

  howTo: (howTo: HowTo) => {
    return {
      ...omit(howTo, ['@type', 'hasVideo', 'video', 'step', 'tools', 'supply']),
      tool: howTo.tool.map(name => ({ '@type': 'HowToTool', name })),
      supply: howTo.supply.map(name => ({ '@type': 'HowToSupply', name })),
      video: howTo.hasVideo
        ? {
          '@type': 'VideoObject',
          ...howTo.video
        }
        : undefined,
      step: howTo.step.map((step, i) => {
        const video = howTo.hasVideo
          ? {
            '@type': 'Clip',
            name: `Clip ${i}`,
            ...step.video
          }
          : undefined;

        return {
          '@type': 'HowToStep',
          ...step,
          video
        };
      })
    };
  },

  video: (video: VideoObject) => ({
    '@type': 'VideoObject',
    ...video
  }),

  faqPage: (faq: FAQPage) => ({
    ...faq,
    mainEntity: faq.mainEntity.map(question => ({
      '@type': 'Question',
      name: question.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: question.acceptedAnswer
      }
    }))
  }),

  service: (service: Service) => ({
    ...omit(service, ['@type', 'hasRating', 'aggregateRating']),
    aggregateRating: service.hasRating ? {
      '@type': 'AggregateRating',
      ...service.aggregateRating
    } : undefined
  }),

  itemList: (itemList: ItemList, parentId: string) => {
    let list: any[] = [];
    const listItemId = parentId.replace(/\/#.+$/, '/#list-item');

    switch (itemList.itemType.value) {
      case 'Service':
        list = itemList.itemListElement.map((item, i) => {
          const aggregateRating = Object.keys(item.service.aggregateRating).length > 0 ? {
            '@type': 'AggregateRating',
            ...item.service.aggregateRating
          } : undefined;

          return {
            '@type': 'ListItem',
            '@id': `${listItemId}-${i + 1}`,
            position: i + 1,
            item: {
              '@type': !!aggregateRating ? ['Service', 'Product'] : 'Service',
              ...omit(item.service, 'aggregateRating'),
              aggregateRating
            }
          };
        });
        break;

      default:
        break;
    }
    return {
      '@type': 'ItemList',
      '@id': parentId.replace(/\/#.+$/, '/#item-list'),
      itemListElement: list
    };
  }
};

const transformEntity = ({ id, entity, connections, spread }: TransformEntityArgs) => {
  try {
    const result = Object.entries(entity).reduce(
      (acc: Record<string, any>, [key, value]) => {
        const transform = transformer[key];

        let val: any;
        if (key === 'type') {
          acc['@type'] = mapType(value as SelectOption);
        } else if (transform) {
          val = transform(value, id);
        } else {
          val = value;
        }

        if (spread && spread.includes(key)) {
          return { ...acc, ...val };
        } else {
          acc[key] = val;
          return acc;
        }
      },
      { '@id': undefined }
    );

    result['@id'] = id;
    return { ...result, ...connections };
  } catch (e) {
    console.error(e);
  }
};

export const transformSchema = ({ organization, webPage, mainEntity }: TransformSchemaArgs) => {
  const schema: Schema = {
    '@context': 'https://schema.org',
    '@graph': []
  };

  // Transform organization to match Google's structured data formatting
  if (!!organization) {
    const organizationId = organization.url.replace(/\/$/, '') + '/#organization';
    const organizationEntity = transformEntity({ id: organizationId, entity: organization });

    schema['@graph'].push(pickBy(omit(organizationEntity, ['uuid']), identity));

    // Generate website entity from organization
    const webSite = {
      '@type': 'WebSite',
      '@id': organizationId.replace('#organization', '#web-site'),
      publisher: {
        '@id': organizationId
      }
    };
    schema['@graph'].push(webSite);

    // Transform web page only if organization exists
    if (!!webPage) {
      const webPageId = webPage.url.replace(/\/$/, '') + '/#web-page';
      const webPageEntity = transformEntity({
        id: webPageId,
        entity: webPage,
        connections: {
          isPartOf: {
            '@id': webSite['@id']
          }
        }
      });

      schema['@graph'].push(pickBy(omit({ '@type': 'WebPage', ...webPageEntity }, ['uuid', 'parentId']), identity));

      // Transform main entity only if web page exists
      if (!!mainEntity) {
        const mainEntityId = webPageId.replace('#web-page', '#main-entity');
        const mainEntityEntity = transformEntity({
          id: mainEntityId,
          entity: mainEntity,
          connections: {
            mainEntityOfPage: {
              '@id': webPageId
            }
          },
          spread: ['howTo', 'faqPage', 'service', 'itemList']
        });

        schema['@graph'].push(pickBy(omit(mainEntityEntity, ['uuid', 'parentId', 'rootId']), identity));
      }
    }
  }
  return schema;
};