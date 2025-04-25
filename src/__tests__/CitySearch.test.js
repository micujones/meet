/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CitySearch from '../components/CitySearch';

const user = userEvent.setup();

desribe('<CitySearch /> component', () => {
    beforeEach(() => {
        const CitySearchComponent = render(<CitySearch />);
    });

    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');

        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });
});
