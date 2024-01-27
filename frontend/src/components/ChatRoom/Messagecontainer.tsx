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
    <div className={styles.container}>
      {messages.map((msg: string, index: number) => (
        <div
          key={index}
          className={
            handleSenderId(msg) === '0' ? styles.sender : styles.receiver
          }
        >
          <p>{handleMessage(msg)}</p>
        </div>
      ))}
    </div>
  )
}
