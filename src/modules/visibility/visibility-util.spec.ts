import {
  computeVisibilityCalculations,
  passedAmounts,
  passedThresholdPixels,
  shouldEmitCondition,
  shouldEmitReverse
} from './visibility-util';

describe('visibility-util', () => {
  describe('computeVisibilityCalculations', () => {
    const screen = { top: 0, height: 800 };

    it('marks an in-viewport element as onScreen and topVisible', () => {
      const calc = computeVisibilityCalculations({
        element: { top: 100, bottom: 500, width: 200, height: 400 },
        screen,
        offset: 0,
        includeMargin: false,
        marginTop: 0,
        marginBottom: 0,
        lastScrollTop: 0,
        scrollTop: 0
      });
      expect(calc.onScreen).toBeTrue();
      expect(calc.offScreen).toBeFalse();
      expect(calc.topVisible).toBeTrue();
      expect(calc.topPassed).toBeFalse();
      expect(calc.bottomVisible).toBeTrue();
      expect(calc.bottomPassed).toBeFalse();
      expect(calc.passing).toBeFalse();
      expect(calc.fits).toBeTrue();
      expect(calc.direction).toBe('down');
    });

    it('marks topPassed and passing when the top edge has crossed the viewport top', () => {
      const calc = computeVisibilityCalculations({
        element: { top: -40, bottom: 360, width: 200, height: 400 },
        screen,
        offset: 0,
        includeMargin: false,
        marginTop: 0,
        marginBottom: 0,
        lastScrollTop: 0,
        scrollTop: 50
      });
      expect(calc.topPassed).toBeTrue();
      expect(calc.passing).toBeTrue();
      expect(calc.onScreen).toBeTrue();
      expect(calc.pixelsPassed).toBe(40);
      expect(calc.percentagePassed).toBeCloseTo(0.1);
    });

    it('marks offScreen and bottomPassed when the element is above the viewport', () => {
      const calc = computeVisibilityCalculations({
        element: { top: -500, bottom: -100, width: 200, height: 400 },
        screen,
        offset: 0,
        includeMargin: false,
        marginTop: 0,
        marginBottom: 0,
        lastScrollTop: 100,
        scrollTop: 80
      });
      expect(calc.bottomPassed).toBeTrue();
      expect(calc.onScreen).toBeFalse();
      expect(calc.offScreen).toBeTrue();
      expect(calc.direction).toBe('up');
    });

    it('applies offset and includeMargin', () => {
      const calc = computeVisibilityCalculations({
        element: { top: 20, bottom: 120, width: 100, height: 100 },
        screen,
        offset: 50,
        includeMargin: true,
        marginTop: 10,
        marginBottom: 10,
        lastScrollTop: 0,
        scrollTop: 0
      });
      expect(calc.topPassed).toBeTrue();
      expect(calc.height).toBe(120);
    });
  });

  describe('passedAmounts / passedThresholdPixels', () => {
    it('reads keys from a record or array', () => {
      expect(passedAmounts({ '10%': true, '200px': true })).toEqual(['10%', '200px']);
      expect(passedAmounts(['50%'])).toEqual(['50%']);
      expect(passedAmounts(null)).toEqual([]);
    });

    it('parses percentage and pixel amounts', () => {
      expect(passedThresholdPixels('10%', 400)).toBe(40);
      expect(passedThresholdPixels('200px', 400)).toBe(200);
      expect(passedThresholdPixels('80', 400)).toBe(80);
    });
  });

  describe('shouldEmitCondition / shouldEmitReverse', () => {
    it('fires once until occurred when once is true', () => {
      expect(shouldEmitCondition(true, false, false, true, false)).toBeTrue();
      expect(shouldEmitCondition(true, true, true, true, false)).toBeFalse();
    });

    it('fires on rising edge when once is false', () => {
      expect(shouldEmitCondition(true, false, false, false, false)).toBeTrue();
      expect(shouldEmitCondition(true, true, true, false, false)).toBeFalse();
    });

    it('fires every time when continuous', () => {
      expect(shouldEmitCondition(true, true, true, true, true)).toBeTrue();
    });

    it('fires reverse on falling edge', () => {
      expect(shouldEmitReverse(false, true, true, false, false, false)).toBeTrue();
      expect(shouldEmitReverse(false, false, true, true, true, false)).toBeFalse();
      expect(shouldEmitReverse(true, false, false, false, false, false)).toBeFalse();
    });
  });
});
