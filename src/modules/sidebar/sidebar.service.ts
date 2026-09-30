/**
 * Created by bolorundurowb on 1/1/2021
 */

import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SuiSidebarService {
  public pusherClicked = new EventEmitter<void>();
  public visibilityChanged = new EventEmitter<boolean>();

  private _isVisible = false;

  /** The last visibility reported by the sidebar sharing this service. */
  public get isVisible(): boolean {
    return this._isVisible;
  }

  public notifyPusherClicked(): void {
    this.pusherClicked.emit();
  }

  public changeVisibility(isVisible: boolean): void {
    this._isVisible = isVisible;
    this.visibilityChanged.emit(isVisible);
  }
}
