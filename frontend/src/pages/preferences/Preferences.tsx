import React from 'react'
import { Text, Box, Chip, Center, Flex, rem, Paper } from '@mantine/core'
import classes from './Preferences.module.css'

interface PreferenceCategoryProps {
  categoryName: string
  chips: string[]
}

const PreferenceCategory: React.FC<PreferenceCategoryProps> = ({
  categoryName,
  chips,
}) => (
  <Box>
    <Text fz={20} fw={400} className={classes.name}>
      {categoryName}
    </Text>
    <Paper bg="gray">
      <Box className={classes.chipcontainer}>
        {chips.map((preference, index) => (
          <Chip key={index} color="red" variant="filled" size="xs">
            {preference}
          </Chip>
        ))}
      </Box>
    </Paper>
  </Box>
)

export const Preferences = () => {
  const categories = [
    { name: 'Kulinaria', preferences: ['Sushi', 'Pizza'] },
    { name: 'Sport', preferences: [] },
    { name: 'Kultura', preferences: [] },
    { name: 'Osobiste', preferences: [] },
  ]

  return (
    <Center h="100%" w="75%" mx="auto">
      <Flex direction="column" gap={rem(80)}>
        <Box>
          <Text
            fz={90}
            fw={500}
            className={classes.name}
            style={{ textAlign: 'center' }}
          >
            Preferencje
          </Text>
        </Box>
        <Box
          display="flex"
          style={{ gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {categories.map((category, index) => (
            <PreferenceCategory
              key={index}
              categoryName={category.name}
              chips={category.preferences}
            />
          ))}
        </Box>
      </Flex>
    </Center>
  )
}
