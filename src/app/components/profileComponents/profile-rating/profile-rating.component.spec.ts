import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRatingComponent } from './profile-rating.component';
import {Rating} from '../../../../shared/rating.model';
import {NgbRating, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';



const mockRating: Rating = {
  id: 3,
  comment: 'Keinerlei Beschwerden',
  author: {
    firstname: 'Test',
    lastname: 'Cargonaut'
  },
  ratingStars: 5
};

describe('ProfileRatingComponent', () => {
  let component: ProfileRatingComponent;
  let fixture: ComponentFixture<ProfileRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRatingComponent ],
      imports: [ NgbRatingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRatingComponent);
    component = fixture.componentInstance;
    component.rating = mockRating;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stars should be displayed with the correct rating', () => {
    const compiled = fixture.debugElement.nativeElement;
    const stars = (compiled.querySelector('#ratingStar').attributes)['aria-valuemax'].value;
    expect(stars).toEqual('5');
    component.rating.ratingStars = 3;
    expect(stars).toEqual('5');
  });

  it('author\'s first name and last name should be displayed in a readable format ', () => {
    const compiled = fixture.debugElement.nativeElement;
    const authorP = compiled.querySelector('#ratingAuthorLink');
    expect(authorP.innerHTML).toEqual('Test Cargonaut');
  });

  it('the comment should be displayed ', () => {
    const compiled = fixture.debugElement.nativeElement;
    const commentP = compiled.querySelector('#ratingComment');
    expect(commentP.innerHTML).toContain(' Keinerlei Beschwerden ');
  });


});
