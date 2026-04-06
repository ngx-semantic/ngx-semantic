/**
 * Created by bolorundurowb on 1/24/2021
 */

import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';
import {SuiIconDirective} from 'ngx-semantic/elements/icon';
import {SafeUrlPipe} from './pipes/safe-url.pipe';

export type SuiEmbedSource = 'youtube' | 'vimeo' | null;
export type SuiEmbedAspectRatio = '4:3' | '16:9' | '21:9' | null;

@Component({
  standalone: true,
  imports: [CommonModule, SuiIconDirective, SafeUrlPipe],
  selector: 'sui-embed',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngClass]="classes">
      <i sui-icon
         [suiIconType]="suiIcon"
         (click)="playVideo()"></i>

      @if (suiPlaceHolder) {
        <img class="placeholder"
             [src]="suiPlaceHolder"/>
      }

      @if (isPLaying) {
        <div class="embed">
          <iframe
            [src]="videoUrl | safeUrl"
            scrolling="no" webkitallowfullscreen="" mozallowfullscreen=""
            allowfullscreen="" width="100%" height="100%" frameborder="0"></iframe>
        </div>
      }
    </div>
  `
})
export class SuiEmbedComponent implements AfterViewInit {
  @Input() public suiSource: SuiEmbedSource = null;
  @Input() public suiAspectRatio: SuiEmbedAspectRatio = null;
  @Input() public suiIcon = 'video play';
  @Input() public suiId: string | number | null = null;
  @Input() public suiPlaceHolder: string | null = null;
  @Input() public suiSourceUrl: string | null = null;
  @Input() @InputBoolean() public suiAutoplay = false;

  public isPLaying = false;
  public videoUrl = '';

  constructor(private cdr: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    if (this.suiAutoplay) {
      this.playVideo();
    }
  }

  get classes(): string {
    return [
      'ui',
      this.suiAspectRatio,
      'embed',
      ClassUtils.getPropClass(this.isPLaying, 'active')
    ].join(' ');
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
