import { Injectable } from '@angular/core';
import { Bucket } from '../models/bucket.model';

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    private buckets: Bucket[] = [
      { name: 'BestStorage', location: 'Kranj' },
      { name: 'Pics', location: 'Ljubljana' }
    ];
  
    getBuckets(): Bucket[] {
      return this.buckets;
    }

    createBucket(bucket: Bucket): void {
      this.buckets.unshift(bucket);
    }
}

