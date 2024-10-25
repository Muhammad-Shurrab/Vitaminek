import React from "react";

const logoUrls = [
  "https://asset.brandfetch.io/idMs2a1TTw/idwlEFmcn_.svg?updated=1716588640146",
  "https://www.svgrepo.com/show/303248/mastercard-2-logo.svg",
  "https://asset.brandfetch.io/idpG6RQhhI/iduIfOfS7x.svg?updated=1717492413016",
  // Repeat or add more logos if needed

  "https://www.svgrepo.com/show/303257/paypal-logo.svg", // Repeat or add more logos if needed
  "https://asset.brandfetch.io/idW4Ii72QL/idbO-bl63P.png?updated=1713453150664", // Repeat or add more logos if needed
  "https://seeklogo.com/images/M/muscletech-logo-3DBC4BBC88-seeklogo.com.png", // Repeat or add more logos if needed // Repeat or add more logos if needed
  "https://tukuz.com/wp-content/uploads/2020/09/optimum-nutrition-inc-logo-vector.png", // Repeat or add more logos if needed
  "https://asset.brandfetch.io/idiJkUC-Vm/iddMq0O9B4.png?updated=1709413152562", // Repeat or add more logos if needed
];

const Sponsors = () => {
  return (
    <section
      style={{
        padding: "3rem 0",
        backgroundColor: "white",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <h2 className="title relative text-2xl font-bold text-center mb-8 before after mt-36">
        Our Partners
      </h2>
      <div style={{ position: "relative", width: "100%", height: "7rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "2rem",
            animation: "scroll 20s linear infinite",
          }}
        >
          {logoUrls.concat(logoUrls).map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Sponsor logo ${index + 1}`}
              style={{
                height: "8rem",
                flexShrink: 0,
                marginRight: "2rem",
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Sponsors;
