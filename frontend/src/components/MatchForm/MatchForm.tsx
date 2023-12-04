import { Button, Group, Stepper, Select, Box, Center } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { matchGet } from '../../api/Match/getMatch'

type Answer = {
  answerContent: string
  answerLetter: string
}

type Question = {
  questionId: number
  questionContent: string
  answers: Answer[]
}

type MatchFormData = {
  questions: Question[]
}

export const MatchForm = () => {
  const [active, setActive] = useState(0)
  const [questions, setQuestions] = useState<MatchFormData | null>(null)
  const form = useForm()

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const fetchQuestions = async () => {
    try {
      const response = await matchGet()
      setQuestions(response.data as MatchFormData)
    } catch (error) {
      console.error('Failed to fetch questions', error)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

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
                label={questions?.questions.at(0)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(0)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question1')}
              />
              <Select
                label={questions?.questions.at(1)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(1)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question2')}
              />
              <Select
                label={questions?.questions.at(2)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(2)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question3')}
              />
              <Select
                label={questions?.questions.at(3)?.questionContent}
                clearable
                placeholder="Odpowiedź"
                data={
                  questions?.questions.at(3)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question4')}
              />
              <Select
                label={questions?.questions.at(4)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(4)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
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
                label={questions?.questions.at(5)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(5)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question6')}
              />
              <Select
                label={questions?.questions.at(6)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(6)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question7')}
              />
              <Select
                label={questions?.questions.at(7)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(7)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question8')}
              />
              <Select
                label={questions?.questions.at(8)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(8)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question9')}
              />
              <Select
                label={questions?.questions.at(9)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(9)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
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
                label={questions?.questions.at(10)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(10)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question11')}
              />
              <Select
                label={questions?.questions.at(11)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(11)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question12')}
              />
              <Select
                label={questions?.questions.at(12)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(12)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question13')}
              />
              <Select
                label={questions?.questions.at(13)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(13)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
                {...form.getInputProps('question14')}
              />
              <Select
                label={questions?.questions.at(14)?.questionContent}
                placeholder="Odpowiedź"
                clearable
                data={
                  questions?.questions.at(14)?.answers.map((answer) => ({
                    value: answer.answerLetter,
                    label: answer.answerContent,
                  })) || []
                }
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
