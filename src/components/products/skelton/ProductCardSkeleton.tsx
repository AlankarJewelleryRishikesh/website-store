import React from "react";

const shimmerKeyframes = `
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: 200px 0;
    }
  }
`;

const shimmerStyle = {
  animation: "shimmer 1.5s infinite linear",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
  backgroundSize: "400% 100%",
};

const ProductCardSkeleton = () => {
  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div className="bg-[#FCF5F3] shadow-md border border-[#D2AB67] rounded-xl overflow-hidden relative h-[400px] flex flex-col p-4 animate-pulse">
        {/* Category Placeholder */}
        <div className="h-4 w-20 mb-1 rounded-md" style={shimmerStyle}></div>
        <div className="h-5 w-28 rounded-md mb-3" style={shimmerStyle}></div>

        {/* Image Placeholder */}
        <div
          className="h-44 bg-[#FCF5F3] flex items-center justify-center mb-3 rounded-md"
          style={{ ...shimmerStyle, borderRadius: "0.75rem" }}
        >
          {/* Empty block as image placeholder */}
          <div className="h-full w-full rounded-md" />
        </div>

        {/* Title Placeholder */}
        <div className="flex flex-col flex-grow justify-between">
          <div className="space-y-2 text-center">
            <div className="h-6 w-32 mx-auto rounded-md" style={shimmerStyle}></div>
            <div className="h-4 w-48 mx-auto rounded-md" style={shimmerStyle}></div>
            <div className="h-4 w-20 mx-auto rounded-md" style={shimmerStyle}></div>
          </div>

          {/* Button Placeholder */}
          <div className="mt-4 h-10 w-full rounded-md" style={shimmerStyle}></div>
        </div>
      </div>
    </>
  );
};

export default ProductCardSkeleton;
