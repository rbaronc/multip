import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { StudyBoardComponent } from '../study-board/study-board.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, StudyBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentBoard = 'None';
}
