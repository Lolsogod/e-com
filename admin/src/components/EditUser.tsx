import { TrpcClient } from "@/types";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EditUser = (props: {
  trpc: TrpcClient;
  user: { id: number; email: string; role: string };
  refetch: () => void;
}) => {
  const { trpc, user, refetch } = props;
  const userDeleter = trpc.user.delete.useMutation();
  const roleChanger = trpc.user.changeRole.useMutation();
  const handleDeleteUser = async () => {
    userDeleter.mutateAsync({ id: user.id }).then(() => {
      refetch();
    });
  };

  const handleChangeRole = async (role: string) => {
    roleChanger
      .mutateAsync({ id: user.id, role: role as "USER" | "ADMIN" })
      .then(() => {
        refetch();
      });
  };
  return (
    <TableRow>
      <TableCell className="font-medium">{user.id}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Select value={user.role} onValueChange={handleChangeRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите роль" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Роли</SelectLabel>
              <SelectItem value="USER">Пользователь</SelectItem>
              <SelectItem value="ADMIN">Администратор</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Button variant={"destructive"} onClick={handleDeleteUser}>
          Х
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EditUser;
