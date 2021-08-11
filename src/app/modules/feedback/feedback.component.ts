import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IApiResponse, IQuestions } from 'src/app/shared/models';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'fb-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  questions: IQuestions[] = [];
  feedbackId!: number;
  question?: IQuestions;
  form!: FormGroup;
  constructor(
    private readonly _service: FeedbackService,
    private readonly _logger: LoggerService,
    private readonly _loader: NgxSpinnerService,
    private readonly _fb: FormBuilder
  ) {}

  private getFeedbackList() {
    this._loader.show();
    this._service.get().subscribe((response: IApiResponse) => {
      this._loader.hide();
      if (!response.error) {
        this.questions = response.data;
        this._logger.success(
          `You have ${this.questions.length} new feedback items waiting for reply`
        );
      } else {
        this._logger.error(response.message);
      }
    });
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      reply: ['', Validators.required],
    });
    this.getFeedbackList();
  }

  onSelect(id: number) {
    this.question = undefined;
    this.feedbackId = id;
    this.question = this.questions.find((ques) => ques.id === this.feedbackId);
  }

  onSend() {
    if (this.form.value.reply) {
      this._loader.show();
      this._service
        .post(this.form.value.reply, this.feedbackId)
        .subscribe((response: IApiResponse) => {
          this._loader.hide();
          if (!response.error) {
            this.form.reset();
            this.question = undefined;
            this.feedbackId = -1;
            this.getFeedbackList();
            this._logger.success(response.data);
          } else {
            this._logger.error(response.message);
          }
        });
    }
  }

  onCancle() {
    this.question = undefined;
  }
}
