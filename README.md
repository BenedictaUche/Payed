# Payed

A modern, secure, and user-friendly banking application built with Next.js, Firebase, and TailwindCSS. This application provides various banking services including savings accounts, investments, loans, and real-time transactions.

## Features

- **User Authentication**
  - Secure login and registration
  - Two-factor authentication
  - Password reset functionality

- **Account Management**
  - Multiple account types (Savings, Current, Investment)
  - Real-time balance updates
  - Transaction history
  - Account statements

- **Banking Services**
  - Fund transfers
  - Bill payments
  - Mobile top-up
  - Loan applications
  - Investment portfolios
  - Card management

- **Security Features**
  - End-to-end encryption
  - Session management
  - Activity monitoring
  - Secure password storage

##  Technologies Used

- **Frontend**
  - Next.js 15 (App routing)
  - TailwindCSS
  - Shadcn/ui
  - TypeScript

- **Backend & Database**
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Storage

- **Additional Tools**
  - React Hook Form
  - Recharts (for analytics)
  - Zod (for validation)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/BenedictaUche/Payed.git
   cd Payed
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── user/
│       ├── deposit/
│       ├── investment/
│       ├── loans/
│       ├── my-card/
│       ├── transaction/
│       ├── transfer/
│       └── user-info/
├── components/
│   ├── auth/
│   │   ├── GetAuth.tsx
│   │   └── GetUser.tsx
│   ├── navigation/
│   │   ├── MobileNav.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       └── Loader.tsx
├── lib/
│   └── firebase.ts
└── styles/
    └── globals.css
```

## Security

- All sensitive data is encrypted
- Regular security audits are performed
- Implements rate limiting
- Uses secure session management
- Input validation and sanitization

## 🤝 Contributing
Contributions will begin once the project is stable and the community is established. For now, please reach out to me directly.

<!-- 1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

<!-- ## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. -->
