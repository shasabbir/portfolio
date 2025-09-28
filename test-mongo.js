// Quick MongoDB connection test
// Run this to test your connection directly

import dbConnect from './src/lib/mongodb.js';

async function testConnection() {
  console.log('🔄 Testing MongoDB connection...');
  console.log('Connection string:', process.env.MONGODB_URI?.substring(0, 50) + '...');
  
  try {
    await dbConnect();
    console.log('✅ MongoDB connection successful!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(error.message);
    
    // Common error solutions
    if (error.message.includes('authentication')) {
      console.log('💡 Check your username and password in the connection string');
    }
    if (error.message.includes('network') || error.message.includes('timeout')) {
      console.log('💡 Check your network access settings in MongoDB Atlas');
      console.log('💡 Make sure IP 0.0.0.0/0 is whitelisted');
    }
    if (error.message.includes('URI')) {
      console.log('💡 Check your connection string format');
    }
  }
  
  process.exit(0);
}

testConnection();