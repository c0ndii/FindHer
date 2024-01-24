import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core'
import { Messagecontainer } from './Messagecontainer'
import { Sendmessageform } from './Sendmessageform'

export const Chatroom = ({ messages, sendMessage }: any) => {
  return (
    <Box>
      <></>
      <Messagecontainer messages={messages} />
      <Sendmessageform sendMessage={sendMessage} />
    </Box>
  )
}
