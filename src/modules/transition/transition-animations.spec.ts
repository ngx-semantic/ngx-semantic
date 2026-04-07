import {
  buildEnterSteps,
  buildLeaveSteps,
  buildStaticSteps,
  getMotionForVisibility,
  listRegisteredMotionKeys
} from './transition-animations';

describe('transition-animations', () => {
  const d = '300ms';

  it('should list registered motion keys', () => {
    const keys = listRegisteredMotionKeys();
    expect(keys).toContain('fade');
    expect(keys).toContain('fade up');
    expect(keys).toContain('horizontal flip');
  });

  it('should fall back to fade for unknown visibility names', () => {
    const motion = getMotionForVisibility('not-a-real-animation');
    expect(motion).toBe(getMotionForVisibility('fade'));
  });

  it('should use fade motion for static names when resolving visibility', () => {
    expect(getMotionForVisibility('pulse')).toBe(getMotionForVisibility('fade'));
  });

  it('should produce enter/leave steps for each registered key', () => {
    for (const key of listRegisteredMotionKeys()) {
      const enter = buildEnterSteps(key, d);
      const leave = buildLeaveSteps(key, d);
      expect(enter.length).toBeGreaterThan(0);
      expect(leave.length).toBeGreaterThan(0);
    }
  });

  it('should produce static steps for static names', () => {
    const staticNames = ['pulse', 'shake', 'jiggle', 'flash', 'tada', 'bounce', 'glow'] as const;
    for (const name of staticNames) {
      const steps = buildStaticSteps(name, d);
      expect(steps).not.toBeNull();
      expect(steps!.length).toBeGreaterThan(0);
    }
  });

  it('should return null for static steps on non-static names', () => {
    expect(buildStaticSteps('fade', d)).toBeNull();
  });
});
