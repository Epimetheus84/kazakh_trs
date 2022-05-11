import { DefaultLayout } from './layouts';
import { ProvideUsers } from '../hooks/users';
import { UsersList } from '../components/admin';

export default function AdminUsersList() {
  return (
    <DefaultLayout>
      <ProvideUsers>
        <UsersList/>
      </ProvideUsers>
    </DefaultLayout>
  );
}
