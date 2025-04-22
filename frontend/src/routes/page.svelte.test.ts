import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import { describe, expect } from "vitest";

import Page from "./+page.svelte";

describe("/+page.svelte", () => {
  it("should render h1", () => {
    render(Page);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
