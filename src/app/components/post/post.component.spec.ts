import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostComponent} from './post.component';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {Post} from '../../../shared/post.model';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
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
});
