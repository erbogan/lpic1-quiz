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
  constructor(
    private service: QuizappService,
    private router: Router,
    private shs: SharedService
  ) { }

  Questions: any[] = [];
  currentIndex: number = 0;
  selectedOption: string[] = [];
  correctAnswer: number = 0;
  falseAnswer: number = 0;
  benutzerAnswers: any[] = [];
  IsAnswertd:boolean=false;


  IsAnswered(): boolean {
    return this.benutzerAnswers[this.currentIndex] && this.benutzerAnswers[this.currentIndex].length > 0;
  }
  
  

  ngOnInit(): void {
    this.service.getQuestions().subscribe((data) => {
      this.Questions = data;
      this.shs.resetDaten();
    });
  }

  
  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedOption = this.benutzerAnswers[this.currentIndex] || [];
      console.log('pre selOpt:', this.selectedOption);

    }
  }


  SkipQuestion(): void {
    this.currentIndex++;
  }


  answeredIndexes: any[] = [];

  isTrue(questionArrayIndex: number, benutzerAntwort: string[]): void {
    const sortedBenutzerAntwort = benutzerAntwort.slice().sort();

    // Eğer bu soruya daha önce cevap verildiyse ve cevap değişmemişse
    const previousAnswer = this.answeredIndexes.find(ai => ai.index === this.currentIndex);
    if (previousAnswer && this.isEqual(previousAnswer.answer, sortedBenutzerAntwort)) {
        this.nextQuestion();
        return;
    }

    // Eğer kullanıcı cevabı boş ise ve bu soru daha önce doğru olarak cevaplandıysa, kontrolü atla
    if (benutzerAntwort.length === 0 && previousAnswer && this.isEqual(previousAnswer.answer, this.Questions[this.currentIndex].correctAnswer)) {
        this.nextQuestion();
        return;
    }

    // Soruya verilen yeni cevabı saklayın
    if (previousAnswer) {
        previousAnswer.answer = sortedBenutzerAntwort;
    } else {
        this.answeredIndexes.push({ index: this.currentIndex, answer: sortedBenutzerAntwort });
    }

    const correctAnswer = this.Questions[this.currentIndex].correctAnswer;
    const sortedCorrectAnswer = correctAnswer.slice().sort();

    if (this.benutzerAnswers.length > questionArrayIndex) {
        this.benutzerAnswers[questionArrayIndex] = sortedBenutzerAntwort;
    } else {
        this.benutzerAnswers.push(sortedBenutzerAntwort);
    }

    if (this.isEqual(sortedCorrectAnswer, sortedBenutzerAntwort)) {
        if (!this.benutzerAnswers.includes(this.currentIndex)) {
            this.correctAnswer++;
            console.log('Dogru cevap Sayisi', this.correctAnswer);
        }
    } else {
        this.falseAnswer++;
        console.log('Yanlis cevap Sayisi', this.falseAnswer);
    }

    console.log('kullanici cevabi:', benutzerAntwort); // Bu log, doğru veya yanlış cevap kontrolünden sonra yazdırıldı

    if (this.currentIndex >= 120 || this.falseAnswer > this.Questions.length * 0.2) {
        this.router.navigate(['/result']);
    }

    this.nextQuestion();

    this.shs.setCorrectAnswer(this.correctAnswer);
    this.shs.setfalseAnswer(this.falseAnswer);
}

  

  Gewaehlt(option: string, event: any): void {
    const questionType = this.Questions[this.currentIndex].questionType;

    if (questionType === 'fill-in') {
      this.handleFillInQuestion(event);
    } else if (questionType === 'multiple-choice') {
      this.handleMultipleChoiceQuestion(option, event);
    } else if (questionType === 'single-choice') {
      this.handleSingleChoiceQuestion(option);
    }
  }

  handleFillInQuestion(event: any): void {
    this.selectedOption = [event.target.value];
  }

  handleMultipleChoiceQuestion(option: string, event: any): void {
    if (event.target.checked) {
      this.selectedOption.push(option);
    } else {
      const index = this.selectedOption.indexOf(option);
      if (index >= 0) {
        this.selectedOption.splice(index, 1);
      }
    }
  }

  handleSingleChoiceQuestion(option: string): void {
    this.selectedOption = [option];
  }

  isEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = arr1.slice().sort();
    const sorted2 = arr2.slice().sort();
    for (let i = 0; i < sorted1.length; i++) {
      if (sorted1[i] !== sorted2[i]) return false;
    }
    return true;
  }

  reset(): void {
    this.selectedOption = [];
  }

  async onButtonClick() {
    const questionArrayIndex = this.currentIndex;
    const benutzerAntwort = this.selectedOption;
    await this.isTrue(questionArrayIndex, benutzerAntwort);
    this.reset();
  }

  nextQuestion(): void {
    if (this.currentIndex < this.Questions.length - 1) {
      this.currentIndex++;
      this.selectedOption = this.benutzerAnswers[this.currentIndex] || [];

    }
  }
}