import { FormSchema } from 'schema-form-generator';
import * as yup from 'yup';

export const faqPageSchema: FormSchema['fields'] = {
  faqPage: {
    type: 'object',
    label: 'FAQ Page',
    isCollapsable: true,
    properties: {
      mainEntity: {
        type: 'array',
        label: 'Questions',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'text',
              label: 'Question',
              isRequired: true,
              styleKey: 'margin-0'
            },
            acceptedAnswer: {
              type: 'textarea',
              label: 'Answer',
              isRequired: true,
              styleKey: 'margin-0'
            }
          }
        }
      }
    }
  }
};

export const validateFaq = yup
  .object()
  .shape({
    mainEntity: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required(),
          acceptedAnswer: yup.string().required()
        })
      )
      .required()
      .default([])
  })
  .nullable()
  .default(undefined);
