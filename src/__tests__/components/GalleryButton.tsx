// GalleryButton.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GalleryButton from "@/components/GalleryButton";

describe("GalleryButton component", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders button text", () => {
    render(
      <GalleryButton
        icon={<span data-testid="icon">Icon</span>}
        onClick={mockOnClick}
        selected={false}
        text="Grid View"
        view="pics"
      />,
    );

    expect(screen.getByText("Grid View")).toBeInTheDocument();
  });

  it("renders icon", () => {
    render(
      <GalleryButton
        icon={<span data-testid="icon">Icon</span>}
        onClick={mockOnClick}
        selected={false}
        text="Grid View"
        view="pics"
      />,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders button element", () => {
    render(
      <GalleryButton
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        selected={false}
        text="Grid View"
        view="pics"
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onClick with correct view when not selected", async () => {
    const user = userEvent.setup();

    render(
      <GalleryButton
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        selected={false}
        text="Grid View"
        view="pics"
      />,
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);

    expect(mockOnClick).toHaveBeenCalledWith("pics");
  });

  it("does not call onClick when already selected", async () => {
    const user = userEvent.setup();

    render(
      <GalleryButton
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        selected={true}
        text="Grid View"
        view="pics"
      />,
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("sets aria-pressed to true when selected", () => {
    render(
      <GalleryButton
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        selected={true}
        text="Grid View"
        view="pics"
      />,
    );

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("sets aria-pressed to false when unselected", () => {
    render(
      <GalleryButton
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        selected={false}
        text="Grid View"
        view="pics"
      />,
    );

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("applies selected classes when selected", () => {
    render(
      <GalleryButton
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        selected={true}
        text="Grid View"
        view="pics"
      />,
    );

    const button = screen.getByRole("button");

    const text = screen.getByText("Grid View");

    expect(button).toHaveClass("gallery-button-selected");

    expect(text).toHaveClass("gallery-button-text-selected");
  });

  it("applies unselected classes when not selected", () => {
    render(
      <GalleryButton
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        selected={false}
        text="Grid View"
        view="pics"
      />,
    );

    const button = screen.getByRole("button");

    const text = screen.getByText("Grid View");

    expect(button).toHaveClass("gallery-button-unselected");

    expect(text).toHaveClass("gallery-button-text-unselected");
  });

  it("always applies base classes", () => {
    render(
      <GalleryButton
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        selected={false}
        text="Grid View"
        view="pics"
      />,
    );

    const button = screen.getByRole("button");

    const text = screen.getByText("Grid View");

    expect(button).toHaveClass("gallery-button");

    expect(text).toHaveClass("gallery-button-text");
  });

  it("renders different view values correctly", async () => {
    const user = userEvent.setup();

    render(
      <GalleryButton
        icon={<span>Icon</span>}
        onClick={mockOnClick}
        selected={false}
        text="List View"
        view="pics"
      />,
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledWith("pics");
  });
});
