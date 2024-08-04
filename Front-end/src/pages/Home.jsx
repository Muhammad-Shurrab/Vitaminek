import React from "react";

import { CarouselDefault } from "../components/Carusal.jsx";
function Home() {
  return (
    <>
      <h2 className="title relative text-2xl font-bold text-center mb-8 before after">
        Top Products
      </h2>
      <CarouselDefault />
    </>
  );
}

export default Home;
