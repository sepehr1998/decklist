import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomCard from './card.component';

const mockHero = {
    name: 'Hero Name',
    imagesrc: 'hero-image.jpg',
    attack: 10,
    defense: 8,
    health: 100,
    pack_name: 'pack name',
    sphere_name: 'sphere',
    id: '1',
    code: '100',
    traits: 'traits'
};

describe('CustomCard Component', () => {
    it('should render hero information and call onShowMore function when clicked', () => {
        const mockOnShowMore = jest.fn();
        render(
            <CustomCard hero={mockHero} onShowMore={mockOnShowMore} />
        );

        expect(screen.getByText('Hero Name')).toBeInTheDocument();
        expect(screen.getByAltText('Hero Name')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Show More'));

        expect(mockOnShowMore).toHaveBeenCalled();
    });
});
