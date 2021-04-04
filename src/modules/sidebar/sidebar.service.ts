/**
 * Created by bolorundurowb on 1/1/2021
 */

import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class SuiSidebarService {
  public pusherClicked = new EventEmitter<void>();
  public visibilityChanged = new EventEmitter<boolean>();

  public notifyPusherClicked(): void {
    this.pusherClicked.emit();
  }

  public changeVisibility(isVisible: boolean): void {
    this.visibilityChanged.emit(isVisible);
  }
}
