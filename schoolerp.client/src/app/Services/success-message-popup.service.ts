import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuccessMessagePopupService implements OnDestroy {

  private messagesSubject = new BehaviorSubject<any[]>([]);
  private showPopupSubject = new BehaviorSubject<boolean>(false);
  public messages$ = this.messagesSubject.asObservable();
  public showSuccessPopup$ = this.showPopupSubject.asObservable();

  constructor(private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.clearMessages();   
      }
    });
  }

  addMessage(type: string, content: string) {
    const currentMessages = this.messagesSubject.getValue();
    const messageExists = currentMessages.some(msg => msg.content === content);

    console.log('Adding message:', type, content);

    if (!messageExists) {
      currentMessages.push({ type, content });
      this.messagesSubject.next(currentMessages);

      this.showPopupSubject.next(true);

      setTimeout(() => {
        this.closeMessage(0);
      }, 30000);
    }
  }

  closeMessage(index: number) {
    const currentMessages = this.messagesSubject.getValue();
    currentMessages.splice(index, 1);
    this.messagesSubject.next(currentMessages);

    if (currentMessages.length === 0) {
      this.showPopupSubject.next(false);
    }
  }
   
  clearMessages() {
    this.messagesSubject.next([]);
    this.showPopupSubject.next(false);
  }

  ngOnDestroy() {
    this.clearMessages();  
  }

}
