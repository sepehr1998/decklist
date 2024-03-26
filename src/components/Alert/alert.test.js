import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomAlert from './alert.component';

describe('CustomAlert Component', () => {
    it('should render alert message', () => {
        const errorMessage = 'Error fetching data from API';
        render(<CustomAlert alert={errorMessage} />);

        const alertMessage = screen.getByText(errorMessage);
        expect(alertMessage).toBeInTheDocument();
    });
});
