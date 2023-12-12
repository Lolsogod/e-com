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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import EditDevice from "./EditDevice";
import { useState } from "react";
//TODO:  device info maybe....
const DeviceList = (props: { trpc: TrpcClient }) => {
  const { trpc } = props;
  const devices = trpc.device.get.useQuery();
  const brands = trpc.brand.get.useQuery();
  const deviceAdder = trpc.device.create.useMutation();

  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState<number>();
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleAddDevice = async () => {
    deviceAdder
      .mutateAsync({
        brandId: Number(brandId),
        name,
        img,
        price,
        typeId: 1,
        description,
      })
      .then(() => {
        devices.refetch();
        setName("");
        setBrandId(0);
        setImg("");
        setPrice(0);
        setDescription("");
      });
  };
  if (devices.data)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Брэнд</TableHead>
            <TableHead>Модель</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Картинка</TableHead>
            <TableHead className="w-[50px]">Удалить</TableHead>
            <TableHead className="w-[50px]">Сохранить</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.data.map((device) => (
            <EditDevice
              key={device.id}
              device={device}
              brands={brands.data || []}
              trpc={trpc}
              refetch={devices.refetch}
            />
          ))}
          <TableRow className="bg-green-50 hover:bg-green-100">
            <TableCell className="font-medium">NEW</TableCell>
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
                    {brands.data?.map((brand) => (
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
            <TableCell></TableCell>
            <TableCell>
              <Button
                className="bg-green-700 hover:bg-green-600 w-[45px]"
                onClick={handleAddDevice}
              >
                +
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
};

export default DeviceList;
