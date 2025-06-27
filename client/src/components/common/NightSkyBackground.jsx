import { useEffect } from "react";
import "./nightSky.css";      // we’ll create this in step 2

export default function NightSkyBackground() {
  useEffect(() => {
    // Generate stars once after mount
    const starsContainer = document.getElementById("night-sky-stars");
    const numberOfStars = 150;

    // Avoid duplicating stars on hot-reload
    if (starsContainer.childElementCount === 0) {
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.className = "night-sky-star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        const size = Math.random() * 3 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.animationDuration = Math.random() * 3 + 2 + "s";
        starsContainer.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="night-sky-container -z-10">
      <div id="night-sky-stars" className="night-sky-stars" />
      <div className="night-sky-moon" />
      {/* shooting stars */}
      <div
        className="night-sky-shooting-star"
        style={{ top: "20%", width: "150px", animationDelay: "0s" }}
      />
      <div
        className="night-sky-shooting-star"
        style={{ top: "60%", width: "100px", animationDelay: "8s" }}
      />
      <div
        className="night-sky-shooting-star"
        style={{ top: "40%", width: "120px", animationDelay: "15s" }}
      />
    </div>
  );
}
