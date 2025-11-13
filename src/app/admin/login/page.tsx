'use client';

import { login } from './actions';
import { useActionState } from 'react';

type LoginState = { error: string };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    { error: '' }
  );

  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Owner Login</h1>
      <form action={formAction} className="space-y-4">
        <input
          type="password"
          name="password"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Enter admin password"
          required
        />
        {state.error && <p className="text-sm text-red-500">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isPending ? 'Logging in...' : 'Login as Nuhash'}
        </button>
      </form>
    </div>
  );
}
