# English Kid Adventure

The robust Backend API for the English Kid Adventure platform, built with Node.js, Express, and a scalable modular architecture.

## 📦 Tech Stack

- **Express.js** (v5.2.1) - Fast, unopinionated, minimalist web framework for Node.js
- **TypeScript** (v5.9.3) - Static typing for code reliability and better developer experience
- **Prisma** (v7.2.0) - Next-generation ORM for type-safe database access (PostgreSQL/MariaDB)
- **PostgreSQL/MariaDB** - Reliable relational databases for storing application data
- **Redis (ioredis)** (v5.8.2) - High-performance in-memory data store for caching and rate limiting
- **Zod** (v4.2.0) - TypeScript-first schema declaration and validation library
- **JWT** (v9.0.3) - Secure claims representation between two parties (Authentication)
- **Bcrypt** (v6.0.0) - Password hashing library for security
- **Swagger UI** (v5.0.1) - Interactive API documentation
- **Husky & Commitlint** - Git hooks for consistent commits and code quality

## 📂 Project Structure

The backend follows a Modular Architecture combined with the Repository Pattern to separate concerns and ensure testability.

```
src/
├── common/                    # Shared logic across all modules
│   ├── config/               # Infrastructure config (Prisma, Redis)
│   ├── constants/            # Global constants (global.ts)
│   ├── middlewares/          # Security & processing (Auth, Error, RateLimit, Validate)
│   └── utils/                # Standardized helper functions (Response helper)
├── docs/                     # API Documentation
│   └── swagger.json          # OpenAPI/Swagger definition file
├── modules/                  # Feature-based business logic (The core)
│   ├── auth/                 # Authentication logic (Login, Register, Tokens)
│   ├── topics/               # Topic & Lesson management
│   ├── users/                # User management and profile logic
│   └── [feature]/            # Each module contains:
│       ├── [name].controller.ts  # Request handling & Validation
│       ├── [name].service.ts     # Business logic layer
│       ├── [name].repository.ts  # Data access layer (Prisma calls)
│       ├── [name].route.ts       # API endpoint definitions
│       ├── [name].schema.ts      # Zod validation schemas
│       ├── [name].constant.ts    # Module-specific constants
│       └── [name].type.ts        # Module-specific TypeScript types
├── index.ts                  # Application entry point & Server setup
└── .env                      # Environment variables (DB URL, JWT Secret, etc.)
```

## 🚀 Getting Started

### 1. Installation

Install the project dependencies:

```bash
npm install
```

### 2. Database Setup

Configure your `.env` file with your database credentials, then run:

```bash
# Push schema and create migrations
npm run db:migrate

# Generate Prisma Client
npm run db:update

# (Optional) Seed initial data
npm run db:seed
```

### 3. Development

Start the server in development mode with hot-reload:

```bash
npm run dev
```

### 4. Database Management

To view and edit your data in a GUI:

```bash
npm run db:studio
```

## 🛠 Project Tools & Scripts

### Code Quality:
- `npm run lint` - Run ESLint to find code issues
- `npm run format` - Auto-format code using Prettier

### Database:
- `npm run db:migrate` - Update database schema via Prisma
- `npm run db:studio` - Open Prisma's visual database editor

### Automation:
Husky is configured to run linting on every commit to ensure only high-quality code reaches the repository.

## 📄 API Documentation

Once the server is running, you can access the interactive API documentation at:

```
http://localhost:[PORT]/api-docs
```

(as defined in `src/docs/swagger.json`)
