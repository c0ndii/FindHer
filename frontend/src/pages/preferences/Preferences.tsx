import React, { useEffect, useState } from 'react'
import {
  Text,
  Box,
  Chip,
  Flex,
  rem,
  Paper,
  Button,
  ScrollArea,
} from '@mantine/core'
import classes from './Preferences.module.css'
import { t } from 'i18next'
import { useGetAllPreferences } from '../../api/Preferences/getAll'
import {
  preferenceCategory,
  useGetAllPreferenceCategories,
} from '../../api/PreferenceCategories/getAll'
import { on } from 'events'
import { useGetUserPreferences } from '../../api/Preferences/getUserPreferences'
import { notifications } from '@mantine/notifications'

interface PreferenceCategoryProps {
  categoryName: string
  preferences: preferenceCategory[]
}

const PreferenceCategory: React.FC<PreferenceCategoryProps> = ({
  categoryName,
  preferences,
}) => {
  return (
    <Box>
      <Text fz={20} fw={400} className={classes.name}>
        {categoryName}
      </Text>
      <Paper bg="gray">
        <ScrollArea type="auto">
          <Flex
            p={rem(10)}
            wrap="wrap"
            h={rem(230)}
            w={rem(420)}
            justify="start"
            align="start"
          >
            <Flex wrap="wrap" gap={rem(24)}>
              {preferences.map((preference, index) => (
                <Chip
                  styles={{ root: { height: rem(16) } }}
                  key={index}
                  color="red"
                  variant="filled"
                  size="xs"
                  value={preference.id.toString()}
                >
                  {preference.name}
                </Chip>
              ))}
            </Flex>
          </Flex>
        </ScrollArea>
      </Paper>
    </Box>
  )
}

export const Preferences = () => {
  const [preferencesChanged, setPreferencesChanged] = useState<boolean>(false)
  const { data: preferences, refetch } = useGetAllPreferences()
  const { data: categories } = useGetAllPreferenceCategories()
  const { data: userPreferences } = useGetUserPreferences()
  const [userPreferencsIds, setUserPreferencsIds] = useState<string[]>([])

  useEffect(() => {
    if (userPreferences) {
      setUserPreferencsIds(userPreferences.map((p) => p.id.toString()))
    }
  }, [userPreferences])

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
      <Flex wrap="wrap" gap={rem(24)} align="center" justify="center">
        {preferences && userPreferences && (
          <Chip.Group
            value={userPreferencsIds}
            multiple
            onChange={async (e) => {
              setUserPreferencsIds(e)
              notifications.show({
                message: 'xd',
              })
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
                preferences={preferences[category.id]}
              />
            ))}
          </Chip.Group>
        )}
      </Flex>
      <Button
        mb="xl"
        mx="auto"
        color="red"
        w={rem(140)}
        disabled={!preferencesChanged}
      >
        Update
      </Button>
    </Flex>
  )
}
