import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PasswordManagerService } from '../services/password-manager.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.css']
})
export class AddPasswordComponent implements OnInit {
  addPasswordForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _passwordService: PasswordManagerService,
    private _dialogRef: MatDialogRef<AddPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ) {
    this.addPasswordForm = this._fb.group({
      category: '',
      application: '',
      userName: '',
      encryptedPassword: '',
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.encryptedPassword) {
      const decryptedPassword = atob(this.data.encryptedPassword);
      this.addPasswordForm.patchValue({
        category: this.data.category,
        application: this.data.application,
        userName: this.data.userName,
        encryptedPassword: decryptedPassword,
      });
    } else {
      this.addPasswordForm.patchValue(this.data);
    }
  }
  
  onFormSubmit() {
    if (this.addPasswordForm.valid) {
      if (this.data) {
        this._passwordService.updatePassword(this.data.id, this.addPasswordForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Account details updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._passwordService.addPassword(this.addPasswordForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Account added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
