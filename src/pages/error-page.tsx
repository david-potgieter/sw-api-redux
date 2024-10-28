import { Center, Stack, Text, Title } from '@mantine/core'
import { PropsWithChildren } from 'react'

export function ErrorPage(props: PropsWithChildren): JSX.Element {
  return (
    <Center flex={1} h="100dvh">
      <Stack gap="md">
        <Center>
          <Title order={1}>Oops!</Title>
        </Center>
        <Text ta="center">Something went wrong.</Text>
        <Center>{props.children}</Center>
      </Stack>
    </Center>
  )
}
