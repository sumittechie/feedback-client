import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { indexOf } from 'lodash';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { UsersService } from '../../users/users.service';

import {
  IApiResponse,
  IFeedbackRead,
  IFeedbackSave,
  IUser,
} from 'src/app/shared/models';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'fb-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredUsers!: Observable<IUser[]>;
  users: IUser[] = [];
  allusers: IUser[] = [];
  @ViewChild('assigneeInput') assigneeInput!: ElementRef<HTMLInputElement>;
  createForm!: FormGroup;
  questionInput!: string;
  feedbackId!: number;

  constructor(
    private readonly _fb: FormBuilder,
    private dialogRef: MatDialogRef<ManageComponent>,
    private readonly _userService: UsersService,
    private readonly _logger: LoggerService,
    @Inject(MAT_DIALOG_DATA) data?: IFeedbackRead
  ) {
    this.questionInput = data ? data.question : '';
    this.users = data ? data.assignee : [];
    this.feedbackId = data ? data.feedbackId : -1;
  }

  private initForm() {
    this.createForm = this._fb.group({
      question: [this.questionInput, Validators.required],
      assignee: [this.users],
    });
  }

  get assignee() {
    return this.createForm.get('assignee');
  }

  get question() {
    return this.createForm.get('question');
  }

  ngOnInit(): void {
    this.initForm();
    this.filteredUsers = this.createForm.get('assignee')!.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allusers.slice()
      )
    );

    this._userService.getUsers().subscribe((response: IApiResponse) => {
      if (!response.error) {
        this.allusers = response.data;
      } else {
        this._logger.error(response.message);
      }
    });
  }

  //#region Assignee

  remove(user: IUser): void {
    const index = indexOf(this.users, user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.value);
    this.assigneeInput.nativeElement.value = '';
    this.assignee?.setValue(null);
  }

  private _filter(value: string | IUser): IUser[] {
    const filterValue =
      typeof value === 'object'
        ? value.name.toLowerCase()
        : value.toLowerCase();

    return this.allusers.filter((user: IUser) =>
      user.name.toLowerCase().includes(filterValue)
    );
  }

  //#endregion

  onSubmit(): void {
    const feedbackObj: IFeedbackSave = {
      users: this.users.map((v) => v.id),
      question: this.createForm.value.question,
      feedbackId: this.feedbackId,
    };

    this.dialogRef.close(feedbackObj);
  }
}
