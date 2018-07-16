import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appNotiVisibility]'
})
export class NotiVisibilityDirective {

  @Input('appNotiVisibility') isOpen: boolean;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: any) {
    console.log(this.isOpen);
    this.el.nativeElement.style.display = this.isOpen? "block": "none";
  }
}
