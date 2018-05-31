import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRealTimeColor]'
})
//가격변동에 따른 컬러색깔을 표현한 구현체
export class RealTimeColorDirective {

  constructor(private el: ElementRef) {
    console.log('Directive :' +   this.changeValue);
  }

  @Input('appRealTimeColor') changeValue: number;

  ngOnInit() {
    try {
      if(this.changeValue > 0){
        this.el.nativeElement.style.color = "#16a277";
      }else if(this.changeValue == 0){
        this.el.nativeElement.style.color = "black";
      }else{
        this.el.nativeElement.style.color = "#c81e3a";
      }
    } catch(e) {
      console.log(e);
    }
  }

}
