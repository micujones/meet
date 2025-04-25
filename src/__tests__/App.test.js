/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('<App /> component', () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    });

    test('renders list of events', () => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });

    test('renders CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });
});
