# Collanborative Document Editor

A modern, high-performance real-time collaborative document editor featuring live multi-user editing, inline comments, document sharing, permission controls, and notification updates. Built with Next.js, Liveblocks, Lexical Editor, and Clerk Authentication, styled with Tailwind CSS in a clean white and pink theme.

## 🚀 Key Features

### 📄 Real-Time Document Collaboration
- **Simultaneous Multi-User Editing**: Powered by Liveblocks & Lexical Editor for conflict-free, real-time rich text editing.
- **Active Collaborator Presence**: Displays live avatars and active cursor positions of users currently in the document.
- **Auto-Saving**: Document title and content edits are saved dynamically with visual feedback.

### 🔒 Document Management & Access Control
- **Document Creation & Deletion**: Create blank documents instantly or remove existing projects with confirmation modals.
- **Role-Based Sharing**: Invite team members via email with explicit **Editor** (`can edit`) or **Viewer** (`can view`) permissions.
- **Permission Enforcement**: Dynamically toggles editability and title editing based on user role.

### 💬 Inline Comments & Discussion Threads
- **Threaded Discussions**: Highlight text in the editor to attach inline comments and discussion threads.
- **Resolved Comments**: Mark discussions as resolved or filter active feedback.

### 🔔 Notifications & Activity Feed
- **Live Notifications**: High-contrast notification bell highlighting unread document shares and mentions.
- **Activity Stream**: Preview incoming document access invitations and thread activities directly in the app header.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router & React Server Components)
- **Language**: [TypeScript](https://www.typescript.org/)
- **Real-Time Collaboration**: [Liveblocks](https://liveblocks.io/)
- **Rich Text Engine**: [Lexical Editor](https://lexical.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)

---

## ⚙️ Quick Start

### Prerequisites
- Node.js 18+ installed on your machine
- npm package manager

### 1. Installation

Install project dependencies:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory and add your credentials:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Liveblocks Real-Time Collaboration
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
```

### 3. Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🛠️ Build & Verification

To test and compile the production build:

```bash
npx tsc --noEmit
npm run build
```
