import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

interface EventWithDataTransfer extends Event {
  dataTransfer: any;
}

interface File {
  name: string;
  type: string;
}

@Component({
  selector: 'app-process-hubstaff-timesheet',
  templateUrl: './process-hubstaff-timesheet.component.html',
  styleUrls: ['./process-hubstaff-timesheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ProcessHubstaffTimesheetComponent implements OnInit {

  localFileReadingSupported = false;
  files: File[] = [];
  dropZoneClass = '';

  constructor() {}

  ngOnInit(): void {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      this.localFileReadingSupported = true;
    }
  }

  private isValidDrop(event: EventWithDataTransfer) {
    let files: File[];
    if (event.dataTransfer.items) {
      files = event.dataTransfer.items;
    } else {
      files = event.dataTransfer.files;
    }

    if (files.length !== 1) {
      return false;
    }

    if (files[0].type !== 'text/csv') {
      return false;
    }

    return true;
  }

  dragOver(event: EventWithDataTransfer) {
    event.preventDefault();
    this.dropZoneClass = this.isValidDrop(event) ?
      'valid' :
      'invalid';
  }

  dragLeave() {
    this.dropZoneClass = '';
  }

  dropHandler(event: EventWithDataTransfer) {
    this.dropZoneClass = '';
    event.preventDefault();

    if (!this.isValidDrop(event)) {
      return false;
    }

    if (event.dataTransfer.items) {
      if (event.dataTransfer.items.length !== 1) {
        return;
      }

      // Use DataTransferItemList interface to access the file(s)
      const newFiles = [];
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          newFiles.push(file);
        }
      }
      this.files = newFiles;
    } else {
      if (event.dataTransfer.files.length !== 1) {
        return;
      }

      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        console.log(
          '... file[' + i + '].name = ' + event.dataTransfer.files[i].name
        );
      }
    }
  }
}
