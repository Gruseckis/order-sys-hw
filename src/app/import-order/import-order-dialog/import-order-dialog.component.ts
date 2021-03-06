import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-import-order-dialog',
  templateUrl: './import-order-dialog.component.html',
  styleUrls: ['./import-order-dialog.component.css']
})
export class ImportOrderDialogComponent {
  constructor(public dialogRef: MatDialogRef<ImportOrderDialogComponent>) {}
}
