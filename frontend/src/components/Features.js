import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Features.css";

export default function Features() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  return (
    <div className="torchContainerX">
 {/* LOCK IMAGE */}
      <div className="torchIconX">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
          alt="lock" className="lockSvg"
        />
      </div>


      {/* HEADING */}
      <h1 className="torchHeadingX">YOUR DATA ISN'T OUR BUSINESS YOUR DATA IS SAFE</h1>
      

      {/* PARAGRAPH WRAPPER */}
      <div
        className="torchWrapperX"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseLeave={() => {
          setPos({ x: -200, y: -200 });
        }}
      >
        {/* DIM TEXT */}
        <p className="torchTextX torchDimX">
          This content is hidden. Move your cursor like a torch to reveal the
          full message clearly. Only this paragraph reacts to light.
        </p>

        {/* TORCH TEXT */}
        <motion.p
          className="torchTextX torchRevealX"
          style={{
            WebkitMaskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
          }}
        >
          This content is hidden. Move your cursor like a torch to reveal the
          full message clearly. Only this paragraph reacts to light.
        </motion.p>
      </div>


  


    </div>
  );
}






