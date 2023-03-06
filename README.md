# Hedwig

Hedwig is a simple web application that allows users to send SMS messages using Twilio via a RESTful API. It is built using Node.js, TypeScript, and Docker.

## Prerequisites

Before building and running this application, you will need to have the following installed on your machine:

- Docker
- Node.js (version 14 or higher)
- npm package manager

You will also need a Twilio account and an SMS-capable phone number. You can sign up for a free Twilio account at https://www.twilio.com/try-twilio.

## Building and Running Hedwig

To build and run Hedwig, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the cloned repository's root directory.
3. Create a .env file in the root directory with the following contents:

```
PORT=8080
ENVIRONMENT=development
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

Replace `your_account_sid`, `your_auth_token`, and `your_twilio_phone_number` with your Twilio account SID, auth token, and SMS-capable phone number.

4. Run the following command to install the dependencies:

```shell
npm install
```

5. Build and run the application using the following command:
```shell
bash ./script/docker-run.sh
```

## Usage

### Sending messages

The REST API allows you to send SMS messages to a phone via an HTTP request. To do this, send a POST request to the `/send` endpoint with the following data:
- `token`: An arbitrary but whitelisted string of characters
- `message`: The message you want to send
- `phone`: The phone number of the recipient

Example:

```shell
curl -X POST \
  http://localhost:8080/send \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "abcdefg",
    "message": "Hello, World!",
    "phone": "+14155552671"
  }'
```

### Receiving messages

You can also receive messages by sent to a Twilio phone number by sending a POST request to the `/receive` endpoint. A token needs to be sent in the body.

Example:

```shell
curl -X GET \
  http://localhost:8080/receive \
  -H 'Content-Type: application/json' \
  -d '{
    "token": "abcdefg"
  }'
```

## Contributing

If you find a bug or would like to suggest a feature, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MPL-2.0 License. See [the specifications](https://www.mozilla.org/en-US/MPL/2.0/) for more information.