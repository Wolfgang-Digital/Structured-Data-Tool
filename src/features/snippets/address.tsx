import { FormSchema } from 'schema-form-generator';

import { hasProperty } from 'utils/formTypes';

export const address: FormSchema['fields'] = {
  address: {
    type: 'conditional',
    condition: {
      watch: 'type',
      shouldDisplay: type => hasProperty(type, 'address'),
      field: {
        type: 'object',
        label: 'Address',
        isCollapsable: true,
        properties: {
          streetAddress: {
            type: 'text',
            label: 'Street Address'
          },
          addressLocality: {
            type: 'text',
            label: 'Address Locality'
          },
          addressCountry: {
            type: 'text',
            label: 'Address Country'
          },
          postalCode: {
            type: 'text',
            label: 'Postal Code'
          }
        }
      }
    }
  }
};
