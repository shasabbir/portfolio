import dbConnect from '@/lib/mongodb';
import { Blog as BlogModel, Publication as PublicationModel } from '@/lib/models';
import fs from 'fs/promises';
import path from 'path';

/**
 * Migration script to migrate data from JSON backup files to MongoDB
 * Run this once after setting up your MongoDB connection
 */

async function loadBackupData() {
  let blogData = [];
  let publicationData = [];

  try {
    const blogBackupPath = path.join(process.cwd(), 'backup', 'blog-data-backup.json');
    const blogContent = await fs.readFile(blogBackupPath, 'utf-8');
    blogData = JSON.parse(blogContent);
  } catch (error) {
    console.log('📝 No blog backup found, will use sample data');
    // Fallback sample blog data
    blogData = [
      {
        slug: 'getting-started-with-nextjs',
        title: 'Getting Started with Next.js',
        excerpt: 'A comprehensive guide to building modern web applications with Next.js.',
        imageUrl: '/images/blog/web-development.jpg',
        imageHint: 'Web development with Next.js',
        content: `# Getting Started with Next.js

Next.js is a powerful React framework that enables you to build full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.

## Key Features

- **Server-Side Rendering (SSR)**: Improve performance and SEO
- **Static Site Generation (SSG)**: Pre-render pages at build time
- **API Routes**: Build API endpoints within your Next.js app
- **File-based Routing**: Create routes by adding files to the pages directory

## Getting Started

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This will create a new Next.js application and start the development server.`,
        author: {
          name: 'Portfolio Owner',
          avatar: '/images/profile/avatar.jpg'
        },
        tags: ['Next.js', 'React', 'Web Development'],
        date: new Date('2024-01-15')
      }
    ];
  }

  try {
    const pubBackupPath = path.join(process.cwd(), 'backup', 'publication-data-backup.json');
    const pubContent = await fs.readFile(pubBackupPath, 'utf-8');
    publicationData = JSON.parse(pubContent);
  } catch (error) {
    console.log('📝 No publication backup found, will use sample data');
    // Fallback sample publication data
    publicationData = [
      {
        title: 'Advanced Machine Learning Techniques in Web Development',
        authors: 'Your Name, Co-author Name',
        venue: 'International Conference on Web Technologies',
        year: '2024',
        publicationType: 'Conference',
        doi: '10.1234/example.doi',
        url: 'https://example.com/paper1',
        abstract: 'This paper explores the integration of machine learning techniques in modern web development frameworks, focusing on performance optimization and user experience enhancement.'
      }
    ];
  }

  return { blogData, publicationData };
}

async function migrateBlogData(blogData: any[]) {
  console.log('🔄 Starting blog data migration...');
  
  try {
    // Check if blogs already exist
    const existingBlogs = await BlogModel.countDocuments();
    if (existingBlogs > 0) {
      console.log('📝 Blog data already exists, skipping migration');
      return;
    }

    // Convert date strings to Date objects and ensure proper format
    const blogs = blogData.map(blog => ({
      ...blog,
      date: new Date(blog.date),
    }));

    // Insert blog data
    await BlogModel.insertMany(blogs);
    console.log(`✅ Migrated ${blogs.length} blog posts from backup`);
  } catch (error) {
    console.error('❌ Blog migration failed:', error);
  }
}

async function migratePublicationData(publicationData: any[]) {
  console.log('🔄 Starting publication data migration...');
  
  try {
    // Check if publications already exist
    const existingPublications = await PublicationModel.countDocuments();
    if (existingPublications > 0) {
      console.log('📝 Publication data already exists, skipping migration');
      return;
    }

    // Remove id field as MongoDB will generate _id
    const publications = publicationData.map(pub => {
      const { id, ...pubData } = pub;
      return pubData;
    });

    // Insert publication data
    await PublicationModel.insertMany(publications);
    console.log(`✅ Migrated ${publications.length} publications from backup`);
  } catch (error) {
    console.error('❌ Publication migration failed:', error);
  }
}

export async function runMigration() {
  try {
    console.log('🚀 Starting data migration to MongoDB...');
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    // Load backup data
    const { blogData, publicationData } = await loadBackupData();

    await migrateBlogData(blogData);
    await migratePublicationData(publicationData);

    console.log('🎉 Migration completed successfully!');
    return { 
      success: true, 
      message: `Data migration completed successfully! Migrated ${blogData.length} blogs and ${publicationData.length} publications.` 
    };
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, message: 'Migration failed. Please check the logs.' };
  }
}

// For manual testing - uncomment to run migration
// runMigration().then(result => {
//   console.log('Migration result:', result);
//   process.exit(0);
// });