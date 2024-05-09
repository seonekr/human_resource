import React from "react";
import "./aboutUs.css";
import bg from "./bg.jpg";
import grl from "./officegrl.jpg";

const AboutUs = () => {
  return (
    <div className="about-us" style={{ backgroundImage: `url(${bg})` }}>
      <div class="box-1">
        <div class="pic">
          <img src={grl} alt="" />
        </div>
        <p class="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          magni, commodi animi placeat necessitatibus tempora, quibusdam error
          nihil corrupti iste nostrum autem eveniet eum, obcaecati ut provident
          atque hic. Error.lore Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Ipsam alias reprehenderit dolorum dolor eos eius ea,
          soluta iste, hic labore eum inventore voluptate quia dolores
          accusamus. Praesentium totam molestiae dignissimos.
        </p>
      </div>
      <div class="box-1">
        <div class="pic">
          <img src={grl} alt="" />
        </div>
        <p class="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          magni, commodi animi placeat necessitatibus tempora, quibusdam error
          nihil corrupti iste nostrum autem eveniet eum, obcaecati ut provident
          atque hic. Error.lore Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Ipsam alias reprehenderit dolorum dolor eos eius ea,
          soluta iste, hic labore eum inventore voluptate quia dolores
          accusamus. Praesentium totam molestiae dignissimos.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
