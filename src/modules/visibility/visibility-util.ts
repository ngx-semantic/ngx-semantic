import { SuiVisibilityCalculations, SuiVisibilityDirection, SuiVisibilityPassedConfig } from './visibility.types';

export interface SuiVisibilityRect {
  top: number;
  bottom: number;
  width: number;
  height: number;
}

export interface SuiVisibilityComputeInput {
  element: SuiVisibilityRect;
  /** Visible viewport of the scroll context, in the same coordinate space as `element`. */
  screen: {top: number; height: number};
  offset: number;
  includeMargin: boolean;
  marginTop: number;
  marginBottom: number;
  lastScrollTop: number;
  scrollTop: number;
}

export function computeVisibilityCalculations(input: SuiVisibilityComputeInput): SuiVisibilityCalculations {
  const offset = input.offset || 0;
  let top = input.element.top;
  let bottom = input.element.bottom;
  let height = input.element.height;
  if (input.includeMargin) {
    top -= input.marginTop;
    bottom += input.marginBottom;
    height += input.marginTop + input.marginBottom;
  }

  const screenTop = input.screen.top + offset;
  const screenBottom = input.screen.top + input.screen.height + offset;

  const topVisible = screenBottom >= top;
  const topPassed = screenTop >= top;
  const bottomVisible = screenBottom >= bottom;
  const bottomPassed = screenTop >= bottom;
  const onScreen = topVisible && !bottomPassed;
  const passing = topPassed && !bottomPassed;
  const pixelsPassed = Math.max(0, screenTop - top);
  const percentagePassed = height > 0 ? pixelsPassed / height : 0;
  const direction: SuiVisibilityDirection = input.scrollTop < input.lastScrollTop ? 'up' : 'down';

  return {
    topVisible,
    topPassed,
    bottomVisible,
    bottomPassed,
    passing,
    onScreen,
    offScreen: !onScreen,
    fits: height < input.screen.height,
    width: input.element.width,
    height,
    pixelsPassed,
    percentagePassed,
    direction
  };
}

export function passedAmounts(config: SuiVisibilityPassedConfig | null | undefined): string[] {
  if (!config) {
    return [];
  }
  if (Array.isArray(config)) {
    return config;
  }
  return Object.keys(config);
}

/** Convert `'10%'` / `'200px'` / `'50'` into pixels for the current element height. */
export function passedThresholdPixels(amount: string, elementHeight: number): number {
  const trimmed = amount.trim();
  if (trimmed.endsWith('%')) {
    return (parseFloat(trimmed) / 100) * elementHeight;
  }
  return parseFloat(trimmed);
}

export function shouldEmitCondition(
  current: boolean,
  previous: boolean,
  alreadyOccurred: boolean,
  once: boolean,
  continuous: boolean
): boolean {
  if (!current) {
    return false;
  }
  if (continuous) {
    return true;
  }
  if (once) {
    return !alreadyOccurred;
  }
  return !previous;
}

export function shouldEmitReverse(
  current: boolean,
  previous: boolean,
  forwardOccurred: boolean,
  reverseOccurred: boolean,
  once: boolean,
  continuous: boolean
): boolean {
  if (current || !(forwardOccurred || previous)) {
    return false;
  }
  if (continuous) {
    return true;
  }
  if (once) {
    return !reverseOccurred;
  }
  return previous;
}
