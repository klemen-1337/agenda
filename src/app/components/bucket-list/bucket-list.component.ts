import { Component, OnInit } from '@angular/core';
import { Bucket } from '../../models/bucket.model';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bucket-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './bucket-list.component.html',
  styleUrl: './bucket-list.component.css'
})
export class BucketListComponent implements OnInit {

  showForm = false;
  buckets: Bucket[] = [];
  newBucket: Bucket = { id: '', name: '', location: '', storageSize: '' };
  locations = ['Kranj', 'Ljubljana']

  constructor(
    private storageService: StorageService,
  ){}

  ngOnInit(): void {
    this.loadBuckets();
  }

  async loadBuckets() {
    try {
      this.buckets = await this.storageService.getBuckets();
    } catch (error) {
      console.error('Error loading buckets:', error);
    }
  }

  async createBucket(){
    try {
      const bucket = await this.storageService.createBucket(this.newBucket);
      this.buckets.unshift(bucket);
      this.newBucket = { id:'', name: '', location: '', storageSize: '' }; 
      this.toggleForm();
    } catch (error) {
      console.error('Error creating bucket:', error);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
