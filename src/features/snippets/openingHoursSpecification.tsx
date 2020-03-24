import React from 'react';
import { FormSchema } from 'schema-form-generator';
import { Icon } from '@chakra-ui/core';
import * as yup from 'yup';

import { hasProperty } from 'utils/formTypes';

export const openingHoursSpecification: FormSchema['fields'] = {
  openingHoursSpecification: {
    type: 'conditional',
    condition: {
      watch: 'type',
      shouldDisplay: type => hasProperty(type, 'openingHoursSpecification'),
      field: {
        type: 'array',
        label: 'Opening Hours',
        isCollapsable: true,
        styleKey: 'section-header',
        items: {
          type: 'object',
          styleKey: 'margin-0',
          properties: {
            dayOfWeek: {
              type: 'react-select',
              label: 'Days',
              isRequired: true,
              optionsKey: 'days',
              isMulti: true,
              styleKey: 'margin-0'
            },
            times: {
              type: 'object',
              displayInline: true,
              properties: {
                opens: {
                  type: 'text',
                  label: 'Opens',
                  isRequired: true,
                  styleKey: 'margin-0',
                  leftInputAddon: {
                    children: <Icon fontSize="sm" padding={0} name="time" color="gray.400" />
                  }
                },
                closes: {
                  type: 'text',
                  label: 'Closes',
                  isRequired: true,
                  styleKey: 'margin-0',
                  leftInputAddon: {
                    children: <Icon fontSize="sm" padding={0} name="time" color="gray.400" />
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

export const openingHoursOptions = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(label => ({
    label,
    value: label
  }))
};

export const validateOpeningHours = yup.array().of(
  yup.object().shape({
    dayOfWeek: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required()
        })
      )
      .required()
      .nullable(),
    times: yup
      .object()
      .shape({
        opens: yup
          .string()
          .required()
          .matches(/\d{2}:\d{2}(am|pm)?/),
        closes: yup
          .string()
          .required()
          .matches(/\d{2}:\d{2}(am|pm)?/)
      })
      .required()
  })
);
