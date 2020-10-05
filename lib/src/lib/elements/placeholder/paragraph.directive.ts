/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiPlaceholderParagraph]',
  exportAs: 'suiPlaceholderParagraph'
})
export class SuiPlaceholderParagraphDirective {
  @HostBinding('class')
  get classes(): string {
    return 'paragraph';
  }
}
