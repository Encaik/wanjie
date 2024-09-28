import { Component, OnInit } from '@angular/core';
import { MethodBook, MethodConfig } from '@models';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-method',
  standalone: true,
  imports: [NzCardModule],
  templateUrl: './method.component.html',
  styleUrl: './method.component.less'
})
export class MethodComponent implements OnInit {
  mothodConfig: MethodConfig = {
    methods: new Map()
  };

  ngOnInit() {}
}
