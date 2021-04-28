import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[sui-flag]',
  exportAs: 'suiFlag'
})
export class SuiFlagDirective implements OnChanges {
  @Input() public suiCountry = '';

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.elementRef.nativeElement.setAttribute('class', this.classes);
  }

  get classes(): string {
    return [
      this.suiCountry,
      'flag'
    ].join(' ');
  }
}
