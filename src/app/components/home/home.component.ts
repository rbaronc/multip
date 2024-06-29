import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { StudyBoardComponent } from '../study-board/study-board.component';
import { TestBoardComponent } from '../test-board/test-board.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StudyBoardComponent, TestBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentBoard = 'None';
}
