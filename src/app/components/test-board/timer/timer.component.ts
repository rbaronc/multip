import { Component, Input, OnChanges, OnDestroy, OnInit, output, SimpleChanges } from '@angular/core';
import { interval, Subscription, takeUntil, timer } from 'rxjs';

import { QUESTION_TIMER_INIT_MS, QUESTION_TIMER_SECONDS } from '../../../constants/config';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges{
  @Input() resetCount: number = 0;
  timeLeft: number = QUESTION_TIMER_SECONDS;
  private timeLeftInterval = interval(1000);
  private timeLeftSubscription: Subscription | null = null;

  onTimeUp = output<void>();

  ngOnInit() {
    this.resetTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const resets = changes['resetCount'];

    if(resets && resets.currentValue) {
      this.resetTimer();
    }
  }

  resetTimer() {
    if(this.timeLeftSubscription) {
      this.timeLeftSubscription.unsubscribe();      
    }

    this.timeLeftSubscription = this.timeLeftInterval.pipe(
      takeUntil(timer(QUESTION_TIMER_INIT_MS))
    )
    .subscribe((_) => {
      this.timeLeft -= 1;

      if(this.timeLeft === 0) {
        this.onTimeUp.emit();
        this.timeLeftSubscription?.unsubscribe();
      }
    });

    this.timeLeft = QUESTION_TIMER_SECONDS;
  }

  ngOnDestroy(): void {
    if(this.timeLeftSubscription) {
      this.timeLeftSubscription.unsubscribe();
    }
  }
}
