import React from 'react'
import { Text, Box, Chip, Center, Paper, Flex, rem } from '@mantine/core'
import classes from './Interests.module.css'
import { t } from 'i18next'

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
    {
      name: t('preferences.cardTitle.culinary'),
      interests: ['Sushi', 'Pizza'],
    },
    { name: 'Sport', interests: [] },
    { name: t('preferences.cardTitle.culture'), interests: [] },
    { name: t('interests.cardTitle.entertainment'), interests: [] },
    { name: t('preferences.cardTitle.personal'), interests: [] },
  ]

  return (
    <Flex
      direction="column"
      gap={{ lg: rem(80), base: rem(20) }}
      justify="center"
      w="80%"
      mx="auto"
      mt={{ lg: rem(40), base: rem(10) }}
    >
      <Box>
        <Text
          fz={90}
          fw={500}
          className={classes.name}
          style={{ textAlign: 'center' }}
        >
          {t('interests.title')}
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
  )
}
