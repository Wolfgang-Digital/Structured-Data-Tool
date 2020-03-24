import React from 'react';
import { FormSchema } from 'schema-form-generator';
import * as yup from 'yup';
import { Icon } from '@chakra-ui/core';

import { videoSchema, validateVideo } from '../snippets/video';

export const howToSchema: FormSchema['fields'] = {
  howTo: {
    type: 'object',
    label: 'How To',
    isCollapsable: true,
    properties: {
      description: {
        type: 'textarea',
        label: 'Description'
      },
      image: {
        type: 'text',
        label: 'Image'
      },
      estimatedCost: {
        type: 'text',
        label: 'Estimated Cost',
        leftInputAddon: {
          children: '€',
          color: 'gray.400',
          fontSize: '1.2rem',
          fontWeight: 700,
          paddingX: '1.1rem'
        }
      },
      totalTime: {
        type: 'text',
        label: 'Total Time',
        leftInputAddon: {
          children: <Icon fontSize="sm" padding={0} name="time" color="gray.400" />
        }
      },
      supply: {
        type: 'array',
        label: 'Materials',
        isRequired: true,
        isCollapsable: true,
        styleKey: 'section-header',
        items: {
          type: 'text',
          label: 'Material',
          isRequired: true,
          styleKey: 'margin-0'
        }
      },
      tool: {
        type: 'array',
        label: 'Tools',
        isRequired: true,
        isCollapsable: true,
        styleKey: 'section-header',
        items: {
          type: 'text',
          label: 'Tool',
          isRequired: true,
          styleKey: 'margin-0'
        }
      },
      hasVideo: {
        type: 'switch',
        label: 'Has Video?'
      },
      video: {
        type: 'conditional',
        condition: {
          watch: 'howTo.hasVideo',
          shouldDisplay: hasVideo => {
            return !!hasVideo;
          },
          field: videoSchema.video
        }
      },
      step: {
        type: 'array',
        label: 'Steps',
        isRequired: true,
        isCollapsable: true,
        styleKey: 'section-header',
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
            image: {
              type: 'text',
              label: 'Image',
              isRequired: true,
              styleKey: 'margin-0'
            },
            url: {
              type: 'text',
              label: 'URL',
              styleKey: 'margin-0'
            },
            text: {
              type: 'textarea',
              label: 'Directions',
              isRequired: true,
              styleKey: 'margin-0'
            },
            video: {
              type: 'conditional',
              condition: {
                watch: 'howTo.hasVideo',
                shouldDisplay: hasVideo => {
                  return !!hasVideo;
                },
                field: {
                  type: 'object',
                  label: 'Video Clip',
                  displayInline: true,
                  properties: {
                    url: {
                      type: 'text',
                      label: 'URL',
                      styleKey: 'margin-0'
                    },
                    startOffset: {
                      type: 'number',
                      label: 'Start Offset (s)',
                      styleKey: 'margin-0'
                    },
                    endOffset: {
                      type: 'number',
                      label: 'End Offset (s)',
                      styleKey: 'margin-0'
                    }
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

export const validateHowTo = yup
  .object()
  .shape({
    supply: yup
      .array()
      .of(yup.string().required())
      .default([]),
    tool: yup
      .array()
      .of(yup.string().required())
      .default([]),
    url: yup.string().url(),
    step: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required(),
          image: yup
            .string()
            .url()
            .required(),
          text: yup.string().required(),
          video: yup
            .object()
            .shape({
              url: yup.string().url(),
              startOffset: yup
                .number()
                .integer()
                .required(),
              endOffset: yup
                .number()
                .integer()
                .required()
            })
            .nullable()
            .default(undefined)
        })
      )
      .required()
      .min(2),
    video: validateVideo
  })
  .nullable()
  .default(undefined);
