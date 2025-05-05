import React from 'react';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    let inputField;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
        inputField = NumberOfEventsComponent.queryByRole('textbox');
    });

    test('renders text input', () => {
        expect(inputField).toBeInTheDocument();
    });

    test('default input value is 32', () => {
        expect(inputField.value).toBe('32');
    });

    test("textbox's value changes accordingly when a user type's in it", async () => {
        const user = userEvent.setup();
        const userInput = Math.floor(Math.random() * 18).toString();

        await user.type(inputField, `{backspace}{backspace}${userInput}`);

        expect(inputField.value).toBe(userInput);
    });
});

describe('<NumberOfEvents /> integration', () => {
    test('renders numbers of events based on user input', async () => {
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const NumberOfEventsComponent =
            AppDOM.querySelector('#number-of-events');
        const EventList = AppDOM.querySelector('#event-list');

        const user = userEvent.setup();

        const inputField = within(NumberOfEventsComponent).queryByRole(
            'textbox'
        );

        const userInput = Math.floor(Math.random() * 30).toString();
        await user.type(inputField, `{backspace}{backspace}${userInput}`);

        await waitFor(() => {
            const EventListItems = within(EventList).queryAllByRole('listitem');

            expect(inputField.value).toBe(userInput);
            expect(EventListItems.length).toBe(parseInt(userInput));
        });
    });
});
