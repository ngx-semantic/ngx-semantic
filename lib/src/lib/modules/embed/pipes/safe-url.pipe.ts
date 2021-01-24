/**
 * Created by bolorundurowb on 1/24/2021
 */

import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'safe-url'})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  public transform(value: string, ...args: any[]): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
