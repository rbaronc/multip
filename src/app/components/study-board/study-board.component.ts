import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAX_TIMES_TABLE_AVAILABLE } from '../../constants/config';
import { TimesTableComponent } from './times-table/times-table.component';

@Component({
  selector: 'app-study-board',
  standalone: true,
  imports: [CommonModule, TimesTableComponent],
  templateUrl: './study-board.component.html',
  styleUrl: './study-board.component.scss'
})
export class StudyBoardComponent {
  timesTables = Array.from(Array(MAX_TIMES_TABLE_AVAILABLE).keys()).map((idx) => {
    return {
      isActive: idx === 0,
      timesTable: (idx + 1)
    };
  });
  currentActiveTimesTableIndex = 0;

  public setTimesTableAsActive(index: number): void {
    if (index === this.currentActiveTimesTableIndex) {
      return;
    }

    this.timesTables[this.currentActiveTimesTableIndex].isActive = false;
    this.timesTables[index].isActive = true;
    this.currentActiveTimesTableIndex = index;
  }
}
