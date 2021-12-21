import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

test('renders the clear button', async () => {
  render(<App />);
  const element = screen.getByText(/C/i);
  expect(element).toBeInTheDocument();
});

test("renders the clicked value result", async () => {
	render(<App />);

  userEvent.click(screen.getByText("9"));
  userEvent.click(screen.getByText("+"));
  userEvent.click(screen.getByText("4"));
  userEvent.click(screen.getByText("="));
  screen.getByText("13");
});

test("renders the clicked value of addition", async () => {
	render(<App />);

	userEvent.click(screen.getByText("9"));
	userEvent.click(screen.getByText("+"));
	userEvent.click(screen.getByText("4"));
	userEvent.click(screen.getByText("="));
	screen.getByText("9 + 4");
});


test("renders the clicked value of addition and substraction", async () => {
	render(<App />);

	userEvent.click(screen.getByText("9"));
	userEvent.click(screen.getByText("+"));
	userEvent.click(screen.getByText("4"));
	userEvent.click(screen.getByText("-"));
  userEvent.click(screen.getByText("6"));
	userEvent.click(screen.getByText("="));
	screen.getByText("9 + 4 - 6");
});

test("renders the clicked value result of addition and substraction", async () => {
	render(<App />);

	userEvent.click(screen.getByText("9"));
	userEvent.click(screen.getByText("+"));
	userEvent.click(screen.getByText("9"));
	userEvent.click(screen.getByText("-"));
	userEvent.click(screen.getByText("6"));
	userEvent.click(screen.getByText("="));
  screen.getByLabelText("result-screen");
	screen.getByText("12");
});

test("clears all value", async () => {
	render(<App />);

	userEvent.click(screen.getByText("9"));
	userEvent.click(screen.getByText("+"));
	userEvent.click(screen.getByText("9"));
	userEvent.click(screen.getByText("-"));
	userEvent.click(screen.getByText("6"));
	userEvent.click(screen.getByText("C"));

  screen.getByLabelText("result-screen");
});
