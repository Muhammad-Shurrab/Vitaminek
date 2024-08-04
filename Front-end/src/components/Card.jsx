import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function EcommerceCard() {
  return (
    <>
      <Card className="w-96">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/chocolate-2-600x600.png?lossy=1&strip=1&webp=1"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              Apple AirPods
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              $95.00
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            With plenty of talk and listen time, voice-activated Siri access,
            and an available wireless charging case.
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
    </>
  );
}
