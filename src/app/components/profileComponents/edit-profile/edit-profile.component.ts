import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  @Input() user: Cargonaut;
   @Output() submitCallback: EventEmitter<any> = new EventEmitter();

  submitted: boolean;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      firstName: [this.user.firstname, Validators.required],
      lastName: [this.user.lastname, Validators.required],
      birthday: [new Date(this.user.birthday), Validators.required],
    });
  }

  cancelEditProfile(): void {
    document.getElementById('editProfileForm').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
  }

  onSubmit(): void {
    this.user.firstname = this.editProfileForm.controls.firstName.value;
    this.user.lastname = this.editProfileForm.controls.lastName.value;
    this.user.birthday = this.editProfileForm.controls.birthday.value;
    this.submitCallback.emit(this.user);
  }
}
