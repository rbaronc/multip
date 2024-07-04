import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Question } from '../../../types/question.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  givenAnswer: number|null = null;
  
  @Input() totalQuestions: number = 0;
  @Input() question: Question = {
    text: '',
    multiplicand: 0,
    multiplier:0,
    givenAnswer: null,
    result: null,
    rightAnswer: 0
  };
  @Input() nextAvailable: boolean = false;
  @Input() displayResults: boolean = false;
  
  onCalculateResults = output<number>();
  onShowNextQuestion = output<number>();

  showNextQuestion() {
    this.onShowNextQuestion.emit(this.givenAnswer || 0);
    this.givenAnswer = null;
  }

  calculateResults() {
    this.onCalculateResults.emit(this.givenAnswer || 0);
    this.givenAnswer = null;
  }

}
