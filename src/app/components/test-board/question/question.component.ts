import { Component, Input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TimerComponent } from '../timer/timer.component';
import { Question } from '../../../types/question.type';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule, TimerComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  givenAnswer: number | null = null;
  timerResetCount: number = 0;

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
  
  onCalculateResults = output<number | null>();
  onShowNextQuestion = output<number| null>();

  showNextQuestion() {
    this.onShowNextQuestion.emit(this.givenAnswer);
    this.givenAnswer = null;
    this.timerResetCount++;
  }

  calculateResults() {
    this.onCalculateResults.emit(this.givenAnswer);
    this.givenAnswer = null;
  }

  handleTimeUp() {
    if(!this.nextAvailable && !this.displayResults) {
      this.calculateResults();
    } else {
      this.showNextQuestion();
    }
  }

}
