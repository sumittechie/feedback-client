import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmService } from 'src/app/shared/components/confirm/confirm.service';
import { IApiResponse, IUsers, IUserSave } from 'src/app/shared/models';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { ManageComponent } from './manage/manage.component';
import { UsersService } from './users.service';

@Component({
  selector: 'fb-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  tableColumns: string[] = [];
  tableData!: MatTableDataSource<IUsers>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly _service: UsersService,
    private readonly _loader: NgxSpinnerService,
    private readonly _logger: LoggerService,
    private readonly _modal: MatDialog,
    private readonly _confirm: ConfirmService
  ) {}

  private loadUsers() {
    this._loader.show();
    this._service.getAll().subscribe((response: IApiResponse) => {
      this._loader.hide();
      if (!response.error) {
        this.tableData = new MatTableDataSource<IUsers>(response.data);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
      } else {
        this._logger.error(response.message);
      }
    });
  }

  ngOnInit(): void {
    this.tableColumns = [
      'photo',
      'name',
      'mobile',
      'email',
      'gender',
      'isAdmin',
      'action',
    ];
    this.loadUsers();
  }

  onCreate() {
    this.upsert();
  }

  onEdit(id: string) {
    if (id) {
      this._loader.show();
      this._service.get(id).subscribe((response: IApiResponse) => {
        this._loader.hide();
        if (!response.error) {
          this.upsert(response.data);
        } else {
          this._logger.error(response.message);
        }
      });
    }
  }

  onDelete(id: string) {
    this._confirm.open();
    this._confirm.confirmed().subscribe((data: boolean) => {
      if (data) {
        this._service.delete(id).subscribe((response: IApiResponse) => {
          if (!response.error) {
            this._logger.success(response.data);
            this.loadUsers();
          } else {
            this._logger.error(response.message);
          }
        });
      }
    });
  }

  private upsert(data?: any) {
    const options: MatDialogConfig = {
      width: '640px',
      disableClose: true,
      data,
    };
    const dialogRef = this._modal.open(ManageComponent, options);
    dialogRef.afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.loadUsers();
      }
    });
  }
}
