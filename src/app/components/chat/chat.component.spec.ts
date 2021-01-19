import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import {AccountService} from '../../services/account.service';
import {ChatService} from '../../services/chat.service';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {ChatMessage} from '../../../shared/chat-message.model';
import {Chat} from '../../../shared/chat.model';
import {Subject} from 'rxjs';
import {DatePipe} from '@angular/common';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  let componentAccService: AccountService;
  let accService: AccountService;
  let accStub: Partial<AccountService>;

  let componentChatService: ChatService;
  let chatService: ChatService;
  let chatStub: Partial<ChatService>;

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
    messages: [msg]
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
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      providers: [
        { provide: AccountService, useValue: accStub },
        { provide: ChatService, useValue: chatStub },
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

    component.chat = chat;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
