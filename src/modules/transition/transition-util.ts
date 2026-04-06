/**
 * Helpers for Semantic UI–style transition names and durations.
 * @see https://semantic-ui.com/modules/transition.html
 */

export type SuiTransitionDirectionMode = 'auto' | 'in' | 'out';

export interface ParsedTransitionName {
  /** Normalized animation id, without trailing ` in` / ` out`. */
  baseName: string;
  explicitDirection: 'in' | 'out' | null;
}

export function durationToCss(d: number | string): string {
  if (typeof d === 'number') {
    return Number.isFinite(d) ? `${d}ms` : '500ms';
  }
  const s = String(d).trim();
  if (!s) {
    return '500ms';
  }
  if (/^\d+(\.\d+)?(ms|s)$/i.test(s)) {
    return s;
  }
  if (/^\d+(\.\d+)?$/.test(s)) {
    return `${s}ms`;
  }
  return s;
}

export function parseTransitionName(raw: string): ParsedTransitionName {
  const s = raw.trim().toLowerCase().replace(/\s+/g, ' ');
  let explicitDirection: 'in' | 'out' | null = null;
  let base = s;
  if (base.endsWith(' in')) {
    explicitDirection = 'in';
    base = base.slice(0, -3).trim();
  } else if (base.endsWith(' out')) {
    explicitDirection = 'out';
    base = base.slice(0, -4).trim();
  }
  return { baseName: base, explicitDirection };
}

/**
 * Resolves whether the next run should play an inward or outward transition.
 */
export function resolveTransitionDirection(
  explicitFromName: 'in' | 'out' | null,
  mode: SuiTransitionDirectionMode,
  targetVisible: boolean
): 'in' | 'out' {
  if (explicitFromName === 'in' || explicitFromName === 'out') {
    return explicitFromName;
  }
  if (mode === 'in') {
    return 'in';
  }
  if (mode === 'out') {
    return 'out';
  }
  return targetVisible ? 'in' : 'out';
}

const STATIC_NAMES = new Set<string>([
  'jiggle',
  'flash',
  'shake',
  'pulse',
  'tada',
  'bounce',
  'glow'
]);

export function isStaticTransitionName(baseName: string): boolean {
  return STATIC_NAMES.has(baseName);
}
