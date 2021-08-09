import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IConfirm } from '../../models/i-confrim';
import { ConfirmComponent } from './confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  dialogRef!: MatDialogRef<ConfirmComponent>;
  constructor(private readonly _dialog: MatDialog) {}

  public open(options?: IConfirm) {
    const data: IConfirm = {
      title: options?.title || 'Confirm Action',
      message: options?.message || 'Are you sure you want to delete this?',
      cancelText: options?.cancelText || 'No',
      confirmText: options?.confirmText || 'Yes',
    };

    this.dialogRef = this._dialog.open(ConfirmComponent, {
      data,
    });
  }

  public confirmed(): Observable<boolean> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }
}
