import React, { useMemo, useEffect } from 'react';
import JSONPretty from 'react-json-pretty';
import { Box, useClipboard, IconButton, Tooltip, Heading, Flex, useToast } from '@chakra-ui/core';

import { useSchema } from 'hooks/useSchema';

const lightTheme = {
  main: `
    font-size: 0.9rem;
    background: white;
    font-family: Menlo, monospace;
    padding: 5px;
    border-radius: 2px;
    box-shadow: 0 1px 4px 0 #EDF2F7;
    white-space: pre-wrap;
  `,
  key: 'color: #805AD5;',
  value: 'color: #319795;',
  string: 'color: #319795;'
};

const SchemaPreview: React.FC = () => {
  const toast = useToast();

  const schema = useSchema();

  const stringValue = useMemo(() => {
    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }, [schema]);

  const { onCopy, hasCopied } = useClipboard(stringValue);

  useEffect(() => {
    if (hasCopied) {
      toast({
        status: 'success',
        description: 'Copied to clipboard!',
        duration: 1000,
        position: 'bottom-left'
      });
    }
  }, [hasCopied, toast]);

  return (
    <Box paddingTop="64px" paddingRight={6}>
      <Flex marginBottom={2} alignItems="center">
        <Heading as="h4" size="sm" marginRight="auto">
          Preview
        </Heading>
        <Tooltip label="Copy to clipboard" aria-label="Copy to Clipboard" placement="top" hasArrow showDelay={250}>
          <IconButton icon="copy" aria-label="Copy to Clipboard" onClick={onCopy} variantColor="teal" size="sm" ml={2} />
        </Tooltip>
        <Tooltip
          label="Open structured data testing tool"
          aria-label="Open Structured Data Testing Tool"
          placement="top"
          hasArrow
          showDelay={250}
        >
          <form
            action="https://search.google.com/structured-data/testing-tool/u/0/"
            target="_blank"
            method="POST"
            style={{ display: 'inline' }}
          >
            <textarea name="code" readOnly style={{ visibility: 'hidden', width: 0, height: 0 }} value={stringValue} />
            <IconButton
              type="submit"
              icon="external-link"
              size="sm"
              aria-label="Open Structured Data Testing Tool"
              variantColor="teal"
              ml={2}
            />
          </form>
        </Tooltip>
      </Flex>
      <JSONPretty json={schema} theme={lightTheme} />
    </Box>
  );
};

export default SchemaPreview;
