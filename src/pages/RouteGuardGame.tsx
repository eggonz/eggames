import { type JSX } from "react"
import useValidatedGame from "../hooks/useValidatedGame"
import ErrorPage from "./ErrorPage"

interface RouteGuardProps {
  children: JSX.Element
}

export default function RouteGuardGame({ children } : RouteGuardProps) {
  if (!useValidatedGame().isValid) return <ErrorPage code={404} />
  return children
}