import { Button, Group, Text, rem } from '@mantine/core'
import classes from './Header.module.css'

export const Header = () => {
  return (
    <Group pt={rem(16)} pr={rem(16)} className={classes.header} align="center">
      <Text c="white" size={rem(40)}>
        Masz już konto?
      </Text>
      <Button size="lg" color="red" radius={15}>
        Zaloguj się
      </Button>
    </Group>
  )
}
