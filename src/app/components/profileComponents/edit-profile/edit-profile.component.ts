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

  constructor(public formBuilder: FormBuilder, public datepipe: DatePipe) {
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
    const newUser = Object.assign({}, this.user);
    newUser.firstname = this.editProfileForm.controls.firstName.value;
    newUser.lastname = this.editProfileForm.controls.lastName.value;
    newUser.birthday = this.editProfileForm.controls.birthday.value;
    document.getElementById('error').innerText = '';
    this.submitCallback.emit(newUser);

  }

  getBirthday(): string {
    return this.datepipe.transform(this.user.birthday, 'yyyy-MM-dd');
  }
}
