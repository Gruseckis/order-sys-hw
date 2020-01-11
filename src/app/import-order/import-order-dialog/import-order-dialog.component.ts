import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/order';

@Component({
  selector: 'app-import-order-dialog',
  templateUrl: './import-order-dialog.component.html',
  styleUrls: ['./import-order-dialog.component.css']
})
export class ImportOrderDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImportOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  onNoClick() {
    console.log('log');
  }

}
