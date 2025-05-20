import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CitySearch from '../components/CitySearch';
import App from '../App';
import { getEvents, extractLocations } from '../api';

describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]} />);
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
            <CitySearch allLocations={allLocations} setInfoAlert={() => {}} />
        );

        // User types "Berlin" in city textbox
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        // Filter allLocations to locations matching "Berlin"
        const suggestions = allLocations
            ? allLocations.filter((location) => {
                  return (
                      location
                          .toUpperCase()
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

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={() => {}}
                setInfoAlert={() => {}}
            />
        );

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        // The suggestion's text content look like this: "Berlin, Germany"
        const BerlinGermanySuggestion =
            CitySearchComponent.queryAllByRole('listitem')[0];

        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});

describe('<CitySearch /> integration', () => {
    test('renders suggestions list when app is rendered', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        const suggestionListItems =
            within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
});
