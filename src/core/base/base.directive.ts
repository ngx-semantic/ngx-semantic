/**
 * Created by bolorundurowb on 4/28/2021
 */
import {Directive, ElementRef, HostBinding} from '@angular/core';
import {ClassUtils} from 'ngx-semantic/core/util';

@Directive()
export abstract class BaseDirective {
  abstract get classes(): string;

  protected constructor(private element: ElementRef) {
  }

  @HostBinding('class')
  get hostClasses(): string {
    return ClassUtils.removeExcessWhitespace(this.classes);
  }
}
