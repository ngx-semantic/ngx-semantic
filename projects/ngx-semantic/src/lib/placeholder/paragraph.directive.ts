/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: 'sui-placeholder-paragraph, [sui-placeholder-paragraph]',
  exportAs: 'suiPlaceholderParagraph'
})
export class SuiPlaceholderParagraphDirective {
  @HostBinding('class')
  get classes(): string {
    return 'paragraph';
  }
}
