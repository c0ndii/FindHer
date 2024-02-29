import {
  Text,
  Container,
  Box,
  Button,
  Flex,
  Center,
  rem,
  useMantineColorScheme,
  Paper,
} from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import classes from './Settings.module.css'
import { useAtom } from 'jotai'
import { fontSizeAtom } from './fontAtom'

export const Settings = () => {
  const { setColorScheme } = useMantineColorScheme()
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)
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
            <Paper bg={'gray'}>
              <Box className={classes.settingscontainer}>
                <Button
                  variant="filled"
                  color="red"
                  style={{ width: '100px' }}
                  onClick={() => setColorScheme('light')}
                >
                  Jasny
                </Button>
                <Button
                  variant="filled"
                  color="indigo"
                  style={{ width: '100px' }}
                  onClick={() => setColorScheme('dark')}
                >
                  Ciemny
                </Button>
              </Box>
            </Paper>
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
            <Paper bg={'gray'}>
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
            </Paper>
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
            <Paper bg={'gray'}>
              <Box className={classes.settingscontainer}>
                <Button
                  variant="filled"
                  color="red"
                  style={{ width: '100px' }}
                  onClick={() => setFontSize('small')}
                >
                  Mała
                </Button>
                <Button
                  variant="filled"
                  color="indigo"
                  style={{ width: '100px' }}
                  onClick={() => setFontSize('big')}
                >
                  Duża
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Flex>
    </Center>
  )
}
