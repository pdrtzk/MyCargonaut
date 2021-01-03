import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewPostModalComponent} from './new-post-modal.component';
import {NgbDatepicker, NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('NewPostModalComponent', () => {
  let component: NewPostModalComponent;
  let fixture: ComponentFixture<NewPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [NewPostModalComponent],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
