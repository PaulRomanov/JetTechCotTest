import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../../../core-module/common-util/global-service';

@Component({
  selector: 'app-spread-lesson',
  templateUrl: './spread-lesson.component.html',
  styleUrls: ['./spread-lesson.component.scss']
})
export class SpreadLessonComponent implements OnInit {
  spreadMode;
  constructor(
    public $GlobalService: GlobalService,
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.spreadMode = parseInt(sessionStorage.getItem('spreadMode'));
  }

}
