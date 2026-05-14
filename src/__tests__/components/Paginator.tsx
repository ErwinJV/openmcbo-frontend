// Paginator.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Paginator from "@/components/Paginator";
import { PropertyType } from "@/graphql/generated-types";

// Mock router
const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("Paginator component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultSearchParams = {
    offset: 0,
    limit: 12,
    city: "Miami",
  };

  it("does not render when total pages is 1", () => {
    const { container } = render(
      <Paginator totalElements={10} searchParams={defaultSearchParams} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders paginator when total pages are greater than 1", () => {
    render(
      <Paginator totalElements={100} searchParams={defaultSearchParams} />,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders previous and next buttons", () => {
    render(
      <Paginator totalElements={100} searchParams={defaultSearchParams} />,
    );

    expect(
      screen.getByRole("button", {
        name: /página anterior/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /página siguiente/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders page numbers", () => {
    render(
      <Paginator totalElements={100} searchParams={defaultSearchParams} />,
    );

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
  });

  it("marks current page as active", () => {
    render(
      <Paginator
        totalElements={100}
        searchParams={{
          ...defaultSearchParams,
          offset: 12,
        }}
      />,
    );

    const activePage = screen.getByRole("button", {
      name: "2",
    });

    expect(activePage).toHaveAttribute("aria-current", "page");
  });

  it("disables previous button on first page", () => {
    render(
      <Paginator
        totalElements={100}
        searchParams={{
          ...defaultSearchParams,
          offset: 0,
        }}
      />,
    );

    const prevButton = screen.getByRole("button", {
      name: /página anterior/i,
    });

    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Paginator
        totalElements={24}
        searchParams={{
          ...defaultSearchParams,
          offset: 12,
        }}
      />,
    );

    const nextButton = screen.getByRole("button", {
      name: /página siguiente/i,
    });

    expect(nextButton).toBeDisabled();
  });

  it("navigates to selected page when page button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Paginator totalElements={100} searchParams={defaultSearchParams} />,
    );

    const page2Button = screen.getByRole("button", {
      name: "2",
    });

    await user.click(page2Button);

    expect(pushMock).toHaveBeenCalledWith(
      "/inmuebles?offset=12&limit=12&city=Miami",
      { scroll: true },
    );
  });

  it("navigates to next page when next button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Paginator totalElements={100} searchParams={defaultSearchParams} />,
    );

    const nextButton = screen.getByRole("button", {
      name: /página siguiente/i,
    });

    await user.click(nextButton);

    expect(pushMock).toHaveBeenCalledWith(
      "/inmuebles?offset=12&limit=12&city=Miami",
      { scroll: true },
    );
  });

  it("navigates to previous page when previous button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Paginator
        totalElements={100}
        searchParams={{
          ...defaultSearchParams,
          offset: 24,
        }}
      />,
    );

    const prevButton = screen.getByRole("button", {
      name: /página anterior/i,
    });

    await user.click(prevButton);

    expect(pushMock).toHaveBeenCalledWith(
      "/inmuebles?offset=12&limit=12&city=Miami",
      { scroll: true },
    );
  });

  it("renders maximum of 5 visible page buttons", () => {
    render(
      <Paginator totalElements={200} searchParams={defaultSearchParams} />,
    );

    const pageButtons = screen
      .getAllByRole("button")
      .filter((button) => /^\d+$/.test(button.textContent || ""));

    expect(pageButtons.length).toBeLessThanOrEqual(5);
  });

  it("preserves existing search params in URL", async () => {
    const user = userEvent.setup();

    render(
      <Paginator
        totalElements={100}
        searchParams={{
          offset: 0,
          limit: 12,
          type: PropertyType.House,
        }}
      />,
    );

    const page2Button = screen.getByRole("button", {
      name: "2",
    });

    await user.click(page2Button);

    expect(pushMock).toHaveBeenCalledWith(
      "/inmuebles?offset=12&limit=12&type=HOUSE",
      { scroll: true },
    );
  });
});
