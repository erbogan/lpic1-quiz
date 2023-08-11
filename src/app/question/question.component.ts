import { Component,OnInit } from '@angular/core';
import { QuizappService } from '../quizapp.service';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  QuizData : any[] = [];
  constructor (private quizService:QuizappService){}
  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(data => {this.QuizData=data;
      console.log(data);
  });
  }

 

}
