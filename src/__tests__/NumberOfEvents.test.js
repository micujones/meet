import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> compondent', () => {
    test('renders text input', () => {
        const NumberOfEventsComponent = render(<NumberOfEvents />);
        const inputField = NumberOfEventsComponent.queryByRole('textbox');

        expect(inputField).toBeInTheDocument();
    });

    test('default input value is 32', () => {
        const NumberOfEventsComponent = render(<NumberOfEvents />);
        const inputField = NumberOfEventsComponent.queryByRole('textbox');

        expect(inputField.value).toBe('32');
    });

    test("textbox's value changes accordingly when a user type's in it", async () => {
        const NumberOfEventsComponent = render(<NumberOfEvents />);
        const inputField = NumberOfEventsComponent.queryByRole('textbox');

        const user = userEvent.setup();
        const userInput = Math.floor(Math.random() * 18).toString();

        await user.type(inputField, `{backspace}{backspace}${userInput}`);

        expect(inputField.value).toBe(userInput);
    });
});
