

// import React, { useState } from 'react';
// import { Outlet } from "react-router-dom";
//  import VideoSectionForLayout from "../../pages/shopping-view/videosectionforlayout";



// const AuthLayout = () => {
//   const [showForm, setShowForm] = useState(false);

//   // Handle continue button click
//   const handleContinue = () => {
//     setShowForm(true);
//   };

//   return (
//     <div className="fixed inset-0 w-full bg-gray-100">
//       {/* Mobile Welcome Screen */}
//       <div 
//         className={`lg:hidden fixed inset-0 flex flex-col items-center justify-center transition-transform duration-500 ${
//           showForm ? '-translate-y-full' : ''
//         }`}
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: "url('/images/www.jpg')",
//             filter: "brightness(70%)",
//           }}
//         />
        
//         <div className="relative z-10 max-w-md space-y-6 text-center text-white p-4">
//           <h1 className="text-4xl font-extrabold tracking-tight">
//             Welcome to <span className="onestop-text">OneStop</span>
//           </h1>
//           <p className="text-lg opacity-90">
//            Explore a curated collection of the latest tech, fashion, and diverse products from across top brands and industries.
//           </p>
//           <button
//             onClick={handleContinue}
//             className="mt-8 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-colors"
//           >
//             Continue to Register
//           </button>
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="flex w-full h-full">
//         {/* Left Side - Background Image (Desktop) */}
//         <div className="hidden lg:flex items-center justify-center relative w-1/2">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: "url('/images/www.jpg')",
//               filter: "brightness(70%)",
//             }}
//           />
          
//           <div className="relative z-10 max-w-md space-y-6 text-center text-white">
//             <h1 className="text-5xl font-extrabold tracking-tight">
//               Welcome to <span className="onestop-text">OneStop</span>
//             </h1>
//             <p className="text-lg opacity-90">
//              Explore a curated collection of the latest tech, fashion, and diverse products from across top brands and industries.
//             </p>
//           </div>
//         </div>

//         {/* Right Side - Auth Forms */}
//         <div 
//           className={`flex-1 flex items-center justify-center bg-white shadow-lg rounded-lg px-4 py-12 sm:px-6 lg:px-8 transition-transform duration-500 ${
//             !showForm && 'lg:translate-y-0 translate-y-full'
//           }`}
//         >
//           <Outlet />
//         </div>
//       </div>

//       {/* Glow Effect CSS */}
//       <style>
//         {`
//           .onestop-text {
//             color: white;
//             font-weight: bold;
//             // text-transform: uppercase;
//             letter-spacing: 2px;
//             position: relative;
//             text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
//                          0 0 20px rgba(255, 255, 255, 0.6),
//                          0 0 30px rgba(0, 132, 255, 0.8),
//                          0 0 40px rgba(0, 132, 255, 0.7);
//             animation: glow 2s infinite alternate ease-in-out;
//           }

//           @keyframes glow {
//             0% {
//               text-shadow: 0 0 5px rgba(255, 255, 255, 0.7),
//                           0 0 15px rgba(255, 255, 255, 0.5),
//                           0 0 25px rgba(0, 132, 255, 0.7),
//                           0 0 35px rgba(0, 132, 255, 0.6);
//             }
//             100% {
//               text-shadow: 0 0 10px rgba(255, 255, 255, 1),
//                           0 0 20px rgba(255, 255, 255, 0.8),
//                           0 0 30px rgba(0, 132, 255, 1),
//                           0 0 50px rgba(0, 132, 255, 0.9);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default AuthLayout;

import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import VideoSectionForLayout from "../../pages/shopping-view/videosectionforlayout";

const AuthLayout = () => {
  const [showForm, setShowForm] = useState(false);

  // Handle continue button click
  const handleContinue = () => {
    setShowForm(true);
  };

  // Handle shop now click from video
  const handleShopNowClick = () => {
    // Add your shop now logic here
    console.log("Shop now clicked from video");
  };

  return (
    <div className="fixed inset-0 w-full bg-gray-100">
      {/* Mobile Welcome Screen */}
      <div 
        className={`lg:hidden fixed inset-0 flex flex-col items-center justify-center transition-transform duration-500 ${
          showForm ? '-translate-y-full' : ''
        }`}
      >
        {/* Video Background for Mobile */}
        <div className="absolute inset-0">
          <VideoSectionForLayout
            uniqueKey="mobile-section"
            numAds={1}
            filterByCategory={["electronics","sports", "women", "kids", "footwear"]}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
            onShopNow={handleShopNowClick}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40 z-1"></div>
        </div>
        
        <div className="relative z-10 max-w-md space-y-6 text-center text-white p-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
             <span className="onestop-text">OneStop</span>
          </h1>
          <p className="text-lg opacity-90">
           Explore a curated collection of the latest tech, fashion, and diverse products from across top brands and industries.
          </p>
          <button
            onClick={handleContinue}
            className="mt-8 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-colors"
          >
            Continue to Register
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex w-full h-full">
        
       {/* Left Side - Video Background (Desktop) */}
<div className="hidden lg:flex items-center justify-center relative w-1/2 overflow-hidden">
  {/* Video Component */}
  <VideoSectionForLayout
    uniqueKey="desktop-section"
    numAds={1}
    filterByCategory={["beauty","men", "kids", "footwear","electronics","accessories"]}
    className="absolute inset-0 w-full h-full object-cover"
    style={{ zIndex: 0 }}
    onShopNow={handleShopNowClick}
  />

  {/* Dark overlay for contrast */}
  <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

  {/* Text Overlay on top of video */}
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-white">
    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
       <span className="onestop-text">OneStop</span>
    </h1>
    <p className="text-lg opacity-90 max-w-md">
      Explore a curated collection of the latest tech, fashion, and diverse products from top brands and industries.
    </p>
  </div>
</div>

        {/* Right Side - Auth Forms */}
        <div 
          className={`flex-1 flex items-center justify-center bg-white shadow-lg rounded-lg px-4 py-12 sm:px-6 lg:px-8 transition-transform duration-500 ${
            !showForm && 'lg:translate-y-0 translate-y-full'
          }`}
        >
          <Outlet />
        </div>
      </div>

      
    </div>
  );
};

export default AuthLayout;

