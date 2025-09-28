import dbConnect from '@/lib/mongodb';
import { Blog as BlogModel, Publication as PublicationModel } from '@/lib/models';
import blogData from '@/lib/blog-data.json';
import publicationData from '@/lib/publication-data.json';

/**
 * Migration script to move data from JSON files to MongoDB
 * Run this once after setting up your MongoDB connection
 */

async function migrateBlogData() {
  console.log('🔄 Starting blog data migration...');
  
  try {
    // Clear existing blog data
    await BlogModel.deleteMany({});
    console.log('✅ Cleared existing blog data');

    // Insert blog data
    const blogs = blogData.map(blog => ({
      ...blog,
      date: new Date(blog.date),
    }));

    await BlogModel.insertMany(blogs);
    console.log(`✅ Migrated ${blogs.length} blog posts`);
  } catch (error) {
    console.error('❌ Blog migration failed:', error);
  }
}

async function migratePublicationData() {
  console.log('🔄 Starting publication data migration...');
  
  try {
    // Clear existing publication data
    await PublicationModel.deleteMany({});
    console.log('✅ Cleared existing publication data');

    // Insert publication data (remove id field as MongoDB will generate _id)
    const publications = publicationData.map(pub => {
      const { id, ...pubData } = pub;
      return pubData;
    });

    await PublicationModel.insertMany(publications);
    console.log(`✅ Migrated ${publications.length} publications`);
  } catch (error) {
    console.error('❌ Publication migration failed:', error);
  }
}

export async function runMigration() {
  try {
    console.log('🚀 Starting data migration to MongoDB...');
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    await migrateBlogData();
    await migratePublicationData();

    console.log('🎉 Migration completed successfully!');
    return { success: true, message: 'Data migration completed successfully!' };
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