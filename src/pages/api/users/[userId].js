// Import necessary modules and dependencies
import connectToDatabase from '../../../lib/mongodb'; // Import MongoDB connection function
import User from '../../../models/User'; // Import User model

// CORS middleware to handle Cross-Origin Resource Sharing
export const cors = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
};

// Handler function for API route
async function handler(req, res) {
  // Check if CORS headers need to be set
  if (cors(req, res)) {
    return;
  }

  // Connect to MongoDB database
  await connectToDatabase();
  const { userId } = req.query;

  // Handle different HTTP methods
  if (req.method === 'GET') {
    try {
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user); // Return user data
    } catch (err) {
      res.status(500).json({ error: err.message }); // Return error response
    }
  } else if (req.method === 'PUT') {
    try {
      // Extract user data from request body
      const { name, email, mobileNumber, address } = req.body;

      // Validate required fields
      if (!name || !email || !mobileNumber || !address) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Update user by ID
      const user = await User.findByIdAndUpdate(userId, {
        name,
        email,
        mobileNumber,
        address,
      }, { new: true }); // Return updated user data

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user); // Return updated user data
    } catch (err) {
      res.status(500).json({ error: err.message }); // Return error response
    }
  } else if (req.method === 'DELETE') {
    try {
      // Delete user by ID
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted' }); // Return success message
    } catch (err) {
      res.status(500).json({ error: err.message }); // Return error response
    }
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']); // Set allowed HTTP methods in response header
    res.status(405).end(`Method ${req.method} Not Allowed`); // Return method not allowed error
  }
}

export default handler; // Export the handler function
