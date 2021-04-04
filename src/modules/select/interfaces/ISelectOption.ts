/**
 * Created by bolor on 11/2/2020
 */

import {ISelectOptionImage} from 'ngx-semantic/modules/select';

export interface ISelectOption {
  text: string;
  value: any;
  image?: ISelectOptionImage;
  flag?: string;
}
