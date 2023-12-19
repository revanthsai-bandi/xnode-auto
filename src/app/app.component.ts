import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UtilsService } from './utils/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]

})
export class AppComponent implements OnInit {
  title = 'angular-template';
  loading: boolean = true;

  constructor(private messageService: MessageService,
    private utils: UtilsService,
    private spinner: NgxSpinnerService) {
  }


  ngOnInit(): void {
    this.utils.getMeToastObject.subscribe((event: any) => {
      this.messageService.add(event);
    });
    this.utils.startSpinner.subscribe((event: boolean) => {
      setTimeout(() => {
        if (event) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      }, 0);
    });
  }

  onMessage(event: MessageEvent) {
    const draggedData = event.data; //JSON.parse(event.data);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  toggleMenu() {

  }

  isUserExists() {
    const isVerified = localStorage.getItem("isVerified");
    if (isVerified) {
      return JSON.parse(isVerified);
    }
  }
}
