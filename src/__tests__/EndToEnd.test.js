import React from 'react';
import puppeteer from 'puppeteer';

/* 
    Scenario 1: An event element is collapsed by default.
    Scenario 2: User can expand an event to see details.
    Scenario 3: User can collapse an event to hide details.
*/

describe("show/hide an event's details", () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch();
        // browser = await puppeteer.launch({
        //     headless: false,
        //     slowMo: 250,
        //     timeout: 0,
        // });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');

        // Select event list item
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('an event element is collapsed by default', async () => {
        const eventDetails = await page.$('#details');
        expect(eventDetails).toBeNull();
    });

    test('user can expand event to see details', async () => {
        await page.click('#show-details');

        const eventDetails = await page.$('#details');
        expect(eventDetails).toBeDefined();
    });

    test('user can collapse event to hide details', async () => {
        await page.click('#hide-details');

        const eventDetails = await page.$('#details');
        expect(eventDetails).toBeNull();
    });
});
