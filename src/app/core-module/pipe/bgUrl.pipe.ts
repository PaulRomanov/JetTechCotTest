import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'bgUrl'
})
export class BgUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }
  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustStyle('url(\'' + value + '\')');
  }
}
