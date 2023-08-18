import { Component,OnInit} from '@angular/core';
import { QuizappService } from '../quizapp.service';


@Component({
  selector: 'app-learnphase',
  templateUrl: './learnphase.component.html',
  styleUrls: ['./learnphase.component.css']
})
export class LearnphaseComponent {

  Questions :any []=[];
  selectedQuestionIndex: number | null = null;

  constructor(private service:QuizappService){}

  ngOnInit(): void{
    this.service.getQuestions().subscribe(data=>{this.Questions=data})
  }

  showAnswer(index: number) {
    this.Questions[index].showAnswer = true;
  }
  

  selectQuestion(index: number): void {
    this.selectedQuestionIndex = index;
  }
  deselectQuestion(): void {
    this.selectedQuestionIndex = null;
  }

  OnNext(): void{
if(this.selectedQuestionIndex!<this.Questions.length-1){
this.selectedQuestionIndex!++;
}
 }

 onBack():void{
  if (this.selectedQuestionIndex!>0){
    this.selectedQuestionIndex!--;
  }
 }

}
