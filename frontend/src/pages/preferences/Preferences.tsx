import React, { useState } from 'react'
import {
  Text,
  Box,
  Chip,
  Center,
  Flex,
  rem,
  Paper,
  Container,
  Group,
  Button,
} from '@mantine/core'
import classes from './Preferences.module.css'
import { t } from 'i18next'
import { useSetState } from '@mantine/hooks'
import { preference, useGetAllPreferences } from '../../api/Preferences/getAll'
import {
  preferenceCategory,
  useGetAllPreferenceCategories,
} from '../../api/PreferenceCategories/getAll'

interface PreferenceCategoryProps {
  categoryName: string
  chips: preferenceCategory[]
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
          <Chip
            key={index}
            color="red"
            variant="filled"
            size="xs"
            value={preference.id.toString()}
          >
            {preference.name}
          </Chip>
        ))}
      </Box>
    </Paper>
  </Box>
)

export const Preferences = () => {
  const [preferencesChanged, setPreferencesChanged] = useState<boolean>(false)
  const preferences = useGetAllPreferences().data
  const categories = useGetAllPreferenceCategories().data

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
        {preferences && (
          <Chip.Group
            multiple
            onChange={async (e) => {
              console.log(e)
              setPreferencesChanged(true)
              setTimeout(() => {
                setPreferencesChanged(false)
              }, 4000)
            }}
          >
            {categories?.map((category, index) => (
              <PreferenceCategory
                key={index}
                categoryName={category.name}
                chips={preferences[category.id]}
              />
            ))}
          </Chip.Group>
        )}
      </Box>
      <Button mx="auto" color="red" w={rem(140)} disabled={!preferencesChanged}>
        Update
      </Button>
      <Chip key={12442} value={1}>
        a
      </Chip>
      <Chip key={2342} value={2}>
        b
      </Chip>
    </Flex>
  )
}
