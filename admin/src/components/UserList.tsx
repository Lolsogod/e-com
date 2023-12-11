import type { TrpcClient } from "../types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import EditUser from "./EditUser";
//TODO: and purchase editor... maybe..

const UserList = (props: { trpc: TrpcClient }) => {
  const { trpc } = props;
  const users = trpc.user.getAll.useQuery();
  if (users.data)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Удалить</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data.map((user) => (
            <EditUser key={user.id} user={user} trpc={trpc} refetch={users.refetch}/>
          ))}
        </TableBody>
      </Table>
    );
};

export default UserList;
