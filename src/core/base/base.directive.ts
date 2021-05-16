/**
 * Created by bolorundurowb on 4/28/2021
 */
import {Directive, ElementRef, OnChanges, OnInit, SimpleChanges} from '@angular/core';

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
    const cleanedClasses = this.classes.replace(/\s\s+/g, ' ');
    this.element?.nativeElement?.setAttribute('class', cleanedClasses);
  }
}
