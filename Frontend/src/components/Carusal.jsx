import { Carousel } from "@material-tailwind/react";
import EcommerceCard from "./Card";
export function CarouselDefault() {
  return (
    <Carousel className="rounded-xl">
      <EcommerceCard />
      <EcommerceCard />
    </Carousel>
  );
}
