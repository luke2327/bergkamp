import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DirectiveToggleType } from '../app.const';
@Directive({
  selector: '[appToggle]'
})
//toggle류 처리가 많은데 앞으로는 이곳에서 state를 만들어 처리한다.
//toggle-checkbox, noti-visibility, trade-favorite-button 여기로 옮겨옴
export class ToggleDirective {

  toggleType: any;
  @Input('appToggle') type: number;
  @Input('isOn') isOn: boolean;
  @Input('state') state: string;
  @Input('stateList') stateList: string[];
  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngOnChanges(changes: any) {
    try {
      switch(this.type) {
        case DirectiveToggleType.Visibility :
          this.el.nativeElement.style.display = this.isOn? "block": "none";
          break;
        case DirectiveToggleType.Opened :
          this.renderer.setElementClass(this.el.nativeElement, 'opened', this.isOn);
          this.renderer.setElementClass(this.el.nativeElement, 'closed', !this.isOn);
          break;
        case DirectiveToggleType.Checked :
          this.renderer.setElementClass(this.el.nativeElement, 'checkbox-checked', this.isOn);
          this.renderer.setElementClass(this.el.nativeElement, 'checkbox', !this.isOn);
          break;
        case DirectiveToggleType.Favorite :
          this.renderer.setElementClass(this.el.nativeElement, 'favorite-button-checked', this.isOn);
          this.renderer.setElementClass(this.el.nativeElement, 'favorite-button', !this.isOn);
        case DirectiveToggleType.SortingState :
          this.renderer.setElementClass(this.el.nativeElement, 'sorting', this.state=='default');
          this.renderer.setElementClass(this.el.nativeElement, 'sorting-ask', this.state=='ask');
          this.renderer.setElementClass(this.el.nativeElement, 'sorting-desc', this.state=='desc');
        case DirectiveToggleType.State :
          for(let entry of this.stateList) {
            this.renderer.setElementClass(this.el.nativeElement, this.state, this.state==entry);
          }
        case DirectiveToggleType.Valid :
          this.renderer.setElementClass(this.el.nativeElement, 'valid', this.isOn);
          this.renderer.setElementClass(this.el.nativeElement, 'invalid', !this.isOn);
          break;

      }
    } catch(e) {
      console.log(e);
    }
  }
}
