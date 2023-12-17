import { Card, Image, Text, Badge, Group } from '@mantine/core'
import { personModel } from '../../api/ForYou/schema'
import { EachUserCard } from './EachUserCard'

type Props = {
  person: personModel
}

export const UserCard = ({ person }: Props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          height={260}
          alt={person.image}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={700} size="xl" tt="capitalize">
          {person.name}
        </Text>
        <Group justify="flex-end">
          <Badge color="pink">Wiek: {person.age}</Badge>
          <Badge color="pink">Płeć: {person.sex}</Badge>
        </Group>
      </Group>

      <EachUserCard person={person} />
    </Card>
  )
}