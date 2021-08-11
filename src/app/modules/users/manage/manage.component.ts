import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { IApiResponse } from 'src/app/shared/models';
import { IUserSave } from 'src/app/shared/models/i-user-save';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'fb-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  form!: FormGroup;
  isAdmin!: boolean;
  userDetails: any;
  validationErrors: string[] = [];
  constructor(
    private readonly _fb: FormBuilder,
    private dialogRef: MatDialogRef<ManageComponent>,
    private readonly _loader: NgxSpinnerService,
    private readonly _logger: LoggerService,
    private readonly _service: UsersService,
    @Inject(MAT_DIALOG_DATA) data?: any
  ) {
    this.userDetails = data;
  }

  private initForm(data?: IUserSave) {
    this.form = this._fb.group({
      name: [data?.name, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      mobile: [
        data?.mobile,
        [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      isAdmin: [data?.isAdmin || false],
      gender: [data?.gender || 'Male', Validators.required],
      password: ['', Validators.required],
    });

    if (data?.id) {
      this.form.removeControl('password');
    }
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get mobile() {
    return this.form.get('mobile');
  }

  get gender() {
    return this.form.get('gender');
  }

  get password() {
    return this.form.get('password');
  }

  get admin() {
    return this.form.get('isAdmin');
  }

  ngOnInit(): void {
    this.initForm(this.userDetails);
    this.admin?.valueChanges.subscribe(
      (flag: boolean) => (this.isAdmin = flag)
    );
  }

  onSubmit() {
    const userObj: IUserSave = {
      name: this.name?.value,
      mobile: this.mobile?.value,
      gender: this.gender?.value,
      isAdmin: this.admin?.value,
      password: this.password?.value,
      email: this.email?.value,
    };
    if (this.userDetails && this.userDetails.id) {
      userObj.id = this.userDetails.id;
    }

    this._loader.show();
    this._service.post(userObj).subscribe((response: IApiResponse) => {
      this._loader.hide();
      if (!response.error) {
        this._logger.success(response.data);
        this.dialogRef.close(true);
      } else if (response.error && response.message === null) {
        this.validationErrors = response.data;
        console.log('errors', this.validationErrors);
      } else {
        this._logger.error(response.message);
      }
    });
  }
}
