import { Text, Box, Chip, Container, Flex, rem, Center } from '@mantine/core'
import classes from './Interests.module.css'

export const Interests = () => {
  return (
    <Center h="100%" w="75%" mx="auto">
      <Flex direction="column" gap={rem(80)}>
        <Box>
          <Text
            fz={90}
            fw={500}
            className={classes.name}
            style={{ textAlign: 'center' }}
          >
            Zainteresowania
          </Text>
        </Box>
        <Box
          display="flex"
          style={{ gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Box>
            <Text fz={20} fw={400} className={classes.name}>
              Kulinaria
            </Text>
            <Box className={classes.chipcontainer}>
              <Chip color="red" variant="light" size="xs">
                Sushi
              </Chip>
              <Chip color="red" variant="light" size="xs">
                Pizza
              </Chip>
            </Box>
          </Box>

          <Box>
            <Text fz={20} fw={400} className={classes.name}>
              Sport
            </Text>
            <Box className={classes.chipcontainer}></Box>
          </Box>

          <Box>
            <Text fz={20} fw={400} className={classes.name}>
              Kultura
            </Text>
            <Box className={classes.chipcontainer}></Box>
          </Box>

          <Box>
            <Text fz={20} fw={400} className={classes.name}>
              Rozrywka
            </Text>
            <Box className={classes.chipcontainer}></Box>
          </Box>

          <Box>
            <Text fz={20} fw={400} className={classes.name}>
              Osobiste
            </Text>
            <Box className={classes.chipcontainer}></Box>
          </Box>
        </Box>
      </Flex>
    </Center>
  )
}
