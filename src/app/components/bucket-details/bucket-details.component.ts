import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../services/storage.service';
import { BucketFile } from '../../models/bucket.model';
import { Bucket } from '../../models/bucket.model';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

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
    private router: Router,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    const files = await this.storageService.getFiles();
    this.files = files.filter(f => f.bucketId === id);

    if(id){
      this.bucketDetails = await this.storageService.getBucketDetails(id);
    }
  }

  selectFile(file: BucketFile): void {
    this.selectedFile = file;
  }

  async uploadFile(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const newFile: BucketFile = {
        id: uuidv4(),
        bucketId: this.bucketDetails?.id || '',
        name: file.name,
        lastModified: new Date(file.lastModified)
          .toLocaleDateString('en-GB')
          .replace(/\//g, '.'),
        size: this.formatFileSize(file.size)
      };
      this.storageService.uploadFile(newFile);
      this.files.push(newFile);
    }
  }
  
  setActiveTab(index: number) {
    this.tabs.forEach((tab, i) => tab.active = i === index);
  }

  confirmDelete(content: any) {
    this.modalService.open(content);
  }

  deleteBucket(modal: any) {
    this.storageService.deleteBucket(this.bucketDetails?.id || '');
    modal.close();
    this.router.navigate(['/']);
  }

  deleteObject(modal: any) {
    if(this.selectedFile){
      this.storageService.deleteObject(this.selectedFile.id);
      this.files = this.files.filter(f => f.id !== this.selectedFile?.id);
      modal.close();
    }    
  }

  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

}
