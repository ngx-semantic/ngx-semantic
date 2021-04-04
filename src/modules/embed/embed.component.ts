/**
 * Created by bolorundurowb on 1/24/2021
 */

import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

export type SuiEmbedSource = 'youtube' | 'vimeo' | null;
export type SuiEmbedAspectRatio = '4:3' | '16:9' | '21:9' | null;

@Component({
  selector: 'sui-embed',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngClass]="classes">
      <i sui-icon
         [suiIconType]="suiIcon"
         (click)="playVideo()"></i>

      <ng-container *ngIf="suiPlaceHolder">
        <img class="placeholder"
             [src]="suiPlaceHolder"/>
      </ng-container>

      <ng-container *ngIf="isPLaying">
        <div class="embed">
          <iframe
            [src]="videoUrl | safeUrl"
            scrolling="no" webkitallowfullscreen="" mozallowfullscreen=""
            allowfullscreen="" width="100%" height="100%" frameborder="0"></iframe>
        </div>
      </ng-container>
    </div>
  `
})
export class SuiEmbedComponent implements AfterViewInit {
  @Input() public suiSource: SuiEmbedSource = null;
  @Input() public suiAspectRatio: SuiEmbedAspectRatio = null;
  @Input() public suiIcon = 'video play';
  @Input() public suiId: string | number;
  @Input() public suiPlaceHolder: string;
  @Input() public suiSourceUrl: string;
  @Input() @InputBoolean() public suiAutoplay: boolean;

  public isPLaying: boolean;
  public videoUrl = '';

  constructor(private cdr: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    if (this.suiAutoplay) {
      this.playVideo();
    }
  }

  get classes(): Array<string> {
    return [
      'ui',
      this.suiAspectRatio,
      'embed',
      ClassUtils.getPropClass(this.isPLaying, 'active')
    ];
  }

  public playVideo(): void {
    if (this.suiSourceUrl) {
      this.videoUrl = this.suiSourceUrl;
    }

    if (this.suiSource === 'vimeo') {
      this.videoUrl = `//player.vimeo.com/video/${this.suiId}?api=false&autoplay=true&byline=false&color=%23444444&portrait=false&title=false`;
    }

    if (this.suiSource === 'youtube') {
      this.videoUrl = `//www.youtube.com/embed/${this.suiId}?autohide=true&autoplay=true&color=%23444444&hq=true&jsapi=false&modestbranding=true`;
    }

    this.isPLaying = true;
    this.cdr.detectChanges();
  }
}
