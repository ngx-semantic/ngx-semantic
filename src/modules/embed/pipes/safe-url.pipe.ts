/**
 * Created by bolorundurowb on 1/24/2021
 */

import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  standalone: true,
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  public transform(value: string, ..._args: any[]): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
