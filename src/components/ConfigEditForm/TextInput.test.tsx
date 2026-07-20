import { fireEvent, render, screen } from "@testing-library/react"

import { TextInput } from "./TextInput"

describe("TextInput", () => {
  it("renders a labelled text input showing the current value", () => {
    render(<TextInput label="ServerName" value="Default Palworld Server" onChange={jest.fn()} />)

    const input = screen.getByLabelText("ServerName") as HTMLInputElement
    expect(input).toHaveAttribute("type", "text")
    expect(input.value).toBe("Default Palworld Server")
  })

  it("calls onChange with the new string as the user types", () => {
    const handleChange = jest.fn()
    render(<TextInput label="ServerName" value="" onChange={handleChange} />)

    fireEvent.change(screen.getByLabelText("ServerName"), { target: { value: "My Server" } })

    expect(handleChange).toHaveBeenCalledWith("My Server")
  })
})
