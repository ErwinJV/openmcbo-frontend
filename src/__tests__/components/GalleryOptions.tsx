// GalleryOptions.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GalleryOptions from "@/components/GalleryOptions";
import { PropertyContext } from "@/providers/PropertyProvider/property-page-context";

// Mock GalleryButton
jest.mock("@/components/GalleryButton", () => ({
  __esModule: true,
  default: ({
    text,
    selected,
    onClick,
    view,
  }: {
    text: string;
    selected: boolean;
    onClick: (view: string) => void;
    view: string;
  }) => (
    <button
      data-testid={`gallery-button-${view}`}
      data-selected={selected}
      onClick={() => onClick(view)}
    >
      {text}
    </button>
  ),
}));

describe("GalleryOptions component", () => {
  const mockHandleGalleryView = jest.fn();

  const renderComponent = ({
    galleryView = "pics",
    hasPics = true,
    has360Pics = true,
    hasVideos = true,
    hasVirtualTour = true,
  } = {}) => {
    return render(
      <PropertyContext.Provider
        value={{
          galleryView,
          handleGalleryView: mockHandleGalleryView,
        }}
      >
        <GalleryOptions
          hasPics={hasPics}
          has360Pics={has360Pics}
          hasVideos={hasVideos}
          hasVirtualTour={hasVirtualTour}
        />
      </PropertyContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all gallery options when all props are true", () => {
    renderComponent();

    expect(screen.getByText("Fotos")).toBeInTheDocument();

    expect(screen.getByText("Fotos 360")).toBeInTheDocument();

    expect(screen.getByText("Videos")).toBeInTheDocument();

    expect(screen.getByText("Recorrido 3D")).toBeInTheDocument();
  });

  it("renders only pictures option when only hasPics is true", () => {
    renderComponent({
      hasPics: true,
      has360Pics: false,
      hasVideos: false,
      hasVirtualTour: false,
    });

    expect(screen.getByText("Fotos")).toBeInTheDocument();

    expect(screen.queryByText("Fotos 360")).not.toBeInTheDocument();

    expect(screen.queryByText("Videos")).not.toBeInTheDocument();

    expect(screen.queryByText("Recorrido 3D")).not.toBeInTheDocument();
  });

  it("does not render any options when all props are false", () => {
    renderComponent({
      hasPics: false,
      has360Pics: false,
      hasVideos: false,
      hasVirtualTour: false,
    });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("marks pics option as selected when galleryView is pics", () => {
    renderComponent({
      galleryView: "pics",
    });

    const picsButton = screen.getByTestId("gallery-button-pics");

    expect(picsButton).toHaveAttribute("data-selected", "true");
  });

  it("marks 360 pics option as selected when galleryView is pics360", () => {
    renderComponent({
      galleryView: "pics360",
    });

    const pics360Button = screen.getByTestId("gallery-button-pics360");

    expect(pics360Button).toHaveAttribute("data-selected", "true");
  });

  it("marks videos option as selected when galleryView is videos", () => {
    renderComponent({
      galleryView: "videos",
    });

    const videosButton = screen.getByTestId("gallery-button-videos");

    expect(videosButton).toHaveAttribute("data-selected", "true");
  });

  it("marks virtual tour option as selected when galleryView is virtualTour", () => {
    renderComponent({
      galleryView: "virtualTour",
    });

    const virtualTourButton = screen.getByTestId("gallery-button-virtualTour");

    expect(virtualTourButton).toHaveAttribute("data-selected", "true");
  });

  it("calls handleGalleryView when clicking pics button", async () => {
    const user = userEvent.setup();

    renderComponent();

    const picsButton = screen.getByTestId("gallery-button-pics");

    await user.click(picsButton);

    expect(mockHandleGalleryView).toHaveBeenCalledWith("pics");
  });

  it("calls handleGalleryView when clicking videos button", async () => {
    const user = userEvent.setup();

    renderComponent();

    const videosButton = screen.getByTestId("gallery-button-videos");

    await user.click(videosButton);

    expect(mockHandleGalleryView).toHaveBeenCalledWith("videos");
  });

  it("renders correct number of buttons based on enabled options", () => {
    renderComponent({
      hasPics: true,
      has360Pics: false,
      hasVideos: true,
      hasVirtualTour: false,
    });

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
  });

  it("renders container div", () => {
    const { container } = renderComponent();

    expect(container.firstChild).toBeInTheDocument();
  });
});
