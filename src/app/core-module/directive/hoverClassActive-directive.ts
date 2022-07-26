import {Directive, ElementRef, Input, HostListener, Output, EventEmitter} from '@angular/core';
import jQ from 'jquery';
@Directive({
  selector: '[hoverActive]'
})
export class HoverClassActiveDirective {
  private el: HTMLElement;
  private jQ: any;
  @Output() mousemoveChange = new EventEmitter();
  @Output() onmouseoutChange = new EventEmitter();
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
    this.jQ = jQ;
  }

  // @HostListener('click')
  // onClick() {
  //   this.jQ(this.el).addClass('click-active').siblings().removeClass('click-active');
  // }

  @HostListener('mousemove')
  onmousemove() {
    this.el.classList.add('hover-active');
    this.mousemoveChange.emit(event);
  }

  @HostListener('mouseout')
  onmouseout() {
    this.el.classList.remove('hover-active');
    this.onmouseoutChange.emit(event);
  }
}
