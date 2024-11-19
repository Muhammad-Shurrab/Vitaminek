import React from "react";
import { useLocation } from "react-router-dom";

const logoUrls = [
  "https://asset.brandfetch.io/idMs2a1TTw/idwlEFmcn_.svg?updated=1716588640146",
  "https://www.svgrepo.com/show/303248/mastercard-2-logo.svg",
  "https://asset.brandfetch.io/idpG6RQhhI/iduIfOfS7x.svg?updated=1717492413016",
  "https://www.svgrepo.com/show/303257/paypal-logo.svg",
  "https://asset.brandfetch.io/idW4Ii72QL/idbO-bl63P.png?updated=1713453150664",
  "https://seeklogo.com/images/M/muscletech-logo-3DBC4BBC88-seeklogo.com.png",
  "https://tukuz.com/wp-content/uploads/2020/09/optimum-nutrition-inc-logo-vector.png",
  "https://asset.brandfetch.io/idiJkUC-Vm/iddMq0O9B4.png?updated=1709413152562",
];

const Sponsors = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  if (isAdminPath) return null;

  return (
    <section className="bg-white overflow-hidden py-8 md:py-12 px-4 md:px-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 mt-24 md:mt-32">
        Our Partners
      </h2>

      <div className="relative w-full h-16 md:h-24 lg:h-32">
        <div className="absolute flex flex-nowrap gap-4 md:gap-8 animate-scroll">
          {/* Double the logos for infinite scroll effect */}
          {[...logoUrls, ...logoUrls].map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Sponsor logo ${index + 1}`}
              className="h-12 md:h-20 lg:h-28 w-auto object-contain flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        /* Responsive animation duration */
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 20s;
          }
        }

        @media (max-width: 480px) {
          .animate-scroll {
            animation-duration: 15s;
          }
        }
      `}</style>
    </section>
  );
};

export default Sponsors;
