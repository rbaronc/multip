import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-times-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './times-table.component.html',
  styleUrl: './times-table.component.scss'
})
export class TimesTableComponent implements OnChanges{
  @Input() timesTable: number = 0;
  public timesTableRows: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {    
    const timesTable = changes['timesTable'];
    if(timesTable && timesTable.currentValue) {
      this.timesTableRows = Array.from(Array(10).keys()).map((_, idx) => {
        const currentDigit = idx + 1;
        return `${this.timesTable} X ${currentDigit} = ${currentDigit*this.timesTable}`;
      });
    }
  }

}
