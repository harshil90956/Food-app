# Food App

The **Food App** is an online food delivery platform that allows users to browse various restaurants, order food, and have it delivered to their doorsteps. It features a fully functional admin panel for managing restaurants, orders, and users, while also offering a smooth and responsive frontend for customers to place orders.

Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this app provides a seamless experience for both customers and admins, with a focus on user-friendly interactions and scalability.

## Features

### **For Users (Frontend)**

- **Search and Filter**: Search for specific dishes or filter restaurants by cuisine, rating, or price range.
- **Order Food**: Select items, customize your order (if applicable), and add them to the cart.
- **Track Order Status**: Users can track the status of their orders in real-time, from preparation to delivery.
- **Order History**: View and manage past orders, repeat orders, or reorder from favorite restaurants.
- **User Authentication**: Users can create an account, log in, and manage their profile securely.
- **Responsive Design**: The frontend is fully responsive and optimized for both mobile and desktop users.

### **For Admins (Admin Panel)**

- **Restaurant Management**: Admins can add, update, and remove restaurants and their respective menus.
- **Order Management**: Admins can view and manage all orders placed on the platform, including order status and delivery details.
- **User Management**: Admins can manage user accounts, including suspending or removing users if needed.
- **Analytics Dashboard**: View reports and insights on orders, revenue, and customer behavior.
- **Authentication & Authorization**: Secure login for admins with JWT authentication and access control to the admin panel.

## Tech Stack

- **Frontend**: React.js, HTML, CSS, JavaScript  
  The frontend is built with **React.js**, providing dynamic interactions and a smooth user experience for both customers and admins.
  
- **Backend**: Node.js, Express.js  
  The backend is powered by **Node.js** with **Express.js** to handle requests, manage orders, and authenticate users and admins.

- **Database**: MongoDB  
  **MongoDB** is used for storing restaurant data, user information, orders, and other essential app data.

- **Authentication**: JWT, Bcrypt  
  **JWT (JSON Web Tokens)** is used for authenticating users and admins, while **Bcrypt** is used for securely hashing passwords.

- **Deployment**:  
  - **Frontend**: Hosted on **Render**  
  - **Admin Panel**: Hosted on **Render**  

## Live Demo

You can view the live demo of the Food App here:

- **Frontend (Customer Interface)**: [https://frontend-8jj4.onrender.com](https://frontend-8jj4.onrender.com)
- **Admin Panel**: [https://food-app-1-92yc.onrender.com](https://food-app-1-92yc.onrender.com)

## Features Breakdown

### 1. **User Features (Frontend)**


#### **Search and Filter**
- Users can search for specific dishes or restaurants and filter results based on cuisine type, price range, or ratings.
  
#### **Order Food**
- Users can select items from the menu, customize them (e.g., add extra toppings), and add them to their cart.
- The checkout process allows users to enter delivery information and confirm the order.

#### **Track Order Status**
- Real-time updates on order progress, from preparation to delivery, keep users informed.
  
#### **Order History**
- Users can view and manage past orders, reorder previous items, and track the status of past deliveries.

#### **User Authentication**
- Users can securely register, log in, and manage their profile, with features like password reset and account updates.

#### **Responsive UI**
- The interface is mobile-friendly, ensuring a great experience on both mobile and desktop devices.

### 2. **Admin Features (Admin Panel)**

#### **Restaurant Management**
- Admins can add, edit, or remove restaurants and menu items.
- The restaurant data includes name, description, images, and menu details.

#### **Order Management**
- Admins can view and manage all orders placed by customers, updating their status (e.g., "Preparing," "On the way," "Delivered").
- Orders can be tracked and details such as delivery address, total cost, and payment status are visible.

#### **User Management**
- Admins can view, suspend, or delete user accounts. Admins have full control over user data, including managing user roles.

#### **Analytics Dashboard**
- The dashboard provides useful insights and analytics on total orders, revenue, popular dishes, customer behavior, and more.
- Visualizations help admins track performance and make data-driven decisions.

#### **Admin Authentication & Authorization**
- The admin panel is protected by JWT authentication, and only authorized users with admin credentials can access the admin dashboard.
