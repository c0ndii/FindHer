import {
  Box,
  Flex,
  Paper,
  ScrollArea,
  rem,
  Text,
  Container,
  Group,
} from '@mantine/core'
import styles from './Messagecontainer.module.css'

const handleSenderId = (message: string) => {
  const id = message.slice(0, 1)
  return id
}

const handleMessage = (message: string) => {
  const msg = message.slice(2, message.length)
  return msg
}

export const Messagecontainer = ({ messages }: any) => {
  return (
    <ScrollArea type="always" h="100%">
      <Flex direction="column" gap={24} mr={rem(48)}>
        {messages.map(
          (msg: string, index: number) =>
            handleSenderId(msg) === '0' ? (
              <Flex w="100%">
                <Paper
                  maw={rem(600)}
                  p={rem(8)}
                  fw={500}
                  bg="#E0E0E0"
                  c="black"
                  style={{ wordWrap: 'break-word' }}
                >
                  {handleMessage(msg)}
                </Paper>
              </Flex>
            ) : (
              <Flex justify="end" w="100%">
                <Paper
                  p={rem(8)}
                  bg="red"
                  c="white"
                  fw={500}
                  maw={rem(600)}
                  style={{ wordWrap: 'break-word' }}
                >
                  {handleMessage(msg)}
                </Paper>
              </Flex>
            )

          /*   <div
            key={index}
            className={
              handleSenderId(msg) === '0' ? styles.sender : styles.receiver
            }
          >
            <p>{handleMessage(msg)}</p>
          </div> */
        )}
      </Flex>
    </ScrollArea>
  )
}
