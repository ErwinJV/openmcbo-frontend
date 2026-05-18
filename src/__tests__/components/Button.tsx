// Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button";

describe("Button component", () => {
  it("renders button text", () => {
    render(<Button size="medium" variant="filled" text="Click me" />);

    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button
        size="medium"
        variant="filled"
        text="Submit"
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button
        size="medium"
        variant="filled"
        text="Disabled"
        disabled
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it("renders left and right icons", () => {
    render(
      <Button
        size="medium"
        variant="filled"
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      />,
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("applies size and variant classes", () => {
    render(<Button size="large" variant="outlined" text="Styled" />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("btn", "btn-large", "btn-outlined");
  });

  it("applies remove padding classes when removePadding is true", () => {
    render(
      <Button size="small" variant="text" text="No Padding" removePadding />,
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("remove-padding", "btn-lean");
  });

  it("does not render span when text is not provided", () => {
    render(<Button size="medium" variant="filled" />);

    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
