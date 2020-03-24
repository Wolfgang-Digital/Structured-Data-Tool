import React from 'react';
import { FormSchema } from 'schema-form-generator';
import { Icon } from '@chakra-ui/core';
import * as yup from 'yup';

import { hasProperty } from 'utils/formTypes';
import { address } from '../snippets/address';
import { openingHoursSpecification, openingHoursOptions, validateOpeningHours } from '../snippets/openingHoursSpecification';
import { geoCoordinates, validateGeoCoordinates } from '../snippets/geoCoordinates';

export const schema: FormSchema = {
  title: 'Organization',
  fields: {
    type: {
      type: 'react-select',
      label: 'Type',
      optionsKey: 'organizationTypes',
      isRequired: true
    },
    name: {
      type: 'text',
      label: 'Name',
      isRequired: true
    },
    url: {
      type: 'text',
      label: 'Website URL',
      isRequired: true
    },
    description: {
      type: 'textarea',
      label: 'Description'
    },
    image: {
      type: 'text',
      label: 'Image',
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
    telephone: {
      type: 'conditional',
      condition: {
        watch: 'type',
        shouldDisplay: type => hasProperty(type, 'telephone'),
        field: {
          type: 'text',
          label: 'Telephone',
          leftInputAddon: {
            children: <Icon fontSize="sm" padding={0} name="phone" color="gray.400" />
          }
        }
      }
    },
    priceRange: {
      type: 'conditional',
      condition: {
        watch: 'type',
        shouldDisplay: type => hasProperty(type, 'priceRange'),
        field: {
          type: 'text',
          label: 'Price Range',
          leftInputAddon: {
            children: '€',
            color: 'gray.400',
            fontSize: '1.2rem',
            fontWeight: 700,
            paddingX: '1.1rem'
          }
        }
      }
    },
    ...address,
    ...geoCoordinates,
    ...openingHoursSpecification
  }
};

export const options = {
  organizationTypes: ['Organization', 'Local Business', 'Hotel', 'Travel Agency'].sort().map(label => ({
    label,
    value: label.replace(' ', '')
  })),
  ...openingHoursOptions
};

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  image: yup
    .string()
    .url()
    .required(),
  url: yup
    .string()
    .url()
    .required(),
  sameAs: yup.array().of(
    yup
      .string()
      .url()
      .required()
  ),
  geoCoordinates: validateGeoCoordinates,
  openingHoursSpecification: validateOpeningHours
});
