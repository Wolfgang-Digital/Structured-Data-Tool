import { FormSchema } from 'schema-form-generator';
import * as yup from 'yup';

export const schema: FormSchema = {
  title: 'Web Page',
  fields: {
    name: {
      type: 'text',
      label: 'Name',
      isRequired: true
    },
    url: {
      type: 'text',
      label: 'Web Page URL',
      isRequired: true
    },
    description: {
      type: 'textarea',
      label: 'Description'
    },
    sameAs: {
      type: 'array',
      label: 'Same As',
      styleKey: 'section-header',
      isCollapsable: true,
      items: {
        type: 'text',
        label: 'URL',
        isRequired: true,
        styleKey: 'margin-0'
      }
    },
    mentions: {
      type: 'array',
      label: 'Mentions',
      styleKey: 'section-header',
      isCollapsable: true,
      items: {
        type: 'object',
        styleKey: 'margin-0',
        properties: {
          name: {
            type: 'text',
            label: 'Name',
            isRequired: true,
            styleKey: 'margin-0'
          },
          sameAs: {
            type: 'array',
            label: 'Same As',
            styleKey: 'nested-list',
            items: {
              type: 'text',
              label: 'URL',
              isRequired: true,
              styleKey: 'margin-0'
            }
          }
        }
      }
    },
    about: {
      type: 'array',
      label: 'About',
      styleKey: 'section-header',
      isCollapsable: true,
      items: {
        type: 'object',
        styleKey: 'margin-0',
        properties: {
          name: {
            type: 'text',
            label: 'Name',
            isRequired: true,
            styleKey: 'margin-0'
          },
          sameAs: {
            type: 'array',
            label: 'Same As',
            styleKey: 'nested-list',
            items: {
              type: 'text',
              label: 'URL',
              isRequired: true,
              styleKey: 'margin-0'
            }
          }
        }
      }
    }
  }
};

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  url: yup.string().required().url(),
  sameAs: yup.array().of(yup.string().required().url()),
  mentions: yup.array().of(yup.object().shape({
    name: yup.string().required(),
    sameAs: yup.array().of(yup.string().required().url())
  })),
  about: yup.array().of(yup.object().shape({
    name: yup.string().required(),
    sameAs: yup.array().of(yup.string().required().url())
  }))
});