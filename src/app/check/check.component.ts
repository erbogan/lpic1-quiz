import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuizappService } from '../quizapp.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
})
export class CheckComponent {
  questionArrayIndex: any;
  constructor(
    private service: QuizappService,
    private router: Router,
    private shs: SharedService
  ) {}

  Questions: any[] = [];
  currentIndex: number = 0;
  selectedOption: string[] = [];

  correctAnswer: number = 0;
  falseAnswer: number = 0;
  benutzerAnswers: any[] = [];

  ngOnInit(): void {
    this.service.getQuestions().subscribe((data) => {
      this.Questions = data;
      this.shs.resetDaten();
    });
  }

  nextQuestion(): void {
    if (this.currentIndex < this.Questions.length - 1) {
      this.currentIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;

      this.selectedOption = this.benutzerAnswers[this.currentIndex];
      console.log('pre selOpt:', this.selectedOption);
    }
  }

  SkipQuestion(): void {
    this.currentIndex++;
  }

  isTrue(questionArrayIndex: number, benutzerAntwort: string[]): void {
    const correctAnswer = this.Questions[this.currentIndex].correctAnswer;
    const sortedCorrectAnswer = correctAnswer.slice().sort();
    const sortedBenutzerAntwort = benutzerAntwort.slice().sort();

    if (sortedCorrectAnswer === benutzerAntwort[this.currentIndex] && this.Questions[this.currentIndex]===benutzerAntwort[this.currentIndex]) {
      this.nextQuestion();
    }

    this.benutzerAnswers[this.currentIndex] = sortedBenutzerAntwort;

    if (this.isEqual(sortedCorrectAnswer, sortedBenutzerAntwort)) {
      this.correctAnswer++;
      console.log('Falsche Antworten', this.falseAnswer);
      console.log('Richtige Antworten', this.correctAnswer);
      this.nextQuestion();
    } else {
      this.falseAnswer++;
      this.selectedOption = [];
      console.log('false: ', this.falseAnswer);
    }

    if (this.currentIndex > 120 || this.falseAnswer > 6) {
      this.router.navigate(['/result']);
    }
    this.shs.setCorrectAnswer(this.correctAnswer);
    this.shs.getCorrectAnswer();
    this.shs.setfalseAnswer(this.falseAnswer);
    this.shs.getFalseAnswer();
  }

  Gewaehlt(option: string, event: any): void {
    const questionType = this.Questions[this.currentIndex].questionType;

    if (questionType === 'fill-in') {
      this.handleFillInQuestion(event);
    } else if (questionType === 'multiple-choice') {
      this.handleMultipleChoiceQuestion(option, event);
      console.log(this.selectedOption);
    } else if (questionType === 'single-choice') {
      this.handleSingleChoiceQuestion(option);
    }
  }

  handleFillInQuestion(event: any): void {
    this.selectedOption = [];
    this.selectedOption.push(event.target.value);
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
    this.selectedOption = [];
    this.selectedOption.push(option);
  }

  isEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    const sorted1 = arr1.slice().sort();
    const sorted2 = arr2.slice().sort();

    for (let i = 0; i < sorted1.length; i++) {
      if (sorted1[i] !== sorted2[i]) {
        return false;
      }
    }
    return true;
  }

  reset(): void {
    this.selectedOption = [];
  }

  async onButtonClick() {
    const questionArrayIndex = this.currentIndex;
    const benutzerAntwort = this.selectedOption;
    const questionType = this.Questions[this.currentIndex].questionType;
    const correctAnswer = this.Questions[this.currentIndex].correctAnswer;
    const sortedCorrectAnswer = correctAnswer.slice().sort();
    const sortedBenutzerAntwort = benutzerAntwort.slice().sort();

    // Kullanıcının cevabının boş olup olmadığını, sorunun türüne göre kontrol edin
    switch (questionType) {
        case 'single-choice':
            if (benutzerAntwort.length === 0) {
                console.log('Soru boş bırakılamaz.');
                return;
            }
            break;
        case 'multiple-choice':
            // Eğer çoktan seçmeli soruysa en az 2 cevap seçilmiş olmalı
            if (benutzerAntwort.length < 2) {
                console.log('Çoktan seçmeli sorularda en az iki seçenek işaretlenmelidir.');
                return;
            }
            break;
        case 'fill-in':
            if (!benutzerAntwort[0] || benutzerAntwort[0].trim() === "") {
                console.log('Cevap boş bırakılamaz.');
                return;
            }
            break;
    }

    // Cevap kontrolü
    if (!this.isEqual(sortedCorrectAnswer, sortedBenutzerAntwort)) {
        console.log('Cevap yanlış, ilerleyemezsiniz.');
        return;
    }

    this.isTrue(questionArrayIndex, benutzerAntwort);
    console.log('vomOnbuttonClick', this.selectedOption);
    this.reset();
}

  
  
}
