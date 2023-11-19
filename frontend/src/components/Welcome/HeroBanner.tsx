import { Button, Container, Title, Text, rem } from '@mantine/core'
import classes from './HeroBanner.module.css'

export const HeroBanner = () => {
  return (
    <div className={classes['hero-banner']}>
      <Container size={'lg'} className={classes.container}>
        <div className={classes.inner}>
          <Title className={classes.title} c="#FFFFFF" size="70">
            Szukaj drugiej połówki z{' '}
            <Text
              span
              inherit
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
            >
              Find(h)er
            </Text>{' '}
          </Title>
          <Button
            radius={25}
            mt={rem(40)}
            variant="filled"
            color="red"
            size="xl"
          >
            Załóż konto
          </Button>
        </div>
      </Container>
    </div>
  )
}
