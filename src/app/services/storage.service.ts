import { Injectable } from '@angular/core';
import { Bucket } from '../models/bucket.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    private buckets: Bucket[] = [
      { id: "c418cd51-f9f8-4c2a-afc5-60516bbc632e", name: 'BestStorage', location: 'Kranj' },
      { id: "711d5dc0-5305-459c-847f-068e3ee33a83", name: 'Pics', location: 'Ljubljana' }
    ];
  
    getBuckets(): Bucket[] {
      return this.buckets;
    }

    createBucket(bucket: Bucket): void {
      bucket.id = uuidv4();
      console.log(bucket);
      this.buckets.unshift(bucket);
    }
}

