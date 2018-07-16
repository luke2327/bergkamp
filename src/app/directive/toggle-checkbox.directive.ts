import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appToggleCheckbox]'
})
export class ToggleCheckboxDirective {

  @Input('appToggleCheckbox') isChecked: boolean;
  constructor(private el: ElementRef, private renderer: Renderer) {

  }
  ngOnChanges(changes: any) {
    try {
      if(this.isChecked) {
        this.renderer.setElementClass(this.el.nativeElement, 'checkbox-checked', true);
        this.renderer.setElementClass(this.el.nativeElement, 'checkbox', false);
      } else {
        this.renderer.setElementClass(this.el.nativeElement, 'checkbox-checked', false);
        this.renderer.setElementClass(this.el.nativeElement, 'checkbox', true);
      }
    } catch(e) {
      console.log(e);
    }
  }
}
