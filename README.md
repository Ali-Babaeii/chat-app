# Chat App

A real-time chat interface built as part of the Doodle Frontend Challenge.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS v4

## Features

- Real-time messages via polling every 5 seconds
- Optimistic message updates
- Responsive design
- Auto-scroll to latest message

## Getting Started

### 1. Start the backend
```bash
cd frontend-challenge-chat-api
docker compose up
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
cp .env.example .env.local
```

Or create `.env.local` manually:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_TOKEN=super-secret-doodle-token
```

### 4. Run the app
```bash
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001) in your browser.
