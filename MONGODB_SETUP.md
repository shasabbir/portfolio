# 📚 MongoDB Integration Guide for Portfolio

This guide will help you migrate from JSON file storage to MongoDB Atlas (cloud database) for your blog posts and publications.

## 🚀 Quick Start

### Step 1: Set Up MongoDB Atlas (Free)

1. **Create Account**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Click "Try Free" and sign up
   - Verify your email

2. **Create Database**
   - Choose "Build a database"
   - Select **M0 (FREE)** tier
   - Choose **AWS** provider
   - Select region closest to you
   - Name: `portfolio-cluster` (or any name)
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Username: `portfoliouser` (or any name)
   - Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (adds 0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Databases" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" and version 5.5 or later
   - Copy the connection string

### Step 2: Configure Your Application

1. **Update Environment Variables**
   - Open `.env.local` in your project root
   - Replace the MONGODB_URI with your actual connection string
   - Replace `<username>`, `<password>`, and cluster URL

   ```env
   MONGODB_URI=mongodb+srv://portfoliouser:YOUR_PASSWORD@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

2. **Test Setup**
   - Visit: http://localhost:9002/mongodb-setup
   - Click "Test Database Connection"
   - Should show "Database connection successful!"

### Step 3: Migrate Your Data

1. **Run Migration**
   - On the MongoDB setup page: http://localhost:9002/mongodb-setup
   - Click "Run Data Migration"
   - This moves your JSON data to MongoDB (one-time only!)

### Step 4: Switch to MongoDB

1. **Update Publication Actions**
   - Replace the import in `src/app/publications/page.tsx`:
   ```tsx
   // Change from:
   import { getPublications } from './actions';
   // To:
   import { getPublications } from './actions-mongodb';
   ```

2. **Update Publication Form**
   - Replace the import in `src/components/publication-form.tsx`:
   ```tsx
   // Change from:
   import { savePublication } from '@/app/publications/actions';
   // To:
   import { savePublication } from '@/app/publications/actions-mongodb';
   ```

3. **Update Blog Actions**
   - Replace the import in `src/app/blog/page.tsx`:
   ```tsx
   // Change from:
   import { getBlogs } from './actions';
   // To:
   import { getBlogs } from './actions-mongodb';
   ```

   - Replace the import in `src/app/blog/[slug]/page.tsx`:
   ```tsx
   // Change from:
   import { getBlogBySlug } from '../actions';
   // To:
   import { getBlogBySlug } from '../actions-mongodb';
   ```

4. **Update Blog Form**
   - Replace the import in `src/components/blog-form.tsx`:
   ```tsx
   // Change from:
   import { saveBlogPost } from '@/app/blog/actions';
   // To:
   import { saveBlogPost } from '@/app/blog/actions-mongodb';
   ```

## 🎯 Benefits of MongoDB

- ✅ **Scalable**: Handle thousands of posts and publications
- ✅ **Fast**: Optimized queries with indexing
- ✅ **Reliable**: Automatic backups and high availability
- ✅ **Free**: M0 tier is free forever (512MB storage)
- ✅ **Professional**: Industry-standard database
- ✅ **Cloud**: No server maintenance required

## 📁 File Structure

```
src/
├── lib/
│   ├── mongodb.ts          # Database connection
│   ├── models.ts           # Blog & Publication schemas
│   └── migrate-data.ts     # Migration script
├── app/
│   ├── api/
│   │   ├── migrate/        # Migration API
│   │   └── test-db/        # Connection test API
│   ├── blog/
│   │   └── actions-mongodb.ts    # Blog CRUD with MongoDB
│   ├── publications/
│   │   └── actions-mongodb.ts    # Publication CRUD with MongoDB
│   └── mongodb-setup/      # Setup & migration page
```

## 🔧 MongoDB Features Used

- **Collections**: `blogs` and `publications`
- **Schemas**: Structured data with validation
- **Indexing**: Automatic optimization
- **Aggregation**: Complex queries support
- **Transactions**: Data consistency

## 🛠️ Troubleshooting

**Connection Issues:**
- Check username/password in connection string
- Verify IP whitelist (0.0.0.0/0 for development)
- Ensure cluster is running (free tier auto-pauses after inactivity)

**Migration Issues:**
- Check console for error messages
- Verify JSON files exist and are valid
- Ensure MongoDB connection works first

**Data Issues:**
- Use MongoDB Compass (GUI tool) to view data
- Check collection names: `blogs` and `publications`
- Verify data structure matches schemas

## 🚀 Production Deployment

For production (Vercel, Netlify, etc.):
1. Add MONGODB_URI to environment variables
2. Use IP whitelist 0.0.0.0/0 or specific IPs
3. Enable authentication and SSL (default in Atlas)
4. Consider upgrading to paid tier for better performance

## 📚 Learning Resources

- [MongoDB University (Free)](https://university.mongodb.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

**Need Help?** Check the setup page at http://localhost:9002/mongodb-setup for interactive setup assistance!