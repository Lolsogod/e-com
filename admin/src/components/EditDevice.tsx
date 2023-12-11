import { RouterOutputs, TrpcClient } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TableCell, TableRow } from "./ui/table";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EditDevice = (props: {
  trpc: TrpcClient;
  device: RouterOutputs["device"]["get"][0];
  brands: RouterOutputs["brand"]["get"];
  refetch: () => void;
}) => {
  const { trpc, device, brands, refetch } = props;
  const deviceDeleter = trpc.device.delete.useMutation();
  const deviceUpdater = trpc.device.update.useMutation();
  const handleDeleteDevice = async () => {
    deviceDeleter.mutateAsync({ id: device.id }).then(() => {
      refetch();
    });
  };

  const [name, setName] = useState(device.name);
  const [brandId, setBrandId] = useState(device.brandId);
  const [img, setImg] = useState(device.img);
  const [price, setPrice] = useState(device.price);
  const [description, setDescription] = useState(device.description);

  const handleUpdateDevice = async () => {
    deviceUpdater
      .mutateAsync({
        id: device.id,
        brandId: Number(brandId),
        name,
        img,
        price,
        typeId: 1,
        description,
      })
      .then(() => {refetch()});
  };
  return (
    <TableRow key={device.id}>
      <TableCell className="font-medium">{device.id}</TableCell>
      <TableCell>
        <Select
          value={String(brandId)}
          onValueChange={(e) => setBrandId(Number(e))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Брэнды</SelectLabel>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={String(brand.id)}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Модель"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Цена"
        />
      </TableCell>
      <TableCell>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание"
        />
      </TableCell>
      <TableCell>
        <Input
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Введите url картинки"
        />
      </TableCell>
      <TableCell>
        <Button onClick={handleDeleteDevice} variant={"destructive"} className="w-[45px]">
          Х
        </Button>
      </TableCell>
      <TableCell>
        <Button className="w-[45px]" onClick={handleUpdateDevice}>✓</Button>
      </TableCell>
    </TableRow>
  );
};

export default EditDevice;
