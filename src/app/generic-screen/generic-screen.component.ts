import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LAYOUT_COLUMNS } from '../constants/LayoutColumnDemo';
import {
  CompactType,
  GridsterConfig,
  GridType
} from 'angular-gridster2';
import { ApiService } from '../api/api.service';
import { LINE_CHART_OPTIONS, PIE_OPTIONS } from '../constants/ChartsConfig';
import { Table } from 'primeng/table';
import Chart from 'chart.js/auto';
import { UserUtil, User } from '../utils/user-util';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../utils/utils.service';


@Component({
  selector: 'app-generic-screen',
  templateUrl: './generic-screen.component.html',
  styleUrls: ['./generic-screen.component.scss']
})

export class GenericScreenComponent implements OnInit {
  @ViewChild('piehartCanvas') piehartCanvas!: ElementRef;
  piechart: Chart<'doughnut', number[], string> | undefined;
  @ViewChild('linechartCanvas') linechartCanvas!: ElementRef;
  linechart: Chart<'line', number[], string> | undefined;
  formFields?: any[];
  layoutColumns: any;
  gridsterOptions: GridsterConfig = {};
  dashboard?: any;
  gridstarData: any;
  pieOptions: any;
  piedata: any;
  linegraphoptions: any;
  linedata: any;
  email: any;
  product_id: any;
  isVerified: any;
  linechartfilteroptions: any;
  selectedOption: undefined;
  currentUser?: any;
  targetUrl?: any;
  has_insights?: any;
  parentData: any;
  insideXnode: boolean = false;

  constructor(private route: ActivatedRoute,
    private utils: UtilsService,
    private apiService: ApiService, private router: Router,) {
    this.currentUser = UserUtil.getCurrentUser();
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams['embedded']) {
      this.insideXnode = true;
    }
    const storedProductId = localStorage.getItem('product_id');
    const product_id = storedProductId !== null ? storedProductId : environment.productId;
    if (product_id) {
      this.product_id = product_id;
    }
    this.getEmailAndProducrIdFromParams();
  }

  getEmailAndProducrIdFromParams(): void {
    this.route.queryParams.subscribe(params => {
      let queryParams = params;
      this.email = queryParams['email'];
      this.targetUrl = queryParams['targetUrl'];
      this.has_insights = queryParams['has_insights'];
      this.isVerified = queryParams['isVerified'];
      let userId = queryParams['userId'];
      localStorage.setItem('isVerified', 'true');
      this.product_id = queryParams['id'];
      // if (!this.product_id) {
      //   this.product_id = queryParams['id'];
      // }
      localStorage.setItem('currentUser', JSON.stringify({ email: this.email, record_id: this.product_id, user_id: userId }));
    });


    if (JSON.parse(this.has_insights) && this.isVerified) {
      this.utils.loadSpinner(true);
      this.getMeDashboardData();
    }
    else {
      this.utils.loadSpinner(false);
    }

  }
  isValueArray(value: any): boolean {
    return Array.isArray(value);
  }

  getMeDashboardData(): void {
    let url: string;
    if (this.email && this.product_id) {
      url = 'retrive_dashboards/' + this.email + '/' + this.product_id;
    } else {
      url = 'retrive_dashboards/' + this.currentUser?.email + "/" + this.product_id
    }
    this.apiService.get(url).then((response: any) => {
      if (response?.status === 200) {
        this.parentData = {
          "activityTypeId": 'GET_DASHBOARD_DATA_GENERIC_SCREEN',
          "attemptcount": 1,
          "userId": this.currentUser?.user_id,
          "attemptSuccess": 'SUCCESS',
          "userEmail": this.email,
          "productId": this.product_id,
          "user_audit_body": {
            'method': 'GET',
            'url': response?.request?.responseURL
          }
        }
        window.parent.postMessage({ message: 'retrive_dashboard_generic_screen', data: this.parentData }, this.targetUrl);
        this.gridstarData = response.data;
        this.setChatOptionsAndLayout();
      } else {
        this.parentData = {
          "activityTypeId": 'GET_DASHBOARD_DATA_GENERIC_SCREEN',
          "attemptcount": 1,
          "userId": this.currentUser?.user_id,
          "attemptSuccess": 'FAILED',
          "userEmail": this.email,
          "productId": this.product_id,
          "user_audit_body": {
            'method': 'GET',
            'url': response?.request?.responseURL
          }
        }
        window.parent.postMessage({ message: 'retrive_dashboard_generic_screen', data: this.parentData }, this.targetUrl);
        this.utils.loadToaster({ severity: 'error', summary: 'ERROR', detail: response.data.detail, life: 3000 });
      }
      this.utils.loadSpinner(false);
    }).catch(error => {
      this.parentData = {
        "activityTypeId": 'GET_DASHBOARD_DATA_GENERIC_SCREEN',
        "attemptcount": 1,
        "userId": this.currentUser?.user_id,
        "attemptSuccess": 'FAILED',
        "userEmail": this.email,
        "productId": this.product_id,
        "user_audit_body": {
          'method': 'GET',
          'url': error?.request?.responseURL
        }
      }
      window.parent.postMessage({ message: 'retrive_dashboard_generic_screen', data: this.parentData }, this.targetUrl);
      this.utils.loadToaster({ severity: 'error', summary: 'ERROR', detail: error, life: 3000 });
      this.utils.loadSpinner(false);
    });
  }

  clear(table: Table) {
    table.clear();
  }

  setChatOptionsAndLayout(): void {
    this.setGridstarOptions();
    this.setGridstarLayout();
    this.setChatsOptions();
  }

  setChatsOptions(): void {
    this.linegraphoptions = LINE_CHART_OPTIONS;
    this.pieOptions = PIE_OPTIONS;
  }

  setGridstarLayout() {
    this.layoutColumns = LAYOUT_COLUMNS;
    this.dashboard = LAYOUT_COLUMNS.CONTAINER;
    this.gridstarData.map((item: any) => {
      this.dashboard.map((layoutItem: any) => {
        if (layoutItem.type === item.type) {
          if (layoutItem.type === "pie_chart" && item?.value?.data) {
            this.piedata = item?.value?.data
          }
          if (layoutItem.type == "line_plot" && item?.value?.data) {
            this.linedata = item?.value?.data;
          }
          item.cols ??= layoutItem?.cols;
          item.rows ??= layoutItem?.rows;
          item.y ??= layoutItem?.y;
          item.x ??= layoutItem?.x;
        }
      })
    });
  }

  setGridstarOptions(): void {
    this.gridsterOptions = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      maxCols: 6,
      maxRows: 10,
      resizable: {
        enabled: true
      },
      pushItems: true,
      draggable: {
        enabled: true
      }
    };
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.linechart = new Chart<'line', number[], string>(
        this.linechartCanvas?.nativeElement,
        {
          type: 'line',
          data: this.linedata,
          options: this.linegraphoptions,
        }
      );
    }, 3000)
    setTimeout(() => {
      this.piechart = new Chart<'doughnut', number[], string>(
        this.piehartCanvas?.nativeElement,
        {
          type: 'doughnut',
          data: this.piedata,
          options: this.pieOptions,

        }
      );
    }, 3000)
  }

  onFilterChange(filterValue: string) {
  }
}

