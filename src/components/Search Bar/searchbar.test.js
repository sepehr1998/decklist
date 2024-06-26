import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SearchBar from './searchbar.component';
import { fetchDeckById } from '../../utils/utils';
import {LoadingProvider} from "../../contexts/loading.context";

jest.mock('../../utils/utils', () => ({
    fetchDeckById: jest.fn().mockResolvedValue({ name: 'Mock Deck', heroes: {} })
}));

describe('SearchBar Component', () => {
    it('should render correctly and call onDeckFetch on search', async () => {
        const onDeckFetchMock = jest.fn();
        render(
            <LoadingProvider>
                <SearchBar onDeckFetch={onDeckFetchMock} />
            </LoadingProvider>
        );

        // Simulate typing in deck ID
        fireEvent.change(screen.getByRole('textbox', { name: 'search deck id' }), { target: { value: 'mock-deck-id' } });

        // Simulate clicking on search button
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

    });

    it('should display an alert on failed deck fetch', async () => {
       render(
            <LoadingProvider>
                <SearchBar onDeckFetch={() => {}} />
            </LoadingProvider>
        );

        // Mock the fetchDeckById function to throw an error
        fetchDeckById.mockRejectedValueOnce('Error fetching deck');

        // Simulate clicking on search button
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        await waitFor(() => {
            // Ensure that an alert with the error message is displayed
            expect(screen.getByText(/fetching deck unsuccessful/i)).toBeInTheDocument();
        });
    });
});
