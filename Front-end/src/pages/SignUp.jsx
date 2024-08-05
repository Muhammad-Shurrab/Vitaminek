import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import logo from "../images/Log-in.svg";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  return (
    <div className="warpper gap-24 flex items-center justify-center p-24 bg-[url('../images/Gym.png')]">
      <Card className=" " color="transparent" shadow={false}>
        <Typography
          className="text-light-blue-500"
          variant="h4"
          color="blue-gray"
        >
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-light-blue-500"
            >
              Your Name
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
          <Checkbox
            className="checked:bg-light-blue-500 checked:border-light-blue-500"
            label={
              <Typography
                variant="small"
                color="grey"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-light-blue-500"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          <Button
            variant="outlined"
            size="lg"
            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign up with google
          </Button>
          <Button
            className="mt-6  text-base  transition-colors hover:border-2 hover:scale-110 active:scale-100 focus:scale-105 border-light-blue-500 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-light-blue-500"
            fullWidth
          >
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/LogInForm"
              className="font-medium text-gray-900 transition-colors border-light-blue-500 hover:text-light-blue-500"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>

      <img
        src={logo}
        className="rounded-lg bg-light-blue-900 w-[28rem] h-[32rem]"
        alt=""
      />
    </div>
  );
}
