// Import necessary testing tools and components
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../../components/App";

// Test suite for search and sort functionality
describe("Search and Sort Transactions", () => {

    // Set up mock fetch response before each test
    beforeEach(() => {
        global.setFetchResponse([
            { id: 1, date: "2024-01-01", description: "Coffee", category: "Food", amount: 5.00 },
            { id: 2, date: "2024-01-02", description: "Gas", category: "Transport", amount: 40.00 },
            { id: 3, date: "2024-01-03", description: "Books", category: "Education", amount: 20.00 }
        ]);
    });

    // Test that the page updates when a change event is triggered on the search input
    it("updates the page when a change event is triggered", async () => {
        render(<App />);

        // Wait for transactions to load
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
        });

        // Type into the search input
        fireEvent.change(screen.getByPlaceholderText("Search your Recent Transactions"), {
            target: { value: "Coffee" }
        });

        // Verify Coffee is still visible after search
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
        });
    });

    // Test that the search functionality filters transactions by description
    it("filters transactions based on search input", async () => {
        render(<App />);

        // Wait for all transactions to load
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
            expect(screen.getByText("Gas")).toBeInTheDocument();
        });

        // Search for Coffee — Gas and Books should be filtered out
        fireEvent.change(screen.getByPlaceholderText("Search your Recent Transactions"), {
            target: { value: "Coffee" }
        });

        // Coffee should be visible, Gas should not
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
            expect(screen.queryByText("Gas")).not.toBeInTheDocument();
        });
    });

});