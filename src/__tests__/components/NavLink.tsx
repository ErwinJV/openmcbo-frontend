// NavLink.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavLink from "@/components/NavLink";

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

// Mock usePathname
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("NavLink component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label correctly", () => {
    mockUsePathname.mockReturnValue("/");

    render(<NavLink href="/" label="Home" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders correct href", () => {
    mockUsePathname.mockReturnValue("/");

    render(<NavLink href="/about" label="About" />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/about");
  });

  it("applies active-link class when route is active", () => {
    mockUsePathname.mockReturnValue("/about");

    render(<NavLink href="/about" label="About" />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("active-link");
    expect(link).not.toHaveClass("inactive-link");
  });

  it("applies inactive-link class when route is not active", () => {
    mockUsePathname.mockReturnValue("/contact");

    render(<NavLink href="/about" label="About" />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("inactive-link");
    expect(link).not.toHaveClass("active-link");
  });

  it("marks root route as active when pathname is /", () => {
    mockUsePathname.mockReturnValue("/");

    render(<NavLink href="/" label="Home" />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("active-link");
  });

  it("marks root route as inactive when pathname is not /", () => {
    mockUsePathname.mockReturnValue("/about");

    render(<NavLink href="/" label="Home" />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("inactive-link");
  });

  it("handles nested routes correctly", () => {
    mockUsePathname.mockReturnValue("/properties/apartment");

    render(<NavLink href="/properties" label="Properties" />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("inactive-link");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();

    mockUsePathname.mockReturnValue("/");

    const handleClick = jest.fn();

    render(<NavLink href="/" label="Home" onClick={handleClick} />);

    const link = screen.getByRole("link");

    await user.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not fail when onClick is not provided", async () => {
    const user = userEvent.setup();

    mockUsePathname.mockReturnValue("/");

    render(<NavLink href="/" label="Home" />);

    const link = screen.getByRole("link");

    await user.click(link);

    expect(link).toBeInTheDocument();
  });

  it("always applies capitalize class", () => {
    mockUsePathname.mockReturnValue("/");

    render(<NavLink href="/" label="Home" />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("capitalize");
  });
});
