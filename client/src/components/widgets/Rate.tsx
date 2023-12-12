/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/utils/trpc";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";


const Rate = (props: { id: number; device: UseTRPCQueryResult<any, any> }) => {
  const { id, device } = props;
  const ratable = trpc.device.rateable.useQuery({ id });
  const rating = trpc.device.userRating.useQuery({ id });
  const rate = trpc.device.rate.useMutation();
  const handleSelect = (value: string) => {
    rate.mutateAsync({ id, rating: Number(value) }).then(() => {
      rating.refetch();
      device.refetch();
    });
  };
  const ratingVal = rating.data ? String(rating.data.rate) : "";
  return (
    <div className="flex gap-2 items-center">
      <Select
        disabled={!ratable.data}
        value={ratingVal}
        onValueChange={handleSelect}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Оцените товар" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">★</SelectItem>
            <SelectItem value="2">★★</SelectItem>
            <SelectItem value="3">★★★</SelectItem>
            <SelectItem value="4">★★★★</SelectItem>
            <SelectItem value="5">★★★★★</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {!ratable.data && <div className="text-gray-400">Оценивать могут только купившие товар</div>}
    </div> 
  );
};
export default Rate;
