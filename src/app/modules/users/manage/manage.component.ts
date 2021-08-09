import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IUsers } from 'src/app/shared/models';
import { IUserSave } from 'src/app/shared/models/i-user-save';

@Component({
  selector: 'fb-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  form!: FormGroup;
  isAdmin!: boolean;
  constructor(
    private readonly _fb: FormBuilder,
    private dialogRef: MatDialogRef<ManageComponent>
  ) {}

  private initForm(data?: any) {
    this.form = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      isAdmin: [false],
      gender: ['Male', Validators.required],
      password: ['', Validators.required],
    });
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
    this.initForm();
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

    this.dialogRef.close(userObj);
  }
}
