import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AccountService} from '../../services/account.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatDialogModule, HttpClientModule],
      providers: [AccountService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
