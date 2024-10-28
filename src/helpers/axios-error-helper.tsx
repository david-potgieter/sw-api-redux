import { AxiosError } from 'axios'

export function axiosErrorHelper(error: any, defaultMessage: string): string {
  let errorMessage = defaultMessage

  // Check if the error is an AxiosError
  if (error instanceof AxiosError) {
    if (error.response && error.response.data) {
      // Extract custom error message from response if available
      errorMessage = error.response.data.message || errorMessage
    } else {
      errorMessage = error.message
    }
  } else if (error instanceof Error) {
    // Handle other error types (e.g., network errors)
    errorMessage = error.message
  }

  console.log(JSON.stringify(errorMessage, null, 2))

  return errorMessage
}
