import React from 'react';
import puppeteer from 'puppeteer';

/* 
    Scenario 1: An event element is collapsed by default.
    Scenario 2: User can expand an event to see details.
    Scenario 3: User can collapse an event to hide details.
*/

describe("show/hide an event's details", () => {
    test('an event element is collapsed by default', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:5173/');

        // Select event list item
        await page.waitForSelector('.event');

        const eventDetails = await page.$('#details');
        expect(eventDetails).toBeNull();

        await browser.close();
    });

    test('user can expand event to see details', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:5173/');

        // Click "show details" button
        await page.waitForSelector('.event');
        await page.click('#show-details');

        const eventDetails = await page.$('#details');
        expect(eventDetails).toBeDefined();

        await browser.close();
    });
});
