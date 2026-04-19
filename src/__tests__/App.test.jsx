// Import necessary testing tools and components
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../components/App";

// Main App test suite combining all key features
describe("App", () => {

    // Set up mock fetch response before each test
    beforeEach(() => {
        global.setFetchResponse([
            { id: 1, date: "2024-01-01", description: "Coffee", category: "Food", amount: 5.00 },
            { id: 2, date: "2024-01-02", description: "Gas", category: "Transport", amount: 40.00 }
        ]);
    });

    // Test that the app renders the bank header
    it("renders the bank header", () => {
        render(<App />);
        expect(screen.getByText("The Royal Bank of Flatiron")).toBeInTheDocument();
    });

    // Test that transactions are displayed on startup
    it("displays transactions on startup", async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText("Coffee")).toBeInTheDocument();
            expect(screen.getByText("Gas")).toBeInTheDocument();
        });
    });

    // Test that the search input is rendered
    it("renders the search input", () => {
        render(<App />);
        expect(screen.getByPlaceholderText("Search your Recent Transactions")).toBeInTheDocument();
    });

    // Test that the add transaction form is rendered
    it("renders the add transaction form", () => {
        render(<App />);
        expect(screen.getByText("Add Transaction")).toBeInTheDocument();
    });

});