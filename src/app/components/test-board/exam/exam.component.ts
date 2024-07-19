import { Component, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MAX_TIMES_TABLE_AVAILABLE } from '../../../constants/config';
import { Question } from '../../../types/question.type';

import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, QuestionComponent],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent implements OnChanges{
  @Input() tables: number[] = [];
  questions:Question[] = [];
  currentQuestionIndex = 0;
  givenAnswer: number | null = null;  
  nextAvailable = false;
  displayResults = false;
  
  onQuitExam = output<void>();
  onChangeTimesTables = output<void>();

  ngOnChanges(changes: SimpleChanges): void {
    const tables = changes['tables'];    

    if(tables && tables.currentValue) {
      this.nextAvailable =  true;
      this.shuffleQuestionsArray();
    }
  }

  getQuestionResultText(question: Question): string {
    return `${question.multiplicand}X${question.multiplier} = ${question.givenAnswer === null? 'Sin respuesta': question.givenAnswer }: ${question.result? 'Correcto': 'Incorrecto'}`;
  }

  handleShowNextQuestion(givenAnswer:number | null) {
    this.evaluateAnswer(givenAnswer);
    this.currentQuestionIndex++;
    this.nextAvailable = this.currentQuestionIndex < this.questions.length - 1;
  }

  handleCalculateResults(givenAnswer:number | null) {
    this.evaluateAnswer(givenAnswer);
    this.nextAvailable = false;
    this.displayResults = true;
  }

  quitExam() {
    this.onQuitExam.emit();
  }

  retryTest() {
    this.shuffleQuestionsArray();
    this.displayResults = false;
    this.currentQuestionIndex = 0;
    this.nextAvailable = true;
  }

  takeAnotherTest() {
    this.onChangeTimesTables.emit();
  }

  private shuffleQuestionsArray() {
    this.questions = Array(this.tables.length * MAX_TIMES_TABLE_AVAILABLE);
    const availableNumbers = Array.from(this.questions.keys());

    for(let i = 0; i < this.tables.length; i++) {
      const multiplicand = this.tables[i];
      for(let j = 0; j < MAX_TIMES_TABLE_AVAILABLE; j++) {
        const multiplier = j+1;
        const availableIndex = this.getRandomNumberInRange(availableNumbers.length);
        const questionIndex = availableNumbers[availableIndex];

        availableNumbers.splice(availableIndex, 1);
        
        this.questions[questionIndex] = {
          multiplicand,
          multiplier,
          text: `${multiplicand}X${multiplier}= ?`,
          rightAnswer: multiplicand * multiplier,
          givenAnswer: null,
          result: null
        };
      }
    }
  }

  private getRandomNumberInRange(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private evaluateAnswer(givenAnswer: number | null) {
    if(this.currentQuestionIndex < this.questions.length) {
      this.questions[this.currentQuestionIndex].givenAnswer = givenAnswer;
      this.questions[this.currentQuestionIndex].result = this.questions[this.currentQuestionIndex].rightAnswer == givenAnswer;
    }
  }
}
