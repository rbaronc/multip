import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAX_TIMES_TABLE_AVAILABLE } from '../../constants/config';
import { ExamComponent } from './exam/exam.component';


@Component({
  selector: 'app-test-board',
  standalone: true,
  imports: [CommonModule, ExamComponent],
  templateUrl: './test-board.component.html',
  styleUrl: './test-board.component.scss'
})
export class TestBoardComponent {
  timesTables:{ selected: boolean; timesTable: number; }[] = [];
  studyAll = false;
  anyTableSelected = false;
  selectedTables: number[] = [];
  examHasBegun = false;

  constructor() {
    this.timesTables = Array.from(Array(MAX_TIMES_TABLE_AVAILABLE).keys())
    .filter((_, index) => index !== 0 && index !== 9)
    .map((idx) => {
      return {
        selected: false,
        timesTable: (idx + 1)
      };
    });
  }

  public studyAllClicked() {
    this.studyAll = !this.studyAll;
    this.timesTables = this.timesTables.map(table => { 
      table.selected = this.studyAll;
      return table;
    });
    this.checkSelectedTables();
  }

  public toggleTableSelectedState(index: number) {
    this.timesTables[index].selected = !this.timesTables[index].selected;
    this.checkSelectedTables();
  }

  public checkSelectedTables() {    
    this.selectedTables = this.timesTables.filter(table => table.selected).map(table => table.timesTable);
    this.anyTableSelected = !!this.selectedTables.length;    
  }
}
