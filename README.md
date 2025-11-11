# React Account Manager

A React application that allows users to create and manage accounts with login, registration, and profile management functionality.

## Features

- **User Registration**: Create new accounts with email, password, name, and optional phone number
- **User Login**: Secure authentication with email and password
- **Profile Management**: View and edit user account information
- **Responsive Design**: Built with Bootstrap 5 for mobile-friendly interface
- **Data Persistence**: Uses localStorage for user data storage
- **Form Validation**: Client-side validation for all forms
- **Error Handling**: Graceful error handling with user-friendly messages

## Technologies Used

- **React 18.2.0** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **React Router DOM 6.8.1** - Client-side routing
- **Bootstrap 5.3.0** - CSS framework for styling
- **Vite** - Build tool and development server

## Project Structure

```
src/
├── components/          # Reusable components (if needed)
├── contexts/
│   └── AuthContext.tsx  # Authentication context and state management
├── pages/
│   ├── Login.tsx        # Login page component
│   ├── Register.tsx     # Registration page component
│   └── Profile.tsx      # Profile management page component
├── types/
│   └── User.ts          # TypeScript type definitions
├── App.tsx              # Main application component with routing
└── main.tsx             # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dhrupatel031205/CTN-React-Submission.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Application Flow

1. **Login Page** (`/login`): Existing users can sign in with their credentials
2. **Registration Page** (`/register`): New users can create an account
3. **Profile Page** (`/profile`): Authenticated users can view and edit their profile information

## Data Storage

The application uses browser's `localStorage` to persist user data:
- `users` - Array of all registered users
- `currentUser` - Currently logged-in user session

## Form Validation

### Registration Form
- First name and last name are required
- Valid email format is required
- Email must be unique
- Password must be at least 6 characters
- Password confirmation must match

### Login Form
- Email and password are required
- Credentials are validated against stored users

### Profile Edit Form
- First name and last name are required
- Valid email format is required
- Phone number is optional

## Security Considerations

- Passwords are stored in localStorage (for demo purposes only)
- In production, use secure authentication with backend API
- Input validation prevents basic injection attacks
- Session management through localStorage

## Error Handling

The application includes comprehensive error handling:
- Duplicate email registration
- Invalid login credentials
- Form validation errors
- Network and unexpected errors
- User-friendly error messages

## Deployment

### Vercel Deployment

This project is configured for easy deployment to Vercel. Follow these steps:

#### Prerequisites
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub, GitLab, or Bitbucket account (for automatic deployments)
- Your project pushed to a Git repository

#### Deployment Steps

1. **Push your code to a Git repository**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Log in to your Vercel account
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Vercel will automatically detect the settings from `vercel.json`
   - Click "Deploy"

3. **Deploy via Vercel CLI (Alternative)**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project root
   vercel
   ```

#### Deployment Configuration

The project includes a `vercel.json` file with optimal settings:
- **Build Command**: `npm run build:vercel` (uses Vite build directly to avoid TypeScript permission issues)
- **Output Directory**: `dist`
- **Framework**: Vite
- **Rewrites**: All routes redirect to `index.html` for SPA functionality

**Note**: The build uses `npm run build:vercel` which runs `vite build` directly to avoid TypeScript compiler permission issues that can occur in Vercel's environment.

#### Environment Variables (if needed)

If your application requires environment variables:
1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add your variables (e.g., `API_URL`, `NODE_ENV`)

#### Automatic Deployments

Once connected to Git, Vercel will automatically:
- Deploy on every push to your main branch
- Create preview URLs for pull requests
- Roll back to previous deployments if needed

#### Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

#### Troubleshooting

If deployment fails:
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify the build command works locally: `npm run build`
4. Check that `vercel.json` configuration is correct

#### Production Optimizations

The Vercel deployment includes:
- Automatic code splitting
- Asset optimization
- CDN distribution
- HTTPS by default
- Global edge network

## Future Enhancements

- Password strength validation
- Email verification for registration
- Password reset functionality
- Profile picture upload
- Backend API integration
- JWT authentication
- Role-based access control
