import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.body}>
      {/* Welcome Section */}
      <div className={styles.div_container}>
        <h1 className={styles.heading}>Welcome to the Next.js API Guide</h1>
        <p>
          This guide will help you set up and test your Next.js API routes using Postman. 
          Whether you're a beginner or an experienced developer, this step-by-step tutorial 
          will walk you through the process of creating, running, and testing your API endpoints.
        </p>
        <p>
          Let's get started by setting up your API routes and ensuring your Next.js server is running correctly. 
          Once that's done, we'll move on to using Postman to make requests to your API and test its functionality.
        </p>
      </div>

      {/* Existing Content */}
      <div className={styles.div_container}>
        <h1 className={styles.heading}>
          Connecting Next.js API Routes
        </h1>
        <p>
          Follow these steps to set up your Next.js API routes and test them
          using Postman.
        </p>
      </div>

      <div className={styles.div_container}>
        <h2 className={styles.heading}>1. Set up your Next.js API Route</h2>
        <p>
          Ensure your Next.js API routes are correctly set up to handle
          different HTTP methods like GET, POST, PUT, and DELETE.
        </p>
      </div>

      <div className={styles.div_container}>
        <h2 className={styles.heading}>2. Start Your Next.js Server</h2>
        <p>
          Ensure your Next.js application is running locally. Usually, this can
          be done with <code>npm run dev</code> or <code>yarn dev</code>.
        </p>
      </div>

      <div className={styles.div_container}>
        <h2 className={styles.heading}>3. Determine the API Endpoint</h2>
        <p>
          Determine the URL of your API endpoints. For example, if your API
          route is located at <code>pages/api/user.js</code>, the endpoint will
          be <code>https://userdoc-backend.onrender.com/api/user</code>
        </p>
      </div>

      <div className={styles.div_container}>
        <h2 className={styles.heading}>4. Set Up Postman Requests</h2>
        <p>
          Use Postman to create requests to your API routes. Below are examples
          of how to set up these requests.
        </p>
      </div>

      <div className={styles.div_container}>
        <h3 className={styles.heading}>GET Request to Fetch Users</h3>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong className={styles.strong}>URL:</strong>{" "}
            <code>https://userdoc-backend.onrender.com/api/users</code>
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>Method:</strong> GET
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>Headers:</strong> No additional
            headers are required.
          </li>
        </ul>
      </div>

      <div className={styles.div_container}>
        <h3 className={styles.heading}>GET Request to Fetch a Specific User</h3>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong className={styles.strong}>URL:</strong>{" "}
            <code>https://userdoc-backend.onrender.com/api/users/{"{userId}"}</code>
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>Method:</strong> GET
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>Headers:</strong> No additional
            headers are required.
          </li>
          <li className={styles.li}>
            Replace <code>{"{userId}"}</code> with the actual user ID.
          </li>
        </ul>
      </div>

      <div className={styles.div_container}>
        <h3 className={styles.heading}>POST Request to Create a User</h3>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong className={styles.strong}>URL:</strong>{" "}
            <code>https://userdoc-backend.onrender.com/api/users</code>
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>Method:</strong> POST
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>Headers:</strong>{" "}
            <code>Content-Type: application/json</code>
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>Body (raw JSON):</strong>
          </li>
        </ul>
      </div>
      <div className={styles.div_container}>
        <pre className={styles.pre}>
          <code>{`
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "mobileNumber": "1234567890",
  "address": "123 Main St, Anytown, USA"
  }
  `}</code>
        </pre>
      </div>
      <div className={styles.div_container}>
        <h3 className={styles.heading}>DELETE Request to Delete a User</h3>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong className={styles.strong}>URL:</strong>{" "}
            <code>https://userdoc-backend.onrender.com/api/users/{"{userId}"}</code>
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>Method:</strong> DELETE
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>Headers:</strong> No additional
            headers are required.
          </li>
          <li className={styles.li}>
            Replace <code>{"{userId}"}</code> with the actual user ID.
          </li>
        </ul>
      </div>

      <div className={styles.div_container}>
        <h2 className={styles.heading}>Description for Postman Requests</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <strong className={styles.strong}>GET /api/users:</strong> Retrieves
            all users from the database. If a <code>userId</code> is provided in
            the query parameters, retrieves the specific user with that ID.
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>POST /api/users:</strong> Creates
            a new user with the provided data (name, email, mobileNumber,
            address).
          </li>
          <li className={styles.li}>
            <strong className={styles.strong}>
              DELETE /api/users/{"{userId}"}:
            </strong>{" "}
            Deletes the user with the specified ID from the database.
          </li>
        </ul>
      </div>

      <p>
        By setting up your Next.js API routes and using Postman to send
        requests, you can effectively test and interact with your API. Make sure
        your Next.js server is running while making requests from Postman.
      </p>
    </div>
  );
}
