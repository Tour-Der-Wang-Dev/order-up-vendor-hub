
# OrderUp Vendor Hub

OrderUp Vendor Hub is a comprehensive restaurant management system that allows restaurant owners to manage their menus, track orders, view analytics, and update their profiles all in one place.

![OrderUp Logo](/lovable-uploads/90494f25-3cb7-4324-84b1-ae6a73fe364b.png)

## Features

- 🔐 **Authentication** - Secure login for restaurant owners
- 📊 **Dashboard** - Overview of key metrics and recent orders
- 🍲 **Menu Management** - Add, edit, and organize menu items
- 📋 **Order Management** - Track and update order status
- 📈 **Analytics** - Sales reports and performance metrics
- 👤 **Profile Management** - Update restaurant details and settings
- ⚙️ **Settings** - Configure notifications, payment information, and more

## Technologies Used

- **Frontend**:
  - React 18 with TypeScript
  - Vite for fast development and optimized builds
  - React Router for navigation
  - Tailwind CSS for styling
  - Shadcn UI component library
  - Lucide React for icons
  - Recharts for data visualization

- **Backend**:
  - Supabase for authentication, database, and storage
  - Tanstack React Query for data fetching and state management

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or bun

### Environment Setup

1. Clone the repository:
```sh
git clone <repository-url>
cd orderup-vendor-hub
```

2. Install the dependencies:
```sh
npm install
# or
bun install
```

3. Create a `.env` file in the project root with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```sh
npm run dev
# or
bun run dev
```

5. Open your browser and go to `http://localhost:8080`

## Building for Production

```sh
npm run build
# or
bun run build
```

The build output will be in the `dist` folder.

## Deployment

This project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages. The only requirement is to set up the environment variables for Supabase.

## Project Structure

- `/src`: Source code
  - `/components`: Reusable UI components
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions and configurations
  - `/pages`: Page components
  - `/components/ui`: Shadcn UI components

## Contributing

We welcome contributions to the OrderUp Vendor Hub project! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests to ensure everything works
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Document your code with comments
- Write meaningful commit messages

### Bug Reports

If you find a bug, please create an issue with the following information:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Environment information (browser, OS, etc.)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
