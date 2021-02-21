import {OverlayContainer} from '@angular/cdk/overlay';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicOverlayContainer extends OverlayContainer {
  public setContainerElement(containerElement: HTMLElement): void {
    this._containerElement = containerElement;
  }
}
