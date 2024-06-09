// Import necessary modules and dependencies
import connectToDatabase from '../../../lib/mongodb'; // Import MongoDB connection function
import User from '../../../models/User'; // Import User model
import PDFDocument from 'pdfkit'; // Import PDFKit for creating PDF documents

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

  // Handle GET request
  if (req.method === 'GET') {
    try {
      // Find all users in the database and exclude _id and __v fields
      const users = await User.find({}).select('-_id -__v');
      if (!users) {
        return res.status(404).json({ message: 'Users not found' });
      }

      // Create a new PDF document
      const doc = new PDFDocument();
      const buffers = [];

      // Event listeners for PDF document
      doc.on('data', buffers.push.bind(buffers)); // Push buffer data to array
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers); // Concatenate buffer data
        const pdfBase64 = pdfData.toString('base64'); // Convert buffer data to base64 string
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ pdfBase64 }); // Send response with PDF data
      });

      // Add content to the PDF document
      doc.fontSize(16).text('Users Detail', { align: 'center' }).moveDown(); // Add title
      let i = 1;
      users.forEach(user => {
        // Loop through each user and add details to PDF
        doc.fontSize(16).text(`${i}. User Details`, { align: 'left' }).moveDown(); // User number
        doc.fontSize(12).text(`Name: ${user.name}`).moveDown(); // User name
        doc.text(`Email: ${user.email}`).moveDown(); // User email
        doc.text(`Mobile Number: ${user.mobileNumber}`).moveDown(); // User mobile number
        doc.text(`Address: ${user.address}`).moveDown(); // User address
        doc.moveDown();
        i++;
      });

      doc.end(); // End the PDF document
    } catch (err) {
      // Handle errors
      res.status(500).json({ error: err.message }); // Return error response
    }
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['GET']); // Set allowed HTTP methods in response header
    res.status(405).end(`Method ${req.method} Not Allowed`); // Return method not allowed error
  }
}

export default handler; // Export the handler function
