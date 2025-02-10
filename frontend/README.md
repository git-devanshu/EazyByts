# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Functionalities :

1. Secure Authentication to access your data (Signup, Login and Reset Password)
2. Update the profile data any time using the integrated Content Management System
3. Responsive design that can be accessed through devices of various screen sizes
4. Dynamically add details in sections of portfolio such as :
    - profile details and profile photo
    - contacts
    - about
    - skills
    - education
    - experience
    - projects
    - blogs
5. Creates a publicly visible portfolio link which can be viewed by anyone without logging in but can be modified only by its authorized owner
6. Allow other uses to send messages through the portfolio website. An email is received if a message is sent by someone
7. Dynamically manage the portfolio content without developer intervention


Dependencies - Frontend :
1. @chakra-ui/icons
2. @chakra-ui/react
3. @emotion/react
4. @emotion/styled
5. axios
6. framer-motion
7. react-router-dom
8. react-hot-toast

Dependencies - Backend :
1. bcrypt
2. bcryptjs
3. express
4. mongoose
5. cors
6. nodemailer
7. jsonwebtoken
8. dotenv