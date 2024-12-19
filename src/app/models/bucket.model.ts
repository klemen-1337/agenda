export interface Bucket {
    id: string;
    name: string;
    location: string;
    storageSize?: string;
}

export interface BucketFile {
    bucketId: string;
    name: string;
    lastModified: string;
    size: string;
  }