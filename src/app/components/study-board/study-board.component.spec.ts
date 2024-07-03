import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyBoardComponent } from './study-board.component';

describe('StudyBoardComponent', () => {
  let component: StudyBoardComponent;
  let fixture: ComponentFixture<StudyBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
