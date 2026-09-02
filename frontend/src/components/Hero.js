import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import './Hero.css';


export default function Hero() {

/* ================= 1st SECTION ================= */
const containerRef = useRef(null);

  const paragraphs = [
    `The future of 
shopping is local. 
We connect customers
 with nearby merchants, 
making it easier 
to discover 
products and support 
local businesses.`
  ];

  const totalWords = useMemo(() => {
    return paragraphs.join(" ").split(/\s+/).length;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.65", "end 0.35"]
  });

  const revealIndex = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    [0, totalWords]
  );

  let wordCounter = 0;

/* ================= 2nd SECTION ================= */
 const [start, setStart] = useState(false);

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Es8OdwFhaa1LMn1sdOJJzXikPijNq9gFnDaLw9cKHw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTejAdeHVScmrT_1dCbCXtW1qew2Cjv167Z9qS8SANEIg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaPbwBDsFn6Lnx5jsAG6Tiy4ivetNJUoaqCBsth2WcKQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Es8OdwFhaa1LMn1sdOJJzXikPijNq9gFnDaLw9cKHw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dyuf1BRqbOA3pjHi-0WONi8lUizONyrgbZnUGNSNyg&s=10",
  ];

/* ================= 3rd SECTION ================= */

/* CUSTOMER DATA */
const customerCardsData = [
  {
    title: "Instant Savings",
    subtitle: "Exclusive savings every time you shop at your local stores",
    img:"/images/1.jpg",
    bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "Personal Bond",
    subtitle: "Build trust and enjoy personalised service with your neighborhood shops",
    img:"/images/2.jpg",
    bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "Unlimited Usage",
    subtitle: "Use your intown services all year, no limits",
   img:"/images/3.jpg",
   bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "Wide Network",
    subtitle: "Access to multiple categories and multiple locationes",
   img:"/images/4.jpg",
    bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "Support local businesses",
    subtitle: "Shop smart while boosting your local enconomy",
   img:"/images/5.jpg",
    bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "Hassle=Free",
    subtitle: "No coupons, no points, no queues. just show your intown and save instantil ",
   img:"/images/6.jpg",
    bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  }
];

/* MERCHANT DATA */
const merchantCardsData = [
  {
    title: "Zero Commissions",
    subtitle: "Keep 100% of your revenue, no payout delays.",
   img:"/images/instant-save.jpg",
bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "No joining Fee",
    subtitle: "List your store on intown at absolutely no cost",
    img:"/images/personal_connection.jpg",
    bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "Boost walk-ins",
    subtitle: "Attract genuine customer actively looking to shop locally",
    img:"/images/unlimited_use.jpg",
    bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "control your offers ",
    subtitle: "set and adjust siscounts as per your roi strategy",
    img:"/images/wide_network.jpg",
    
    bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "free promotion",
    subtitle: "get featured in our local listings and promotion at no cost",
    img:"/images/support_local_busi.jpg",
    bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  },
  {
    title: "Customer loyalty",
    subtitle: "Build repeat walk-ins and a strong neighborhood customer base",
   img:"/images/has_free.jpg",
bg: "radial-gradient(circle at 50% 90%, #f4b183 0%, #fff4eb 35%, #ffffff 75%)",
  }
];
 const [type, setType] = useState("customer");

  // ✅ DATA STATE
  const [customerCards] = useState(customerCardsData);
  const [merchantCards] = useState(merchantCardsData);

  const data = type === "customer" ? customerCards : merchantCards;

