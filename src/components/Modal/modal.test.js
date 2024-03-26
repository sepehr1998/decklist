import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './modal.component';

const mockHero = {
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
        const { getByText, getByAltText } = render(
            <Modal isOpen={true} onClose={() => {}} hero={mockHero} />
        );

        expect(getByAltText('Mock Hero')).toBeInTheDocument();

        // Check if hero details are rendered
        expect(getByText('ID')).toBeInTheDocument();
        expect(getByText('123')).toBeInTheDocument();
        expect(getByText('Traits')).toBeInTheDocument();
        expect(getByText('Trait1, Trait2')).toBeInTheDocument();
        expect(getByText('Pack Name')).toBeInTheDocument();
        expect(getByText('Mock Pack')).toBeInTheDocument();
        expect(getByText('Sphere Name')).toBeInTheDocument();
        expect(getByText('Mock Sphere')).toBeInTheDocument();
        expect(getByText('Attack, Defense, Health')).toBeInTheDocument();
        expect(getByText('10, 8, 100')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
        const onCloseMock = jest.fn();
        const { getByLabelText } = render(
            <Modal isOpen={true} onClose={onCloseMock} hero={mockHero} />
        );

        // Click on the close button
        fireEvent.click(getByLabelText('close-button'));

        // Check if onClose function is called
        expect(onCloseMock).toHaveBeenCalled();
    });
});
