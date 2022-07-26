import {Directive, ElementRef, Input, HostListener, Output, EventEmitter} from '@angular/core';
import jQ from 'jquery';
@Directive({
  selector: '[clickActive]'
})
export class ClickClassActiveDirective {
  private el: HTMLElement;
  private jQ: any;
  @Input() activeClass = ''
  @Output() directiveClickChange = new EventEmitter();
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
    this.jQ = jQ;
  }

  @HostListener('click')
  onClick() {
    this.jQ(this.el).addClass(this.activeClass).siblings().removeClass(this.activeClass);
    this.directiveClickChange.emit(event);
  }
}
