import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CitySearch from '../components/CitySearch';
import { getEvents, extractLocations } from '../api';

describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch />);
    });

    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');

        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const suggestionsList = CitySearchComponent.queryByRole('list');
        expect(suggestionsList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox gains focus', async () => {
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole('textbox');

        await user.click(cityTextBox);
        const suggestionsList = CitySearchComponent.queryByRole('list');

        expect(suggestionsList).toBeInTheDocument();
        expect(suggestionsList).toHaveClass('suggestions');
    });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        CitySearchComponent.rerender(
            <CitySearch allLocations={allLocations} />
        );

        // User types "Berlin" in city textbox
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        // Filter allLocations to locations matching "Berlin"
        const suggestions = allLocations
            ? allLocations.filter((location) => {
                  return (
                      location
                          .tpUpperCase()
                          .indexOf(cityTextBox.value.toUpperCase()) > -1
                  );
              })
            : [];

        // get all <li> elements inside the suggestion list
        const suggestionsListItems =
            CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionsListItems).toHaveLength(suggestions.length + 1);

        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionsListItems[i].textContent).toBe(suggestions[i]);
        }
    });
});
