import { describe, expect, it } from 'vitest';
import { currentLicenseOptions, getPlan, planWhatsAppMessage } from '../src/lib/licensePlan';
import type { LicenseCode } from '../src/data/licenses';

const targets: LicenseCode[] = ['A2', 'A1', 'A'];

describe('getPlan', () => {
  it('returns a plan for every combination of target and current license', () => {
    for (const t of targets) {
      for (const { value } of currentLicenseOptions) {
        const plan = getPlan(t, value);
        expect(['route', 'blocked']).toContain(plan.kind);
        if (plan.kind === 'route') {
          expect(plan.steps).toHaveLength(4);
          expect(plan.steps[0]?.label).toBe('טופס ירוק');
          expect(plan.tip.length).toBeGreaterThan(0);
        }
      }
    }
  });

  describe('A2', () => {
    it('requires 15 lessons from scratch', () => {
      const plan = getPlan('A2', 'none');
      expect(plan.kind === 'route' && plan.minLessons).toBe(15);
    });

    it('requires no minimum lessons and no theory for car license holders of 3+ years', () => {
      const plan = getPlan('A2', 'B-old');
      expect(plan.kind).toBe('route');
      if (plan.kind !== 'route') return;
      expect(plan.minLessons).toBeNull();
      expect(plan.steps.find((s) => s.label === 'תאוריה')?.value).toBe('פטור');
      expect(plan.steps.find((s) => s.label === 'טסט')?.value).toBe('מבחן שליטה');
    });

    it('still requires 15 lessons for a car license under 3 years', () => {
      const plan = getPlan('A2', 'B-new');
      expect(plan.kind === 'route' && plan.minLessons).toBe(15);
    });

    it('is blocked for riders who already hold a motorcycle license', () => {
      expect(getPlan('A2', 'A2').kind).toBe('blocked');
      expect(getPlan('A2', 'A1-old').kind).toBe('blocked');
    });
  });

  describe('A1', () => {
    it('requires 15 lessons from scratch and for car license holders', () => {
      for (const c of ['none', 'B-new', 'B-old'] as const) {
        const plan = getPlan('A1', c);
        expect(plan.kind === 'route' && plan.minLessons).toBe(15);
      }
    });

    it('requires only 8 lessons when upgrading from A2', () => {
      const plan = getPlan('A1', 'A2');
      expect(plan.kind === 'route' && plan.minLessons).toBe(8);
    });
  });

  describe('A', () => {
    it('requires 8 lessons after a year on A1', () => {
      const plan = getPlan('A', 'A1-old');
      expect(plan.kind === 'route' && plan.minLessons).toBe(8);
    });

    it('is blocked without a year on A1', () => {
      for (const c of ['none', 'B-new', 'B-old', 'A2', 'A1'] as const) {
        expect(getPlan('A', c).kind).toBe('blocked');
      }
    });
  });
});

describe('planWhatsAppMessage', () => {
  it('includes the target and the current license', () => {
    const msg = planWhatsAppMessage('A1', 'A2');
    expect(msg).toContain('A1');
    expect(msg).toContain('רישיון A2');
  });
});
