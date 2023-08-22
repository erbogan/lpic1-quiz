  import { Component, OnInit,Output,EventEmitter} from '@angular/core';
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
      private router:Router,
      private shs: SharedService) {}

    Questions: any[] = [];
    currentIndex: number = 0;
    selectedOption: string[] = [];
    
    correctAnswer: number = 0;
    falseAnswer: number = 0;
    Der_Fragen_Zahl: number=0;
    benutzerAnswers:any[]=[];

     
    ngOnInit(): void {
      this.service.getQuestions().subscribe((data) => {
        this.Questions = data;
        this.shs.resetDaten()
        this.correctAnswer = this.shs.getCorrectAnswer()
      });
    }
    nextQuestion(): void {
      if (this.currentIndex < this.Questions.length - 1) {
        this.currentIndex++;
        this.correctAnswer++;
        this.selectedOption = this.benutzerAnswers[this.currentIndex];
        console.log('correct',this.correctAnswer)
      }
    }

    previousQuestion(): void {
      // Önceki soruya geri dön
      if (this.currentIndex > 0) {
          this.currentIndex--;
  
          // Önceki soruya ait kullanıcının cevabını `selectedOption` değişkenine ata
          this.selectedOption = this.benutzerAnswers[this.currentIndex];
          console.log('pre selOpt:',this.selectedOption)
          // if (this.benutzerAnswers[this.currentIndex]) {
          // } else {
          //     // Kullanıcı önceki soruya cevap vermemişse, seçili seçeneği sıfırla
          //     // this.benutzerAnswers[this.currentIndex] = null;
          // }
      }
  }
  
    
    SkipQuestion(): void {
      this.currentIndex++;
    }
    

    isTrue(questionArrayIndex: number, benutzerAntwort: string[]): void {
      const correctAnswer = this.Questions[this.currentIndex].correctAnswer;
      const sortedCorrectAnswer = correctAnswer.slice().sort();
      const sortedBenutzerAntwort = benutzerAntwort.slice().sort();
    
      // Bu kısmı güncelledim
      if (this.benutzerAnswers.length > questionArrayIndex) {
        this.benutzerAnswers[questionArrayIndex] = sortedBenutzerAntwort;
      } else {
        this.benutzerAnswers.push(sortedBenutzerAntwort);
      }
      console.log('BenutzerAnswers:', this.benutzerAnswers);
    
      // Şimdi sıralanmış dizileri karşılaştırıyoruz
      if (this.isEqual(sortedCorrectAnswer, sortedBenutzerAntwort)) {
        this.nextQuestion();
      } else {
        this.falseAnswer++;
        this.selectedOption = [];
        console.log('false: ',this.falseAnswer);
      }
      
      if (this.falseAnswer > 0.2 * this.Questions.length || this.currentIndex > 120 ) {
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

  reset():void{
    this.selectedOption=[];
  }

  async onButtonClick() {
      const questionArrayIndex = this.currentIndex; // Örneğin mevcut soru indeksini kullanın
      const benutzerAntwort = this.selectedOption; // Örneğin seçilen seçeneği kullanın
      console.log('vor isTrue:',questionArrayIndex, benutzerAntwort)
      await this.isTrue(questionArrayIndex, benutzerAntwort);
      // this.reset();
  }


    // isChoosen(qarrayind: number, num: number, optxt: string): void {
    //   this.selectedAnswer[qarrayind] = num
    //   if(this.Questions[this.currentIndex].correctAnswer[0][0] == optxt) {
    //   }
    // }
  }
