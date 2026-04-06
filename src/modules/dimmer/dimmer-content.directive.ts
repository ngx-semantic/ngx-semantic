/**
 * Created by bolorundurowb on 1/6/2021
 */

import { Directive } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[suiDimmerContent]',
  exportAs: 'suiDimmerContent'
})
export class SuiDimmerContentDirective {
}
