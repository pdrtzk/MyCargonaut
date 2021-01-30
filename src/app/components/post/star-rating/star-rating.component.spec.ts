import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {StarRatingComponent} from './star-rating.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarRatingComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking star icon should call setStarCount', fakeAsync(() => {
    component.ngOnInit();
    component.canEdit = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'setStarCount');
    const starIcon = compiled.querySelector('#starIcon3');
    expect(starIcon).toBeTruthy();
    starIcon.click();
    tick();
    fixture.detectChanges();

    expect(component.setStarCount).toHaveBeenCalled();
  }));
});
