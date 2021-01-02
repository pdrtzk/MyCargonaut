import {Component, Input, OnInit} from '@angular/core';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() editProfileForm: FormGroup;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder) {  }

  ngOnInit(): void {  }


}
