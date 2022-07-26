/**
 * Created by GyjLoveLh on  2018/2/1
 */
import {Directive, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges, HostListener} from '@angular/core';

@Directive({
  selector: '[lh-loading]'
})

export class LhLoadingDirective implements OnChanges {

  @Input() isLoad: boolean = false; // 有loading效果的
  @Output() loadAgain = new EventEmitter();
  @Input() isHideLoad: boolean = false; // 不显示loading
  shade;
  nativeEle;
  constructor(
    private elmRef: ElementRef
  ) {
    this.nativeEle = elmRef.nativeElement;
    const nativeElement = elmRef.nativeElement;
    this.shade = document.createElement('i');
    this.shade.className = 'iconfont iconshuaxin rotate';
    nativeElement.appendChild(this.shade);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isLoad) {
      this.shade.style.display = 'inline-block';
      this.nativeEle.setAttribute('disabled', 'true');
    } else {
      this.shade.style.display = 'none';
      this.nativeEle.removeAttribute('disabled');
    }
    if (changes.isHideLoad && changes.isHideLoad.currentValue) {
      this.shade.style.display = 'none';
      this.nativeEle.setAttribute('disabled', 'true');
    } else if (!changes.isLoad) {
      this.shade.style.display = 'none';
      this.nativeEle.removeAttribute('disabled');
    }
  }
}
