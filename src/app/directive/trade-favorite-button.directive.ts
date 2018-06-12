import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appTradeFavoriteButton]'
})
export class TradeFavoriteButtonDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input('appTradeFavoriteButton') isFavorite: boolean;

  ngOnChanges(changes: any) {
    try {
      if(this.isFavorite) {
        this.renderer.setElementClass(this.el.nativeElement, 'favorite-button-checked', true);
        this.renderer.setElementClass(this.el.nativeElement, 'favorite-button', false);
      } else {
        this.renderer.setElementClass(this.el.nativeElement, 'favorite-button-checked', false);
        this.renderer.setElementClass(this.el.nativeElement, 'favorite-button', true);
      }
    } catch(e) {

    }
  }
}
