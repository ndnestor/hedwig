import * as twilioInterface from './twilio-interface';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import csvParse from 'csv-parse';
import fs from 'fs';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER; // your Twilio phone number here

// send endpoint
app.post('/send', (req: Request, res: Response) => {
    console.log('Sending message...')
    const { token, message, phone } = req.body;
    if (!isValidToken(token)) {
        return res.status(401).send('Unauthorized');
    }
    twilioInterface.sendTextMessage(TWILIO_PHONE_NUMBER, phone, message)
        .then(() => {
            return res.status(200).send('Message sent');
        })
        .catch((error: Error) => {
            console.error(`Failed to send message: ${error.message}`);
            return res.status(500).send('Failed to send message');
        });
});

// receive endpoint
app.get('/receive', (req: Request, res: Response) => {
    console.log('Retrieving messages...')
    const { token } = req.body;
    if (!isValidToken(token)) {
        return res.status(401).send('Unauthorized');
    }
    twilioInterface.getReceivedMessages(TWILIO_PHONE_NUMBER)
        .then((messages: twilioInterface.Message[]) => {
            return res.status(200).json(messages);
        })
        .catch((error: Error) => {
            console.error(`Failed to retrieve messages: ${error.message}`);
            return res.status(500).send('Failed to retrieve messages');
        });
});

function isValidToken(token: string): Promise<boolean> {
    const whitelist = fs.readFileSync('whitelist.csv');
    return new Promise<boolean>((resolve, reject) => {
        csvParse.parse(whitelist, (err, data) => {
            if (err) {
                console.error(`Failed to parse whitelist file: ${err.message}`);
                reject(err);
            } else {
                const tokens = data.map((row) => row[0]);
                resolve(tokens.includes(token));
            }
        });
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
