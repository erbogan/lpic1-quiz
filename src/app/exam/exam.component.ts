import { Component, OnInit } from '@angular/core';
import { QuizappService } from '../quizapp.service';
import { SharedService } from '../shared.service';
import { Route, Router } from '@angular/router';

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

 

  constructor(
    private service: QuizappService,
    private shs: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getQuestions().subscribe((data) => {
      this.Questions = data;
      console.log(this.Questions[this.currentIndex].questionType);
    });
  }
  DoArray(option: string, event: any): string[] {
    const questionType = this.Questions[this.currentIndex].questionType;
  
    if (questionType === 'multiple-choice') {
        this.handleMultipleChoiceQuestion(option, event);
        console.log(this.benutzerAnswers);
    }
  
    return this.benutzerAnswers;  // geri dönüş değerini ekledik
}

handleMultipleChoiceQuestion(option: string, event: any): string[] {
    if (event.target.checked) {
        this.benutzerAnswers.push(option);
    } else {
        const index = this.benutzerAnswers.indexOf(option);
        if (index >= 0) {
            this.benutzerAnswers.splice(index, 1);
        }
    }
    
    return this.benutzerAnswers;  // geri dönüş değerini ekledik
}

  

  checkanswer(benutzerantwort: string | string[]): void {
    const currentQuestion = this.Questions[this.currentIndex];

    switch (currentQuestion.questionType) {
      case 'single-choice':
        console.log(currentQuestion.questionType)
        const correctAnswerSingle = currentQuestion.correctAnswer[0];
        if (benutzerantwort[0] === correctAnswerSingle) {
          this.correctAnswer++;
          console.log('Correct Answer', this.correctAnswer);
          this.benutzerAnswers.push(benutzerantwort[0]);
          console.log('Array Benutzer Antwort', benutzerantwort);

          // console.log(benutzerantwort)
          console.log(
            'benutzer Answer: ',
            benutzerantwort,
            'System antwort',
            correctAnswerSingle
          );
          console.log(
            'correct Answer: ',
            this.correctAnswer,
            'False Answer',
            this.falseAnswer
          );
        } else {
          this.falseAnswer++;

          console.log(
            'benutzer Answer: ',
            benutzerantwort,
            'System antwort',
            correctAnswerSingle
          );
          console.log(
            'correct Answer: ',
            this.correctAnswer,
            'False Answer',
            this.falseAnswer
          );
        }
        break;

      case 'multiple-choice':
        console.log('kullanici cevabi',benutzerantwort)
        console.log(currentQuestion.questionType)
        if (Array.isArray(benutzerantwort)) {
          const correctAnswermulti = currentQuestion.correctAnswer;
          const isCorrectMulti = benutzerantwort.every((answer: string) =>
            correctAnswermulti.includes(answer),
            );
            
            
            if (isCorrectMulti) {
              this.correctAnswer++;
              this.benutzerAnswers.push(benutzerantwort[0]);
              console.log('multi Benutzer Antwort',benutzerantwort,'multi System Antwort',correctAnswermulti,'\nCorrect answer vom multi',this.correctAnswer,'Falsce anstwort vom multi',this.falseAnswer)

          } else {
            this.falseAnswer++;

          }
        }
        break;
      case 'fill-in':
        console.log(currentQuestion.questionType)
        const correctFill = currentQuestion.correctAnswer[0];
        console.log('System cevabi:',correctFill);
        console.log('Kullanici cevabi',benutzerantwort)

        if (benutzerantwort === correctFill) {
          this.correctAnswer++;
          console.log('Dogru Cevap Sayisi:',this.correctAnswer)
          this.benutzerAnswers.push(benutzerantwort[0]);
 
        } else {
          this.falseAnswer++;
          console.log('Yanlis Cevap Sayisi:',this.falseAnswer)
   
        }
        break;
      default:
        console.error('Unbekannte Type');
        break;
    }
  }

  nextQuestion(): void {
   
      this.currentIndex++;

    if (this.falseAnswer > 14) {
      console.log('False answers exceeded 14:', this.falseAnswer);
      this.router.navigate(['/result']);
    }
  }
  previousQuestion() {
    this.currentIndex--;
  }
  SkipQuestion() {
    this.currentIndex++;
  }
}
