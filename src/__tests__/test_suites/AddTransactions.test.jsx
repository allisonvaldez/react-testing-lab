// Import necessary testing tools and components
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../../components/App";

// Test suite for adding new transactions
describe("Add Transactions", () => {

    // Set up mock fetch response before each test
    beforeEach(() => {
        global.setFetchResponse([
            { id: 1, date: "2024-01-01", description: "Coffee", category: "Food", amount: 5.00 }
        ]);
    });

    // Test that a new transaction is added to the frontend after form submission
    it("adds a new transaction to the frontend", async () => {
        render(<App />);

        // Wait for initial transactions to load
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
        });

        // Mock fetch to return the new transaction on POST
        global.setFetchResponse(
            { id: 2, date: "2024-01-03", description: "Books", category: "Education", amount: 20.00 }
        );

        // Fill out all form fields including date
        fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Books" } });
        fireEvent.change(screen.getByPlaceholderText("Category"), { target: { value: "Education" } });
        fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "20.00" } });

        // Submit the form directly
        fireEvent.submit(screen.getByRole("button", { name: "Add Transaction" }).closest("form"));

        // Verify the new transaction appears on the page
        await waitFor(() => {
            expect(screen.getByText("Books")).toBeInTheDocument();
        });
    });

    // Test that the POST request was called when submitting the form
    it("calls the POST request when form is submitted", async () => {
        render(<App />);

        // Wait for initial load
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
        });

        // Mock fetch for the POST before submitting
        global.setFetchResponse(
            { id: 2, date: "2024-01-03", description: "Books", category: "Education", amount: 20.00 }
        );

        // Fill out all required fields
        fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Books" } });
        fireEvent.change(screen.getByPlaceholderText("Category"), { target: { value: "Education" } });
        fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "20.00" } });

        // Submit the form directly
        fireEvent.submit(screen.getByRole("button", { name: "Add Transaction" }).closest("form"));

        // Verify fetch was called with POST method
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:6001/transactions",
                expect.objectContaining({ method: "POST" })
            );
        });
    });

});