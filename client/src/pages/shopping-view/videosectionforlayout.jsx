import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { categoryBrandMapping } from "@/config/category-brand-config";

// const backendUrl = "https://lookgood.onrender.com";
const backendUrl = ""; // Set this to your actual API endpoint

function VideoSectionForLayout({ uniqueKey, numAds, filterByCategory = [], onShopNow }) {
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/advertisements`);
        let ads = response.data.data;

        console.log("Fetched ads:", ads); // Debug: Check if ads are fetched

        if (filterByCategory.length > 0) {
          const allowedBrands = filterByCategory.flatMap((category) =>
            categoryBrandMapping[category]?.map((brand) => brand.id) || []
          );
          ads = ads.filter((ad) => allowedBrands.includes(ad.brand));
        }

        const uniqueAds = ads.sort(() => 0.5 - Math.random()).slice(0, numAds);
        setAdvertisements(uniqueAds);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, [uniqueKey, numAds]);

  return (
    <section className="w-full h-full bg-black">
      <div className="relative w-full h-full">
        {advertisements.length > 0 ? (
          advertisements.map((ad) => (
            <div key={ad._id} className="relative w-full h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover" // Adjusted to fill the container
                ref={(el) => (videoRefs.current[ad._id] = el)}
                onPlay={() => setActiveVideoId(ad._id)}
              >
                <source src={ad.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))
        ) : (
          <div className="text-white">No ads available</div> // Debug: Show if no ads
        )}
      </div>
    </section>
  );
}

export default VideoSectionForLayout;