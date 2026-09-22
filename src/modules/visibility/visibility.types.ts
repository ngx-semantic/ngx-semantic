/** Semantic UI Visibility `type` setting. */
export type SuiVisibilityType = false | 'image' | 'fixed';

/** Scroll direction between checks. */
export type SuiVisibilityDirection = 'up' | 'down';

/**
 * Geometry snapshot passed to Visibility callbacks
 * (Semantic UI `module.get.elementCalculations`).
 */
export interface SuiVisibilityCalculations {
  topVisible: boolean;
  topPassed: boolean;
  bottomVisible: boolean;
  bottomPassed: boolean;
  passing: boolean;
  onScreen: boolean;
  offScreen: boolean;
  fits: boolean;
  width: number;
  height: number;
  pixelsPassed: number;
  percentagePassed: number;
  direction: SuiVisibilityDirection;
}

/** Payload for `suiOnPassed` when a configured amount is crossed. */
export interface SuiVisibilityPassedEvent {
  amount: string;
  calculations: SuiVisibilityCalculations;
}

/** Keys used for `onPassed` (`'10%'`, `'200px'`, …). */
export type SuiVisibilityPassedConfig = Record<string, unknown> | string[];
