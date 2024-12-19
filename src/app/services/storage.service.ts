import { Injectable } from '@angular/core';
import { Bucket, BucketFile } from '../models/bucket.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    private buckets: Bucket[] = [
      { id: "c418cd51-f9f8-4c2a-afc5-60516bbc632e", name: 'BestStorage', location: 'Kranj' },
      { id: "711d5dc0-5305-459c-847f-068e3ee33a83", name: 'Pics', location: 'Ljubljana' }
    ];

    private files: BucketFile[] = [
      { bucketId: 'c418cd51-f9f8-4c2a-afc5-60516bbc632e', name: 'FileName01', lastModified: '06.09.2015', size: '2MB' },
      { bucketId: 'c418cd51-f9f8-4c2a-afc5-60516bbc632e', name: 'FileName02', lastModified: '05.01.2015', size: '100KB' },
      { bucketId: 'c418cd51-f9f8-4c2a-afc5-60516bbc632e', name: 'FileName03', lastModified: '12.11.2016', size: '2MB' }
    ];
  
    getBuckets(): Bucket[] {
      return this.buckets;
    }

    createBucket(bucket: Bucket): void {
      bucket.id = uuidv4();
      this.buckets.unshift(bucket);
    }

    getFiles(): BucketFile[] {
      return this.files;
    }
  
    uploadFile(file: BucketFile): void {
      this.files.push(file);
    }

    getBucketDetails(id: string): Bucket {
      const bucket = this.buckets.find(b => b.id === id);
      if (!bucket) {
        throw new Error(`Bucket with id ${id} not found`);
      }
      return bucket;
    }
}

