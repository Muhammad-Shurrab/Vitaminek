import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import logo from "../images/Sign-up.svg";
import { Link } from "react-router-dom";
export default function LogInForm() {
  return (
    <div className="warpper gap-24 flex items-center justify-center p-24 bg-[url('../images/Gym.png')]">
      <img
        src={logo}
        alt=""
        className="rounded-lg bg-light-blue-900 w-[28rem] h-[30rem]"
      />

      <Card className=" " color="transparent" shadow={false}>
        <Typography
          className="text-light-blue-500"
          variant="h4"
          color="blue-gray"
        >
          Log-In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to Log-in.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-light-blue-500"
            >
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 transition-colors focus:!border-light-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-light-blue-500"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 transition-colors focus:!border-light-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button
            variant="outlined"
            size="lg"
            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2 my-8"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            Log-In with google
          </Button>
          <Button
            className="mt-6 text-base  transition-colors hover:border-2 hover:scale-110 active:scale-100 focus:scale-105 border-light-blue-500 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-light-blue-500"
            fullWidth
          >
            Log-In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <Link
              to="/SignUpForm"
              className="m-r-2 font-medium text-gray-900 transition-colors hover:text-light-blue-500"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
