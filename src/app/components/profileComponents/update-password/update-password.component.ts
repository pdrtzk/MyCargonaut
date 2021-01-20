import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  submitCallback: EventEmitter<any> = new EventEmitter();
  updatePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<UpdatePasswordComponent>) { }

  ngOnInit(): void {
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onCancel(): void {
    this.updatePasswordForm.reset();
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.updatePasswordForm.invalid){
      document.getElementById('errorUpdatePW').innerText = 'Passwort ist nicht lang genug.';
      return;
    }
    this.submitCallback.emit(this.updatePasswordForm.controls.password.value);
    this.updatePasswordForm.reset();
    this.dialogRef.close();
  }

}
