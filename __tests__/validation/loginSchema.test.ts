/**
 * @jest-environment node
 */
import { loginSchema } from '@/features/auth/validation/loginSchema';

describe('loginSchema', () => {
  describe('valid inputs', () => {
    it('accepts a 13-digit national ID', () => {
      const result = loginSchema.safeParse({ credential: '1234567890123' });
      expect(result.success).toBe(true);
    });

    it('accepts a 10-digit phone number', () => {
      const result = loginSchema.safeParse({ credential: '0812345678' });
      expect(result.success).toBe(true);
    });

    it('accepts all-nines 13-digit national ID', () => {
      const result = loginSchema.safeParse({ credential: '9999999999999' });
      expect(result.success).toBe(true);
    });
  });

  describe('invalid inputs', () => {
    it('rejects empty string', () => {
      const result = loginSchema.safeParse({ credential: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const msg = result.error.issues[0]?.message ?? '';
        expect(msg.length).toBeGreaterThan(0);
      }
    });

    it('rejects 9-digit input (too short for phone)', () => {
      const result = loginSchema.safeParse({ credential: '123456789' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const msg = result.error.issues[0]?.message ?? '';
        expect(msg.length).toBeGreaterThan(0);
      }
    });

    it('rejects 14-digit input (too long for national ID)', () => {
      const result = loginSchema.safeParse({ credential: '12345678901234' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const msg = result.error.issues[0]?.message ?? '';
        expect(msg.length).toBeGreaterThan(0);
      }
    });

    it('rejects non-numeric string', () => {
      const result = loginSchema.safeParse({ credential: 'abcdefghij' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const msg = result.error.issues[0]?.message ?? '';
        expect(msg.length).toBeGreaterThan(0);
      }
    });

    it('rejects mixed alphanumeric string', () => {
      const result = loginSchema.safeParse({ credential: '123456789a' });
      expect(result.success).toBe(false);
      if (!result.success) {
        const msg = result.error.issues[0]?.message ?? '';
        expect(msg.length).toBeGreaterThan(0);
      }
    });
  });
});
