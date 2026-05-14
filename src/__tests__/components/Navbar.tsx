// NavBar.test.tsx
import { render, screen } from "@testing-library/react";
import NavBar from "@/components/Navbar";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // Eliminamos 'priority' para que no llegue al DOM del test
    const { priority, fill, ...rest } = props;
    return <img {...rest} />;
  },
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock NavLink
jest.mock("@/components/NavLink", () => ({
  __esModule: true,
  default: ({ href, label }: { href: string; label: string }) => (
    <a href={href} data-testid="nav-link">
      {label}
    </a>
  ),
}));

// Mock Wrapper
jest.mock("../../components/Navbar/Wrapper", () => ({
  __esModule: true,
  default: () => <div data-testid="wrapper">Wrapper Component</div>,
}));

describe("NavBar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders navbar header", () => {
    render(<NavBar />);

    const header = screen.getByRole("banner");

    expect(header).toBeInTheDocument();
  });

  it("renders logo image", () => {
    render(<NavBar />);

    const logo = screen.getByAltText("Open Mcbo Logotipo");

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logos-openmcbo/logotype-blue.svg");
  });

  it("renders logo link with correct href", () => {
    render(<NavBar />);

    const logoLink = screen.getAllByRole("link")[0];

    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders all navigation links", () => {
    render(<NavBar />);

    const links = screen.getAllByTestId("nav-link");

    expect(links).toHaveLength(3);

    expect(screen.getByText("inicio")).toBeInTheDocument();
    expect(screen.getByText("inmuebles")).toBeInTheDocument();
    expect(screen.getByText("sobre nosotros")).toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", () => {
    render(<NavBar />);

    const links = screen.getAllByTestId("nav-link");

    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/inmuebles");
    expect(links[2]).toHaveAttribute("href", "/sobre-nosotros");
  });

  it("renders Wrapper component", () => {
    render(<NavBar />);

    expect(screen.getByTestId("wrapper")).toBeInTheDocument();

    expect(screen.getByText("Wrapper Component")).toBeInTheDocument();
  });

  it("renders navigation list", () => {
    render(<NavBar />);

    const navList = screen.getByRole("list");

    expect(navList).toBeInTheDocument();
  });

  it("renders exactly 3 list items", () => {
    render(<NavBar />);

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(3);
  });

  it("renders nav element", () => {
    render(<NavBar />);

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });

  it("has navbar id", () => {
    render(<NavBar />);

    const header = screen.getByRole("banner");

    expect(header).toHaveAttribute("id", "navbar");
  });
});
