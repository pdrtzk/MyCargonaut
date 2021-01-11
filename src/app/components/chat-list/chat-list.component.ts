import { Component, OnInit } from '@angular/core';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {AccountService} from '../../services/account.service';
import {Chat} from '../../../shared/chat.model';
import {ChatMessage} from '../../../shared/chat-message.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  myuser: Cargonaut = {}; // the logged in user
  chats: Chat[] = [];

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.userSubject.subscribe(value => this.myuser = value); // get latest user object, in case of update user or logout
    console.log(this.accountService.isLoggedIn()); // get newest user after
    this.myuser = this.accountService.user;
    // todo: get chats for this user

    const partner1: Cargonaut = {
      id: 14,
      firstname: 'Chatty',
      lastname: 'McChat',
    };

    const partner2: Cargonaut = {
      id: 16,
      firstname: 'Chad',
      lastname: 'Chadding'
    };

    const message1: ChatMessage = {
      id: 1,
      author: partner1,
      sentAt: new Date('2021-01-01T08:44:29+0100'),
      message: 'Hallo'
    };

    const message2: ChatMessage = {
      id: 2,
      author: partner2,
      sentAt: new Date('2021-01-07T11:13:25+0100'),
      message: 'Hi, ist das Angebot immer noch verfügbar?'
    };

    const chat1: Chat = {
      id: 1,
      fstMember: this.myuser,
      sndMember: partner1,
      messages: [message1]
    };

    const chat2: Chat = {
      id: 2,
      fstMember: this.myuser,
      sndMember: partner2,
      messages: [message2]
    };

    message1.chat = chat1;
    message2.chat = chat2;

    this.chats = [chat1, chat2];

    // todo: sort by date
  }

  getLastMessage(c: Chat): string{
    return c.messages[c.messages.length - 1].message;
  }

  getLastMessageInOrOut(c: Chat): boolean {
    // true if received, false if sent
    return c.messages[c.messages.length - 1].author.id === this.myuser.id;
  }

  getSndMember(c: Chat){
    if (c.fstMember.id === this.myuser.id){
      return c.sndMember;
    } else {
      return c.fstMember;
    }
  }

  removeChat(c: Chat){
    // todo: remove from server
    console.log(c.id);
    const index = this.chats.findIndex(s => s.id === c.id);
    console.log(index);
    if (index > -1) {
      this.chats.splice(index, 1);
    }
  }
}
