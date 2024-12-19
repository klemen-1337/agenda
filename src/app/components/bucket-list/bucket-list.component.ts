import { Component, OnInit } from '@angular/core';
import { Bucket } from '../../models/bucket.model';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-bucket-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './bucket-list.component.html',
  styleUrl: './bucket-list.component.css'
})
export class BucketListComponent implements OnInit {

  showForm = false;
  buckets: Bucket[] = [];
  newBucket: Bucket = { name: '', location: '' };
  locations = ['Kranj', 'Ljubljana']

  constructor(
    private storageService: StorageService,
  ){}

  ngOnInit(): void {
    this.buckets = this.storageService.getBuckets()
  }

  createBucket(): void {
    if (this.newBucket.name && this.newBucket.location) {
      this.storageService.createBucket(this.newBucket);
      this.newBucket = { name: '', location: '' };
      this.showForm = false;
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
