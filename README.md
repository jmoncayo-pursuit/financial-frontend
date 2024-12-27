# Financial Tracking Frontend

React-based frontend for the Financial Tracking Application. Provides user interface for account management and financial tracking features.

## Tech Stack

- React.js
- Vite
- React Router
- Axios
- Bootstrap

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- Backend API running ([financial-backend](https://github.com/jmoncayo-pursuit/financial-backend))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jmoncayo-pursuit/financial-frontend.git
cd financial-frontend
```

2. Install dependencies:

```bash
npm install
```

## Available Scripts

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

### Authentication

- User signup
- User login

### Components

#### NavBar

- Navigation menu

#### SignUpForm

- User registration form

#### LoginForm

- User login form

## API Integration

The frontend connects to the [financial-backend](https://github.com/jmoncayo-pursuit/financial-backend) API. Key endpoints:

### Authentication Endpoints

```javascript
POST / api / signup;
POST / api / login;
```
