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
import { useTranslation } from 'react-i18next'

export const Settings = () => {
  const { setColorScheme } = useMantineColorScheme()
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)
  const { t, i18n } = useTranslation()
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
            {t('settings.title')}
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
              {t('settings.theme.title')}
            </Text>
            <Paper bg={'gray'}>
              <Box className={classes.settingscontainer}>
                <Button
                  variant="filled"
                  color="red"
                  style={{ width: '100px' }}
                  onClick={() => setColorScheme('light')}
                >
                  {t('settings.theme.button.light')}
                </Button>
                <Button
                  variant="filled"
                  color="indigo"
                  style={{ width: '100px' }}
                  onClick={() => setColorScheme('dark')}
                >
                  {t('settings.theme.button.dark')}
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
              {t('settings.language.title')}
            </Text>
            <Paper bg={'gray'}>
              <Box className={classes.settingscontainer}>
                <Button
                  variant="filled"
                  color="red"
                  style={{ width: '100px' }}
                  onClick={() => i18n.changeLanguage('pl')}
                >
                  {t('settings.language.button.pl')}
                </Button>
                <Button
                  variant="filled"
                  color="indigo"
                  style={{ width: '100px' }}
                  onClick={() => i18n.changeLanguage('en')}
                >
                  {t('settings.language.button.en')}
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
              {t('settings.font.title')}
            </Text>
            <Paper bg={'gray'}>
              <Box className={classes.settingscontainer}>
                <Button
                  variant="filled"
                  color="red"
                  style={{ width: '100px' }}
                  onClick={() => setFontSize('small')}
                >
                  {t('settings.font.button.small')}
                </Button>
                <Button
                  variant="filled"
                  color="indigo"
                  style={{ width: '100px' }}
                  onClick={() => setFontSize('big')}
                >
                  {t('settings.font.button.large')}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Flex>
    </Center>
  )
}
