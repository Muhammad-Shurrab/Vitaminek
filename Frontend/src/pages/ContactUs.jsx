import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import contactPhoto from "../images/Contact.svg";

export default function ContactPage() {
  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography
          variant="h5"
          color="blue"
          className="mb-4 !text-base lg:!text-2xl font-semibold"
        >
          Customer Care
        </Typography>
        <Typography
          variant="h1"
          color="blue"
          className="mb-4 !text-3xl lg:!text-5xl font-semibold"
        >
          We&apos;re Here to Help
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
          Whether it&apos;s a question about our services, a request for
          technical assistance, or suggestions for improvement, our team is
          eager to hear from you.
        </Typography>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
          <img
            src={contactPhoto}
            alt="map"
            className="rounded-lg bg-light-blue-900 w-[35rem] h-[30rem] p-4 mt-9"
          />
          <form action="#" className="flex flex-col gap-4 lg:max-w-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-light-blue-500"
                >
                  First Name
                </Typography>
                <Input
                  color="blue"
                  size="lg"
                  placeholder="First Name"
                  name="first-name"
                  className="focus:border-t-light-blue-500"
                  containerProps={{
                    className: "min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-light-blue-500"
                >
                  Last Name
                </Typography>
                <Input
                  color="blue"
                  size="lg"
                  placeholder="Last Name"
                  name="last-name"
                  className="focus:border-t-light-blue-500"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-light-blue-500"
              >
                Your Email
              </Typography>
              <Input
                color="blue"
                size="lg"
                placeholder="name@email.com"
                name="email"
                className="focus:border-t-light-blue-500"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-light-blue-500"
              >
                Your Message
              </Typography>
              <Textarea
                rows={6}
                color="blue"
                placeholder="Message"
                name="message"
                className="focus:border-t-light-blue-500"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button
              className="w-full   transition-colors hover:border-2 hover:scale-110 active:scale-100 focus:scale-105 border-light-blue-500 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-light-blue-500"
              color="blue"
            >
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
