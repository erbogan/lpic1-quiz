import { Component,Input,ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {


  constructor(private changeDetector: ChangeDetectorRef,
    public shs: SharedService) {}

  ngOnChanges() {
    this.changeDetector.detectChanges();

  }
}
