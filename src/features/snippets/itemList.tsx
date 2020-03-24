import { FormSchema } from 'schema-form-generator';
import { merge, omit } from 'lodash';

import { hasProperty } from 'utils/formTypes';
import { serviceSchema } from './service';

const service = merge(omit(serviceSchema.service, 'properties.hasRating'), {
  styleKey: 'nested-object',
  properties: {
    name: {
      type: 'text',
      label: 'Name',
      isRequired: true
    },
    sameAs: {
      type: 'array',
      label: 'Same As',
      styleKey: 'margin-0',
      isCollapsable: true,
      items: {
        type: 'text',
        label: 'URL',
        isRequired: true,
        styleKey: 'margin-0'
      }
    },
    aggregateRating: {
      condition: {
        shouldDisplay: () => true,
        field: {
          styleKey: 'nested-object',
          properties: {
            ratingCount: {
              isRequired: false
            },
            ratingValue: {
              isRequired: false
            },
            bestRating: {
              isRequired: false
            }
          }
        }
      }
    }
  }
});

export const itemListSchema: FormSchema['fields'] = {
  itemList: {
    type: 'object',
    label: 'Item List',
    properties: {
      itemType: {
        type: 'react-select',
        label: 'Item Type',
        isRequired: true,
        optionsKey: 'itemTypes'
      },
      itemListElement: {
        type: 'conditional',
        condition: {
          watch: 'itemList.itemType',
          shouldDisplay: itemType => {
            return !!itemType;
          },
          field: {
            type: 'array',
            label: 'Items',
            isRequired: true,
            isCollapsable: true,
            items: {
              type: 'object',
              styleKey: 'nested-object',
              properties: {
                service: {
                  type: 'conditional',
                  condition: {
                    watch: 'itemList.itemType',
                    shouldDisplay: itemType => hasProperty(itemType, 'service'),
                    field: service
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const itemListOptions = {
  itemTypes: ['Service'].sort().map(label => ({
    label,
    value: label.replace(' ', '')
  }))
};
