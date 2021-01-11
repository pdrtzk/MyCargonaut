import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Chat} from '../../../shared/chat.model';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {ChatMessage} from '../../../shared/chat-message.model';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat: Chat;
  myuser: Cargonaut;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
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
      sentAt: new Date('2021-01-07T11:11:25+0100'),
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
      message: 'Sehr gut, ich schicke Ihnen in Kürze meine Adresse.'
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

  getTime(){

  }

}
