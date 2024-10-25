import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function Details() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="details p-28 border-2 border-light-blue-500 rounded-md">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Why Choose BioTech Whey?
          </AccordionHeader>
          <AccordionBody className="text-xl">
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            Directions
          </AccordionHeader>
          <AccordionBody className="text-xl">
            Mix 1 serving (28 grams = 2 heaped tablespoons) powder with 250 ml
            water in a shake. On training days consume 1 serving within 45
            minutes after your training and 1 serving between your meals. On
            resting days consume 1 serving in the morning and 1 serving in the
            evening.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            Comments
          </AccordionHeader>
          <AccordionBody>
            <div className="relative w-[32rem]">
              <Textarea variant="static" placeholder="Your Comment" rows={8} />
              <div className="flex w-full justify-between py-1.5">
                <IconButton variant="text" color="blue-gray" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </IconButton>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="red"
                    variant="text"
                    className="rounded-md"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="lg"
                    className="rounded-md  bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-transform"
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </>
  );
}
