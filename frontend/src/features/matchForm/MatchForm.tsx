import { Button, Group, Stepper, Select, Box, Center } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { matchGet, useMatchForm } from '../../api/MatchForm/getMatch'
import { t } from 'i18next'
import { matchModel } from '../../api/MatchForm/schema'
import { useSendMatch } from '../../api/MatchForm/Match'

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
  let score = 0
  const form = useForm<matchModel>()
  const { mutateAsync: sendForm } = useSendMatch()

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const { data: questions } = useMatchForm()

  return (
    <Center h="100%">
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        <Stepper active={active} onStepClick={setActive} color="red">
          <Stepper.Step label={t('matchForm.category1')}>
            <Box
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Select
                key={questions?.questions.at(0)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(0)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(0)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question1')}
              />
              <Select
                key={questions?.questions.at(1)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(1)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(1)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question2')}
              />
              <Select
                key={questions?.questions.at(2)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(2)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(2)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question3')}
              />
              <Select
                key={questions?.questions.at(3)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(3)?.questionContent}`
                )}
                clearable
                placeholder={t('matchForm.answerFieldPlaceholder')}
                data={
                  questions?.questions.at(3)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question4')}
              />
              <Select
                key={questions?.questions.at(4)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(4)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(4)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question5')}
              />
            </Box>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                {t('matchForm.button.back')}
              </Button>
              <Button onClick={nextStep} color="red">
                {t('matchForm.button.next')}
              </Button>
            </Group>
          </Stepper.Step>

          <Stepper.Step label={t('matchForm.category2')}>
            <Box
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Select
                key={questions?.questions.at(5)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(5)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(5)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question6')}
              />
              <Select
                key={questions?.questions.at(6)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(6)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(6)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question7')}
              />
              <Select
                key={questions?.questions.at(7)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(7)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(7)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question8')}
              />
              <Select
                key={questions?.questions.at(8)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(8)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(8)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question9')}
              />
              <Select
                key={questions?.questions.at(9)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(9)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(9)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question10')}
              />
            </Box>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                {t('matchForm.button.back')}
              </Button>
              <Button onClick={nextStep} color="red">
                {t('matchForm.button.next')}
              </Button>
            </Group>
          </Stepper.Step>

          <Stepper.Step label={t('matchForm.category3')}>
            <Box
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Select
                key={questions?.questions.at(10)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(10)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(10)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question11')}
              />
              <Select
                key={questions?.questions.at(11)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(11)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(11)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question12')}
              />
              <Select
                key={questions?.questions.at(12)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(12)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(12)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question13')}
              />
              <Select
                key={questions?.questions.at(13)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(13)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(13)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question14')}
              />
              <Select
                key={questions?.questions.at(14)?.questionId}
                label={t(
                  `matchForm.${questions?.questions.at(14)?.questionContent}`
                )}
                placeholder={t('matchForm.answerFieldPlaceholder')}
                clearable
                data={
                  questions?.questions.at(14)?.answers.map((answer) => ({
                    value: answer.answerWeight.toString(),
                    label: t(`matchForm.${answer.answerContent}`),
                  })) || []
                }
                {...form.getInputProps('question15')}
              />
            </Box>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                {t('matchForm.button.back')}
              </Button>
              <Button onClick={nextStep} color="red">
                {t('matchForm.button.next')}
              </Button>
            </Group>
          </Stepper.Step>

          <Stepper.Completed>
            {t('matchForm.confirmAnswersText')}
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                {t('matchForm.button.back')}
              </Button>
              <Button
                onClick={() => {
                  score =
                    parseInt(
                      form.values.question1 ? form.values.question1 : '0'
                    ) +
                    parseInt(
                      form.values.question2 ? form.values.question2 : '0'
                    ) +
                    parseInt(
                      form.values.question3 ? form.values.question3 : '0'
                    ) +
                    parseInt(
                      form.values.question4 ? form.values.question4 : '0'
                    ) +
                    parseInt(
                      form.values.question5 ? form.values.question5 : '0'
                    ) +
                    parseInt(
                      form.values.question6 ? form.values.question6 : '0'
                    ) +
                    parseInt(
                      form.values.question7 ? form.values.question7 : '0'
                    ) +
                    parseInt(
                      form.values.question8 ? form.values.question8 : '0'
                    ) +
                    parseInt(
                      form.values.question9 ? form.values.question9 : '0'
                    ) +
                    parseInt(
                      form.values.question10 ? form.values.question10 : '0'
                    ) +
                    parseInt(
                      form.values.question11 ? form.values.question11 : '0'
                    ) +
                    parseInt(
                      form.values.question12 ? form.values.question12 : '0'
                    ) +
                    parseInt(
                      form.values.question13 ? form.values.question13 : '0'
                    ) +
                    parseInt(
                      form.values.question14 ? form.values.question14 : '0'
                    ) +
                    parseInt(
                      form.values.question15 ? form.values.question15 : '0'
                    )

                  sendForm(score)
                  window.location.pathname = '/app/Account'
                }}
                color="red"
              >
                {t('matchForm.button.submit')}
              </Button>
            </Group>
          </Stepper.Completed>
        </Stepper>
      </form>
    </Center>
  )
}
