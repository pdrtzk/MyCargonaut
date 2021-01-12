import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Chat} from '../../../shared/chat.model';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {ChatMessage} from '../../../shared/chat-message.model';
import {AccountService} from '../../services/account.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [DatePipe]
})
export class ChatComponent implements OnInit {
  chat: Chat = {};
  myuser: Cargonaut;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private datepipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.accountService.userSubject.subscribe(value => this.myuser = value); // get latest user object, in case of update user or logout
    this.myuser = this.accountService.user;
    this.route.paramMap.subscribe( paramMap => {
      this.chat.id = parseFloat(paramMap.get('id'));
    });

    const partner1: Cargonaut = {
      id: 14,
      firstname: 'Chatty',
      lastname: 'McChat',
    };

    const message1: ChatMessage = {
      id: 1,
      author: partner1,
      sentAt: new Date('2021-01-07T11:09:25+0100'),
      message: 'Hallo, ist das Angebot immer noch verfügbar?'
    };

    const message2: ChatMessage = {
      id: 2,
      author: this.myuser,
      sentAt: new Date('2021-01-07T11:13:25+0100'),
      message: 'Ja, welche Uhrzeit würde Sie interessieren?'
    };

    const message3: ChatMessage = {
      id: 3,
      author: partner1,
      sentAt: new Date('2021-01-07T11:15:25+0100'),
      message: 'Passt Ihnen 16 Uhr?'
    };

    const message4: ChatMessage = {
      id: 4,
      author: this.myuser,
      sentAt: new Date('2021-01-07T11:19:25+0100'),
      message: 'Ja, wäre ok.'
    };

    const message5: ChatMessage = {
      id: 5,
      author: partner1,
      sentAt: new Date('2021-01-07T11:21:25+0100'),
      message: 'Sehr gut, ich schicke Ihnen in Kürze meine Adresse.' +
          ' Dies ist eine sehr lange Nachricht. Wir müssen viel besprechen.' +
          ' Darum schreibe ich eine lange Nachricht. Aus keinem anderen Grund, wie zum Beispiel die Zeilenumbrüche zu testen.' +
          'Nichts läge mir ferner.'
    };

    const chat1: Chat = {
      id: 1,
      fstMember: this.myuser,
      sndMember: partner1,
      messages: [message1, message2, message3, message4, message5]
    };

    this.chat = chat1;
    // todo: get chat from server
  }

  getSndMember(){
    if (this.chat.fstMember.id === this.myuser.id){
      return this.chat.sndMember;
    } else {
      return this.chat.fstMember;
    }
  }

  getTime(msg: ChatMessage){
    return this.datepipe.transform(msg.sentAt, 'HH:mm');
  }

  getAlignment(msg: ChatMessage){
    if (msg.author.id === this.myuser.id){
      return 'msg-right own';
    } else {
      return 'msg-left notown';
    }
  }

  getColAlignment(msg: ChatMessage){
    if (msg.author.id === this.myuser.id){
      return 'text-right';
    } else {
      return '';
    }
  }

  isAuthorOwn(msg: ChatMessage){
    if (msg.author.id === this.myuser.id){
      return true;
    } else {
      return false;
    }
  }

  sendMessage(): void {
    const msgmsg = (document.getElementById('chat-input') as HTMLInputElement).value;
    console.log(msgmsg);
    const msg: ChatMessage = {
      message: msgmsg,
      author: this.myuser,
      sentAt: new Date (Date.now()),
      chat: this.chat
    };
    this.chat.messages.push(msg);
    // todo: send to server
  }
}
