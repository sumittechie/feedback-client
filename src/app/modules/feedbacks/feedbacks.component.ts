import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { IFeedbackRead } from 'src/app/shared/models';
import { FeedbacksService } from './feedbacks.service';
import { MatPaginator } from '@angular/material/paginator';
import { ManageComponent } from './manage/manage.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IFeedbacks } from 'src/app/shared/models/i-feedbacks';
import { IApiResponse } from 'src/app/shared/models/i-api-response';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IFeedbackSave } from 'src/app/shared/models/i-feedback-save';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { ConfirmService } from 'src/app/shared/components/confirm/confirm.service';

@Component({
  selector: 'fb-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
})
export class FeedbacksComponent implements OnInit {
  tableColumns: string[] = [];
  tableData!: MatTableDataSource<IFeedbacks>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showTable: boolean = true;

  constructor(
    private readonly _service: FeedbacksService,
    private readonly _loader: NgxSpinnerService,
    private readonly _logger: LoggerService,
    private readonly _confirm: ConfirmService,
    private readonly _modal: MatDialog
  ) {}

  private load() {
    this._loader.show();
    this._service.getAll().subscribe((response: IApiResponse) => {
      if (!response.error) {
        this.showTable = response.data.length > 0;
        this.tableData = new MatTableDataSource<IFeedbacks>(response.data);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
      } else {
        this._logger.error(response.message);
      }
      this._loader.hide();
    });
  }

  ngOnInit(): void {
    this.tableColumns = [
      'feedbackId',
      'question',
      'createdBy',
      'lastUpdated',
      'action',
    ];

    this.load();
  }

  onCreate(): void {
    this.upsert();
  }

  onEdit(feedbackId: number): void {
    if (feedbackId) {
      this._service.get(feedbackId).subscribe((response: IApiResponse) => {
        if (!response.error) {
          const data: IFeedbackRead = {
            feedbackId: response.data.feedback.feedbackId,
            question: response.data.feedback.question,
            assignee: response.data.assignee,
          };

          this.upsert(data);
        } else {
          this._logger.error(response.message);
        }
      });
    }
  }

  onDelete(feedbackId: number): void {
    this._confirm.open();
    this._confirm.confirmed().subscribe((data: boolean) => {
      if (data) {
        this._service.delete(feedbackId).subscribe((response: IApiResponse) => {
          if (!response.error) {
            this._logger.success(response.data);
            this.load();
          } else {
            this._logger.error(response.message);
          }
        });
      }
    });
  }

  upsert(data?: any) {
    const options: MatDialogConfig = {
      width: '640px',
      disableClose: true,
      data,
    };
    const dialogRef = this._modal.open(ManageComponent, options);
    dialogRef.afterClosed().subscribe((response: IFeedbackSave) => {
      if (response && response.question) {
        this._loader.show();
        this._service
          .saveFeedbacks(response)
          .subscribe((response: IApiResponse) => {
            this._loader.hide();
            if (!response.error) {
              this._logger.success(response.data);
              this.load();
            } else {
              this._logger.error(response.message);
            }
          });
      }
    });
  }
}
