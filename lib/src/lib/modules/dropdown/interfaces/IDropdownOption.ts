/**
 * Created by bolor on 11/2/2020
 */
import {IDropdownOptionImage} from './IDropdownOptionImage';

export interface IDropdownOption {
  text: string;
  value: any;
  image?: IDropdownOptionImage;
}
