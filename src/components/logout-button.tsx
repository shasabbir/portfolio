import { logout } from '@/app/admin/login/actions';
import { Button } from '@/components/ui/button';

export default function LogoutButton({ redirectTo = '/blog' }: { redirectTo?: string }) {
  return (
    <form action={logout}>
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <Button type="submit" variant="outline">Logout</Button>
    </form>
  );
}
