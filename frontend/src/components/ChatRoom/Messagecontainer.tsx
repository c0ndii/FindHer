export const Messagecontainer = ({ messages }: any) => {
  return (
    <div>
      {messages.map((msg: string, index: number) => (
        <table>
          <tr key={index}>
            <td>{msg}</td>
          </tr>
        </table>
      ))}
    </div>
  )
}
