import { Button, Group, Text, rem } from '@mantine/core'
import classes from './Header.module.css'
import { t } from 'i18next'

export const Header = () => {
  return (
    <Group pt={rem(16)} pr={rem(16)} className={classes.header} align="center">
      <Text c="white" size={rem(40)}>
        {t('welcome.header.text')}
      </Text>
      <Button component="a" href="/SignIn" size="lg" color="red" radius={15}>
        {t('welcome.header.button')}
      </Button>
    </Group>
  )
}
