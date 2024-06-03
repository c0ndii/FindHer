import React, { useState, useEffect, useRef } from 'react'
import Peer, { DataConnection } from 'peerjs'
import { useId } from '../../api/User/GetId'
import { useParams } from 'react-router-dom'
import { ActionIcon, Box, Center, Stack, Text, Tooltip } from '@mantine/core'
import { IconPhoneCall } from '@tabler/icons-react'
import { IconPhoneX } from '@tabler/icons-react'

export const VideoChat = () => {
  const { data: myId } = useId()
  const { target: targetId } = useParams<{ target: string }>()
  const [dataConnection, setDataConnection] = useState<DataConnection | null>(
    null
  )
  const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>('')
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const currentUserVideoRef = useRef<HTMLVideoElement>(null)
  const peerInstance = useRef<Peer | null>(null)

  useEffect(() => {
    if (targetId) {
      setRemotePeerIdValue(targetId)
      call(targetId)
    }
  }, [targetId])

  useEffect(() => {
    const peer = new Peer(myId)

    peer.on('open', () => {})

    peer?.on('connection', (conn) => {
      setDataConnection(conn)
    })

    peer.on('call', (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          setVideoStream(currentUserVideoRef.current, mediaStream)
          call.answer(mediaStream)
          call.on('stream', (remoteStream) => {
            setVideoStream(remoteVideoRef.current, remoteStream)
          })
        })
        .catch((error) => {})
    })

    peerInstance.current = peer

    return () => {
      peer.disconnect()
    }
  }, [])

  const call = (remotePeerId: string) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setVideoStream(currentUserVideoRef.current, mediaStream)
        const call = peerInstance.current?.call(remotePeerId, mediaStream)

        if (call) {
          call.on('stream', (remoteStream) => {
            setVideoStream(remoteVideoRef.current, remoteStream)
          })
        }
      })
      .catch((error) => {})
  }

  const setVideoStream = (
    videoRef: HTMLVideoElement | null,
    stream: MediaStream
  ) => {
    if (videoRef) {
      videoRef.srcObject = stream
      videoRef.play().catch((error) => {})
    }
  }

  const handleDisconnect = () => {
    window.location.reload()
  }

  return (
    <Center style={{ padding: 64 }}>
      <Stack gap={64}>
        <Text size="xl" fw={256} style={{ textAlign: 'center' }}>
          Video chat room
        </Text>
        <Box
          display={'flex'}
          style={{
            alignItems: 'center',
            width: 'auto',
            justifyContent: 'center',
            gap: 256,
          }}
        >
          <Tooltip label="Call user">
            <ActionIcon
              variant="filled"
              color="red"
              size="xl"
              radius="xl"
              onClick={() => call(remotePeerIdValue)}
            >
              <IconPhoneCall />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Disconnect">
            <ActionIcon
              variant="filled"
              color="red"
              size="xl"
              radius="xl"
              onClick={handleDisconnect}
            >
              <IconPhoneX />
            </ActionIcon>
          </Tooltip>
        </Box>
        <Box display={'flex'} style={{ gap: 32 }}>
          <Box style={{ width: '500px', height: '450px', overflow: 'hidden' }}>
            <video
              ref={currentUserVideoRef}
              muted
              autoPlay
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
          <Box style={{ width: '500px', height: '450px', overflow: 'hidden' }}>
            <video
              ref={remoteVideoRef}
              autoPlay
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Box>
      </Stack>
    </Center>
  )
}
