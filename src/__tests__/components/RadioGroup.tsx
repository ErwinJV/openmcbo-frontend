// RadioGroup.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioGroup from "@/components/RadioGroup";

describe("RadioGroup", () => {
  const options = [
    {
      id: "option-1",
      label: "Option 1",
      value: "option1",
    },
    {
      id: "option-2",
      label: "Option 2",
      value: "option2",
    },
    {
      id: "option-3",
      label: "Disabled Option",
      value: "option3",
      disabled: true,
    },
  ];

  it("renders all radio options", () => {
    render(<RadioGroup options={options} value="option1" />);

    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Disabled Option")).toBeInTheDocument();
  });

  it("renders the selected radio based on value prop", () => {
    render(<RadioGroup options={options} value="option2" />);

    const option1 = screen.getByLabelText("Option 1") as HTMLInputElement;

    const option2 = screen.getByLabelText("Option 2") as HTMLInputElement;

    expect(option1.checked).toBe(false);
    expect(option2.checked).toBe(true);
  });

  it("calls onChange when selecting another option", async () => {
    const user = userEvent.setup();

    const onChange = jest.fn();

    render(
      <RadioGroup options={options} value="option1" onChange={onChange} />,
    );

    const option2 = screen.getByLabelText("Option 2");

    await user.click(option2);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("option2");
  });

  it("does not allow clicking disabled options", async () => {
    const user = userEvent.setup();

    const onChange = jest.fn();

    render(
      <RadioGroup options={options} value="option1" onChange={onChange} />,
    );

    const disabledOption = screen.getByLabelText(
      "Disabled Option",
    ) as HTMLInputElement;

    expect(disabledOption.disabled).toBe(true);

    await user.click(disabledOption);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("updates selected option when value prop changes", () => {
    const { rerender } = render(
      <RadioGroup options={options} value="option1" />,
    );

    const option1 = screen.getByLabelText("Option 1") as HTMLInputElement;

    const option2 = screen.getByLabelText("Option 2") as HTMLInputElement;

    expect(option1.checked).toBe(true);
    expect(option2.checked).toBe(false);

    rerender(<RadioGroup options={options} value="option2" />);

    expect(option1.checked).toBe(false);
    expect(option2.checked).toBe(true);
  });
});
