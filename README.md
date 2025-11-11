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
git clone <repository-url>
cd react-account-manager
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

## Future Enhancements

- Password strength validation
- Email verification for registration
- Password reset functionality
- Profile picture upload
- Backend API integration
- JWT authentication
- Role-based access control

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
