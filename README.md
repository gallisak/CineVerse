# Cineverse — Interactive Movie Booking App

**Cineverse** is a modern, full-stack web application for browsing movies and booking tickets in real-time. The project demonstrates advanced state management, interactive UI animations, and seamless backend integration.

## Tech Stack

- **Frontend:** React (Vite), TypeScript
- **State Management:** Redux Toolkit, RTK Query
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Firebase (Firestore Database, Authentication)
- **Routing:** React Router DOM

## Key Features

### 1. User Authentication

- Secure **Login and Registration** via Firebase Auth.
- **Protected Routes:** Only authenticated users can access the booking system and profile page.
- Persistent user sessions.

### 2. Smart Booking System

- **Interactive Cinema Hall:** Visual representation of seats with dynamic states (Available, Selected, Occupied).
- **Real-time Synchronization:** Occupied seats are updated instantly across all devices using RTK Query tags.
- **Conflict Prevention:** Prevents double-booking of the same seat.

### 3. User Profile & History

- **Order History:** Users can view their purchased tickets in a dedicated Profile page.
- Detailed ticket information including movie title, seat numbers, total price, and purchase date.

### 4. Immersive UI/UX

- Smooth page transitions and layout animations using **Framer Motion**.
- Responsive "Dark Neon" design tailored for a cinematic experience.

## Installation & Setup

Follow these steps to run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gallisak/cineverse.git
    cd cineverse
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Firebase configuration:

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Key Learnings

Building this project helped me master:

- **Full-Stack Logic:** Connecting a React Frontend with a Firebase NoSQL database.
- **Advanced Redux:** Using **RTK Query** for caching, optimistic updates, and managing server state.
- **Complex UI State:** Handling seat selection logic and syncing it with the backend.
- **Animation Libraries:** Using Framer Motion for `layoutId` transitions and micro-interactions.

## Contact

**Created by:** gallisak

- **Email:** [agalchisak@gmail.com](mailto:agalchisak@gmail.com)
