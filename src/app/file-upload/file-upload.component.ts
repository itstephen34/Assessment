import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  isFileUploading = false;
  hideFileUpload = false;
  fileListData = [];

  constructor() { }

  ngOnInit() {
  }

  uploadFile(event) {
      this.isFileUploading = true;
      // const formData: FormData = new FormData();
      const fileList = event;
      this.hideFileUpload = false;
      for (let i = 0; i < fileList.length; i++) {
        this.fileListData.push({index: i, name: fileList[i].name});
      }
  }

  deleteFile(index) {
    this.fileListData = this.fileListData.slice(0, index);
  }

}
