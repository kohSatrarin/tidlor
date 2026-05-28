export type AuthUser = {
  credentialMasked: string; // e.g., "1234567****" or "0812345****"
};

export type AuthState = {
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
};
