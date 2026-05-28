import type { AuthUser } from '../types';

type LoginResult = {
  user: AuthUser;
  token: string;
};

function maskCredential(credential: string): string {
  if (credential.length <= 4) return credential;
  return credential.slice(0, credential.length - 4) + '****';
}

export async function mockLogin(credential: string): Promise<LoginResult> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate occasional network failure for demo purposes
      // (Always succeeds in production — real auth would validate here)
      resolve({
        user: { credentialMasked: maskCredential(credential) },
        token: `mock-token-${Date.now()}`,
      });
    }, 800); // 800ms delay feels realistic
  });
}
