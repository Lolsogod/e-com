import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
//TODO: real data, and purchase editor... maybe..
const users = [
  { id: 1, email: "user1@example.com", password: "password1", role: "USER" },
  { id: 2, email: "user2@example.com", password: "password2", role: "ADMIN" },
  { id: 3, email: "user3@example.com", password: "password3", role: "USER" },
  { id: 4, email: "user4@example.com", password: "password4", role: "ADMIN" },
  { id: 5, email: "user5@example.com", password: "password5", role: "USER" },
  { id: 6, email: "user6@example.com", password: "password6", role: "ADMIN" },
  { id: 7, email: "user7@example.com", password: "password7", role: "USER" },
  { id: 8, email: "user8@example.com", password: "password8", role: "ADMIN" },
  { id: 9, email: "user9@example.com", password: "password9", role: "USER" },
  {
    id: 10,
    email: "user10@example.com",
    password: "password10",
    role: "ADMIN",
  },
];
const UserList = () => {
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
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select value={user.role}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Роли</SelectLabel>
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button variant={"destructive"}>Х</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
