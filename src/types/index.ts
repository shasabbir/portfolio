export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
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
