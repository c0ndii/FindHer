import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core'
import { Messagecontainer } from './Messagecontainer'
import { Sendmessageform } from './Sendmessageform'

export const Chatroom = ({ messages, sendMessage }: any) => {
  return (
    <Box>
      {/* TODO: apply users sidebar */}
      <Box></Box>
      <Box display={'flex'} style={{ flexDirection: 'column', gap: '40px' }}>
        {/* TODO: apply top chat view */}
        <Box></Box>
        <Messagecontainer messages={messages} />
        <Sendmessageform sendMessage={sendMessage} />
      </Box>
    </Box>
  )
}
