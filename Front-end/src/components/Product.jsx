import React from "react";
import {
  Button,
  IconButton,
  Rating,
  Typography,
} from "@material-tailwind/react";
import SelectSizes from "./Size";
import { HeartIcon } from "@heroicons/react/24/outline";

function EcommerceProduct() {
  return (
    <section className="py-16 px-8">
      <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
        <img
          src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
          alt="pink blazer"
          className="h-[36rem]"
        />
        <div>
          <Typography className="mb-4  text-light-blue-500" variant="h3">
            Premium Blazer
          </Typography>
          <Typography variant="h5" className=" text-light-blue-500">
            $95
          </Typography>
          <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
            As we live, our hearts turn colder. Cause pain is what we go through
            as we become older. We get insulted by others, lose trust for those
            others. We get back stabbed by friends. It becomes harder for us to
            give others a hand. We get our heart broken by people we love, even
            that we give them all we have. Then we lose family over time. What
            else could rust the heart more over time? Blackgold.
          </Typography>
          <div className="my-8 flex items-center gap-2">
            <Rating value={5} className="text-light-blue-600" />
            <Typography className="!text-sm font-bold !text-gray-700">
              4.0/5 (100 reviews)
            </Typography>
          </div>
          <Typography color="blue-gray" variant="h6">
            Color
          </Typography>
          <div className="my-8 mt-3 flex items-center gap-2">
            <SelectSizes />
          </div>
          <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
            <Button
              color=""
              className="w-52  bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-transform"
            >
              Add to Cart
            </Button>
            <IconButton color="blue" variant="text" className="shrink-0">
              <HeartIcon className="h-6 w-6" />
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EcommerceProduct;
