import { MantineProvider } from '@mantine/core'
import { PropsWithChildren } from 'react'

import '@mantine/core/styles.css'

export default function ThemeProvider(props: PropsWithChildren): JSX.Element {
  return <MantineProvider>{props.children}</MantineProvider>
}
