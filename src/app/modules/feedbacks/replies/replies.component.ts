import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IApiResponse, IReplies } from 'src/app/shared/models';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { RepliesService } from './replies.service';

@Component({
  selector: 'fb-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss'],
})
export class RepliesComponent implements OnInit, OnDestroy {
  $unsubscribe: Subject<any>;
  replies: IReplies[] = [];
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _logger: LoggerService,
    private readonly _loader: NgxSpinnerService,
    private readonly _service: RepliesService
  ) {
    this.$unsubscribe = new Subject<any>();
  }

  private loadReplies(id: number) {
    this._loader.show();
    this._service
      .getAll(id)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe((response: IApiResponse) => {
        this._loader.hide();
        if (!response.error) {
          this.replies = response.data;
          console.log('Replies', response);
        } else {
          this._logger.error(response.message);
        }
      });
  }

  ngOnInit(): void {
    this._route.params
      .pipe(filter((f) => f.id != null))
      .subscribe((param: any) => {
        if (param.id > 0) {
          this.loadReplies(param.id);
        } else {
          this._logger.error('Invalid feedback ID');
        }
      });
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
