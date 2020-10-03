/**
 * Created by bolor on 4/22/2020
 */

export type SuiLocation = 'left' | 'right' | 'top' | 'bottom' | 'center' | null;

export type SuiColour = 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey'  | 'black' | null;

export type SuiSize = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive' | null;

export type SuiVerticalAlignment = 'top' | 'middle' | 'bottom' | null;

export type SuiHorizontalAlignment = 'left' | 'center' | 'right' | null;

export type SuiHorizontalPosition = 'left' | 'right' | null;

export type SuiWidth =
  'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'ten'
  | 'eleven'
  | 'twelve'
  | 'thirteen'
  | 'fourteen'
  | 'fifteen'
  | 'sixteen'
  | null;

export type SuiDeviceVisibility = 'large screen only' | 'mobile only' | 'computer only' | 'tablet mobile only' | 'tablet only' | null;

export type SuiResultState = 'success' | 'positive' | 'warning' | 'negative' | 'error' | 'info' | null;
