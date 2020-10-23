# google-sheets-graphql

Read a Google Sheet with GraphQL NodeJS Server.

Requires creating credentials in gCloud Console and setting up .env like so:

```
GOOGLE_APPLICATION_CREDENTIALS=<PATH to YOUR CREDENTIALS.JSON>
SPREADSHEET_ID=<AN ID OF A SPREADSHEET>
```

And adding the email address from the credentials.json file to the spreadsheet id you are trying to access.

## Schema

While this will connect to any sheet, you need to modify the schema to support your sheet.

--- 

## Overview

These set up steps ar modified from [this URL](https://www.dundas.com/support/learning/documentation/connect-to-data/how-to/connecting-to-google-sheets)

Go to https://docs.google.com/spreadsheets/, sign in to your Google / Gmail account, and create a spreadsheets.

## Set up

### Developers Console project

You need to create or use an existing project in the [Google Developers Console](https://console.developers.google.com/project) as a first step.

Once signed in, you'll see a list of existing projects. Click _Create Project_ to create a new one.

### Enable the Drive and Sheets APIs

In the Developers Console's navigation menu, click on _APIs and Services_ and select _Library_.

Ensure the correct project is selected at the top of the page. Then search for and click _Google Drive API_ and _Enable._

Return to the library, then search for _Google Sheets API_ and click _Enable_.

### Service account credentials

From the main navigation menu, click _APIs and Services_ then _Credentials_. 

On the Credentials page, click _Create credentials_ and select the _Service_ account option.

Enter a name and role for your service account. 

Add a key to your service account. Click to edit the new service account, and then click _Add Key_. Choose a _JSON_ key type.

Download the certificate file and put it in this directory. Make sure it is named _credentials.json_ 

You will also need to save the service account email address. Copy and paste this from the service account details.

### Authorization

Now that the credentials have been generated, they must also be authorized to access the spreadsheet data. Sign into Google Sheets and open the spreadsheet that you want to connect to. Click the _Share_ button in the top right corner. Enter the Service account email address which you created above. Share this spreadsheet with the Service account email address.

You should be able to start the app and connect to the sheet using GraphQL

