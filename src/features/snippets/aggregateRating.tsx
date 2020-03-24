import { FormSchema } from 'schema-form-generator';
import * as yup from 'yup';

export const ratingSchema: FormSchema['fields'] = {
  aggregateRating: {
    type: 'object',
    label: 'Aggregate Rating',
    displayInline: true,
    properties: {
      ratingValue: {
        type: 'number',
        label: 'Rating Value',
        isRequired: true
      },
      ratingCount: {
        type: 'number',
        label: 'Rating Count',
        isRequired: true
      },
      bestRating: {
        type: 'number',
        label: 'Best Rating',
        isRequired: true
      }
    }
  }
};

export const validateRating = yup
  .object()
  .shape({
    ratingValue: yup.number().required(),
    ratingCount: yup
      .number()
      .required()
      .min(1),
    bestRating: yup.number().required()
  })
  .nullable()
  .default(undefined);
