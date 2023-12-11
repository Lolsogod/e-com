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
import { useState } from "react";
import EditBrand from "./EditBrand";
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
  const brandAdder = trpc.brand.create.useMutation();

  const [name, setName] = useState("");

  const handleAddBrand = async () => {
    brandAdder.mutateAsync({ name })
    .then(() => {
      brands.refetch();
      setName("");
    });
  }
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
          <EditBrand key={brand.id} brand={brand} trpc={trpc} refetch={brands.refetch}/>
        ))}
        <TableRow className="bg-green-50 hover:bg-green-100">
            <TableCell className="font-medium">NEW</TableCell>
            <TableCell><Input value={name} onChange={(e) => setName(e.target.value)} /></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Button className="bg-green-700 hover:bg-green-600" onClick={handleAddBrand}>+</Button>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  );
};

export default BrandList;