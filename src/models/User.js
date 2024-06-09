import mongoose from 'mongoose';

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Add email format validation
    validate: {
      validator: function(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  mobileNumber: {
    type: String,
    required: true,
    // Add mobile number format validation
    validate: {
      validator: function(value) {
        return /^\d{10}$/.test(value);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  address: {
    type: String,
    required: true
  }
});



export default mongoose.models.User || mongoose.model('User', UserSchema);
