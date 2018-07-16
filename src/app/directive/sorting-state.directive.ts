import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appSortingState]'
})
export class SortingStateDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { }
  
  @Input('appSortingState') state: string;

  ngOnChanges(changes: any) {
    try {
      this.renderer.setElementClass(this.el.nativeElement, 'sorting', this.state=='default');
      this.renderer.setElementClass(this.el.nativeElement, 'sorting-ask', this.state=='ask');
      this.renderer.setElementClass(this.el.nativeElement, 'sorting-desc', this.state=='desc');
    } catch(e) {
      console.log(e);
    }
  }
}
