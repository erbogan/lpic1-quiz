import { Component,OnInit } from '@angular/core';
import { QuizappService } from '../quizapp.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {
  constructor(private service:QuizappService){}
Questions:any[]=[];
currentIndex:number=0;
selectedAnswer:any[]=[]
  ngOnInit():void{
this.service.getQuestions().subscribe(data=> {this.Questions=data})
  }
  nextQuestion():void{
    if(this.currentIndex<this.Questions.length-1){
      this.currentIndex++;
    }
  }
  previousQuestion():void{
    if(this.currentIndex>0){
      this.currentIndex--;
    }
  }
  SkipQuestion():void{
    if(this.selectedAnswer==null){
      this.currentIndex++;
    }
  }
}
