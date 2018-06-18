import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { BidAskTableType, BidAskType } from '../app.const';
@Directive({
  selector: '[appBidAskButton]'
})
export class BidAskButtonDirective {

  @Input('appBidAskButton') buttonType: number;
  @Input() askBidTableType: number;
  constructor(private el: ElementRef, private renderer: Renderer) { }
  ngOnChanges(changes: any) {
    let isArrowUp: boolean = false;
    switch(this.askBidTableType) {
      case BidAskTableType.BidOnly:
        if(this.buttonType == BidAskType.Bid) {
          isArrowUp = false;
        } else {
          isArrowUp = false;
        }
        break;
      case BidAskTableType.AskOnly:
        console.log('ASKONLY!!!!');
        if(this.buttonType == BidAskType.Bid) {
          isArrowUp = true;
        } else {
          isArrowUp = true;
        }
        break;
      case BidAskTableType.BidAndAsk:
        if(this.buttonType == BidAskType.Bid) {
          isArrowUp = true;
        } else {
          isArrowUp = false;
        }
        break;
    }
    this.renderer.setElementClass(this.el.nativeElement, 'arrow-up', isArrowUp);
    this.renderer.setElementClass(this.el.nativeElement, 'arrow-down', !isArrowUp);
  }

}
