import { Component, OnInit } from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType
} from 'angular-gridster2';
import { LAYOUT_COLUMNS } from '../constants/LayoutColumns';

@Component({
  selector: 'app-template-builder',
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.scss']
})
export class TemplateBuilderComponent implements OnInit {
  options: GridsterConfig = {};
  dashboard?: Array<GridsterItem>;
  layoutColumns: any;
  isMenuOpen!: boolean;
  constructor() { }

  ngOnInit(): void {

  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
