import React from 'react'
import { Text, Box, Chip, Center, Paper, Flex, rem } from '@mantine/core'
import classes from './Interests.module.css'

interface InterestCategoryProps {
  categoryName: string
  chips: string[]
}

const InterestCategory: React.FC<InterestCategoryProps> = ({
  categoryName,
  chips,
}) => (
  <Box>
    <Text fz={20} fw={400} className={classes.name}>
      {categoryName}
    </Text>
    <Paper bg="gray">
      <Box className={classes.chipcontainer}>
        {chips.map((interest, index) => (
          <Chip key={index} color="red" variant="filled" size="xs">
            {interest}
          </Chip>
        ))}
      </Box>
    </Paper>
  </Box>
)

export const Interests = () => {
  const categories = [
    { name: 'Kulinaria', interests: ['Sushi', 'Pizza'] },
    { name: 'Sport', interests: [] },
    { name: 'Kultura', interests: [] },
    { name: 'Rozrywka', interests: [] },
    { name: 'Osobiste', interests: [] },
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
            Zainteresowania
          </Text>
        </Box>
        <Box
          display="flex"
          style={{ gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {categories.map((category, index) => (
            <InterestCategory
              key={index}
              categoryName={category.name}
              chips={category.interests}
            />
          ))}
        </Box>
      </Flex>
    </Center>
  )
}
