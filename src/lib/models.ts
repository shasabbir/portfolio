import mongoose from 'mongoose';

// Blog Schema
const BlogSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageHint: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  tags: [{
    type: String,
    required: true,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Publication Schema
const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  publicationType: {
    type: String,
    enum: ['Journal', 'Conference', 'Preprint'],
    required: true,
  },
  doi: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  pdf: {
    type: String,
    required: false,
  },
  abstract: {
    type: String,
    required: false,
  },
  citation: {
    apa: {
      type: String,
      required: false,
    },
    mla: {
      type: String,
      required: false,
    },
    chicago: {
      type: String,
      required: false,
    },
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Export models (use existing model if already compiled)
export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export const Publication = mongoose.models.Publication || mongoose.model('Publication', PublicationSchema);