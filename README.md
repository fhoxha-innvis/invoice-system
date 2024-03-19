# Invoice Management Application

Welcome to the Invoice Management Application, a React and Gatsby-powered web application designed for invoice management. This application provides an intuitive interface for viewing, adding, editing, and deleting invoices, items, and users, catering to businesses looking for an efficient way to manage their billing and user data.

## Getting Started

Follow these instructions to get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version)
- npm (comes with Node.js)

### Installation

Clone the repository to your local machine:

```sh
git clone https://github.com/fhoxha-innvis/invoice-system.git
```

Navigate to the application's directory:

```sh
cd invoice-system
```

Install the necessary dependencies:

```sh
npm install
```

### Running the Application

The application consists of a front-end created with React and Gatsby and a back-end Express server that handles data operations. You need to start both to fully utilize the app's functionalities.

#### Starting the Gatsby Development Server

Open a terminal and run the following command to start the Gatsby server:

```sh
gatsby develop
```

This command serves your application at `http://localhost:8000`.

#### Starting the Express Back-End Server

In a new terminal window or tab, start the back-end server with:

```sh
node server.js
```

This starts the server responsible for handling requests to add, edit, delete, and retrieve invoices, items, and user data.

### Features

- **View Invoices/Items/Users**: Browse through a list of invoices, items, and user profiles.
- **Add New Entries**: Easily add new invoices, items, or users through a user-friendly interface.
- **Edit Existing Entries**: Update details of existing invoices, items, or users as required.
- **Delete Entries**: Remove invoices, items, or users from the system.

### Accessing the Application

With both servers running, visit `http://localhost:8000` in your web browser to start managing your invoices, items, and users.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
