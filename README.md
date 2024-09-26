# Movie App
[Live Demo](http://jinrup-movie.vercel.app)

## Project Overview

Movie App is an application that allows users to easily find and manage movies.

## Features

- Google Sign-In: Quick and secure user authentication
- Watchlist: Users can create and manage their own viewing plans
- Movie Search: search functionality to help users find movies of interest
- Movie Sorting: Sort movies based on different criteria for easy browsing and selection
- TMDB Integration: Access to a vast database of movies, including details, ratings, and more

## Tech Stack
- [Next.js](https://nextjs.org/): React framework for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid design and development
- [Shadcn/ui](https://ui.shadcn.com/): Beautifully designed components that you can copy and paste into your apps
- [Firebase](https://firebase.google.com/): For backend services, including authentication and watchlist
- [The Movie Database (TMDB)](https://www.themoviedb.org/): For fetching movie data and information

## Installation and Setup

```
git clone https://github.com/tommm2/movie-app.git
cd movie-app
npm install
```


Set up environment variables:
Create a `.env` file and add the necessary Firebase configuration information and your TMDB API key:

```
# this should not be exposed to browser
TMDB_API_KEY=

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```
