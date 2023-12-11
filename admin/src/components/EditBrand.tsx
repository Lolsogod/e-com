import { RouterOutputs, TrpcClient } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TableCell, TableRow } from "./ui/table";
import { useState } from "react";

const EditBrand = (props: {
  trpc: TrpcClient;
  brand: RouterOutputs["brand"]["get"][0];
  refetch: () => void;
}) => {
  const { trpc, brand, refetch } = props;
  const brandDeleter = trpc.brand.delete.useMutation();
  const brandUpdater = trpc.brand.update.useMutation();
  const handleDeleteBrand = async () => {
    brandDeleter.mutateAsync({ id: brand.id }).then(() => {
      refetch();
    });
  };
  const [name, setName] = useState(brand.name);

  const handleUpdateBrand = async () => {
    brandUpdater.mutateAsync({ id: brand.id, name }).then(() => {
      refetch();
    });
  };
  return (
    <TableRow>
      <TableCell className="font-medium">{brand.id}</TableCell>
      <TableCell>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </TableCell>
      <TableCell>
        <Button variant={"destructive"} onClick={handleDeleteBrand} className="w-[45px]">
          Х
        </Button>
      </TableCell>
      <TableCell>
        <Button onClick={handleUpdateBrand} className="w-[45px]">✓</Button>
      </TableCell>
    </TableRow>
  );
};

export default EditBrand;
