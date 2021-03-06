import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { AngularService } from '../angular.service';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {

  public name: string ="";
  public questionList : any=[];
  public currentQuestion : number=0;
  public points : number=0;
  counter=60;
  correctAnswer : number=0;
  inCorrectAnswer : number=0;
  interval$: any;
  progress : string="0";
  isTestCompleted : boolean=false;
  constructor(private angularService : AngularService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions(){
    this.angularService.getQuestionJson()
    .subscribe(res=>{
      this.questionList =res.angular;
    })

  }

  nextQuestion(){
    this.currentQuestion++;
    this.resetCounter();

  }
  previousQuestion(){
    this.currentQuestion--;
    this.resetCounter();
  }
  answer(currentQno:number,option:any){
    if(currentQno===this.questionList.length){
      setTimeout(()=>{
        this.isTestCompleted=true;
        this.stopCounter();
      },1000);
    }
    if (option.correct){
      this.points += 5;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },1000);
      
    }
    else{
     setTimeout(()=>{
      this.currentQuestion++;
      this.inCorrectAnswer++;
      this.resetCounter();
      this.getProgressPercent();
     },1000);
      this.points-=2;
    }
    
  }
  startCounter(){
      this.interval$ = interval(1000)
      .subscribe(val=>{
        this.counter--;
        if (this.counter===0){
          this.currentQuestion++;
          this.counter=60;
          this.points-=2;
        }
      });
      setTimeout(()=>{
      this.interval$.unsubscribe();
      },600000)
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;


  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();

  }
  resetTest(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";

  }
  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;


  }
}
