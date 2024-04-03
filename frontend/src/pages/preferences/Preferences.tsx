import React from 'react'
import {
  Text,
  Box,
  Chip,
  Center,
  Flex,
  rem,
  Paper,
  Container,
} from '@mantine/core'
import classes from './Preferences.module.css'
import { t } from 'i18next'

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
    {
      name: t('preferences.cardTitle.culinary'),
      preferences: ['Sushi', 'Pizza'],
    },
    { name: 'Sport', preferences: [] },
    { name: t('preferences.cardTitle.culture'), preferences: [] },
    { name: t('preferences.cardTitle.personal'), preferences: [] },
    { name: t('preferences.cardTitle.personal'), preferences: [] },
    { name: t('preferences.cardTitle.personal'), preferences: [] },
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
          {t('preferences.title')}
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
  )
}
