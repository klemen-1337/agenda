import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../services/storage.service';
import { BucketFile } from '../../models/bucket.model';
import { Bucket } from '../../models/bucket.model';

@Component({
  selector: 'app-bucket-details',
  imports: [CommonModule],
  templateUrl: './bucket-details.component.html',
  styleUrl: './bucket-details.component.css'
})
export class BucketDetailsComponent implements OnInit {

  files: BucketFile[] = [];
  selectedFile: BucketFile | null = null;
  bucketDetails: Bucket | null = null;

  tabs = [
    { name: 'Files', active: true },
    { name: 'Bucket Details', active: false },
  ];

  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const files = this.storageService.getFiles();
    this.files = files.filter(f => f.bucketId === id);
    console.log(this.files);

    if(id){
      this.bucketDetails = this.storageService.getBucketDetails(id);
    }
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const newFile: BucketFile = {
        bucketId: this.bucketDetails?.id || '',
        name: file.name,
        lastModified: new Date(file.lastModified).toLocaleDateString(),
        size: this.formatFileSize(file.size)
      };
      this.storageService.uploadFile(newFile);
    }
  }
  
  setActiveTab(index: number) {
    this.tabs.forEach((tab, i) => tab.active = i === index);
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

}
