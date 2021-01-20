import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Chat} from '../../../shared/chat.model';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {ChatMessage} from '../../../shared/chat-message.model';
import {AccountService} from '../../services/account.service';
import {DatePipe} from '@angular/common';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [DatePipe]
})
export class ChatComponent implements OnInit {
  chat: Chat = {};
  myuser: Cargonaut;
  loaded = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private chatService: ChatService,
    private datepipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.accountService.userSubject.subscribe(value => this.myuser = value); // get latest user object, in case of update user or logout
    this.myuser = this.accountService.user;
    this.route.paramMap.subscribe( paramMap => {
      this.chat.id = parseFloat(paramMap.get('id'));
      this.getChat().then();
    });
  }

  async getChat(){
    this.chatService.getChat(this.chat.id).then(
      res => {
        this.chat = res;
        if (this.chat.fstMember.id !== this.myuser.id){
          this.chat.sndMember = this.myuser;
          const tmp1 = this.chat.fstMember.id;
          this.accountService.get(this.chat.fstMember.id).then(
            res2 => {
              this.chat.fstMember = res2;
              this.chat.fstMember.id = tmp1;
              this.assignAuthors();
            }
          );
        } else {
          const tmp2 = this.chat.sndMember.id;
          this.chat.fstMember = this.myuser;
          this.accountService.get(this.chat.sndMember.id).then(
            res3 => {
              this.chat.sndMember = res3;
              this.chat.sndMember.id = tmp2;
              this.assignAuthors();
            }
          );
        }
        this.loaded = true;
      }
    );
  }

  assignAuthors() {
    this.chat.messages.forEach(msg => {
      if (msg.author.id === this.chat.fstMember.id){
        msg.author = this.chat.fstMember;
      } else {
        msg.author = this.chat.sndMember;
      }
    });
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

  async sendMessage(): Promise<void> {
    const msgmsg = (document.getElementById('chat-input') as HTMLInputElement).value;
    const msg: ChatMessage = {
      message: msgmsg,
      author: this.myuser,
      sentAt: new Date (Date.now()),
      chat: this.chat
    };
    this.chatService.sendMessage(msg).then(
      res => {
        this.chat.messages.push(msg);
      }
    );
    (document.getElementById('chat-input') as HTMLInputElement).value = '';
  }
}
