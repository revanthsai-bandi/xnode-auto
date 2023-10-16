import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment'
@Component({
  selector: 'app-template-header',
  templateUrl: './template-header.component.html',
  styleUrls: ['./template-header.component.scss']
})
export class TemplateHeaderComponent implements OnInit {
  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();
  appName?: string;
  logoutDropdown: any;
  items: any;
  productId: any;
  constructor(private router: Router, private route: ActivatedRoute) { }
  isMenuOpen = false;
  profileVisible: boolean = true;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      let queryParams = params;
      let targetUrl = queryParams['targetUrl'];
      this.profileVisible = !(targetUrl === environment.targetUrl);
      this.productId = queryParams.id;
    });
    this.logoutDropdown = [
      {
        label: 'Logout',
        command: () => {
          localStorage.clear();
          setTimeout(() => {
            this.router.navigate(['/'], {
              relativeTo: this.route,
              queryParams: { product_id: this.productId },
            });
          }, 1000);
        }
      },
    ];
  }

  toggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleMenu.emit();
  }

}
