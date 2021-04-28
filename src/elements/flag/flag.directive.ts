import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[sui-flag]',
  exportAs: 'suiFlag'
})
export class SuiFlagDirective implements OnChanges {
  @Input() public suiCountry = '';

  constructor(private element: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.element?.nativeElement?.setAttribute('class', this.classes);
  }

  get classes(): string {
    return [
      this.suiCountry,
      'flag'
    ].join(' ');
  }
}
