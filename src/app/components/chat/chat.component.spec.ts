import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import {AccountService} from '../../services/account.service';
import {ChatService} from '../../services/chat.service';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {ChatMessage} from '../../../shared/chat-message.model';
import {Chat} from '../../../shared/chat.model';
import {Subject} from 'rxjs';
import {DatePipe, Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSpinner} from '@angular/material/progress-spinner';
import {Router, Routes} from '@angular/router';
import {By} from '@angular/platform-browser';
import {HomeComponent} from '../home/home.component';
import {ProfileComponent} from '../profile/profile.component';


describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  let componentAccService: AccountService;
  let accService: AccountService;
  let accStub: Partial<AccountService>;

  let componentChatService: ChatService;
  let chatService: ChatService;
  let chatStub: Partial<ChatService>;

  let location: Location;
  let router: Router;

  const user: Cargonaut = {
    id: 12,
    firstname: 'Test',
    lastname: 'Cargonaut',
    birthday: new Date('1990-12-12'),
    email: 'test@test.de'
  };

  const user1: Cargonaut = {
    id: 21,
    firstname: 'Chat',
    lastname: 'Partner',
    birthday: new Date('1990-12-12'),
  };

  const msg: ChatMessage = {
    id: 1,
    message: 'Hallo',
    author: {
      id: 21
    },
    sentAt: new Date(Date.now()),
    chat: {
      id: 1
    }
  };

  const msg2: ChatMessage = {
    id: 2,
    message: 'Wie geht es?',
    author: {
      id: 12
    },
    sentAt: new Date(Date.now()),
    chat: {
      id: 1
    }
  };

  const chat: Chat = {
    id: 1,
    fstMember: {
      id: 12,
      firstname: user.firstname,
      lastname: user.lastname
    },
    sndMember: {
      id: 21,
      firstname: user1.firstname,
      lastname: user1.lastname
    },
    messages: [msg, msg2]
  };

  const userSubject: Subject<Cargonaut> = new Subject<Cargonaut>();

  accStub = {
    userSubject,
    get user() {
      return user;
    },
    isLoggedIn() {
      return Promise.resolve(true);
    },
    get(cargonautId: number){
      return Promise.resolve(user1);
    },
  };

  chatStub = {
    async getAllChatsForUser(cargonautId: number): Promise<Chat[]> {
      const chats: Chat[] = [];
      chats.push(chat);
      return Promise.resolve(chats);
    },
    sendMessage(cmsg: ChatMessage): Promise<boolean> {
      return Promise.resolve(true);
    },
    getChat(chatId: number) {
      return Promise.resolve(chat);
    }
  };
  const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'profile/:id', component: ProfileComponent},
    ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent, MatSpinner ],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: AccountService, useValue: accStub },
        { provide: ChatService, useValue: chatStub },
        DatePipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;


    accService = fixture.debugElement.injector.get(AccountService);
    componentAccService  = accService;
    accService = TestBed.inject(AccountService);

    componentAccService.userSubject = new Subject<Cargonaut>();
    componentAccService.userSubject.next(
      {
        id: 12,
        firstname: 'Test',
        lastname: 'Cargonaut',
        birthday: new Date('1990-12-12'),
        email: 'test@test.de'
      }
    );

    chatService = fixture.debugElement.injector.get(ChatService);
    componentChatService  = chatService;
    chatService = TestBed.inject(ChatService);

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    component.chat = chat;
    component.loaded = true;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.chat.messages = [msg, msg2];
    component.loaded = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking the partner\'s name should lead to their profile', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#name').innerHTML).toContain('Chat Partner');
    fixture.ngZone.run(() => {
      compiled.querySelector('#name').click();
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/profile/21');
    });
  }));

  it('own messages should be discernible from the partner\'s messages', () => {
    const compiled = fixture.debugElement.nativeElement;
    const msgs = compiled.querySelectorAll('.msg-container');
    expect(msgs.length).toEqual(2); // two - one for each chat message
    expect(msgs[0].classList).toContain('msg-left');
    expect(msgs[1].classList).toContain('msg-right');
  });

  it('all messages should be displayed', () => {
    const compiled = fixture.debugElement.nativeElement;
    const msgs = compiled.querySelectorAll('.chat-row');
    expect(msgs.length).toEqual(2); // two rows - one for each chat message
    expect(msgs[0].innerHTML).toContain(msg.message);
    expect(msgs[1].innerHTML).toContain(msg2.message);
  });

  it('if there are no messages yet, the user should be told so', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#noMsg')).toBeNull();
    component.chat.messages = [];
    fixture.detectChanges();
    expect(compiled.querySelector('#noMsg')).not.toBeNull();
  });

  it('after sending a message, the new message should be displayed and the input field should be cleared', fakeAsync(() => {
    const newMsg = 'Gut.';
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('#chat-input').value = newMsg;
    compiled.querySelector('#send-msg-btn').click();
    tick();
    fixture.detectChanges();
    expect(component.chat.messages.length).toEqual(3);
    expect(component.chat.messages[2].message).toEqual(newMsg);
    expect(compiled.querySelectorAll('.chat-row').length).toEqual(3); // three rows - one for each chat message
    expect(compiled.querySelector('#chat-input').innerHTML).toEqual('');
  }));

});
