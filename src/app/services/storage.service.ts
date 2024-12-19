import { Injectable } from '@angular/core';
import { Bucket, BucketFile } from '../models/bucket.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    private buckets: Bucket[] = [
      { id: "c418cd51-f9f8-4c2a-afc5-60516bbc632e", name: 'BestStorage', location: 'Kranj', storageSize: '5GB' },
      { id: "711d5dc0-5305-459c-847f-068e3ee33a83", name: 'Pics', location: 'Ljubljana', storageSize: '5GB' }
    ];

    private files: BucketFile[] = [
      { id: 'b9c84958-bd8f-472b-8cf1-febb885a664b', bucketId: 'c418cd51-f9f8-4c2a-afc5-60516bbc632e', name: 'FileName01', lastModified: '06.09.2015', size: '2MB' },
      { id: 'e65efa78-93f3-4534-96eb-179817620c66', bucketId: 'c418cd51-f9f8-4c2a-afc5-60516bbc632e', name: 'FileName02', lastModified: '05.01.2015', size: '100KB' },
      { id: 'd3be3d4c-87c2-4ecb-b276-474f4316db52', bucketId: 'c418cd51-f9f8-4c2a-afc5-60516bbc632e', name: 'FileName03', lastModified: '12.11.2016', size: '2MB' }
    ];
  
    getBuckets(): Bucket[] {
      return this.buckets;
    }

    createBucket(bucket: Bucket): void {
      bucket.id = uuidv4();
      bucket.storageSize = '5GB';
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

    deleteBucket(id: string): void {
      const index = this.buckets.findIndex(b => b.id === id);
      if (index === -1) {
        throw new Error(`Bucket with id ${id} not found`);
      }
      this.buckets.splice(index, 1);
    }

    deleteObject(id: string): void {
      const index = this.files.findIndex(f => f.id === id);
      console.log(id, index);
      if (index === -1) {
        throw new Error(`File with id ${id} not found`);
      }
      this.files.splice(index, 1);
    }
}

