// Import necessary testing tools and components
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../../components/App";

// Test suite for displaying transactions on startup
describe("Display Transactions", () => {

    // Set up mock fetch response before each test
    beforeEach(() => {
        global.setFetchResponse([
            { id: 1, date: "2024-01-01", description: "Coffee", category: "Food", amount: 5.00 },
            { id: 2, date: "2024-01-02", description: "Gas", category: "Transport", amount: 40.00 }
        ]);
    });

    // Test that transactions are displayed on startup
    it("displays transactions on startup", async () => {
        render(<App />);

        // Wait for transactions to appear after fetch resolves
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
            expect(screen.getByText("Gas")).toBeInTheDocument();
        });
    });

});