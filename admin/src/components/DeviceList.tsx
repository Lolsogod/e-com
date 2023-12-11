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
import { Input } from "./ui/input";
//TODO: real data, device info maybe....
const devices = [
  {
    id: 1,
    name: "Device1",
    price: 500,
    avgRating: 4,
    description: "Description for Device1",
    img: "device1.jpg",
    typeId: 1,
    brandId: 1,
    brand:{
      id: 1,
      name: "Brand1",
    }
  },
  {
    id: 1,
    name: "Device1",
    price: 500,
    avgRating: 4,
    description: "Description for Device1",
    img: "device1.jpg",
    typeId: 1,
    brandId: 1,
    brand:{
      id: 1,
      name: "Brand1",
    }
  },
  {
    id: 1,
    name: "Device1",
    price: 500,
    avgRating: 4,
    description: "Description for Device1",
    img: "device1.jpg",
    typeId: 1,
    brandId: 1,
    brand:{
      id: 1,
      name: "Brand1",
    }
  },
  {
    id: 1,
    name: "Device1",
    price: 500,
    avgRating: 4,
    description: "Description for Device1",
    img: "device1.jpg",
    typeId: 1,
    brandId: 1,
    brand:{
      id: 1,
      name: "Brand1",
    }
  },
  // Add more devices as needed
];

const DeviceList = () => {
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
          <TableHead>Удалить</TableHead>
          <TableHead>Сохранить</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices.map((device) => (
          <TableRow key={device.id}>
            <TableCell className="font-medium">{device.id}</TableCell>
            <TableCell>
              <Select value={String(device.brandId)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Брэнды</SelectLabel>
                    {/* Replace with actual brand data */}
                    <SelectItem value={String(device.brandId)}>{device.brand.name}</SelectItem>
                    {/* Add more brands as needed */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell><Input value={device.name}/></TableCell>
            <TableCell><Input value={device.price}/></TableCell>
            <TableCell><Input value={device.description}/></TableCell>
            <TableCell><Input value={device.img}/></TableCell>
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
            <TableCell>
              <Select >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Брэнды</SelectLabel>
                    {/* Replace with actual brand data */}
                    <SelectItem value="id">Brand1</SelectItem>
                    {/* Add more brands as needed */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell><Input /></TableCell>
            <TableCell><Input /></TableCell>
            <TableCell><Input /></TableCell>
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

export default DeviceList;
