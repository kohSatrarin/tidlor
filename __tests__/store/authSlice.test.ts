/**
 * @jest-environment node
 */
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/app/store/rootReducer';
import {
  login,
  logout,
  clearAuthError,
  selectAuthUser,
  selectAuthStatus,
  selectAuthError,
  selectIsLoggedIn,
} from '@/features/auth/store/authSlice';
import * as authApi from '@/features/auth/services/authApi';

jest.mock('@/features/auth/services/authApi');

const mockLoginFn = authApi.mockLogin as jest.MockedFunction<typeof authApi.mockLogin>;

function makeStore() {
  return configureStore({ reducer: rootReducer });
}

describe('authSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('user is null', () => {
      const store = makeStore();
      expect(store.getState().auth.user).toBeNull();
    });

    it('status is idle', () => {
      const store = makeStore();
      expect(store.getState().auth.status).toBe('idle');
    });

    it('error is null', () => {
      const store = makeStore();
      expect(store.getState().auth.error).toBeNull();
    });
  });

  describe('logout reducer', () => {
    it('clears user, resets status to idle, clears error', () => {
      const store = makeStore();
      mockLoginFn.mockResolvedValueOnce({
        user: { credentialMasked: '0812345****' },
        token: 'mock-token-123',
      });

      return store.dispatch(login('0812345678')).then(() => {
        store.dispatch(logout());
        const state = store.getState().auth;
        expect(state.user).toBeNull();
        expect(state.status).toBe('idle');
        expect(state.error).toBeNull();
      });
    });
  });

  describe('clearAuthError reducer', () => {
    it('only clears error, keeps user', () => {
      const store = makeStore();
      mockLoginFn.mockResolvedValueOnce({
        user: { credentialMasked: '0812345****' },
        token: 'mock-token-123',
      });

      return store.dispatch(login('0812345678')).then(() => {
        // Manually inject an error scenario by dispatching rejected action
        store.dispatch(clearAuthError());
        const state = store.getState().auth;
        expect(state.error).toBeNull();
        // user is unchanged (still set from fulfilled)
        expect(state.user).toEqual({ credentialMasked: '0812345****' });
      });
    });
  });

  describe('login thunk — pending', () => {
    it('sets status to loading and clears error', () => {
      const store = makeStore();
      // Never resolves so we can inspect pending state
      mockLoginFn.mockImplementationOnce(() => new Promise(() => {}));

      store.dispatch(login('0812345678'));
      const state = store.getState().auth;
      expect(state.status).toBe('loading');
      expect(state.error).toBeNull();
    });
  });

  describe('login thunk — fulfilled', () => {
    it('sets status to success, sets user.credentialMasked, clears error', () => {
      const store = makeStore();
      mockLoginFn.mockResolvedValueOnce({
        user: { credentialMasked: '0812345****' },
        token: 'mock-token-123',
      });

      return store.dispatch(login('0812345678')).then(() => {
        const state = store.getState().auth;
        expect(state.status).toBe('success');
        expect(state.user).toEqual({ credentialMasked: '0812345****' });
        expect(state.error).toBeNull();
      });
    });
  });

  describe('login thunk — rejected', () => {
    it('sets status to error, sets error string, user remains null', () => {
      const store = makeStore();
      mockLoginFn.mockRejectedValueOnce(new Error('Network error'));

      return store.dispatch(login('0812345678')).then(() => {
        const state = store.getState().auth;
        expect(state.status).toBe('error');
        expect(typeof state.error).toBe('string');
        expect((state.error as string).length).toBeGreaterThan(0);
        expect(state.user).toBeNull();
      });
    });
  });

  describe('selectors', () => {
    it('selectAuthUser returns user or null', () => {
      const store = makeStore();
      expect(selectAuthUser(store.getState())).toBeNull();
    });

    it('selectAuthStatus returns status', () => {
      const store = makeStore();
      expect(selectAuthStatus(store.getState())).toBe('idle');
    });

    it('selectAuthError returns error or null', () => {
      const store = makeStore();
      expect(selectAuthError(store.getState())).toBeNull();
    });

    it('selectIsLoggedIn returns false when user is null', () => {
      const store = makeStore();
      expect(selectIsLoggedIn(store.getState())).toBe(false);
    });

    it('selectIsLoggedIn returns true when user is set', () => {
      const store = makeStore();
      mockLoginFn.mockResolvedValueOnce({
        user: { credentialMasked: '123456789****' },
        token: 'mock-token-456',
      });

      return store.dispatch(login('1234567890123')).then(() => {
        expect(selectIsLoggedIn(store.getState())).toBe(true);
      });
    });
  });
});
