
export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  publicationType: 'Journal' | 'Conference' | 'Preprint';
  doi?: string;
  url?: string;
  pdf?: string;
  abstract?: string;
  citation?: {
    apa?: string;
    mla?: string;
    chicago?: string;
  };
};

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  content: string;
};
