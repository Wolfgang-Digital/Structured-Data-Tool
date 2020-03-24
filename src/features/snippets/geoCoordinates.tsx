import { FormSchema } from 'schema-form-generator';
import * as yup from 'yup';

import { hasProperty } from 'utils/formTypes';

export const geoCoordinates: FormSchema['fields'] = {
  geo: {
    type: 'conditional',
    condition: {
      watch: 'type',
      shouldDisplay: type => hasProperty(type, 'geoCoordinates'),
      field: {
        type: 'object',
        label: 'Geo Coordinates',
        displayInline: true,
        isCollapsable: true,
        properties: {
          latitude: {
            type: 'number',
            label: 'Latitude'
          },
          longitude: {
            type: 'number',
            label: 'Longitude'
          }
        }
      }
    }
  }
};

export const validateGeoCoordinates = yup
  .object()
  .shape({
    latitude: yup.number(),
    longitude: yup.number()
  })
  .nullable()
  .default(undefined);
