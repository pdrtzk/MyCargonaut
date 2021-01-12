import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePostComponent} from './home-post.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HomePostComponent', () => {
  let component: HomePostComponent;
  let fixture: ComponentFixture<HomePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule, HttpClientTestingModule],
      declarations: [HomePostComponent],
      providers: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
