import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './header.component';
import {LoadingProvider} from "../../contexts/loading.context";

describe('Header Component', () => {
    it('should render deck name and call onDeckFetch and onViewModeChange functions', () => {
        const mockDeckName = 'Sample Deck';
        const mockOnDeckFetch = jest.fn();
        const mockOnViewModeChange = jest.fn();
        const { getByText, getByLabelText } = render(
            <LoadingProvider>
                <Header
                    deckName={mockDeckName}
                    onDeckFetch={mockOnDeckFetch}
                    onViewModeChange={mockOnViewModeChange}
                />
            </LoadingProvider>
        );

        // Assert that deck name is rendered
        expect(getByText(`Deck Name: ${mockDeckName}`)).toBeInTheDocument();

        // Simulate changing layout to grid
        fireEvent.click(getByLabelText('grid'));

        // Assert that onViewModeChange function is called with 'grid'
        expect(mockOnViewModeChange).toHaveBeenCalledWith('grid');

        // Simulate changing layout to list
        fireEvent.click(getByLabelText('list'));

        // Assert that onViewModeChange function is called with 'list'
        expect(mockOnViewModeChange).toHaveBeenCalledWith('list');
    });
});
