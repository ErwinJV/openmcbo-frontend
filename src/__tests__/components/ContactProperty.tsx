// ContactProperty.test.tsx
import { render, screen } from "@testing-library/react";
import ContactProperty from "@/components/ContactProperty";

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock customMessagesByProperty
const customMessagesByPropertyMock = jest.fn();

jest.mock("@/schema/contact", () => ({
  customMessagesByProperty: (title: string) =>
    customMessagesByPropertyMock(title),
}));

describe("ContactProperty component", () => {
  let observeMock: jest.Mock;
  let disconnectMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    customMessagesByPropertyMock.mockReturnValue("https://wa.me/123456789");

    observeMock = jest.fn();
    disconnectMock = jest.fn();

    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn((callback) => ({
      observe: observeMock,
      disconnect: disconnectMock,
      unobserve: jest.fn(),
      takeRecords: jest.fn(),
      root: null,
      rootMargin: "",
      thresholds: [],
    })) as any;

    // Create navbar and footer elements
    const navbar = document.createElement("div");
    navbar.id = "navbar";
    document.body.appendChild(navbar);

    const footer = document.createElement("div");
    footer.id = "footer";
    document.body.appendChild(footer);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders default price and title", () => {
    render(<ContactProperty />);

    expect(screen.getByText("500 $")).toBeInTheDocument();

    expect(
      screen.getByText("Apartamento en Av. 8 Santa Rita"),
    ).toBeInTheDocument();
  });

  it("renders custom price and title", () => {
    render(<ContactProperty price="1200 $" title="Luxury Apartment" />);

    expect(screen.getByText("1200 $")).toBeInTheDocument();

    expect(screen.getByText("Luxury Apartment")).toBeInTheDocument();
  });

  it("renders contact button", () => {
    render(<ContactProperty />);

    expect(
      screen.getByRole("link", {
        name: /contactar/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders contact link with correct href", () => {
    render(<ContactProperty title="Luxury Apartment" />);

    const link = screen.getByRole("link", {
      name: /contactar/i,
    });

    expect(customMessagesByPropertyMock).toHaveBeenCalledWith(
      "Luxury Apartment",
    );

    expect(link).toHaveAttribute("href", "https://wa.me/123456789");
  });

  it("renders contact link with target blank", () => {
    render(<ContactProperty />);

    const link = screen.getByRole("link", {
      name: /contactar/i,
    });

    expect(link).toHaveAttribute("target", "_blank");

    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("observes navbar and footer elements", () => {
    render(<ContactProperty />);

    expect(observeMock).toHaveBeenCalledTimes(2);

    expect(observeMock).toHaveBeenCalledWith(document.getElementById("navbar"));

    expect(observeMock).toHaveBeenCalledWith(document.getElementById("footer"));
  });

  it("disconnects observers on unmount", () => {
    const { unmount } = render(<ContactProperty />);

    unmount();

    expect(disconnectMock).toHaveBeenCalled();
  });

  it("renders hidden state by default", () => {
    const { container } = render(<ContactProperty />);

    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass("translate-y-full");

    expect(wrapper).toHaveClass("opacity-0");
  });

  it("renders main container", () => {
    const { container } = render(<ContactProperty />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("warns when navbar or footer are missing", () => {
    document.body.innerHTML = "";

    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    render(<ContactProperty />);

    expect(warnSpy).toHaveBeenCalledWith(
      "Navbar o Footer no encontrados en el DOM. Revisa los IDs.",
    );

    warnSpy.mockRestore();
  });

  it("renders price text", () => {
    render(<ContactProperty price="$999" />);

    expect(screen.getByText("$999")).toBeInTheDocument();
  });

  it("renders title text", () => {
    render(<ContactProperty title="Beach House" />);

    expect(screen.getByText("Beach House")).toBeInTheDocument();
  });
});
