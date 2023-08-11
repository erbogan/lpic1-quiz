import { Component,OnInit} from '@angular/core';
import { QuizappService } from '../quizapp.service';


@Component({
  selector: 'app-lernphasewahlen',
  templateUrl: './lernphasewahlen.component.html',
  styleUrls: ['./lernphasewahlen.component.css']
})
export class LernphasewahlenComponent {
  constructor (private quizService:QuizappService){}
  QuizData : any[] = [];
  showFragenListe: boolean = false;
  showEinzelneFrage: boolean = false;
  currentQuestion: number = 0;

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(data => {this.QuizData=data;});
  }

  toggleFragenListe() {
    this.showFragenListe = !this.showFragenListe;
    this.showEinzelneFrage = false;
  }

  toggleEinzelneFrage() {
    this.showEinzelneFrage = !this.showEinzelneFrage;
    this.showFragenListe = false;
  }

  showPreviousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  showNextQuestion() {
    if (this.currentQuestion < this.QuizData.length - 1) {
      this.currentQuestion++;
    }
  }
  

  toggleAnswer(question: any): void {
    
    question.showAnswer = !question.showAnswer;
  }
}
