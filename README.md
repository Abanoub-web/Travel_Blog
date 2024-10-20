# Travel Blog App

This project is a Travel Blog application built with React, focusing on sharing travel experiences in Egypt.

## Project Structure

The project follows a standard React application structure with additional folders for components, styles, and data management.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Features

- User authentication (signup, login, logout)
- Blog post creation and viewing
- User dashboard
- About section
- Contact form

## Technologies Used

- React
- React Router for navigation
- CSS for styling
- Local Storage for data persistence

## Components

- `About`: Displays information about the travel blog
- `Blog`: Shows all blog posts
- `BlogPostForm`: Form for creating new blog posts
- `ContactUs`: Contact form for users
- `Footer`: App footer with navigation links
- `HomePage`: Main page of the application
- `LoginPage`: User login form
- `NavBar`: Navigation bar component
- `ProtectedRoute`: Route protection for authenticated users
- `SignupForm`: User registration form
- `UserDashboard`: Displays user information and their posts

## Styling

Each component has its own CSS file in the `styles` folder for modular and maintainable styling.

## Data Management

The application uses Local Storage to persist data, including user information and blog posts.

## Future Improvements

- Implement a backend server for data management
- Add image upload functionality
- Implement comment system for blog posts
- Add search and filter functionality for blog posts

## Contributing

Contributions to improve the Travel Blog app are welcome. Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## File Structure Tree

DEPITravelBlog/
├── public/
│   ├── data.json
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPostForm.jsx
│   │   ├── ContactUs.jsx
│   │   ├── Footer.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NavBar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SignupForm.jsx
│   │   └── UserDashboard.jsx
│   ├── store/
│   │   └── AuthContext.js
│   ├── styles/
│   │   ├── About.css
│   │   ├── Blog.css
│   │   ├── BlogPostForm.css
│   │   ├── ContactUs.css
│   │   ├── Footer.css
│   │   ├── LoginPage.css
│   │   ├── NavBar.css
│   │   ├── SignupForm.css
│   │   └── UserDashboard.css
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── data.json
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
└── README.md