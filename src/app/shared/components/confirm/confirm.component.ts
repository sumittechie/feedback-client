import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirm } from '../../models/i-confrim';

@Component({
  selector: 'fb-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirm
  ) {
    this.title = data.title;
    this.message = data.message;
    this.cancelText = data.cancelText;
    this.confirmText = data.confirmText;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
