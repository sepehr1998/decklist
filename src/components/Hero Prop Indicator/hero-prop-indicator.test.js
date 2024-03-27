import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroPropIndicator from './hero-prop-indicator.component';

describe('HeroPropIndicator Component', () => {
    it('should render correctly with given value and color', () => {
        render(
            <HeroPropIndicator value={7} color="primary" caption="Attack" />
        );

        // Check if progress bar is rendered
        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar).toBeInTheDocument();

        // Check if value and caption are rendered
        expect(screen.getByText('7')).toBeInTheDocument();
        expect(screen.getByText('Attack')).toBeInTheDocument();
    });

    it('should render with default caption if not provided', () => {
        render(
            <HeroPropIndicator value={5} color="secondary" />
        );

        // Check if default caption is rendered
        expect(screen.getByText('5')).toBeInTheDocument();
    });
});
