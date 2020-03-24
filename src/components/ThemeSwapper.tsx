import React from 'react';
import { Box, Button, useColorMode } from '@chakra-ui/core';

const ThemeSwapper: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Box position="absolute" top="6px" right={2}>
      <Button size="xs" variant="ghost" onClick={toggleColorMode}>Toggle Theme (WIP)</Button>
    </Box>
  );
};

export default ThemeSwapper;