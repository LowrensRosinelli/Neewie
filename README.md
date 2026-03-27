# Neewie

Simple article/news platform built with HTML, CSS, JavaScript, and Supabase.

https://lowrensrosinelli.github.io/Neewie/

## What the project does

* Users can register and log in with email confirmation
* Authentication state is handled with Supabase
* Logged-in users can create articles
* All users can view articles on the homepage
* UI updates based on whether the user is logged in or not
* Articles are fetched from Supabase and rendered dynamically

## Features

* User authentication (register / login)
* Email confirmation
* Create articles (only when logged in)
* View articles (available to everyone)
* Auth-based navigation
* Simple loading states and error messages

## Tech used

* HTML
* CSS
* JavaScript
* Supabase (Auth + Database)

## Run locally

Open the project folder and run `index.html` in your browser.
Make sure to add your Supabase URL and anon key in the JS files.

## How it works

Supabase handles authentication and database storage.
When a user registers, they receive a confirmation email.
After logging in, they can create articles which are saved in the database.
The homepage fetches and displays all articles dynamically.

## Notes

* Logged-out users can only view articles
* Logged-in users can create articles
* Project is kept simple and built without frameworks
