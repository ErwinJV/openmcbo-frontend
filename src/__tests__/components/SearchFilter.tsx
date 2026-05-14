// SearchFilter.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchFilter from "@/components/SearchFilter";

// Mock Button component
jest.mock("@/components/Button", () => {
  return function MockButton({
    text,
    onClick,
    leftIcon,
  }: {
    text: string;
    onClick?: () => void;
    leftIcon?: React.ReactNode;
  }) {
    return (
      <button onClick={onClick}>
        {leftIcon}
        {text}
      </button>
    );
  };
});

describe("SearchFilter", () => {
  const inputs = [
    {
      key: "input-1",
      element: <input placeholder="Search by city" data-testid="city-input" />,
    },
    {
      key: "input-2",
      element: (
        <select data-testid="type-select">
          <option value="house">House</option>
        </select>
      ),
    },
  ];

  it("renders all input elements", () => {
    render(<SearchFilter inputs={inputs} />);

    expect(screen.getByTestId("city-input")).toBeInTheDocument();
    expect(screen.getByTestId("type-select")).toBeInTheDocument();
  });

  it('renders "Aplicar" and "Limpiar" buttons', () => {
    render(<SearchFilter inputs={inputs} />);

    expect(
      screen.getByRole("button", { name: /aplicar/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /limpiar/i }),
    ).toBeInTheDocument();
  });

  it('calls submit function when clicking "Aplicar"', async () => {
    const user = userEvent.setup();

    const submit = jest.fn();

    render(<SearchFilter inputs={inputs} submit={submit} />);

    const applyButton = screen.getByRole("button", {
      name: /aplicar/i,
    });

    await user.click(applyButton);

    expect(submit).toHaveBeenCalledTimes(1);
  });

  it('calls clear function when clicking "Limpiar"', async () => {
    const user = userEvent.setup();

    const clear = jest.fn();

    render(<SearchFilter inputs={inputs} clear={clear} />);

    const clearButton = screen.getByRole("button", {
      name: /limpiar/i,
    });

    await user.click(clearButton);

    expect(clear).toHaveBeenCalledTimes(1);
  });

  it("does not fail when submit and clear are undefined", async () => {
    const user = userEvent.setup();

    render(<SearchFilter inputs={inputs} />);

    const applyButton = screen.getByRole("button", {
      name: /aplicar/i,
    });

    const clearButton = screen.getByRole("button", {
      name: /limpiar/i,
    });

    await user.click(applyButton);
    await user.click(clearButton);

    expect(true).toBe(true);
  });

  it("renders the correct number of list items", () => {
    const { container } = render(<SearchFilter inputs={inputs} />);

    const listItems = container.querySelectorAll("li");

    // 2 inputs + 1 actions row
    expect(listItems).toHaveLength(3);
  });
});
