/**
 * Created by bolorundurowb on 4/28/2021
 */
import {ElementRef, OnChanges, OnInit, SimpleChanges} from '@angular/core';

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
    console.log(this.classes, cleanedClasses);
    this.element?.nativeElement?.setAttribute('class', cleanedClasses);
  }
}
