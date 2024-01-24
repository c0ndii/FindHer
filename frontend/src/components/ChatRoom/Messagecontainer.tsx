export const Messagecontainer = ({ messages }: any) => {
  return (
    <div>
      {messages.map((msg: { msg: string; username: string }, index: number) => (
        <table>
          <tr key={index}>
            <td>
              {msg.msg} - {msg.username}
            </td>
          </tr>
        </table>
      ))}
    </div>
  )
}
