/**
 * Created by bolorundurowb on 4/28/2021
 */
import {Directive, ElementRef, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ClassUtils } from 'ngx-semantic/core/util';

@Directive()
export abstract class BaseDirective implements OnInit, OnChanges {
  abstract classes: string;

  protected constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.setClasses();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setClasses();
  }

  private setClasses(): void {
    const cleanedClasses = ClassUtils.removeExcessWhitespace(this.classes);
    this.element?.nativeElement?.setAttribute('class', cleanedClasses);
  }
}
