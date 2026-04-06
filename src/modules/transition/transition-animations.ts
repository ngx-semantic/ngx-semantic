/**
 * Angular animation metadata approximating Semantic UI transition behaviors.
 * @see https://semantic-ui.com/modules/transition.html
 */

import { animate, AnimationMetadata, keyframes, style } from '@angular/animations';
import { isStaticTransitionName } from './transition-util';

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

export interface TransitionMotion {
  enter: (duration: string) => AnimationMetadata[];
  leave: (duration: string) => AnimationMetadata[];
}

const MOTIONS: Record<string, TransitionMotion> = {
  scale: {
    enter: d => [
      style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'scale(1)' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'scale(0)' }))
    ]
  },
  zoom: {
    enter: d => [
      style({ opacity: 0, transform: 'scale(0.35)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'scale(1)' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'scale(0.35)' }))
    ]
  },
  fade: {
    enter: d => [
      style({ opacity: 0, offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1 }))
    ],
    leave: d => [
      style({ opacity: 1, offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0 }))
    ]
  },
  'fade up': {
    enter: d => [
      style({ opacity: 0, transform: 'translateY(0.75rem)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateY(0.75rem)' }))
    ]
  },
  'fade down': {
    enter: d => [
      style({ opacity: 0, transform: 'translateY(-0.75rem)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateY(-0.75rem)' }))
    ]
  },
  'fade left': {
    enter: d => [
      style({ opacity: 0, transform: 'translateX(0.75rem)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateX(0.75rem)' }))
    ]
  },
  'fade right': {
    enter: d => [
      style({ opacity: 0, transform: 'translateX(-0.75rem)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateX(-0.75rem)' }))
    ]
  },
  'horizontal flip': {
    enter: d => [
      style({
        opacity: 0,
        transform: 'perspective(600px) rotateY(-90deg)',
        offset: 0
      }),
      animate(
        `${d} ${EASE}`,
        style({ opacity: 1, transform: 'perspective(600px) rotateY(0deg)' })
      )
    ],
    leave: d => [
      style({
        opacity: 1,
        transform: 'perspective(600px) rotateY(0deg)',
        offset: 0
      }),
      animate(
        `${d} ${EASE}`,
        style({ opacity: 0, transform: 'perspective(600px) rotateY(90deg)' })
      )
    ]
  },
  'vertical flip': {
    enter: d => [
      style({
        opacity: 0,
        transform: 'perspective(600px) rotateX(-90deg)',
        offset: 0
      }),
      animate(
        `${d} ${EASE}`,
        style({ opacity: 1, transform: 'perspective(600px) rotateX(0deg)' })
      )
    ],
    leave: d => [
      style({
        opacity: 1,
        transform: 'perspective(600px) rotateX(0deg)',
        offset: 0
      }),
      animate(
        `${d} ${EASE}`,
        style({ opacity: 0, transform: 'perspective(600px) rotateX(90deg)' })
      )
    ]
  },
  drop: {
    enter: d => [
      style({ opacity: 0, transform: 'translateY(-120%)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateY(-120%)' }))
    ]
  },
  'fly left': {
    enter: d => [
      style({ opacity: 0, transform: 'translateX(120%)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateX(-120%)' }))
    ]
  },
  'fly right': {
    enter: d => [
      style({ opacity: 0, transform: 'translateX(-120%)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateX(120%)' }))
    ]
  },
  'fly up': {
    enter: d => [
      style({ opacity: 0, transform: 'translateY(120%)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateY(-120%)' }))
    ]
  },
  'fly down': {
    enter: d => [
      style({ opacity: 0, transform: 'translateY(-120%)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateY(120%)' }))
    ]
  },
  'swing left': {
    enter: d => [
      style({ opacity: 0, transform: 'rotate(-12deg)', transformOrigin: 'top center', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'rotate(12deg)', transformOrigin: 'top center' }))
    ]
  },
  'swing right': {
    enter: d => [
      style({ opacity: 0, transform: 'rotate(12deg)', transformOrigin: 'top center', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'rotate(-12deg)', transformOrigin: 'top center' }))
    ]
  },
  'swing up': {
    enter: d => [
      style({ opacity: 0, transform: 'rotate(-10deg)', transformOrigin: 'bottom center', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'rotate(10deg)', transformOrigin: 'bottom center' }))
    ]
  },
  'swing down': {
    enter: d => [
      style({ opacity: 0, transform: 'rotate(10deg)', transformOrigin: 'top center', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'rotate(-10deg)', transformOrigin: 'top center' }))
    ]
  },
  browse: {
    enter: d => [
      style({ opacity: 0, transform: 'translateX(-1rem) skewX(-6deg)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateX(1rem) skewX(6deg)' }))
    ]
  },
  'browse right': {
    enter: d => [
      style({ opacity: 0, transform: 'translateX(1rem) skewX(6deg)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateX(-1rem) skewX(-6deg)' }))
    ]
  },
  'slide down': {
    enter: d => [
      style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateY(-100%)' }))
    ]
  },
  'slide up': {
    enter: d => [
      style({ opacity: 0, transform: 'translateY(100%)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateY(100%)' }))
    ]
  },
  'slide left': {
    enter: d => [
      style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateX(-100%)' }))
    ]
  },
  'slide right': {
    enter: d => [
      style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 1, transform: 'none' }))
    ],
    leave: d => [
      style({ opacity: 1, transform: 'none', offset: 0 }),
      animate(`${d} ${EASE}`, style({ opacity: 0, transform: 'translateX(100%)' }))
    ]
  }
};

