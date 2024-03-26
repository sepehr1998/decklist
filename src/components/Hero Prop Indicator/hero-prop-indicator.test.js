import React from 'react';
import { render } from '@testing-library/react';
import HeroPropIndicator from './hero-prop-indicator.component';

describe('HeroPropIndicator Component', () => {
    it('should render correctly with given value and color', () => {
        const { getByTestId, getByText } = render(
            <HeroPropIndicator value={7} color="primary" caption="Attack" />
        );

        // Check if progress bar is rendered
        const progressBar = getByTestId('progress-bar');
        expect(progressBar).toBeInTheDocument();

        // Check if value and caption are rendered
        expect(getByText('7')).toBeInTheDocument();
        expect(getByText('Attack')).toBeInTheDocument();
    });

    it('should render with default caption if not provided', () => {
        const { getByText } = render(
            <HeroPropIndicator value={5} color="secondary" />
        );

        // Check if default caption is rendered
        expect(getByText('5')).toBeInTheDocument();
    });
});
