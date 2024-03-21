import { Button, Container, Title, Text, rem } from '@mantine/core'
import classes from './HeroBanner.module.css'
import { t } from 'i18next'

export const HeroBanner = () => {
  return (
    <div className={classes['hero-banner']}>
      <Container size={'lg'} className={classes.container}>
        <div className={classes.inner}>
          <Title className={classes.title} c="#FFFFFF" size="70">
            {t('welcome.heroBanner.text')}
            <Text
              span
              inherit
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
            >
              {t('welcome.heroBanner.findher')}
            </Text>{' '}
          </Title>
          <Button
            component="a"
            href="/SignUp"
            radius={25}
            mt={rem(40)}
            variant="filled"
            color="red"
            size="xl"
          >
            {t('welcome.heroBanner.button')}
          </Button>
        </div>
      </Container>
    </div>
  )
}
