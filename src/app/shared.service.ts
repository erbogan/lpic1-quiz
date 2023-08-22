import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  correctAnswer: number = 0;
  falseAnswer: number = 0;
  Der_Fragen_Zahl: number = 120;

  resetDaten() {
    this.correctAnswer = 0;
    this.falseAnswer = 0;
    this.Der_Fragen_Zahl = 120;
  }

  setCorrectAnswer(canswer:number) {
    this.correctAnswer = canswer
  }

  getCorrectAnswer() {
    return this.correctAnswer
  }

  
  // private correctAnswerSource = new BehaviorSubject<number>(0);
  // private falseAnswerSource = new BehaviorSubject<number>(0);
  // private Der_Fragen_ZahlSource = new BehaviorSubject<number>(0);

  // correctAnswer$ = this.correctAnswerSource.asObservable();
  // falseAnswer$ = this.falseAnswerSource.asObservable();
  // Der_Fragen_Zahl$ = this.Der_Fragen_ZahlSource.asObservable();

  // updateCorrectAnswer(value: number) {
  //   this.correctAnswerSource.next(value);
  // }

  // updateFalseAnswer(value: number) {
  //   this.falseAnswerSource.next(value);
  // }

  // updateDer_Fragen_Zahl(value: number) {
  //   this.Der_Fragen_ZahlSource.next(value);
  // }
}
