import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  correctAnswer: number = 0;
  falseAnswer: number = 0;

  resetDaten() {
    this.correctAnswer = 0;
    this.falseAnswer = 0;
  }

  setCorrectAnswer(canswer:number) {
    this.correctAnswer = canswer
  }

  getCorrectAnswer() {
    return this.correctAnswer
  }

  setfalseAnswer(falseAnswer:number){
    this.falseAnswer=falseAnswer;
  }
  getFalseAnswer(){
    return this.falseAnswer
  }

  

}
