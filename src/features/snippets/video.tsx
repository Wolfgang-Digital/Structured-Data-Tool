import React from 'react';
import { FormSchema } from 'schema-form-generator';
import { Icon } from '@chakra-ui/core';
import * as yup from 'yup';

export const videoSchema: FormSchema['fields'] = {
  video: {
    type: 'object',
    label: 'Video',
    isCollapsable: true,
    properties: {
      name: {
        type: 'text',
        label: 'Name',
        isRequired: true
      },
      description: {
        type: 'textarea',
        label: 'Description',
        isRequired: true,
      },
      duration: {
        type: 'text',
        label: 'Duration',
        helpText: 'Time in ISO 8601 format',
        leftInputAddon: {
          children: <Icon fontSize="sm" padding={0} name="time" color="gray.400" />
        }
      },
      uploadDate: {
        type: 'text',
        label: 'Upload Date',
        isRequired: true,
        leftInputAddon: {
          children: <Icon fontSize="sm" padding={0} name="calendar" color="gray.400" />
        }
      },
      contentUrl: {
        type: 'text',
        label: 'Content URL',
        isRequired: true,
      },
      embedUrl: {
        type: 'text',
        label: 'Embed URL',
        isRequired: true
      },
      thumbnailUrl: {
        type: 'array',
        label: 'Thumbnail URLs',
        isRequired: true,
        isCollapsable: true,
        items: {
          type: 'text',
          label: 'URL',
          isRequired: true,
          styleKey: 'margin-0'
        }
      }
    }
  }
};

const durationRegex = /^P(?!$)(\d+(?:\.\d+)?Y)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?W)?(\d+(?:\.\d+)?D)?(T(?=\d)(\d+(?:\.\d+)?H)?(\d+(?:\.\d+)?M)?(\d+(?:\.\d+)?S)?)?$/;

export const validateVideo = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    duration: yup.string().matches(durationRegex, 'Duration must be a valid ISO 8601 format'),
    uploadDate: yup.string().required(),
    contentUrl: yup
      .string()
      .url()
      .required(),
    embedUrl: yup
      .string()
      .url()
      .required(),
    thumbnailUrl: yup
      .array()
      .of(
        yup
          .string()
          .url()
          .required()
      )
      .required()
  })
  .nullable()
  .default(undefined);
