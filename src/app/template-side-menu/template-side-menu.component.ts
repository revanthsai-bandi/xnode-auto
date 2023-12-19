import { Component, OnInit } from '@angular/core';
import { routingConfig } from '../RoutingConfig';

@Component({
  selector: 'app-template-side-menu',
  templateUrl: './template-side-menu.component.html',
  styleUrls: ['./template-side-menu.component.scss']
})
export class TemplateSideMenuComponent implements OnInit {
  sidebarVisible: boolean = true;
  myRoutes: any;
  constructor() {
    this.myRoutes = routingConfig;
  }

  ngOnInit(): void {
  }
  getMeIcon(icon: any) {
    return './assets' + icon;
  }
}
