interface ErrorPageProps {
  code: number
  msg?: string
}

export default function ErrorPage({ code, msg }: ErrorPageProps) {
  const message: string = (() => {
    if (msg) return msg
    switch (code) {
      case 404:
        return "Page not found"
      case 418:
        return "I'm a teapot"
      case 500:
        return "Internal server error"
      default:
        return ''
    }
  })()

  return <div>{code} {message}</div>
}