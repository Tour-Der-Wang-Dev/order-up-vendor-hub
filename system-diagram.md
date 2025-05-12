
# System Architecture Diagram

```mermaid
graph TD
    subgraph "Frontend"
        App[App.tsx]
        Auth[Authentication Context]
        
        subgraph "Pages"
            Dashboard[Dashboard]
            Orders[Orders Management]
            OrderDetail[Order Detail]
            Menu[Menu Management]
            Analytics[Analytics]
            Profile[Profile]
            Settings[Settings]
            Login[Login Page]
        end
        
        subgraph "Components"
            Layout[Layout Components]
            UI[UI Components]
            FormComponents[Form Components]
            DataDisplay[Data Display Components]
        end
        
        subgraph "State Management"
            QueryClient[TanStack Query Client]
            Hooks[Custom Hooks]
        end
    end
    
    subgraph "Backend (Supabase)"
        SupabaseClient[Supabase Client]
        
        subgraph "Services"
            Auth_Service[Authentication]
            Database[PostgreSQL Database]
            Storage[File Storage]
        end
        
        subgraph "Database Tables"
            Vendors[Vendors]
            MenuItems[Menu Items]
            Orders_Table[Orders]
            BankAccounts[Bank Accounts]
            RestaurantSettings[Restaurant Settings]
        end
    end
    
    App --> Auth
    App --> Pages
    
    Pages --> Components
    Pages --> State Management
    
    State Management --> SupabaseClient
    
    SupabaseClient --> Services
    
    Auth --> Auth_Service
    
    Hooks --> Database
    Hooks --> Auth_Service
    Hooks --> Storage
    
    Database --> Database Tables
    
    %% Connection flows
    Dashboard --> QueryClient
    Orders --> QueryClient
    Menu --> QueryClient
    Profile --> QueryClient
    Settings --> QueryClient
    
    QueryClient --> SupabaseClient
```

## Core Components

### Frontend

- **App (App.tsx)**: Main application component with routing and layout
- **Authentication Context**: Manages user session and authentication state
- **Pages**: Main views of the application
- **Components**: Reusable UI components
- **State Management**: Data fetching and state management with TanStack Query and custom hooks

### Backend (Supabase)

- **Supabase Client**: Interface to connect with Supabase services
- **Authentication Service**: Handles user authentication and session management
- **Database**: PostgreSQL database for storing application data
- **Storage**: File storage for images and assets

### Database Schema

- **Vendors**: Restaurant information and profiles
- **Menu Items**: Food items with details, prices, and availability
- **Orders**: Customer orders with status tracking
- **Bank Accounts**: Payment information for vendors
- **Restaurant Settings**: Operational settings for the restaurant

### Data Flow

1. User authenticates through the Login page
2. Authentication context manages the user session
3. Pages fetch data from Supabase using custom hooks and TanStack Query
4. User actions trigger mutations that update the database
5. Real-time updates and notifications keep the UI in sync with the database

### External Services

- **Supabase Authentication**: Handles user login and session management
- **Supabase Database**: Stores all application data
- **Supabase Storage**: Manages file uploads and image storage