return (
   <div className="herobgclr">


  {/* ================= 1st SECTION ================= */}
 

  <section className="sec-wrap">
      <div ref={containerRef} className="card-wrap">
        <div className="text-wrap">
          {paragraphs.map((para, pIndex) => {
            const words = para.split(/\s+/);

            return (
              <p key={pIndex} className="para-text">
                {words.map((word, i) => {
                  const index = wordCounter++;

                  const color = useTransform(
                    revealIndex,
                    (value) => (index < value ? "#ffffff" : "#555555")
                  );

                  return (
                    <motion.span key={i} style={{ color }}>
                      {word}{" "}
                    </motion.span>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </section>

  {/* ================= 2nd SECTION ================= */}
 <section className="section2">

  <div className="page">

    {/* IMAGE */}
    <div className="imageSection">

      {!start && (
        <motion.img
          src={images[0]}
          onMouseEnter={() => setStart(true)}
          className="singleImage"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      {start && (
        <motion.div
          className="circle"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 1080 }}
          transition={{ duration: 6, ease: "linear" }}
        >
          {images.map((img, i) => {
            const angle = (i / images.length) * 360;

            return (
              <img
                key={i}
                src={img}
                className="carde"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(150px)`
                }}
              />
            );
          })}
        </motion.div>
      )}

    </div>

  </div>
  <div className="imageText">
        <h1>intown local shop local by local save local</h1>
        <p>
          hello intown local hellllllo intown local 
          shop local by local save local intown  local save local
         
        </p>
      </div>

</section>
{/* ================= 4rd SECTION ================= */}

<section className="section4">

  <div className="container">

    {/* MISSION */}
    <motion.div
      className="cards"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <div className="left"></div>

      <div className="content">
        <motion.h2
          className="title"
          whileHover={{ x: 5 }}
        >
          Mission
        </motion.h2>

        <p className="text">
          To empower local merchants by giving them digital visibility and
          personalized shopping experiences.
        </p>
      </div>
    </motion.div>

    {/* VISION */}
    <motion.div
      className="cards"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="left"></div>

      <div className="content">
        <motion.h2
          className="title"
          whileHover={{ x: 5 }}
        >
          Vision
        </motion.h2>

        <p className="text">
          A thriving local economy where every purchase strengthens the
          community.
        </p>
      </div>
    </motion.div>

  </div>
  <div className="videoBox">
  <video autoPlay loop muted className="bg-video">
    <source src="https://in-town.s3.us-east-1.amazonaws.com/in-town-application/intown-ui/intown-video.mp4" type="video/mp4" />
    <source src="/images/intown-video.mp4" type="video/mp4" />
  </video>
</div>

</section>
  {/* ================= 3rd SECTION ================= */}
     <section className="section3">

      {/* BUTTONS */}
      <div className="buttonContainer">
        <button
          className={type === "merchant" ? "activeBtn" : "btn"}
          onClick={() => setType("merchant")}
        >
          Merchant
        </button>

        <button
          className={type === "customer" ? "activeBtn" : "btn"}
          onClick={() => setType("customer")}
        >
          Customer
        </button>
      </div>

      {/* HEADING */}
      <h2 className="mainHeading">
        {type === "customer" ? " shop local save instantly " : " Local. Trusted.Rewarding."}
      </h2>

      {/* DESCRIPTION */}
      <p className="description">
        {type === "customer"
          ? "Experience the power of local shopping with exclusive benefits designed just for you by your nighborhood shops"
          : "Grow your business with our merchant friendly platform that puts you in your controleasily"}
      </p>

      {/* CARDS */}
      <div className="scrollContainer">
        {data.map((item, i) => (
          <motion.div
            key={i}
            className="cardes"
            style={{ background: item.bg }}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <h2 className="heading">{item.title}</h2>

            <p className="desc">{item.subtitle}</p>

            <button className="knowBtn">KNOW MORE →</button>

            <div className="imageBox">
              <div
                className="glows"
                style={{
                  background: item.bg
                }}
              ></div>

              <img src={item.img} alt="" className="image" />
            </div>
          </motion.div>
        ))}
      </div>

    </section>

     {/* ================= 5rd SECTION ================= */}

     <div className="videoContainer">
           
      
     
         
           <div className="videoOverlay"></div>
     
    
           <div className="videoContent">
             <h1>Your neighborhood has more to offer.</h1>
             <p>Discover new places, find relevant savings, explore local products, and support the businesses around you.</p>
       
           </div>
     
           <div className="imageLayer">
             <motion.video 
         
               src="/images/intown-video.mp4" type="video/mp4"
               autoPlay 
               loop 
               muted 
               playsInline
               animate={{ 
                 
                 y: ["0vh", "0vh", "100vh", "-100vh", "0vh"],
                 opacity: [1, 1, 0, 0, 1]
               }} 
               transition={{ 
                 duration: 5, 
                 ease: "easeInOut", 
                 times: [0, 0.4, 0.55, 0.6, 1], 
                 repeat: Infinity, 
                 repeatDelay: 1 
               }} 
             /> 
           </div>
     
     
     
     
     
         </div>

</div>


);
}

  
