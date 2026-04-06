/**
 * Created by bolorundurowb on 1/24/2021
 */

import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  standalone: true,
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);


  public transform(value: string, ..._args: any[]): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
