import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomCard from './card.component';

const mockHero = {
    name: 'Hero Name',
    imagesrc: 'hero-image.jpg',
    attack: 10,
    defense: 8,
    health: 100,
};

describe('CustomCard Component', () => {
    it('should render hero information and call onShowMore function when clicked', () => {
        const mockOnShowMore = jest.fn();
        const { getByText, getByAltText } = render(
            <CustomCard hero={mockHero} onShowMore={mockOnShowMore} />
        );

        expect(getByText('Hero Name')).toBeInTheDocument();
        expect(getByAltText('Hero Name')).toBeInTheDocument();

        fireEvent.click(getByText('Show More'));

        expect(mockOnShowMore).toHaveBeenCalled();
    });
});
