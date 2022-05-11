import { DefaultLayout } from './layouts';
import { ProvideUsers } from '../hooks/users';
import { UserCreate } from '../components/admin';

export default function AdminUsersList() {
  return (
    <DefaultLayout>
      <ProvideUsers>
        <UserCreate />
      </ProvideUsers>
    </DefaultLayout>
  );
}
