# Invenco Onboarding Portal Frontend

This is the frontend application for the Invenco Onboarding Portal, built with React, TypeScript, and Vite.

## Features

- Interactive onboarding workflow diagram
- Access management for company tools
- Organizational structure visualization
- Company policies overview
- Responsive design for all devices
- Dynamic content loading with Suspense
- Error boundaries for improved resilience

## Tech Stack

- React 19.1.0
- TypeScript
- Vite 6.x
- TailwindCSS 3.4
- React Router 6

## Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
frontend/
├── src/                  # Source files
│   ├── components/       # React components
│   │   ├── common/       # Shared components
│   │   ├── layout/       # Layout components
│   │   └── sections/     # Page sections
│   ├── constants/        # Application constants
│   ├── types/            # TypeScript definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Entry point
│   └── routes.tsx        # Route definitions
├── public/               # Static assets
└── index.html            # HTML entry point
```
