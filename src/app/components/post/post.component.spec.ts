import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostComponent} from './post.component';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    // router = TestBed.inject(Router);
    // router.initialNavigation();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});