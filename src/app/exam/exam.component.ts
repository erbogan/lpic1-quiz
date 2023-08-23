import { Component, OnInit } from '@angular/core';
import { QuizappService } from '../quizapp.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent {
  Questions: any[] = [];
  currentIndex: number = 0;
  correctAnswer: number = 0;
  falseAnswer: number = 0;
  benutzerAnswers: string[] = [];
  blabla:boolean=false;

  constructor(private service: QuizappService, private shs: SharedService) {}

  ngOnInit(): void {
    this.service.getQuestions().subscribe((data) => {
      this.Questions = data;
      console.log(this.Questions[this.currentIndex].questionType);
    });
  }

  checkanswer(benutzerantwort: string | string[]): void {
    const currentQuestion = this.Questions[this.currentIndex];
    console.log(benutzerantwort)
    console.log(currentQuestion.correctAnswer)
    
    switch (currentQuestion.questionType) {
      case 'single-choice':
        const correctAnswerSingle = currentQuestion.correctAnswer[0];
        if (benutzerantwort[0] === correctAnswerSingle) {
          this.correctAnswer++;
          console.log('Correct Answer',this.correctAnswer)
          this.benutzerAnswers.push(benutzerantwort[0]);
          this.blabla=true;
          //this.nextQuestion();
        } else {
          this.falseAnswer++;
          console.log('false Answer: ' ,this.falseAnswer);
          this.blabla=false;
        }
        break;

      case 'multiple-choice':
        if (Array.isArray(benutzerantwort)) {
          const correctAnswermulti = currentQuestion.correctAnswer[0];
          const isCorrectMulti = benutzerantwort.every((answer:string ) =>
            correctAnswermulti.includes(answer)

          );
          if (isCorrectMulti) {
            this.correctAnswer++;
            this.benutzerAnswers.push(benutzerantwort[0])
            this.blabla=true;
           
          } else {
            this.falseAnswer++;
            this.blabla=false;
          }
        }
        break;
        case 'fill-in':
          const correctFill=currentQuestion.correctAnswer[0];
          
          if (benutzerantwort===correctFill){
            this.correctAnswer++;
            this.benutzerAnswers.push(benutzerantwort[0])
            this.blabla=true;
          }
          else{
            this.falseAnswer++;
            this.blabla=false;
          }
          break;
          default :
          console.error('Unbekannte Type');
          this.blabla=false;
          break;
    }
    
  }

  nextQuestion(): void {
    if (this.blabla==true){
      this.checkanswer(this.benutzerAnswers[0])
this.currentIndex++;
    }
    else{
      this.currentIndex;
    }
    
  }
  previousQuestion() {
    this.currentIndex--;
  }
  SkipQuestion() {
    this.currentIndex++;
  }
}
