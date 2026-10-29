# Vrije Opdracht

A Next.js web app with account registration, login, password reset and a user dashboard, backed by [PocketBase](https://pocketbase.io). Made as a free-choice school assignment ("vrije opdracht") to practise authentication with a real backend, and packaged with Docker.

## Features

- Register, log in and request a password reset (`app/(auth)/`)
- User area with a dashboard (`app/(user)/`)
- Loading states on every page
- UI built with Tailwind CSS and shadcn/ui components

## Stack

- Next.js 14 (App Router), React 18
- Tailwind CSS, shadcn/ui, lucide-react
- PocketBase for users and auth (SQLite database in `pb_data/`, schema changes in `pb_migrations/`)
- Docker

## Running it locally

The app talks to PocketBase on `http://127.0.0.1:8090`, so start that first.

1. Start PocketBase. The binary in this repo is for macOS on Apple Silicon. On another system, download the right one from the [PocketBase releases](https://github.com/pocketbase/pocketbase/releases) (v0.22) and put it in the project folder.

   ```bash
   ./pocketbase serve
   ```

   The admin panel is at http://127.0.0.1:8090/_/.

2. In a second terminal, start Next.js:

   ```bash
   npm install
   npm run dev
   ```

   Open http://localhost:3000.

## Docker

```bash
docker build -t vrije-opdracht .
docker run -p 3000:3000 vrije-opdracht
```

The Dockerfile clones this repository, builds the app and downloads the Linux PocketBase binary.

## Project layout

```
app/(auth)/     login, register and forgot-password pages
app/(user)/     signed-in area and dashboard
components/     navbar and shadcn/ui components
pb_migrations/  PocketBase schema changes for the users collection
```
