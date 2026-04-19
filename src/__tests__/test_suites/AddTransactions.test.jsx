// Import necessary components, render, screen, fireEvent, waitFor, describe, it, exspect, beforeEach
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "../../components/App";

// Test suite to add new transactions
describe("Add Transactions", () => {

    // Mock fetch response before each test
    beforeEach(() => {
        global.setFetchResponse([
            { id: 1, date: "2024-01-01", description: "Coffee", category: "Food", amount: 5.00 }
        ]);
    });

    // Test if a transaction is added to the frontend after form submission
    it("adds a new transaction to the frontend", async () => {
        render(<App />);

        // Wait for initial transactions to load
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
        });

        // Mock fetch new transaction on POST
        global.setFetchResponse(
            { id: 2, date: "2024-01-03", description: "Books", category: "Education", amount: 20.00 }
        );

        // Fill out and submit the form
        fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Books" } });
        fireEvent.change(screen.getByPlaceholderText("Category"), { target: { value: "Education" } });
        fireEvent.change(screen.getByPlaceholderText("Amount"), { target: { value: "20.00" } });
        fireEvent.click(screen.getByText("Add Transaction"));

        // Verify the new transaction appears on the page
        await waitFor(() => {
            expect(screen.getByText("Books")).toBeInTheDocument();
        });
    });

    // Test if POST request was called when submitting the form
    it("calls the POST request when form is submitted", async () => {
        render(<App />);

        // Wait for initial load
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
        });

        // Mock fetch for POST
        global.setFetchResponse(
            { id: 2, date: "2024-01-03", description: "Books", category: "Education", amount: 20.00 }
        );

        // Submit the form
        fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Books" } });
        fireEvent.click(screen.getByText("Add Transaction"));

        // Verify fetch was called with POST method
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:6001/transactions",
                expect.objectContaining({ method: "POST" })
            );
        });
    });

});