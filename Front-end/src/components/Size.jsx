import { Select, Option } from "@material-tailwind/react";

export default function SelectSizes() {
  return (
    <div className="flex w-72 flex-col gap-6">
      <Select size="xl" label="Size" color="blue">
        <Option> 700g</Option>
        <Option> 2700g</Option>
      </Select>
      <Select size="xl" label="Flavours" color="blue">
        <Option> Vanila</Option>
        <Option> Strawbery</Option>
        <Option> Choclate</Option>
      </Select>
    </div>
  );
}
