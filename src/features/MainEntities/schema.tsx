import { FormSchema } from 'schema-form-generator';
import * as yup from 'yup';

import { howToSchema, validateHowTo } from '../snippets/howTo';
import { faqPageSchema, validateFaq } from '../snippets/faqPage';
import { serviceSchema, validateService } from '../snippets/service';
import { itemListSchema, itemListOptions } from '../snippets/itemList';
import { hasProperty } from 'utils/formTypes';

export const schema: FormSchema = {
  title: 'Main Entity',
  fields: {
    type: {
      type: 'react-select',
      label: 'Type',
      isRequired: true,
      optionsKey: 'mainEntityTypes'
    },
    name: {
      type: 'text',
      label: 'Name',
      isRequired: true
    },
    sameAs: {
      type: 'array',
      label: 'Same As',
      isCollapsable: true,
      items: {
        type: 'text',
        label: 'URL',
        isRequired: true,
        styleKey: 'margin-0'
      }
    },
    service: {
      type: 'conditional',
      condition: {
        watch: 'type',
        shouldDisplay: type => hasProperty(type, 'service'),
        field: serviceSchema.service
      }
    },
    howTo: {
      type: 'conditional',
      condition: {
        watch: 'type',
        shouldDisplay: type => hasProperty(type, 'howTo'),
        field: howToSchema.howTo
      }
    },
    faqPage: {
      type: 'conditional',
      condition: {
        watch: 'type',
        shouldDisplay: type => hasProperty(type, 'faqPage'),
        field: faqPageSchema.faqPage
      }
    },
    itemList: {
      type: 'conditional',
      condition: {
        watch: 'type',
        shouldDisplay: type => hasProperty(type, 'itemList'),
        field: itemListSchema.itemList
      }
    }
  }
};

export const options = {
  mainEntityTypes: ['FAQ Page', 'How To', 'Service', 'Item List'].sort().map(label => ({
    label,
    value: label.replace(' ', '')
  })),
  ...itemListOptions
};

export const validationSchema = yup.object().shape({
  type: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
    .required(),
  name: yup.string().required(),
  sameAs: yup.array().of(
    yup
      .string()
      .required()
      .url()
  ),
  howTo: validateHowTo,
  faqPage: validateFaq,
  service: validateService
});
