import { Container, Stack, rem } from '@mantine/core'
import classes from './FormContainer.module.css'
import { WithChildren } from '../utils/WithChildren'

export const FormContainer = ({ children }: WithChildren) => {
  return (
    <Container w={rem(480)} p="xl" className={classes['form-wrapper']}>
      <Stack>{children}</Stack>
    </Container>
  )
}
