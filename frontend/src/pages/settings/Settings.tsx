import { Text, Container, Box, Button, Flex, Center, rem } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import classes from './Settings.module.css'

export const Settings = () => {
  return (
    <Center h="100%">
      <Flex direction="column" gap={rem(60)}>
        <Box>
          <Text
            fz={90}
            fw={500}
            className={classes.name}
            style={{ textAlign: 'center' }}
          >
            <IconSettings width={64} height={64} />
            Ustawienia
          </Text>
        </Box>
        <Box
          display="flex"
          style={{
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Box>
            <Text
              fz={24}
              fw={700}
              className={classes.name}
              style={{ textAlign: 'center' }}
            >
              Motyw
            </Text>
            <Box className={classes.settingscontainer}>
              <Button variant="filled" color="red" style={{ width: '100px' }}>
                Jasny
              </Button>
              <Button
                variant="filled"
                color="indigo"
                style={{ width: '100px' }}
              >
                Ciemny
              </Button>
            </Box>
          </Box>
          <Box>
            <Text
              fz={24}
              fw={700}
              className={classes.name}
              style={{ textAlign: 'center' }}
            >
              Język
            </Text>
            <Box className={classes.settingscontainer}>
              <Button variant="filled" color="red" style={{ width: '100px' }}>
                PL
              </Button>
              <Button
                variant="filled"
                color="indigo"
                style={{ width: '100px' }}
              >
                EN
              </Button>
            </Box>
          </Box>
          <Box>
            <Text
              fz={24}
              fw={700}
              className={classes.name}
              style={{ textAlign: 'center' }}
            >
              Czcionka
            </Text>
            <Box className={classes.settingscontainer}>
              <Button variant="filled" color="red" style={{ width: '100px' }}>
                Mała
              </Button>
              <Button
                variant="filled"
                color="indigo"
                style={{ width: '100px' }}
              >
                Duża
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Center>
  )
}
