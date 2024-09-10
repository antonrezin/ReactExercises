import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const headline = screen.getByText(/My Todolist/i);
  expect(headline).toBeInTheDocument();
});
