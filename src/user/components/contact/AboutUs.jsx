import React from "react";
import "./aboutUs.css";
import bg from "./images/bg.jpg";
import grl from "./images/officegrl.jpg";
import image from './images/image.png'
import Company from './images/Company-Branding_team-work.png'

const AboutUs = () => {

    const image1 = grl, image2 = image, image3 = Company

  return (
    <div className="about-us" style={{ backgroundImage: `url(${bg})` }}>
      <div class="box _1">
        <div class="pic">
          <img src={image1} alt="" />
        </div>
        <p class="text">
          HUMASCOT ນຳສະເໜີການໃຫ້ບໍລິການທາງດ້ານ Hardware ແລະ Software
          ໂດຍການນຳໃຊ້ທາງບັນຍາ ແລະ ສະເໜີການຈ້າງງານ ແລະ ການຈັດການໃນທ່ອງຖິ່ນ
          ສຳລັບບໍລິສັດເກົາຫຼີ ແລະ ວິສະວະກອນລາວ
        </p>
      </div>
      <div class="box _2">
        <div class="pic">
          <img src={image2} alt="" />
        </div>
        <p class="text">
          ບໍລິສັດຂອງພວກເຮົາສະເໜີການຈ້າງງານອອນໄລນ໌, ການຈັດການໂຄງການ ແລະ
          ການສຳມະນາໃນທ້ອງຖິ່ນ.
          ນີ້ແມ່ນໂອກາດດີທີ່ຈະຈ້າງພະນັກງານທີ່ມີຄວາມສາມາດລະດັບສູງຈາກລາວ ແລະ ອາຊີ
        </p>
        <div className="recruiting">
          <h2>ຮັບສະໝັກພະນັກງານ</h2>
          <h3>ຈັດການພະນັກງານໃນພື້ນທີ່</h3>
          <ul>
            <li>ເຮັດວຽກອອນໄລນ໌</li>
            <li>ເຮັດວຽກໃນທ້ອງຖິ່ນ</li>
          </ul>
        </div>
        <p class="text">
          ບໍລິສັດຂອງພວກເຮົາສະເໜີການຈ້າງງານອອນໄລນ໌, ການຈັດການໂຄງການ ແລະ
          ການສຳມະນາໃນທ້ອງຖິ່ນ.
        </p>
      </div>
      <div class="box _1">
        <div class="pic">
          <img src={image3} alt="" />
        </div>
        <p class="text">
          ບໍລິສັດຂອງພວກເຮົາສະເໜີການຈ້າງງານອອນໄລນ໌, ການຈັດການໂຄງການ ແລະ
          ການສຳມະນາໃນທ້ອງຖິ່ນ.
          ນີ້ແມ່ນໂອກາດດີທີ່ຈະຈ້າງພະນັກງານທີ່ມີຄວາມສາມາດລະດັບສູງຈາກລາວ ແລະ ອາຊຽນ
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
