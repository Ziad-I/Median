# Median

**Median** is a web platform designed for sharing and discovering articles. Built with a modern stack, it offers a smooth user experience for writing, editing, and interacting with content. Users can engage with the platform through features like article publishing, commenting, following other users, and more.

## Tech Stack

- **Backend:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Frontend:** Next.js with ShadCN UI components
- **Image Uploads:** Cloudinary
- **Email Service:** Mailtrap for sending transactional emails
- **Authentication:** Access and Refresh tokens for secure user sessions

## Features

### User Authentication
- Sign up and log in using email/password.
- Token-based authentication (access and refresh tokens).

### Article Management
- Users can post articles with **Markdown** support.
- Edit or delete articles.
- Comment on articles (Markdown supported), with the ability to edit or delete comments.

### User Dashboard
- View user-specific statistics including:
  - Total articles and comments.
  - Total followers and followings.
- View recent activity: articles, comments, followers.
- Manage profile settings (bio, avatar, name, and password).

### User Profiles
- View other users' profiles, including:
  - Their recent articles and comments.
  - List of followers and followings.
- Follow and unfollow users.

### Article Browsing
- View all articles.
- Filter articles by name or tags.
- Pagination support for browsing articles.

### Password Reset (Backend)
- Supports password reset functionality via email with reset tokens.
- Frontend implementation is pending.

### Dark Mode
- Supports dark mode for a better user experience.

## Project Structure

The project is divided into two separate directories for the frontend and backend.

- **Frontend**: Located in the `frontend` directory.
- **Backend**: Located in the `backend` directory.

## Environment Variables

Both the frontend and backend require separate environment files to configure necessary variables.

### Frontend (`frontend/.env`)

```
NODE_ENV
NEXT_PUBLIC_BACKEND_PORT
NEXT_PUBLIC_BACKEND_URL
NEXT_PUBLIC_FRONTEND_PORT
NEXT_PUBLIC_FRONTEND_URL
```

### Backend (`backend/.env`)

```
NODE_ENV
BACKEND_PORT
BACKEND_URL
FRONTEND_PORT
FRONTEND_URL
MONGODB_URI
CLOUDINARY_URL
MAILTRAP_HOST
MAILTRAP_PORT
MAILTRAP_USERNAME
MAILTRAP_PASSWORD
ACCESS_TOKEN_SECRET
ACCESS_TOKEN_EXPIRATION_TIME
REFRESH_TOKEN_SECRET
REFRESH_TOKEN_EXPIRATION_TIME
RESET_PASSWORD_TOKEN_SECRET
RESET_PASSWORD_TOKEN_EXPIRATION_TIME
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create the `.env` file based on the variables listed above.

4. Run the backend:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create the `.env` file based on the variables listed above.

4. Run the frontend:
   ```
   npm run dev
   ```

5. Open the app in your browser using the frontend URL.

## To-Do
- [ ] Remove fetching simulation functions in the frontend.
- [ ] Implement frontend for password reset flow.
- [ ] Optimize image handling (e.g., lazy loading or compression).
- [ ] Improve user notifications (e.g., for new comments, followers).
- [ ] Improve unit and integration testing coverage.
- [ ] Enhance security features (e.g., rate limiting, brute-force protection).
- [ ] Implement article and comment reactions (like/dislike).
