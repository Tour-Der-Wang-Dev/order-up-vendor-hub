
# Project Files Explainer

This document provides an overview of all files in the project with their purpose and importance level.

## Importance Level Legend
- 🟢 - Core file (heavily imported/referenced)
- 💛 - Important but not critical (moderately imported/referenced)
- 🔴 - Supporting file (minimally imported/referenced)

## Project Structure

### Root
- `README.md` 🟢 - Project documentation and setup instructions
- `vite.config.ts` 🟢 - Configuration for Vite bundler and development server
- `tsconfig.json` 🟢 - TypeScript configuration for the project
- `tailwind.config.ts` 🟢 - Tailwind CSS configuration
- `postcss.config.js` 🔴 - PostCSS configuration for Tailwind and other CSS plugins
- `index.html` 🟢 - Entry point for the web application
- `components.json` 🟢 - Configuration for shadcn/ui components

### src/
- `main.tsx` 🟢 - Application entry point that bootstraps the React app
- `App.tsx` 🟢 - Main application component with routing configuration
- `index.css` 🟢 - Global CSS styles
- `vite-env.d.ts` 🔴 - Type declarations for Vite environment variables

### src/lib/
- `supabase.ts` 🟢 - Supabase client configuration and type definitions
- `utils.ts` 🟢 - Common utility functions used throughout the application

### src/hooks/
- `useAuth.tsx` 🟢 - Authentication context and hooks for user session management
- `useVendorProfile.tsx` 🟢 - Hook for managing vendor profile data
- `useRestaurantSettings.tsx` 🟢 - Hook for restaurant settings management
- `use-mobile.tsx` 💛 - Hook for detecting mobile devices
- `use-toast.ts` 💛 - Hook for displaying toast notifications

### src/components/layout/
- `AppLayout.tsx` 🟢 - Main application layout with navigation structure
- `AppHeader.tsx` 🟢 - Application header with notifications
- `AppSidebar.tsx` 🟢 - Sidebar navigation component

### src/components/ui/
- `sidebar.tsx` 🟢 - Sidebar component utility
- `toast.tsx` 🟢 - Toast notification component
- `toaster.tsx` 🟢 - Toaster provider component
- `tooltip.tsx` 💛 - Tooltip component
- `label.tsx` 💛 - Form label component
- `input.tsx` 🟢 - Input field component
- `button.tsx` 🟢 - Button component
- `hover-card.tsx` 🔴 - Hover card component
- `input-otp.tsx` 🔴 - One-time password input component
- `form.tsx` 🟢 - Form components with validation
- `alert.tsx` 💛 - Alert component for notifications
- `avatar.tsx` 💛 - User avatar component
- `badge.tsx` 💛 - Badge component
- `card.tsx` 🟢 - Card component for content containers
- `dropdown-menu.tsx` 🟢 - Dropdown menu component
- `checkbox.tsx` 💛 - Checkbox input component
- `sonner.tsx` 🟢 - Advanced toast notification provider

### src/components/dashboard/
- `StatCard.tsx` 🟢 - Statistics card component for dashboard
- `SalesChart.tsx` 🟢 - Sales chart visualization component
- `RecentOrdersTable.tsx` 🟢 - Table showing recent orders

### src/components/profile/
- `VendorProfileForm.tsx` 🟢 - Form for managing vendor profile information
- `TimeInput.tsx` 💛 - Time input component for business hours

### src/components/menu/
- `MenuItem.tsx` 🟢 - Menu item component
- `MenuItemDialog.tsx` 🟢 - Dialog for editing menu items

### src/components/orders/
- `OrderItem.tsx` 🟢 - Order item component
- `OrdersFilter.tsx` 🟢 - Filter component for orders list

### src/pages/
- `Dashboard.tsx` 🟢 - Main dashboard page with statistics and recent orders
- `Login.tsx` 🟢 - User login page
- `Menu.tsx` 🟢 - Menu management page
- `Orders.tsx` 🟢 - Orders management page
- `OrderDetail.tsx` 🟢 - Order details page
- `Profile.tsx` 🟢 - Vendor profile management page
- `Settings.tsx` 🟢 - Application settings page
- `Analytics.tsx` 🟢 - Analytics and reporting page
- `NotFound.tsx` 🔴 - 404 error page
