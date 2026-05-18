// PropertyDescription.test.tsx
import { render, screen } from "@testing-library/react";
import PropertyDescription from "@/components/PropertyDescription";
import { PropertyType } from "@/graphql/generated-types";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock Pad component
jest.mock("@/components/Pad", () => ({
  __esModule: true,
  default: ({ amt }: { amt: number }) => <div data-testid="pad">{amt}</div>,
}));

describe("PropertyDescription component", () => {
  const defaultProps = {
    area: 120,
    description: "Beautiful property with modern finishes.",
    imgUrl: "/property.jpg",
    num_baths: 2,
    num_bedrooms: 3,
    place: "Maracaibo, Venezuela",
    price: 150000,
    title: "Luxury Apartment",
    type: PropertyType.Apartment,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders property title", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(screen.getByText("Luxury Apartment")).toBeInTheDocument();
  });

  it("renders formatted price", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(screen.getByText("150,000 $")).toBeInTheDocument();
  });

  it("renders place", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(screen.getByText("Maracaibo, Venezuela")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(
      screen.getByText("Beautiful property with modern finishes."),
    ).toBeInTheDocument();
  });

  it("renders property image", () => {
    render(<PropertyDescription {...defaultProps} />);

    const image = screen.getByAltText("Property article image");

    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute("src", "/property.jpg");
  });

  it("renders formatted area", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(screen.getByText("120 m2")).toBeInTheDocument();
  });

  it("renders bedrooms when num_bedrooms is greater than 0", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(screen.getByText("Habitaciones")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not render bedrooms when num_bedrooms is 0", () => {
    render(<PropertyDescription {...defaultProps} num_bedrooms={0} />);

    expect(screen.queryByText("Habitaciones")).not.toBeInTheDocument();
  });

  it("does not render bedrooms when num_bedrooms is undefined", () => {
    render(<PropertyDescription {...defaultProps} num_bedrooms={undefined} />);

    expect(screen.queryByText("Habitaciones")).not.toBeInTheDocument();
  });

  it("renders bathrooms when num_baths is greater than 0", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(screen.getByText("Banos")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not render bathrooms when num_baths is 0", () => {
    render(<PropertyDescription {...defaultProps} num_baths={0} />);

    expect(screen.queryByText("Banos")).not.toBeInTheDocument();
  });

  it("does not render bathrooms when num_baths is undefined", () => {
    render(<PropertyDescription {...defaultProps} num_baths={undefined} />);

    expect(screen.queryByText("Banos")).not.toBeInTheDocument();
  });

  it("renders apartment type correctly", () => {
    render(
      <PropertyDescription {...defaultProps} type={PropertyType.Apartment} />,
    );

    expect(screen.getByText("Apartamento")).toBeInTheDocument();
  });

  it("renders house type correctly", () => {
    render(<PropertyDescription {...defaultProps} type={PropertyType.House} />);

    expect(screen.getByText("Casa")).toBeInTheDocument();
  });

  it("renders property type label", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(screen.getByText("Tipo de inmueble")).toBeInTheDocument();
  });

  it("renders area label", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(screen.getByText("Area")).toBeInTheDocument();
  });

  it("renders Pad components", () => {
    render(<PropertyDescription {...defaultProps} />);

    const pads = screen.getAllByTestId("pad");

    expect(pads).toHaveLength(2);
  });

  it("renders article element", () => {
    render(<PropertyDescription {...defaultProps} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  //   it("renders multiline description correctly", () => {
  //     const multilineDescription = "Line one\nLine two\nLine three";

  //     render(
  //       <PropertyDescription
  //         {...defaultProps}
  //         description={multilineDescription}
  //       />,
  //     );

  //     expect(screen.getByText(multilineDescription)).toBeInTheDocument();
  //   });

  //   it("renders large formatted area", () => {
  //     render(<PropertyDescription {...defaultProps} area={1500} />);

  //     expect(screen.getByText("1,500 m2")).toBeInTheDocument();
  //   });

  //   it("renders large formatted price", () => {
  //     render(<PropertyDescription {...defaultProps} price={2500000} />);

  //     expect(screen.getByText("2,500,000 $")).toBeInTheDocument();
  //   });
});
