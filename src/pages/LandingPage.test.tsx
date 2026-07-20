import { render, screen } from "@testing-library/react"

import { LandingPage } from "./LandingPage"

describe("LandingPage", () => {
  it("renders the hosting instructions with a heading and the server port", () => {
    render(<LandingPage />)

    expect(screen.getByRole("heading", { level: 1, name: /host a palworld dedicated server/i })).toBeInTheDocument()
    expect(screen.getByText("8211")).toBeInTheDocument()
  })
})
