import { test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const headline = screen.getByText(/My Todolist/i);
  expect(headline).toBeInTheDocument();
});

test("renders todotable", () => {
  render(<App />);
  const row = [{ desc: "Go to coffee", date: "24.01.2023" }];
  const table = screen.getByRole("table");
  expect(table).not.toHaveTextContent(/go to coffee/i);
  const button = screen.getByText("Add");
  fireEvent.click(button);
});

test("add todo", () => {
  render(<App />);
  const desc = screen.getByPlaceholderText("Description");
  fireEvent.change(desc, { target: { value: "Go to coffee" } });
  const date = screen.getByPlaceholderText("Date");
  fireEvent.change(date, { target: { value: "29.01.2023" } });
  const button = screen.getByText("Add");
  fireEvent.click(button);
  const table = screen.getByRole("table");
  expect(table).toHaveTextContent(/go to coffee/i);
});

test("clear todo", () => {
  render(<App />);
  const desc = screen.getByPlaceholderText("Description");
  fireEvent.change(desc, { target: { value: "Go to coffee" } });
  const date = screen.getByPlaceholderText("Date");
  fireEvent.change(date, { target: { value: "29.01.2023" } });
  const button = screen.getByText("Clear");
  fireEvent.click(button);
  const table = screen.getByRole("table");
  expect(desc.value).toBe("");
  expect(date.value).toBe("");
  expect(table).not.toHaveTextContent(/go to coffee/i);
});
