/**
 * Created by bolorundurowb on 4/28/2021
 */
import { Directive, ElementRef, HostBinding } from '@angular/core';
import { ClassUtils } from 'ngx-semantic/core/util';

@Directive()
export abstract class BaseDirective {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  protected constructor(private element: ElementRef) {
  }

  abstract get classes(): string;

  @HostBinding('class')
  get hostClasses(): string {
    return ClassUtils.removeExcessWhitespace(this.classes);
  }
}
