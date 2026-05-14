// Accordion.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "@/components/Accordion";

describe("Accordion component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders accordion title", () => {
    render(
      <Accordion title="FAQ Question">
        <p>Accordion Content</p>
      </Accordion>,
    );

    expect(screen.getByText("FAQ Question")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <Accordion title="FAQ Question">
        <p>Accordion Content</p>
      </Accordion>,
    );

    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  });

  it("renders accordion button", () => {
    render(
      <Accordion title="FAQ Question">
        <p>Accordion Content</p>
      </Accordion>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders accordion container with role", () => {
    render(
      <Accordion title="FAQ Question">
        <p>Accordion Content</p>
      </Accordion>,
    );

    expect(screen.getByRole("accordion")).toBeInTheDocument();
  });

  it("accordion is closed by default", () => {
    render(
      <Accordion title="FAQ Question">
        <p>Accordion Content</p>
      </Accordion>,
    );

    const content = document.querySelector(".accordion-content") as HTMLElement;

    expect(content).toHaveStyle({
      maxHeight: "0px",
    });
  });

  //   it("opens accordion when clicked", async () => {
  //     const user = userEvent.setup();

  //     render(
  //       <Accordion title="FAQ Question">
  //         <p>Accordion Content</p>
  //       </Accordion>,
  //     );

  //     const button = screen.getByRole("button");
  //     console.log(button);

  //     await user.click(button);

  //     const content = document.querySelector(".accordion-content") as HTMLElement;

  //     expect(content.style.maxHeight).not.toBe("0px");
  //   });

  it("closes accordion when clicked twice", async () => {
    const user = userEvent.setup();

    render(
      <Accordion title="FAQ Question">
        <p>Accordion Content</p>
      </Accordion>,
    );

    const button = screen.getByRole("button");

    await user.click(button);

    await user.click(button);

    const content = document.querySelector(".accordion-content") as HTMLElement;

    expect(content).toHaveStyle({
      maxHeight: "0px",
    });
  });

  it("adds open class to icon when accordion is open", async () => {
    const user = userEvent.setup();

    render(
      <Accordion title="FAQ Question">
        <p>Accordion Content</p>
      </Accordion>,
    );

    const button = screen.getByRole("button");

    const icon = document.querySelector(".accordion-icon") as HTMLElement;

    expect(icon).not.toHaveClass("accordion-icon-open");

    await user.click(button);

    expect(icon).toHaveClass("accordion-icon-open");
  });

  it("removes open class from icon when accordion is closed", async () => {
    const user = userEvent.setup();

    render(
      <Accordion title="FAQ Question">
        <p>Accordion Content</p>
      </Accordion>,
    );

    const button = screen.getByRole("button");

    const icon = document.querySelector(".accordion-icon") as HTMLElement;

    await user.click(button);

    expect(icon).toHaveClass("accordion-icon-open");

    await user.click(button);

    expect(icon).not.toHaveClass("accordion-icon-open");
  });

  it("renders complex children content", () => {
    render(
      <Accordion title="Complex Content">
        <div>
          <h1>Heading</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      </Accordion>,
    );

    expect(screen.getByText("Heading")).toBeInTheDocument();

    expect(screen.getByText("Description")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Action",
      }),
    ).toBeInTheDocument();
  });
});
