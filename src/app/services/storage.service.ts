import { Injectable } from '@angular/core';
import { Bucket, BucketFile } from '../models/bucket.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // Usually we move this to an environment variable for security.
  private apiUrl = 'http://localhost:3000/api';

  constructor() {}

  async getBuckets(): Promise<Bucket[]> {
    try {
      const response = await axios.get<Bucket[]>(`${this.apiUrl}/buckets`);
      return response.data;
    } catch (error) {
      console.error('Error fetching buckets:', error);
      throw error;
    }
  }

  async createBucket(bucket: Bucket): Promise<Bucket> {
    try {
      const response = await axios.post<Bucket>(`${this.apiUrl}/buckets`, bucket);
      return response.data;
    } catch (error) {
      console.error('Error creating bucket:', error);
      throw error;
    }
  }

  async getFiles(bucketId?: string): Promise<BucketFile[]> {
    const url = bucketId 
      ? `${this.apiUrl}/files?bucketId=${bucketId}`
      : `${this.apiUrl}/files`;

    try {
      const response = await axios.get<BucketFile[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  }

  async uploadFile(file: BucketFile): Promise<BucketFile> {
    try {
      const response = await axios.post<BucketFile>(`${this.apiUrl}/files`, file);
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async getBucketDetails(id: string): Promise<Bucket> {
    try {
      const response = await axios.get<Bucket>(`${this.apiUrl}/buckets/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bucket details:', error);
      throw error;
    }
  }

  async deleteBucket(id: string): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/buckets/${id}`);
    } catch (error) {
      console.error('Error deleting bucket:', error);
      throw error;
    }
  }

  async deleteObject(id: string): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/files/${id}`);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
}
