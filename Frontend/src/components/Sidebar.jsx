import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Checkbox,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";

const Sidebar = ({ products, onFilter }) => {
  const [open, setOpen] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: { min: 0, max: Infinity },
    sizes: [],
    flavours: [],
  });

  // Extract unique values for each filter type
  const uniqueCategories = [...new Set(products.map((p) => p.category))];
  const uniqueBrands = [...new Set(products.map((p) => p.brand))];
  const uniqueSizes = [...new Set(products.flatMap((p) => p.size))];
  const uniqueFlavours = [...new Set(products.flatMap((p) => p.flavour))];

  // Price ranges
  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "Over $200", min: 200, max: Infinity },
  ];

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (type === "priceRange") {
        newFilters.priceRange = value;
      } else {
        const index = prev[type].indexOf(value);
        if (index === -1) {
          newFilters[type] = [...prev[type], value];
        } else {
          newFilters[type] = prev[type].filter((item) => item !== value);
        }
      }

      return newFilters;
    });
  };

  // Apply filters whenever they change
  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const brandMatch =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const priceMatch =
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max;
      const sizeMatch =
        filters.sizes.length === 0 ||
        product.size.some((s) => filters.sizes.includes(s));
      const flavourMatch =
        filters.flavours.length === 0 ||
        product.flavour.some((f) => filters.flavours.includes(f));

      return (
        categoryMatch && brandMatch && priceMatch && sizeMatch && flavourMatch
      );
    });

    onFilter(filteredProducts);
  }, [filters]);

  return (
    <Card className="w-64 p-4 shadow-xl">
      <Typography variant="h6" className="mb-4 px-4 text-xl font-medium">
        Filters
      </Typography>

      <List className="p-0">
        <Accordion open={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="border-b py-4 px-4"
          >
            <Typography className="text-lg font-medium">Categories</Typography>
            <ChevronDown
              className={`ml-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          </AccordionHeader>
          <AccordionBody className="py-2">
            {uniqueCategories.map((category) => (
              <ListItem key={category} className="p-0">
                <label className="flex w-full cursor-pointer items-center px-4 py-2">
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      checked={filters.categories.includes(category)}
                      onChange={() =>
                        handleFilterChange("categories", category)
                      }
                    />
                  </ListItemPrefix>
                  <Typography>{category}</Typography>
                </label>
              </ListItem>
            ))}
          </AccordionBody>
        </Accordion>

        <Accordion open={open === 2}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="border-b py-4 px-4"
          >
            <Typography className="text-lg font-medium">Brands</Typography>
            <ChevronDown
              className={`ml-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          </AccordionHeader>
          <AccordionBody className="py-2">
            {uniqueBrands.map((brand) => (
              <ListItem key={brand} className="p-0">
                <label className="flex w-full cursor-pointer items-center px-4 py-2">
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleFilterChange("brands", brand)}
                    />
                  </ListItemPrefix>
                  <Typography>{brand}</Typography>
                </label>
              </ListItem>
            ))}
          </AccordionBody>
        </Accordion>

        <Accordion open={open === 3}>
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className="border-b py-4 px-4"
          >
            <Typography className="text-lg font-medium">Price Range</Typography>
            <ChevronDown
              className={`ml-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          </AccordionHeader>
          <AccordionBody className="py-2">
            {priceRanges.map((range) => (
              <ListItem key={range.label} className="p-0">
                <label className="flex w-full cursor-pointer items-center px-4 py-2">
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      checked={
                        filters.priceRange.min === range.min &&
                        filters.priceRange.max === range.max
                      }
                      onChange={() => handleFilterChange("priceRange", range)}
                    />
                  </ListItemPrefix>
                  <Typography>{range.label}</Typography>
                </label>
              </ListItem>
            ))}
          </AccordionBody>
        </Accordion>

        {uniqueSizes.length > 0 && (
          <Accordion open={open === 4}>
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="border-b py-4 px-4"
            >
              <Typography className="text-lg font-medium">Sizes</Typography>
              <ChevronDown
                className={`ml-auto h-4 w-4 transition-transform ${
                  open === 4 ? "rotate-180" : ""
                }`}
              />
            </AccordionHeader>
            <AccordionBody className="py-2">
              {uniqueSizes.map((size) => (
                <ListItem key={size} className="p-0">
                  <label className="flex w-full cursor-pointer items-center px-4 py-2">
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        checked={filters.sizes.includes(size)}
                        onChange={() => handleFilterChange("sizes", size)}
                      />
                    </ListItemPrefix>
                    <Typography>{size}</Typography>
                  </label>
                </ListItem>
              ))}
            </AccordionBody>
          </Accordion>
        )}

        {uniqueFlavours.length > 0 && (
          <Accordion open={open === 5}>
            <AccordionHeader
              onClick={() => handleOpen(5)}
              className="border-b py-4 px-4"
            >
              <Typography className="text-lg font-medium">Flavours</Typography>
              <ChevronDown
                className={`ml-auto h-4 w-4 transition-transform ${
                  open === 5 ? "rotate-180" : ""
                }`}
              />
            </AccordionHeader>
            <AccordionBody className="py-2">
              {uniqueFlavours.map((flavour) => (
                <ListItem key={flavour} className="p-0">
                  <label className="flex w-full cursor-pointer items-center px-4 py-2">
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        checked={filters.flavours.includes(flavour)}
                        onChange={() => handleFilterChange("flavours", flavour)}
                      />
                    </ListItemPrefix>
                    <Typography>{flavour}</Typography>
                  </label>
                </ListItem>
              ))}
            </AccordionBody>
          </Accordion>
        )}
      </List>
    </Card>
  );
};

export default Sidebar;
