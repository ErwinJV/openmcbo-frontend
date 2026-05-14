// Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
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

describe("Footer component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders footer element", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders logo image", () => {
    render(<Footer />);

    const logo = screen.getByAltText("Open Mcbo Logotipo");

    expect(logo).toBeInTheDocument();

    expect(logo).toHaveAttribute("src", "/logos-openmcbo/logotype-blue.svg");
  });

  it("renders logo link with correct href", () => {
    render(<Footer />);

    const logoLink = screen.getAllByRole("link")[0];

    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders all navigation links", () => {
    render(<Footer />);

    const navLinks = screen.getAllByTestId("nav-link");

    expect(navLinks).toHaveLength(3);

    expect(screen.getByText("inicio")).toBeInTheDocument();

    expect(screen.getByText("inmuebles")).toBeInTheDocument();

    expect(screen.getByText("sobre nosotros")).toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", () => {
    render(<Footer />);

    const navLinks = screen.getAllByTestId("nav-link");

    expect(navLinks[0]).toHaveAttribute("href", "/");

    expect(navLinks[1]).toHaveAttribute("href", "/inmuebles");

    expect(navLinks[2]).toHaveAttribute("href", "/sobre-nosotros");
  });

  it("renders social links", () => {
    render(<Footer />);

    const facebookLink = screen.getByRole("link", {
      name: /facebook/i,
    });

    const instagramLink = screen.getByRole("link", {
      name: /instagram/i,
    });

    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
  });

  it("renders social links with correct hrefs", () => {
    render(<Footer />);

    const facebookLink = screen.getByRole("link", {
      name: /facebook/i,
    });

    const instagramLink = screen.getByRole("link", {
      name: /instagram/i,
    });

    expect(facebookLink).toHaveAttribute("href", "#");

    expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/openmcbo",
    );
  });

  it("renders social links with target blank", () => {
    render(<Footer />);

    const instagramLink = screen.getByRole("link", {
      name: /instagram/i,
    });

    expect(instagramLink).toHaveAttribute("target", "_blank");

    expect(instagramLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders copyright text with current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    expect(
      screen.getByText(new RegExp(`© ${currentYear} Open Maracaibo`, "i")),
    ).toBeInTheDocument();
  });

  it("renders navigation element", () => {
    render(<Footer />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders horizontal separator", () => {
    render(<Footer />);

    const separator = screen.getByRole("separator");

    expect(separator).toBeInTheDocument();
  });

  it("has footer id", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveAttribute("id", "footer");
  });
});
