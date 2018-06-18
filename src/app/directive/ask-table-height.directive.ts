import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { BidAskTableType } from '../app.const';
@Directive({
  selector: '[appAskTableHeight]'
})
export class AskTableHeightDirective {

  @Input('appAskTableHeight') askBidTableType: number;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnChanges(changes: any) {
    switch(this.askBidTableType) {
      case BidAskTableType.BidOnly:
        this.el.nativeElement.style.height = '0px';
        break;
      case BidAskTableType.AskOnly:
        this.el.nativeElement.style.height = '405px';
        break;
      case BidAskTableType.BidAndAsk:
        this.el.nativeElement.style.height = '202.5px';
        break;
    }
  }
}
