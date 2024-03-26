import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { LoadingProvider } from './contexts/loading.context';

// Mock the fetchDeckById function
jest.mock('./utils/utils', () => ({
    fetchDeckById: jest.fn().mockResolvedValue({
        name: "Ranger, Noldor and Hobbit",
        heroes: {
            "10001": 1,
            "01001": 1,
            "04128": 1
        }
    }),
}));

describe('App Component', () => {
    it('renders initial search bar', () => {
        const { getByText } = render(
            <LoadingProvider>
                <App />
            </LoadingProvider>
        );
        expect(getByText('Enter the Deck ID')).toBeInTheDocument();
    });

    it('fetches deck data and renders header after searching', async () => {
        const { getByRole } = render(
            <LoadingProvider>
                <App />
            </LoadingProvider>
        );

        // Mock the click event for the search button
        const searchButton = getByRole('button', { name: /search-button/i });
        searchButton.onclick = jest.fn();

        // Simulate searching for a deck
        fireEvent.change(getByRole('textbox', { name: 'search deck id' }), { target: { value: 'mock-deck-id' } });
        fireEvent.click(searchButton);
    });

    it('renders loading spinner while fetching deck data', async () => {
        const { getByRole } = render(
            <LoadingProvider>
                <App />
            </LoadingProvider>
        );

        // Simulate searching for a deck
        fireEvent.change(getByRole('textbox', { name: 'search deck id' }), { target: { value: 'mock-deck-id' } });
        fireEvent.click(getByRole('button', { name: /search/i }));
    });
});
