# HelpHub

![HelpHub Banner](https://github.com/anjanmandal/HelpHub/blob/main/Frontend/vite-project/src/assets/dashboard.png)

**HelpHub** is a modern, user-friendly platform that connects individuals seeking assistance with skilled professionals ready to offer their services. Whether you need help with a project, task, or any other assistance, HelpHub provides a seamless experience to create, bid, and communicate effectively.

---

## 📖 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [📸 Screenshots](#-screenshots)
- [🔧 Installation](#-installation)
- [📝 Usage](#-usage)
- [📄 API Documentation](#-api-documentation)

---

## 🚀 Features

- **User Authentication**: Secure registration and login using JWT.
- **Create Help Requests**: Users can create detailed help requests specifying the type of assistance needed.
- **Bidding System**: Professionals can bid on help requests, offering their services and pricing.
- **Chat & Conversations**: Real-time messaging between requesters and bidders using Socket.IO.
- **Bid Management**: Requesters can view, accept, or reject bids based on their needs.
- **Request Management**: Users can update, close, or delete their help requests.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
- **Notifications**: Users receive real-time notifications for important actions.

---

## 🛠️ Technologies Used

### **Frontend**

- **React**: JavaScript library for building user interfaces.
- **Material-UI (MUI)**: React UI framework for designing responsive interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: Declarative routing for React applications.
- **Socket.IO Client**: Real-time bidirectional event-based communication.

### **Backend**

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **Socket.IO**: Real-time engine for enabling bidirectional communication.
- **JSON Web Tokens (JWT)**: For secure user authentication.

---
## Dependencies

### Frontend

- **React** (`^18.0.0`): JavaScript library for building user interfaces.
- **@mui/material** (`^5.0.0`): Material Design components for React.
- **@mui/icons-material** (`^5.0.0`): Material Design icons for MUI.
- **axios** (`^1.0.0`): Promise-based HTTP client for the browser and Node.js.
- **react-router-dom** (`^6.0.0`): Declarative routing for React.
- **socket.io-client** (`^4.0.0`): Real-time bidirectional event-based communication library.
- **moment** (`^2.29.1`): Library for parsing, validating, manipulating, and formatting dates.
- **dotenv** (`^10.0.0`): Loads environment variables from `.env` file.

### Backend

- **express** (`^4.17.1`): Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose** (`^6.0.0`): Elegant MongoDB object modeling for Node.js.
- **bcryptjs** (`^2.4.3`): Library to hash passwords.
- **jsonwebtoken** (`^8.5.1`): JSON Web Token implementation.
- **express-validator** (`^6.12.1`): Express middleware for validation.
- **socket.io** (`^4.0.0`): Real-time communication library.
- **cors** (`^2.8.5`): Middleware for enabling CORS.
- **dotenv** (`^10.0.0`): Loads environment variables from `.env` file.
- **nodemon** (`^2.0.0`): Utility that automatically restarts the node application when file changes are detected.


## 📸 Screenshots

### **My Bids**

![Dashboard](https://github.com/anjanmandal/HelpHub/blob/main/Frontend/vite-project/src/assets/mybids.png)

### **Create Help Request**

![Create Help Request](https://github.com/anjanmandal/HelpHub/blob/main/Frontend/vite-project/src/assets/request.png)

### **Bidding Interface**

![Bidding Interface](https://github.com/anjanmandal/HelpHub/blob/main/Frontend/vite-project/src/assets/bid.png)

### **Chat Conversation**

![Chat Conversation](https://github.com/anjanmandal/HelpHub/blob/main/Frontend/vite-project/src/assets/chat.png)

---

## 🔧 Installation

Follow these steps to set up **HelpHub** locally on your machine.

### **Prerequisites**

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** instance (local or cloud-based like MongoDB Atlas)

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/helphub.git
cd helphub