const DEFAULT_MOTION = MOTIONS.fade;

export function getMotionForVisibility(baseName: string): TransitionMotion {
  if (isStaticTransitionName(baseName)) {
    return DEFAULT_MOTION;
  }
  return MOTIONS[baseName] ?? DEFAULT_MOTION;
}

export function buildEnterSteps(baseName: string, durationCss: string): AnimationMetadata[] {
  return getMotionForVisibility(baseName).enter(durationCss);
}

export function buildLeaveSteps(baseName: string, durationCss: string): AnimationMetadata[] {
  return getMotionForVisibility(baseName).leave(durationCss);
}

export function buildStaticSteps(baseName: string, durationCss: string): AnimationMetadata[] | null {
  if (!isStaticTransitionName(baseName)) {
    return null;
  }
  switch (baseName) {
    case 'pulse':
      return [
        style({ transform: 'scale(1)', offset: 0 }),
        animate(
          `${durationCss} ${EASE}`,
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.06)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 })
          ])
        )
      ];
    case 'shake':
      return [
        animate(
          `${durationCss} ${EASE}`,
          keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(-0.5rem)', offset: 0.2 }),
            style({ transform: 'translateX(0.5rem)', offset: 0.4 }),
            style({ transform: 'translateX(-0.35rem)', offset: 0.6 }),
            style({ transform: 'translateX(0.35rem)', offset: 0.8 }),
            style({ transform: 'translateX(0)', offset: 1 })
          ])
        )
      ];
    case 'jiggle':
      return [
        animate(
          `${durationCss} ${EASE}`,
          keyframes([
            style({ transform: 'rotate(0deg)', offset: 0 }),
            style({ transform: 'rotate(-2.5deg)', offset: 0.25 }),
            style({ transform: 'rotate(2.5deg)', offset: 0.5 }),
            style({ transform: 'rotate(-1.5deg)', offset: 0.75 }),
            style({ transform: 'rotate(0deg)', offset: 1 })
          ])
        )
      ];
    case 'flash':
      return [
        animate(
          `${durationCss} linear`,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0.2, offset: 0.5 }),
            style({ opacity: 1, offset: 1 })
          ])
        )
      ];
    case 'tada':
      return [
        animate(
          `${durationCss} ${EASE}`,
          keyframes([
            style({ transform: 'scale(1) rotate(0deg)', offset: 0 }),
            style({ transform: 'scale(0.92) rotate(-2deg)', offset: 0.1 }),
            style({ transform: 'scale(1.08) rotate(2deg)', offset: 0.3 }),
            style({ transform: 'scale(1.02) rotate(-1deg)', offset: 0.5 }),
            style({ transform: 'scale(1) rotate(0deg)', offset: 1 })
          ])
        )
      ];
    case 'bounce':
      return [
        animate(
          `${durationCss} ${EASE}`,
          keyframes([
            style({ transform: 'translateY(0)', offset: 0 }),
            style({ transform: 'translateY(-0.6rem)', offset: 0.35 }),
            style({ transform: 'translateY(0)', offset: 0.55 }),
            style({ transform: 'translateY(-0.25rem)', offset: 0.7 }),
            style({ transform: 'translateY(0)', offset: 0.85 }),
            style({ transform: 'translateY(0)', offset: 1 })
          ])
        )
      ];
    case 'glow':
      return [
        animate(
          `${durationCss} ${EASE}`,
          keyframes([
            style({ boxShadow: '0 0 0 0 rgba(100, 180, 255, 0)', offset: 0 }),
            style({ boxShadow: '0 0 1.25rem 0.25rem rgba(100, 180, 255, 0.45)', offset: 0.5 }),
            style({ boxShadow: '0 0 0 0 rgba(100, 180, 255, 0)', offset: 1 })
          ])
        )
      ];
    default:
      return null;
  }
}

export function listRegisteredMotionKeys(): string[] {
  return Object.keys(MOTIONS);
}
