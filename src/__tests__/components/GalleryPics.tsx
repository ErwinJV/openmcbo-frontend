// GalleryPics.test.tsx
import { render, screen } from "@testing-library/react";
import GalleryPics from "@/components/GalleryPics";

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

describe("GalleryPics component", () => {
  const mockPics = [
    {
      id: "pic-1",
      url: "/pic-1.jpg",
    },
    {
      id: "pic-2",
      url: "/pic-2.jpg",
    },
    {
      id: "pic-3",
      url: "/pic-3.jpg",
    },
    {
      id: "pic-4",
      url: "/pic-4.jpg",
    },
    {
      id: "pic-5",
      url: "/pic-5.jpg",
    },
    {
      id: "pic-6",
      url: "/pic-6.jpg",
    },
  ] as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders fallback message when pics is null", () => {
    render(<GalleryPics pics={null} main_picture="/main.jpg" />);

    expect(screen.getByText("No hay imagenes....")).toBeInTheDocument();
  });

  it("renders fallback message when pics is empty", () => {
    render(<GalleryPics pics={[]} main_picture="/main.jpg" />);

    expect(screen.getByText("No hay imagenes....")).toBeInTheDocument();
  });

  it("renders main picture", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    const mainImage = screen.getByAltText("Main Picture");

    expect(mainImage).toBeInTheDocument();

    expect(mainImage).toHaveAttribute("src", "/main.jpg");
  });

  it("renders gallery images", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    expect(screen.getByAltText("pic-1")).toBeInTheDocument();

    expect(screen.getByAltText("pic-2")).toBeInTheDocument();

    expect(screen.getByAltText("pic-3")).toBeInTheDocument();

    expect(screen.getByAltText("pic-4")).toBeInTheDocument();
  });

  it("renders all visible images", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(5);
  });

  it("renders links with correct hrefs", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/main.jpg");

    expect(links[1]).toHaveAttribute("href", "/pic-1.jpg");

    expect(links[2]).toHaveAttribute("href", "/pic-2.jpg");
  });

  it("renders fancybox attribute on links", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toHaveAttribute("data-fancybox", "gallery");
    });
  });

  it("renders mobile overlay counter", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    expect(screen.getByText("+5")).toBeInTheDocument();
  });

  it("renders desktop overlay counter when more than 5 images exist", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("does not render desktop overlay counter when total images are 5", () => {
    render(
      <GalleryPics pics={mockPics.slice(0, 4)} main_picture="/main.jpg" />,
    );

    expect(screen.queryByText("+0")).not.toBeInTheDocument();
  });

  it("renders hidden extra image links when more than 5 images exist", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    expect(screen.getByText("pic-5")).toBeInTheDocument();

    expect(screen.getByText("pic-6")).toBeInTheDocument();
  });

  it("renders correct number of links including hidden ones", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    const links = screen.getAllByRole("link");

    // 5 visible + 2 hidden
    expect(links.length).toBe(7);
  });

  it("renders list container", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("renders list items", () => {
    render(<GalleryPics pics={mockPics} main_picture="/main.jpg" />);

    const items = screen.getAllByRole("listitem");

    expect(items.length).toBeGreaterThan(0);
  });
});
