import { Component,Input,ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  // @Input() correctAnswer: number=0;
  // @Input() falseAnswer: number=0;
  // @Input() Der_Fragen_Zahl: number=0;

  constructor(private changeDetector: ChangeDetectorRef,
    public shs: SharedService) {}

  ngOnChanges() {
    this.changeDetector.detectChanges();
    // this.correctAnswer = this.shs.getCorrectAnswer()
  }
}
