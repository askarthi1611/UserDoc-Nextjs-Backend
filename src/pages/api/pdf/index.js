// Import necessary modules
import connectToDatabase from '../../../lib/mongodb'; // Import MongoDB connection function
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
  const { userId } = req.query; // Extract userId from request query

  // Handle POST request
  if (req.method === 'POST') {
    try {
      const user = req.body; // Extract user data from request body
      if (!user) {
        return res.status(404).json({ message: 'User not found' }); // Return error if user data is not provided
      }

      const doc = new PDFDocument(); // Create a new PDF document
      const buffers = []; // Array to store buffers of PDF data

      // Event listeners for PDF document
      doc.on('data', buffers.push.bind(buffers)); // Push buffer data to array
      doc.on('end', async () => {
        const pdfData = Buffer.concat(buffers); // Concatenate buffer data
        const pdfBase64 = pdfData.toString('base64'); // Convert buffer data to base64 string

        // Construct PDF metadata
        user.pdfBase64 = {
          data: 'data:application/pdf;base64,' + pdfBase64, // Base64 data URI for PDF
          user: `${user.name}_${user.mobileNumber}`, // User information for identification
          createtime: new Date().toISOString(), // Creation time of PDF
        };

        // Send response with PDF metadata
        res.status(200).json({ pdfBase64: user.pdfBase64 });
      });

      // Add content to the PDF document
      doc.fontSize(16).text('User Details', { align: 'center' }).moveDown();
      doc.fontSize(12).text(`Name: ${user.name}`).moveDown();
      doc.text(`Address: ${user.address}`).moveDown();
      doc.text(`Mobile Number: ${user.mobileNumber}`).moveDown();
      doc.text(`Email: ${user.email}`).moveDown();
      doc.end(); // End the PDF document
    } catch (err) {
      // Handle errors
      res.status(500).json({ error: err.message }); // Return error response
    }
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['POST']); // Set allowed HTTP methods in response header
    res.status(405).end(`Method ${req.method} Not Allowed`); // Return method not allowed error
  }
}

export default handler; // Export the handler function
