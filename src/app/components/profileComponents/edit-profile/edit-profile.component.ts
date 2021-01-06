import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [DatePipe]
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  @Input() user: Cargonaut;
   @Output() submitCallback: EventEmitter<any> = new EventEmitter();

  submitted: boolean;

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      firstName: [this.user.firstname, Validators.required],
      lastName: [this.user.lastname, Validators.required],
      birthday: [this.getBirthday(), Validators.required],
    });
  }

  cancelEditProfile(): void {
    this.editProfileForm.reset({
      firstName: this.user.firstname,
      lastName: this.user.lastname,
      birthday: this.getBirthday()});
    document.getElementById('editProfileForm').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
  }

  onSubmit(): void {
    if (this.editProfileForm.invalid){
      document.getElementById('error').innerText = 'Alle Felder müssen ausgefüllt werden.';
      return;
    }
    this.user.firstname = this.editProfileForm.controls.firstName.value;
    this.user.lastname = this.editProfileForm.controls.lastName.value;
    this.user.birthday = this.editProfileForm.controls.birthday.value;
    document.getElementById('error').innerText = '';
    this.submitCallback.emit(this.user);
  }

  getBirthday(): string {
    return this.datepipe.transform(this.user.birthday, 'yyyy-MM-dd');
  }
}
