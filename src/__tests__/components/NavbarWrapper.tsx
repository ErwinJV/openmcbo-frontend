// Wrapper.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Wrapper from "@/components/Navbar/Wrapper";
import { toggleScroll } from "@/helpers/toggle-scroll";

// Mock toggleScroll helper
jest.mock("@/helpers/toggle-scroll", () => ({
  toggleScroll: jest.fn(),
}));

// Mock IconButton
jest.mock("@/components/IconButton", () => ({
  __esModule: true,
  default: ({
    onClick,
    icon,
  }: {
    onClick: () => void;
    icon: React.ReactNode;
  }) => (
    <button onClick={onClick} data-testid="icon-button">
      {icon}
    </button>
  ),
}));

// Mock NavbarCollapse
jest.mock("@/components/NavbarCollapse", () => ({
  __esModule: true,
  default: ({ open, toggle }: { open: boolean; toggle: () => void }) => (
    <div data-testid="navbar-collapse">
      <span>{open ? "OPEN" : "CLOSED"}</span>
      <button onClick={toggle}>Toggle Navbar</button>
    </div>
  ),
}));

describe("Wrapper component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders IconButton", () => {
    render(<Wrapper />);

    expect(screen.getByTestId("icon-button")).toBeInTheDocument();
  });

  it("renders NavbarCollapse closed by default", () => {
    render(<Wrapper />);

    expect(screen.getByText("CLOSED")).toBeInTheDocument();
  });

  it("opens navbar when IconButton is clicked", async () => {
    const user = userEvent.setup();

    render(<Wrapper />);

    const button = screen.getByTestId("icon-button");

    await user.click(button);

    expect(screen.getByText("OPEN")).toBeInTheDocument();
  });

  it("toggles navbar state when clicked multiple times", async () => {
    const user = userEvent.setup();

    render(<Wrapper />);

    const button = screen.getByTestId("icon-button");

    expect(screen.getByText("CLOSED")).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByText("OPEN")).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByText("CLOSED")).toBeInTheDocument();
  });

  it("calls toggleScroll when toggling menu", async () => {
    const user = userEvent.setup();

    render(<Wrapper />);

    const button = screen.getByTestId("icon-button");

    await user.click(button);

    expect(toggleScroll).toHaveBeenCalledWith(false);

    await user.click(button);

    expect(toggleScroll).toHaveBeenCalledWith(true);
  });

  it("passes toggle function to NavbarCollapse", async () => {
    const user = userEvent.setup();

    render(<Wrapper />);

    const toggleNavbarButton = screen.getByText("Toggle Navbar");

    await user.click(toggleNavbarButton);

    expect(screen.getByText("OPEN")).toBeInTheDocument();
  });

  it("calls toggleScroll(true) on unmount", () => {
    const { unmount } = render(<Wrapper />);

    unmount();

    expect(toggleScroll).toHaveBeenCalledWith(true);
  });
});
