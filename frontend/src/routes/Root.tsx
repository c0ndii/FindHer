import React from 'react'
import { Box, Button, Chip, Group, MantineProvider } from "@mantine/core";

export const Root = () => {
  return (
    <MantineProvider>

    <div>
      <Box>
        <Group>
          <Button variant="filled" color="red">
            xsddddadda
          </Button>
        </Group>
        <Chip defaultChecked>Awesome chip</Chip>
      </Box>
    </div>
    </MantineProvider>
  );
};
