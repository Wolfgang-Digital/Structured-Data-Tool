import { FormSchema } from 'schema-form-generator';
import * as yup from 'yup';

import { ratingSchema, validateRating } from './aggregateRating';

export const serviceSchema: FormSchema['fields'] = {
  service: {
    type: 'object',
    label: 'Service',
    properties: {
      description: {
        type: 'textarea',
        label: 'Description',
        isRequired: true
      },
      image: {
        type: 'text',
        label: 'Image'
      },
      hasRating: {
        type: 'switch',
        label: 'Has Rating?'
      },
      aggregateRating: {
        type: 'conditional',
        condition: {
          watch: 'service.hasRating',
          shouldDisplay: hasRating => {
            return !!hasRating;
          },
          field: ratingSchema.aggregateRating
        }
      }
    }
  }
};

export const validateService = yup
  .object()
  .shape({
    description: yup.string().required(),
    image: yup
      .string()
      .url()
      .notRequired(),
    aggregateRating: validateRating
  })
  .nullable()
  .default(undefined);
