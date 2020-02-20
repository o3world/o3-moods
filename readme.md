# O3 Moods

O3 Moods is a Node.js Express web application that uses the [IBM Watson Personality Insights API](https://www.ibm.com/watson/developercloud/personality-insights.html) to analyze tweets in order to gain personality insights that are used to determine a user's mood and return a color representing that mood. If the Phillips Hue Bridge is set up with the [Meet Hue Developer API](http://www.developers.meethue.com/), the bulbs will then dim to the color representing the mood.

#
![screenshot of project main page](/public/images/demo-screenshot.jpg)

## Live Demo

http://moods.o3labs.com/

## O3 Moods is a O3 Labs project. More information about O3 Labs is available here:

http://o3world.com/work/labs/

## O3 Moods is an O3 World Venture

http://o3world.com/

## Local Setup

Install the Heroku CLI.

```
brew install heroku
```

Clone the repo and navigate into it.

```
git clone https://github.com/o3world/o3-moods.git
cd o3-moods
```

Install and activate Node v6.6.0, preferably using [nvm](https://github.com/creationix/nvm). Once it is installed, you can run `nvm use` to activate it.

```
nvm install
```

Install the Node dependencies.

```
npm install
```

Set up your Watson Personality Insights, Twitter API and Meet Hue Developer API credentials as environment variables in your `.env` file. You can use the included `.env.example` file as a base. See further below for more details on the Watson Personality Insights, Twitter API and Meet Hue Developer API. For the Phillips Meet Hue Developer API, you will also need a public IP address set as an environment variable.

***Make sure you specify the number of Phillips Hue Light Bulbs you are using in the `.env` file.***

Start the Express server.

```
heroku local web
```

Initialize gulp watch for css, js, and svg files

```
gulp watch
```

The app will now be available at http://localhost:5000

## Miscellaneous Information

### Hue Bridge Networking Configuration

Local IP Address: <Local IP Address>
Public IP Address: <Public IP Address>

### IBM Bluemix Platform

All Watson services are available via the IBM Bluemix platform. Credentials can be obtained within the service’s “Service Credentials” page in the dashboard.

**Console: https://console.ng.bluemix.net/**

### Twitter API

In order to read a user’s twitter feed, the Coffee Personality app will need to access the Twitter API via OAuth authorization. Credentials can be obtained within the authorized app’s “Keys and Access Tokens” page.

**Console: https://apps.twitter.com/**

### Meet Hue Developer API

The API for interacting with the Philips Hue Bridge is located here:
http://www.developers.meethue.com/
