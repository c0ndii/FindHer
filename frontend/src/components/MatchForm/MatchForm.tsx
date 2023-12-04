import { Button, Group, Stepper, Select, Box, Center } from '@mantine/core'
import { useState } from 'react'
import { matchPost } from '../../api/Match/Match'
import { matchModel, matchSchema } from '../../api/Match/schema'
import { useForm } from '@mantine/form'

export const MatchForm = () => {
  const [active, setActive] = useState(1)
  const form = useForm()

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  //Dla dawida - w linijce 43 masz pokazane jak wygladaja pytania z odp

  type QuestionKey =
    | 'question1'
    | 'question2'
    | 'question3'
    | 'question4'
    | 'question5'

  return (
    <Center>
      <form
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
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question1')}
              />
              <Select
                label="Pytanie 2"
                placeholder="Odpowiedź"
                clearable
                data={['Odp1', 'Odp2', 'Odp19', 'Odp4']}
                {...form.getInputProps('question2')}
              />
              <Select
                label="Pytanie 3"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question3')}
              />
              <Select
                label="Pytanie 4"
                clearable
                placeholder="Odpowiedź"
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question4')}
              />
              <Select
                label="Pytanie 5"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question5')}
              />
            </Box>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Wróć
              </Button>
              <Button onClick={nextStep} color="red">
                Dalej
              </Button>
            </Group>
          </Stepper.Step>

          <Stepper.Step label="Kategoria 2">
            <Box
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Select
                label="Pytanie 6"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question6')}
              />
              <Select
                label="Pytanie 7"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question7')}
              />
              <Select
                label="Pytanie 8"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question8')}
              />
              <Select
                label="Pytanie 9"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question9')}
              />
              <Select
                label="Pytanie 10"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question10')}
              />
            </Box>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Wróć
              </Button>
              <Button onClick={nextStep} color="red">
                Dalej
              </Button>
            </Group>
          </Stepper.Step>

          <Stepper.Step label="Kategoria 3">
            <Box
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Select
                label="Pytanie 11"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question11')}
              />
              <Select
                label="Pytanie 12"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question12')}
              />
              <Select
                label="Pytanie 13"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question13')}
              />
              <Select
                label="Pytanie 14"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question14')}
              />
              <Select
                label="Pytanie 15"
                placeholder="Odpowiedź"
                clearable
                data={[
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'vue', label: 'Vue', disabled: true },
                  { value: 'svelte', label: 'Svelte', disabled: true },
                ]}
                {...form.getInputProps('question15')}
              />
            </Box>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Wróć
              </Button>
              <Button onClick={nextStep} color="red">
                Dalej
              </Button>
            </Group>
          </Stepper.Step>

          <Stepper.Completed>
            Czy jesteś pewny/a swoich odpowiedzi?
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Wróć
              </Button>
              <Button onClick={() => console.log(form.values)} color="red">
                Wyślij
              </Button>
            </Group>
          </Stepper.Completed>
        </Stepper>
      </form>
    </Center>
  )
}
