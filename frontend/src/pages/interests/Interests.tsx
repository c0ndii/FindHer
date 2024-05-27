import React, { useEffect, useState } from 'react'
import {
  Text,
  Box,
  Chip,
  Center,
  Paper,
  Flex,
  rem,
  Button,
  ScrollArea,
} from '@mantine/core'
import classes from './Interests.module.css'
import { t } from 'i18next'
import {
  interestCategory,
  useGetAllInterestCategories,
} from '../../api/InterestCategories/getAll'
import { useGetAllInterests } from '../../api/Interests/getAll'
import { useGetUserInterests } from '../../api/Interests/getUserInterests'
import { useUpdateUserInterests } from '../../api/Interests/updateUserInterests'

interface InterestCategoryProps {
  categoryName: string
  interests: interestCategory[]
}

const InterestCategory: React.FC<InterestCategoryProps> = ({
  categoryName,
  interests,
}) => {
  return (
    <Box>
      <Text fz={20} fw={400} className={classes.name}>
        {t('preferences_interests.' + categoryName.toLowerCase())}
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
              {interests.map((interest, index) => (
                <Chip
                  styles={{ root: { height: rem(16) } }}
                  key={index}
                  color="red"
                  variant="filled"
                  size="xs"
                  value={interest.id.toString()}
                >
                  {t('preferences_interests.' + interest.name.toLowerCase())}
                </Chip>
              ))}
            </Flex>
          </Flex>
        </ScrollArea>
      </Paper>
    </Box>
  )
}

export const Interests = () => {
  const [InterestsChanged, setInterestsChanged] = useState<boolean>(false)
  const { data: Interests, refetch } = useGetAllInterests()
  const { data: categories } = useGetAllInterestCategories()
  const { data: userInterests } = useGetUserInterests()
  const [userPreferencsIds, setUserPreferencsIds] = useState<string[]>([])
  const { mutate } = useUpdateUserInterests()

  useEffect(() => {
    if (userInterests) {
      setUserPreferencsIds(userInterests.map((p) => p.id.toString()))
    }
  }, [userInterests])

  const handleUpdate = () => {
    mutate({ interestIds: userPreferencsIds })
    setInterestsChanged(false)
    refetch()
  }

  return (
    <Flex
      direction="column"
      gap={{ lg: rem(80), base: rem(20) }}
      justify="start"
      align="center"
      w="80%"
      mx="auto"
      mt={{ lg: rem(40), base: rem(10) }}
      style={{ flexGrow: 1 }}
    >
      <Box>
        <Text
          fz={90}
          fw={500}
          className={classes.name}
          style={{ textAlign: 'center' }}
        >
          {t('preferences_interests.i_title')}
        </Text>
      </Box>
      <Flex wrap="wrap" gap={rem(24)} align="center" justify="center">
        {Interests && userInterests && (
          <Chip.Group
            value={userPreferencsIds}
            multiple
            onChange={async (e) => {
              setUserPreferencsIds(e)
              setInterestsChanged(true)
            }}
          >
            {categories?.map((category, index) => (
              <InterestCategory
                key={index}
                categoryName={category.name}
                interests={Interests[category.id]}
              />
            ))}
          </Chip.Group>
        )}
      </Flex>
      <Button
        mt="auto"
        mb="xl"
        mx="auto"
        color="red"
        w={rem(140)}
        onClick={handleUpdate}
        disabled={!InterestsChanged}
      >
        {t('preferences_interests.updateButton')}
      </Button>
    </Flex>
  )
}
