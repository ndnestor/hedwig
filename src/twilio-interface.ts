import twilio from 'twilio';
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export interface Message {
    from: string;
    to: string;
    dateSent: string;
    body: string;
}

export function sendTextMessage(from: string, to: string, body: string): Promise<MessageInstance> {
    return client.messages.create({
        from,
        to,
        body,
    });
}

export function getReceivedMessages(phoneNumber: string): Promise<Message[]> {
    return client.messages.list({ to: phoneNumber })
        .then((messages: MessageInstance[]) => {
            return messages.map((message) => ({
                from: message.from,
                to: message.to,
                dateSent: message.dateSent.toISOString(),
                body: message.body,
            }));
        });
}
