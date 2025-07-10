# Canada Access Hub - Government Services Directory

## Overview

This is a React-based web application called "Canada Access Hub" that serves as a comprehensive directory for Canadian government services and Ontario non-profit organizations. The application provides an organized interface for users to access various government services categorized into nine main areas: Taxes & Benefits, Pensions & Retirement, Employment & Social Development, Immigration & Citizenship, Health & Disability, Legal/Identification, Banking & Financial Services, Non-Profits, and General Government. Additionally, it features a dedicated Non-Profits tab with official directories and categorized Ontario non-profit organizations. Built with modern web technologies, it offers a responsive design with search functionality, favorites management, category filtering, and user feedback capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

### Project Structure
- **Monorepo Layout**: Client and server code in separate directories
- **Shared Schema**: Common database schema and validation logic in `/shared`
- **Client**: React frontend in `/client` directory
- **Server**: Express backend in `/server` directory

## Key Components

### Frontend Components
1. **CategoryCard**: Displays service categories with collapsible sections and search highlighting
2. **SearchBar**: Provides real-time search functionality across all services
3. **ContactForm**: Allows users to submit suggestions and feedback
4. **UI Components**: Comprehensive shadcn/ui component library for consistent design

### Backend Components
1. **Express Server**: Handles API routes and serves static files
2. **Storage Interface**: Abstracted data layer with in-memory fallback
3. **Route Registration**: Centralized route management system
4. **Vite Integration**: Development-time integration with Vite dev server

### Database Schema
- **Users Table**: Basic user authentication structure (id, username, password)
- **Extensible Design**: Schema designed to accommodate additional government service data

## Data Flow

1. **Client Requests**: React components make API calls using React Query
2. **API Processing**: Express server processes requests through registered routes
3. **Data Layer**: Storage interface abstracts database operations
4. **Response Handling**: Structured JSON responses with error handling
5. **State Management**: React Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **@radix-ui/***: Accessible UI primitives

### Development Tools
- **Vite**: Development server and build tool
- **TypeScript**: Type safety and development experience
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Production bundling for server code

### Service Links
The application includes curated links to official Canadian government services:
- **Tax Services**: CRA, income tax, GST/HST, payroll
- **Benefits**: EI, family benefits, disability benefits, dental care
- **Pensions**: CPP, OAS, public pensions
- **Other Services**: Health, immigration, jobs, business, and more

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **API Development**: Express server with automatic restart
- **Database**: Neon Database with environment-based configuration

### Production Build
- **Client Build**: Vite builds optimized React bundle to `/dist/public`
- **Server Build**: ESBuild bundles Express server to `/dist`
- **Database Migrations**: Drizzle migrations in `/migrations` directory

### Environment Configuration
- **Database Connection**: `DATABASE_URL` environment variable required
- **Build Scripts**: Separate development and production build processes
- **Static Serving**: Express serves built client files in production

### Key Features
1. **Responsive Design**: Works on desktop and mobile devices
2. **Search Functionality**: Real-time filtering of government services and non-profits across all categories
3. **Favorites Management**: Users can bookmark services using localStorage for quick access
4. **Streamlined Navigation**: Two main sections: All Services and Contact
5. **Enhanced Category Cards**: Expandable cards with comprehensive data - Police (54 services), Education (50+ institutions), Embassies (200+ diplomatic missions)
6. **Accordion Functionality**: Consistent one-section-open-at-a-time behavior across all category cards
7. **User Feedback**: Contact form for suggestions and improvements
8. **Accessibility**: Built with Radix UI for screen reader compatibility
9. **Performance**: Optimized builds and efficient caching strategies
10. **Comprehensive Categories**: Nine specialized categories covering all government services with detailed breakdowns
11. **Non-Profit Directory**: Official directories and categorized Ontario non-profit organizations
12. **Category Filtering**: Dropdown filter for quick navigation to specific non-profit categories