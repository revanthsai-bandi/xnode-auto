import { Component, Inject, OnInit } from '@angular/core';
interface Screen {
  id: string;
  title: string;
  components: ComponentData[];
}

interface ComponentData {
  type: string;
  data: any;
}
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  value?: string;

  constructor(@Inject('screenData') private screenData: Screen) { }

  ngOnInit(): void {
    this.value = this.screenData?.components.find((c: any) => c.type === 'input')?.data;
  }
}
