import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PostComponent} from './post.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {Post} from '../../../shared/post.model';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VehicleTypeType} from '../../../shared/vehicle-type.model';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const testPost: Post = {
    id: 1,
    author: {
      id: 123,
      firstname: 'Donald',
      lastname: 'Duck'
    },
    payment: 'paypal'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder
      ]
    })
      .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select first n posts', () => {
    const testArray: Post[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
    const firstThree: Post[] = component.getFirstNPosts(testArray, 3);

    expect(firstThree).toContain(testArray[0]);
    expect(firstThree).toContain(testArray[1]);
    expect(firstThree).toContain(testArray[2]);
    expect(firstThree).not.toContain(testArray[3]);
  });

  it('getFirstNPosts should not fail if not enough posts', () => {
    const testArray: Post[] = [{id: 1}, {id: 2}];
    const firstThree = component.getFirstNPosts(testArray, 3);
    expect(firstThree).toContain(testArray[0]);
    expect(firstThree).toContain(testArray[1]);
  });

  // button Handler Tests:

  it('#addBookingButton should call addBooking', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.loggedInUserIsOwner = false;
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'addBooking');
    const button = compiled.querySelector('#addBookingButton');
    expect(button).toBeTruthy();
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.addBooking).toHaveBeenCalled();
  }));

  it('#contactAuthorButton should call contact', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.loggedInUserIsOwner = false;
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'contact');
    const button = compiled.querySelector('#contactAuthorButton');
    expect(button).toBeTruthy();
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.contact).toHaveBeenCalled();
  }));

  it('#abortEditButton should call abort', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.loggedInUserIsOwner = true;
    component.editModeOn = true;
    component.post = testPost;
    component.updatedPost = testPost;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'abort');
    const button = compiled.querySelector('#abortEditButton');
    expect(button).toBeTruthy();
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.abort).toHaveBeenCalled();
  }));

  it('#saveEditButton should call saveChanges', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.loggedInUserIsOwner = true;
    component.editModeOn = true;
    component.post = testPost;
    component.updatedPost = testPost;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'saveChanges');
    const button = compiled.querySelector('#saveEditButton');
    expect(button).toBeTruthy();
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.saveChanges).toHaveBeenCalled();
  }));

  it('#toggleEditButton should call toggleEditMode', fakeAsync(() => {
    component.ngOnInit();
    component.loggedInUserIsOwner = true;
    component.editModeOn = false;
    fixture.detectChanges();
    tick();
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'toggleEditMode');
    const button = compiled.querySelector('#toggleEditButton');
    expect(button).toBeTruthy();
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.toggleEditMode).toHaveBeenCalled();
  }));
});
