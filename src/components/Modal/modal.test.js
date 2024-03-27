import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Modal from './modal.component';

const mockHero = {
    id: '1',
    code: '123',
    name: 'Mock Hero',
    traits: 'Trait1, Trait2',
    pack_name: 'Mock Pack',
    sphere_name: 'Mock Sphere',
    attack: 10,
    defense: 8,
    health: 100,
    imagesrc: 'mock-hero-image.jpg'
};

describe('Modal Component', () => {
    it('should render correctly with provided hero data', () => {
        render(
            <Modal isOpen={true} onClose={() => {}} hero={mockHero} />
        );

        expect(screen.getByAltText('Mock Hero')).toBeInTheDocument();

        // Check if hero details are rendered
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('123')).toBeInTheDocument();
        expect(screen.getByText('Traits')).toBeInTheDocument();
        expect(screen.getByText('Trait1, Trait2')).toBeInTheDocument();
        expect(screen.getByText('Pack Name')).toBeInTheDocument();
        expect(screen.getByText('Mock Pack')).toBeInTheDocument();
        expect(screen.getByText('Sphere Name')).toBeInTheDocument();
        expect(screen.getByText('Mock Sphere')).toBeInTheDocument();
        expect(screen.getByText('Attack, Defense, Health')).toBeInTheDocument();
        expect(screen.getByText('10, 8, 100')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
        const onCloseMock = jest.fn();
        render(
            <Modal isOpen={true} onClose={onCloseMock} hero={mockHero} />
        );

        // Click on the close button
        fireEvent.click(screen.getByLabelText('close-button'));

        // Check if onClose function is called
        expect(onCloseMock).toHaveBeenCalled();
    });
});
