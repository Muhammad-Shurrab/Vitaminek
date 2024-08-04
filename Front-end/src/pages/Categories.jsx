import React from "react";
import EcommerceCard from "../components/Card";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function Categories() {
  return (
    <>
      <h2 className="title relative text-2xl font-bold text-center mb-8 before after mt-36">
        All Products
      </h2>
      <SearchBar className="" />
      <div className="7aden flex ">
        <Sidebar className=" row-start-1 row-end-2 max-h-80" />
        <div className="product-list">
          <div className="products grid grid-cols-3 gap-36 justify-center items-center p-10 pt-7 pr-20">
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-96 card-item group ">
              <CardHeader shadow={false} floated={false} className="h-96">
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
                  alt="card-image"
                  className="h-full w-full object-cover card-baner w-full rounded-lg mb-2 transition-transform duration-300"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="font-bold text-light-blue-500"
                  >
                    100% Pure Whey
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-light-blue-500"
                  >
                    $95.00
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75 text-base"
                >
                  Palm oil free whey protein complex with bromelain enzyme,
                  amino acids and sweeteners.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-light-blue-500 text-white  shadow-none hover:scale-105 hover:bg-light-blue-500/10 hover:text-gray-900 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View The Product
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
