import {
  Button,
  Group,
  Stepper,
  Select,
  Box,
} from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { userModel, userSchema } from '../../api/User/schema'
import { editUser } from './../../api/User/Edit'

export const MatchForm = () => {
  const [active, setActive] = useState(1)
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userModel>({
    resolver: zodResolver(userSchema),
  })
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const onSubmit: SubmitHandler<userModel> = async (data) => {
    try {
      await editUser(data)
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          justifyContent: 'center',
        }}
      >
        <Stepper active={active} onStepClick={setActive} color="red">
          <Stepper.Step label="Kategoria 1">
            <Box
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Select
                label="Pytanie 1"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 2"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 3"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 4"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 5"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
            </Box>
          </Stepper.Step>

          <Stepper.Step label="Kategoria 2">
            <Box
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Select
                label="Pytanie 6"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 7"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 8"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 9"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 10"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
            </Box>
          </Stepper.Step>

          <Stepper.Step label="Kategoria 3">
            <Box
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Select
                label="Pytanie 11"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 12"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 13"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 14"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
              <Select
                label="Pytanie 15"
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
              />
            </Box>
          </Stepper.Step>

          <Stepper.Completed>
            Czy jesteś pewny/a swoich odpowiedzi?
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Wróć
          </Button>
          <Button onClick={nextStep} color="red">
            Dalej
          </Button>
        </Group>
      </form>
    </>
  )
}
