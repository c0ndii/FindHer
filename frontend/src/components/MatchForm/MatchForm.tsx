import {
  Button,
  Group,
  Stepper,
  Select,
  Box,
  Center
} from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { matchPost } from '../../api/Match/Match'
import { matchModel, matchSchema } from '../../api/Match/schema'

export const MatchForm = () => {
  const [active, setActive] = useState(1)
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<matchModel>({
    resolver: zodResolver(matchSchema),
  })
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const onSubmit: SubmitHandler<matchModel> = async (data) => {
    try {
      console.log(data);
      await matchPost(data)
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  type QuestionKey = "question1" | "question2" | "question3" | "question4" | "question5";

  const handleChange = (index: number, value: string) => {
    console.log(index);
    const key = `question${index}` as QuestionKey;
    setValue(key, value);
  };

  return (
    <Center>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
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
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(1, selectedValue || "")}
              />
              <Select
                label="Pytanie 2"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp19', 'Odp4']}
                onChange={(selectedValue) => handleChange(2, selectedValue || "")}
              />
              <Select
                label="Pytanie 3"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(3, selectedValue || "")}
              />
              <Select
                label="Pytanie 4"
                clearable
                placeholder="Odpowiedź"
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(4, selectedValue || "")}
              />
              <Select
                label="Pytanie 5"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(5, selectedValue || "")}
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
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(6, selectedValue || "")}
              />
              <Select
                label="Pytanie 7"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(7, selectedValue || "")}
              />
              <Select
                label="Pytanie 8"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(8, selectedValue || "")}
              />
              <Select
                label="Pytanie 9"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(9, selectedValue || "")}
              />
              <Select
                label="Pytanie 10"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(10, selectedValue || "")}
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
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(11, selectedValue || "")}
              />
              <Select
                label="Pytanie 12"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(12, selectedValue || "")}
              />
              <Select
                label="Pytanie 13"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(13, selectedValue || "")}
              />
              <Select
                label="Pytanie 14"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(14, selectedValue || "")}
              />
              <Select
                label="Pytanie 15"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp3', 'Odp4']}
                onChange={(selectedValue) => handleChange(15, selectedValue || "")}
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
          <Button onClick={nextStep} type='submit' color="red">
            Dalej
          </Button>
        </Group>
      </form>
    </Center>
  )
}
