
# WanderLust - Travel Listing Website

**WanderLust** is a simple travel listing website built with Node.js, Express, and MongoDB. The application allows users to browse, add, edit, and delete listings of different travel destinations with details such as title, description, price, and location.

## Features

- **Home Page:** A simple landing page to ensure the server is running.
- **Listing Page:** Displays a collection of travel listings with basic details.
- **Create New Listing:** A form to add new travel listings.
- **Show Page:** Detailed view of a single listing with all its information.
- **Edit Listing:** A form to update the details of an existing listing.
- **Delete Listing:** Functionality to remove a listing from the database.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/singhvishalrajput/WanderLust.git
   cd WanderLust
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   Ensure MongoDB is installed and running on your system. You can configure the MongoDB connection URL in the code (`MONGO_URL`).

   ```javascript
   const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";
   ```

4. **Start the application:**

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:8080`.

## Usage

1. **Home Page:**

   Access the home page to ensure the server is working correctly by navigating to `http://localhost:8080/`.

2. **Listing Page:**

   Browse all listings at `http://localhost:8080/listing`.

3. **Create New Listing:**

   Add a new listing by navigating to `http://localhost:8080/listing/new` and filling out the form.

4. **View Listing Details:**

   Click on any listing from the index page to view its details.

5. **Edit a Listing:**

   Click the "Edit" button on a listing's detail page to update its information.

6. **Delete a Listing:**

   Click the "Delete" button on a listing's detail page to remove it.

## Folder Structure

```
WanderLust/
│
├── models/
│   └── listing.js          # Mongoose schema for the listing
│
├── views/
│   ├── listings/
│   │   ├── index.ejs       # Page to list all listings
│   │   ├── new.ejs         # Form to create a new listing
│   │   ├── show.ejs        # Page to show details of a listing
│   │   └── edit.ejs        # Form to edit a listing
│   └── layouts/
│       └── boilerplate.ejs # Layout for the entire website
│
├── public/
│   └── css/
│       └── styles.css      # Styles for the website
│
├── app.js                  # Main server file
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Sample Data

The `app.js` file includes a list of sample travel destinations. Uncomment the `app.get("/testListing",...)` route and access `http://localhost:8080/testListing` to add sample data to your database.

## Dependencies

- **express:** Web framework for Node.js.
- **mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
- **ejs:** Embedded JavaScript templates.
- **method-override:** Allows the use of HTTP verbs like PUT or DELETE in places where the client doesn’t support it.
- **ejs-mate:** Layout manager for EJS templates.

## Contributing

Feel free to fork the project and make your changes. Pull requests are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**WanderLust** is a great starting point for building a more advanced travel listing platform. Customize it further according to your requirements! Happy coding!

---

