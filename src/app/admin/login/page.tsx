import { login } from './actions';

export default function AdminLoginPage() {
  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Owner Login</h1>
      <form action={login} className="space-y-4">
        <input
          type="password"
          name="password"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Enter admin password"
          required
        />
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
        >
          Login as Nuhash
        </button>
      </form>
    </div>
  );
}
