export interface Resource {
    id: string | number;
    title: string;
    description?: string;
    type: string;
    subject: string;
    downloads: number;
    views: number;
    rating: number;
    status?: 'published' | 'draft';
    access: 'premium' | 'free';
    lastUpdated: string;
    fileSize?: string;
    author?: string;
    level?: string;
    category?: string;
    price?: number | 'Free';
    isPremium?: boolean;
    formats?: string[];
    fileData?: string; // Base64 encoded file data
  }