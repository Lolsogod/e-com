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
          <TableHead className="w-[50px]">Удалить</TableHead>
          <TableHead className="w-[50px]">Сохранить</TableHead>
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
              <Button className="bg-green-700 hover:bg-green-600 w-[45px]" onClick={handleAddBrand}>+</Button>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  );
};

export default BrandList;