import React from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const Home = () => {
  const [openAccordion, setOpenAccordion] = React.useState(1);

  const handleOpenAccordion = (value) => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="bg-light-blue-500 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Typography variant="h1" className="mb-4">
              Welcome to SupplementHub
            </Typography>
            <Typography variant="lead" className="mb-8">
              Discover the best supplements for your health and fitness journey
            </Typography>
            <Button color="white" size="lg" ripple="light">
              Shop Now
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Top Supplements Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="mb-8 text-center">
            Top Supplements
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Protein Powder", "Multivitamin", "Omega-3"].map(
              (supplement, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card>
                    <CardBody>
                      <Typography variant="h5" className="mb-2">
                        {supplement}
                      </Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </Typography>
                    </CardBody>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>

      {/* Top Articles Section */}
      <motion.section
        className="bg-gray-200 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="mb-8 text-center">
            Top Articles
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {["The Benefits of Protein", "How to Choose a Multivitamin"].map(
              (article, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card>
                    <CardHeader color="light-blue" className="relative h-56">
                      <img
                        src={`https://source.unsplash.com/random/800x600?supplement&${index}`}
                        alt="article"
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody>
                      <Typography variant="h5" className="mb-2">
                        {article}
                      </Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris.
                      </Typography>
                    </CardBody>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="mb-8 text-center">
            What Our Customers Say
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                text: "Great products! Ive seen a significant improvement in my workouts.",
              },
              {
                name: "Jane Smith",
                text: "The customer service is excellent. They helped me choose the right supplements.",
              },
              {
                name: "Mike Johnson",
                text: "I love the variety of products. Theres something for everyone.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card>
                  <CardBody>
                    <Typography variant="lead" className="mb-2">
                      {testimonial.text}
                    </Typography>
                    <Typography variant="small" color="gray">
                      - {testimonial.name}
                    </Typography>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="bg-gray-200 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="mb-8 text-center">
            Frequently Asked Questions
          </Typography>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How do I choose the right supplement?",
                answer:
                  "Consider your specific health goals, consult with a healthcare professional, and research reputable brands.",
              },
              {
                question: "Are your products safe?",
                answer:
                  "Yes, all our products are tested for quality and safety. However, always consult with a doctor before starting any new supplement regimen.",
              },
              {
                question: "How long does shipping take?",
                answer:
                  "Shipping usually takes 3-5 business days within the continental US.",
              },
            ].map((faq, index) => (
              <Accordion key={index} open={openAccordion === index + 1}>
                <AccordionHeader onClick={() => handleOpenAccordion(index + 1)}>
                  {faq.question}
                </AccordionHeader>
                <AccordionBody>{faq.answer}</AccordionBody>
              </Accordion>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
