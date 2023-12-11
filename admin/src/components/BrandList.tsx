import { Button } from "./ui/button";
import type { TrpcClient } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Input } from "./ui/input";
// TODO: Import Brand model from your codebase

const brands = [
  {
    id: 1,
    name: "Brand1",
  },
  {
    id: 2,
    name: "Brand2",
  },
  // Add more brands as needed
];

const BrandList = (props: { trpc: TrpcClient  }) => {
  const { trpc } = props;
  const brands = trpc.brand.get.useQuery();
  if (brands.data)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Удалить</TableHead>
          <TableHead>Сохранить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.data.map((brand) => (
          <TableRow key={brand.id}>
            <TableCell className="font-medium">{brand.id}</TableCell>
            <TableCell><Input value={brand.name}/></TableCell>
            <TableCell>
              <Button variant={"destructive"}>Х</Button>
            </TableCell>
            <TableCell>
              <Button >✓</Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="bg-green-50 hover:bg-green-100">
            <TableCell className="font-medium">NEW</TableCell>
            <TableCell><Input /></TableCell>
            <TableCell>
              
            </TableCell>
            <TableCell>
              <Button className="bg-green-700 hover:bg-green-600" >+</Button>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  );
};

export default BrandList;