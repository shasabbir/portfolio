// Simple MongoDB connection test
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔄 Testing MongoDB Connection...');
console.log('URI (partial):', MONGODB_URI ? MONGODB_URI.substring(0, 50) + '...' : 'NOT FOUND');

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function testConnection() {
  try {
    console.log('🔌 Attempting to connect...');
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
    });
    
    console.log('✅ MongoDB connection successful!');
    
    // Test a simple operation
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection', date: new Date() });
    console.log('✅ Write test successful!');
    
    await testCollection.deleteOne({ test: 'connection' });
    console.log('✅ Delete test successful!');
    
    console.log('🎉 All MongoDB tests passed!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    
    // Provide specific guidance
    if (error.message.includes('authentication')) {
      console.log('\n💡 SOLUTION: Authentication failed');
      console.log('- Check your username and password in the connection string');
      console.log('- Make sure the user exists in MongoDB Atlas');
      console.log('- Verify the password is correct (no special characters issues)');
    } else if (error.message.includes('network')) {
      console.log('\n💡 SOLUTION: Network connection issue');
      console.log('- Check your internet connection');
      console.log('- Verify IP whitelist in MongoDB Atlas (should include 0.0.0.0/0)');
      console.log('- Make sure your cluster is running (not paused)');
    } else if (error.message.includes('timeout')) {
      console.log('\n💡 SOLUTION: Connection timeout');
      console.log('- Your cluster might be paused (free tier auto-pauses)');
      console.log('- Check MongoDB Atlas dashboard');
      console.log('- Try again in a few minutes');
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

testConnection();