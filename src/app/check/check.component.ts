import { Component, OnInit } from '@angular/core';
import { QuizappService } from '../quizapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
})
export class CheckComponent {
  questionArrayIndex: any;
  constructor(private service: QuizappService,private router:Router) {}
  Questions: any[] = [];
  currentIndex: number = 0;
  selectedOption: string[] = [];
  correctAnswer: number = 0;
  falseAnswer: number = 0;
  a: string[] = [];

  Answers(): string[] {
    let a: string[] = [];
    for (let i = 0; i < this.Questions.length; i++) {
      if (this.Questions[i].correctAnswer) {
        a[i] = this.Questions[i].correctAnswer;
      }
    }
    return a;
  }

  ngOnInit(): void {
    this.service.getQuestions().subscribe((data) => {
      this.Questions = data;
    });
  }
  nextQuestion(): void {
    if (this.currentIndex < this.Questions.length - 1) {
      this.currentIndex++;
      this.correctAnswer++;
    }
  }
  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  SkipQuestion(): void {
    this.currentIndex++;
  }
  

  isTrue(questionArrayIndex: number, benutzerAntwort: string[]): void {
    if (this.isEqual(this.Questions[this.currentIndex].correctAnswer,benutzerAntwort)) {
      this.nextQuestion();
      
    }
    else{
this.falseAnswer++;
    }
    if (this.falseAnswer>0.2*this.Questions.length || this.currentIndex>120){
      this.router.navigate(['/result']);
    }

  }
  Gewaehlt(option: string, event: any): void {
    // Şu anki soru tipini al
    const questionType = this.Questions[this.currentIndex].questionType;
  
    if (questionType === 'fill-in') {
      // Dolgu boşluklu sorular için
      this.handleFillInQuestion(event);
    } else if (questionType === 'multiple-choice') {
      // Çoktan seçmeli sorular için
      this.handleMultipleChoiceQuestion(option, event);
      console.log(this.selectedOption)
    } else if (questionType === 'single-choice') {
      // Tekli seçenekli sorular için
      this.handleSingleChoiceQuestion(option);
    }
  }
  
  // Dolgu boşluklu sorular için bir yardımcı fonksiyon
  handleFillInQuestion(event: any): void {
    this.selectedOption = [];
    this.selectedOption.push(event.target.value);
  }
  
  // Çoktan seçmeli sorular için bir yardımcı fonksiyon
  handleMultipleChoiceQuestion(option: string, event: any): void {
    if (event.target.checked) {
      // Seçenek işaretliyse, bu seçeneği selectedOption dizisine ekle
      this.selectedOption.push(option);
    } else {
      // Seçenek işaretli değilse, bu seçeneği selectedOption dizisinden çıkar
      const index = this.selectedOption.indexOf(option);
      if (index >= 0) {
        this.selectedOption.splice(index, 1);
      }
    }
  }
  
  // Tekli seçenekli sorular için bir yardımcı fonksiyon
  handleSingleChoiceQuestion(option: string): void {
    this.selectedOption = []; // Önceki seçenekleri temizle
    this.selectedOption.push(option); // Yeni seçeneği ekle
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

  // isChoosen(qarrayind: number, num: number, optxt: string): void {
  //   this.selectedAnswer[qarrayind] = num
  //   if(this.Questions[this.currentIndex].correctAnswer[0][0] == optxt) {
  //   }
  // }
}
