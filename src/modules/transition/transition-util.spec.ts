import {
  durationToCss,
  isStaticTransitionName,
  parseTransitionName,
  resolveTransitionDirection
} from './transition-util';

describe('transition-util', () => {
  describe('durationToCss', () => {
    it('should format finite numbers as ms', () => {
      expect(durationToCss(400)).toBe('400ms');
      expect(durationToCss(0)).toBe('0ms');
    });

    it('should fall back for non-finite numbers', () => {
      expect(durationToCss(Number.NaN)).toBe('500ms');
      expect(durationToCss(Number.POSITIVE_INFINITY)).toBe('500ms');
    });

    it('should pass through explicit css times', () => {
      expect(durationToCss('1s')).toBe('1s');
      expect(durationToCss('200MS')).toBe('200MS');
      expect(durationToCss('0.3s')).toBe('0.3s');
    });

    it('should append ms to numeric strings', () => {
      expect(durationToCss('120')).toBe('120ms');
      expect(durationToCss('12.5')).toBe('12.5ms');
    });

    it('should default empty string to 500ms', () => {
      expect(durationToCss('')).toBe('500ms');
      expect(durationToCss('   ')).toBe('500ms');
    });

    it('should return other non-empty strings as-is', () => {
      expect(durationToCss('ease')).toBe('ease');
    });
  });

  describe('parseTransitionName', () => {
    it('should normalize spacing and case', () => {
      expect(parseTransitionName('  Fade   UP  ')).toEqual({
        baseName: 'fade up',
        explicitDirection: null
      });
    });

    it('should strip explicit in/out', () => {
      expect(parseTransitionName('horizontal flip in')).toEqual({
        baseName: 'horizontal flip',
        explicitDirection: 'in'
      });
      expect(parseTransitionName('fade out')).toEqual({
        baseName: 'fade',
        explicitDirection: 'out'
      });
    });
  });

  describe('resolveTransitionDirection', () => {
    it('should prefer explicit name suffix over mode and target', () => {
      expect(resolveTransitionDirection('in', 'out', false)).toBe('in');
      expect(resolveTransitionDirection('out', 'in', true)).toBe('out');
    });

    it('should use mode when explicit is null', () => {
      expect(resolveTransitionDirection(null, 'in', false)).toBe('in');
      expect(resolveTransitionDirection(null, 'out', true)).toBe('out');
    });

    it('should use target visibility in auto mode', () => {
      expect(resolveTransitionDirection(null, 'auto', true)).toBe('in');
      expect(resolveTransitionDirection(null, 'auto', false)).toBe('out');
    });
  });

  describe('isStaticTransitionName', () => {
    it('should recognize static Semantic names', () => {
      expect(isStaticTransitionName('pulse')).toBe(true);
      expect(isStaticTransitionName('glow')).toBe(true);
    });

    it('should return false for visibility transitions', () => {
      expect(isStaticTransitionName('fade')).toBe(false);
      expect(isStaticTransitionName('scale')).toBe(false);
    });
  });
});
