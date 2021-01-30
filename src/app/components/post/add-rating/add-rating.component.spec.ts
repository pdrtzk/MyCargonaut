import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {AddRatingComponent} from './add-rating.component';
import {HttpClient} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../../app-routing.module';
import {AccountService} from '../../../services/account.service';
import {AlertService} from '../../alert/alert.service';

describe('AddRatingComponent', () => {
  let component: AddRatingComponent;
  let alertService: AlertService;
  let fixture: ComponentFixture<AddRatingComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [AddRatingComponent],
      providers: [AlertService]
    })
      .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    alertService = TestBed.inject(AlertService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh and set correct default values', () => {
    component.ngOnInit();
    expect(component.rating.comment).toBe('');
    expect(component.rating.ratingStars).toBe(1);
  });

  it('updateStars() should change rating state', () => {
    component.ngOnInit();
    component.updateStars(4);
    expect(component.rating.ratingStars).toBe(4);
  });

  it('updateComment() should change rating state', () => {
    component.ngOnInit();
    component.updateComment('gute Fahrt!');
    expect(component.rating.comment).toBe('gute Fahrt!');
  });

  it('#submitButton should call onSubmitRating', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'onSubmitRating');
    const button = compiled.querySelector('#submitButton');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.onSubmitRating).toHaveBeenCalled();
  }));

  /*
  it('submitting Rating should trigger Alert', fakeAsync(() => {
    component.author = {id: -1};
    component.post = {id: -1};
    component.ngOnInit();
    spyOn(alertService, 'success');
    component.onSubmitRating();
    tick();
    fixture.detectChanges();
    expect(alertService.success).toHaveBeenCalled();
  }));
   */
});
