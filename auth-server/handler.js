'use_strict';

// Using ES6 import/export syntax
// import google from 'googleapis/';

const { google } = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = [
    'https://www.googleapis.com/auth/calendar.events.public.readonly',
];

// if you are using ViteJS, use import.meta.env (https://stackoverflow.com/questions/30239060/uncaught-referenceerror-process-is-not-defined)
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env; // or import.meta.env
const redirect_uris = [
    'https://meet-ocfsqblqy-michaels-projects-d6491533.vercel.app/',
];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
);

module.exports.getAuthURL = async () => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ authUrl }),
    };
};

// Using ES6 import/export syntax
// export async function getAuthURL() {
//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES,
//     });

//     return {
//         statusCode: 200,
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': true,
//         },
//         body: JSON.stringify({ authUrl }),
//     };
// }
// export default { getAuthURL };
