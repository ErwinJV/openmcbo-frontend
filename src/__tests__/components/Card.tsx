// Card.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "@/components/Card";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

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

describe("Card component", () => {
  const mockProps = {
    price: 150000,
    srcImg: ["/image-2.jpg", "/image-3.jpg"],
    title: "Luxury Apartment",
    url: "/property/luxury-apartment",
    main_picture: "/main-image.jpg",
  };

  it("renders title and price", () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText("Luxury Apartment")).toBeInTheDocument();
    expect(screen.getByText("$150,000")).toBeInTheDocument();
  });

  it("renders all images", () => {
    render(<Card {...mockProps} />);

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(3);
  });

  it("renders navigation buttons when multiple images exist", () => {
    render(<Card {...mockProps} />);

    expect(
      screen.getByRole("button", {
        name: /imagen anterior/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /siguiente imagen/i,
      }),
    ).toBeInTheDocument();
  });

  it("does not render navigation buttons when only one image exists", () => {
    render(
      <Card
        price={1000}
        srcImg={[]}
        title="Single image"
        url="/single"
        main_picture="/single.jpg"
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: /imagen anterior/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /siguiente imagen/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("renders image indicators", () => {
    render(<Card {...mockProps} />);

    const indicators = screen.getAllByRole("button", {
      name: /ir a imagen/i,
    });

    expect(indicators).toHaveLength(3);
  });

  it("changes image when next button is clicked", async () => {
    const user = userEvent.setup();

    render(<Card {...mockProps} />);

    const nextButton = screen.getByRole("button", {
      name: /siguiente imagen/i,
    });

    const slider = document.querySelector(
      ".transition-transform",
    ) as HTMLElement;

    expect(slider).toHaveStyle({
      transform: "translateX(-0%)",
    });

    await user.click(nextButton);

    expect(slider).toHaveStyle({
      transform: "translateX(-100%)",
    });
  });

  it("changes image when previous button is clicked", async () => {
    const user = userEvent.setup();

    render(<Card {...mockProps} />);

    const nextButton = screen.getByRole("button", {
      name: /siguiente imagen/i,
    });

    const prevButton = screen.getByRole("button", {
      name: /imagen anterior/i,
    });

    const slider = document.querySelector(
      ".transition-transform",
    ) as HTMLElement;

    await user.click(nextButton);

    expect(slider).toHaveStyle({
      transform: "translateX(-100%)",
    });

    await user.click(prevButton);

    expect(slider).toHaveStyle({
      transform: "translateX(-0%)",
    });
  });

  it("changes image when indicator is clicked", async () => {
    const user = userEvent.setup();

    render(<Card {...mockProps} />);

    const indicators = screen.getAllByRole("button", {
      name: /ir a imagen/i,
    });

    const slider = document.querySelector(
      ".transition-transform",
    ) as HTMLElement;

    await user.click(indicators[2]);

    expect(slider).toHaveStyle({
      transform: "translateX(-200%)",
    });
  });

  it("renders fallback text when image src is empty", () => {
    render(
      <Card
        price={1000}
        srcImg={[""]}
        title="No image"
        url="/no-image"
        main_picture=""
      />,
    );

    expect(screen.getAllByText("Sin imagen")).toHaveLength(2);
  });

  it("renders link with correct href", () => {
    render(<Card {...mockProps} />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/property/luxury-apartment");
  });

  it('renders "Ver completo" button', () => {
    render(<Card {...mockProps} />);

    expect(screen.getAllByText("Ver completo")[0]).toBeInTheDocument();
  });
});
