import React from "react";
import "./aboutUs.css";
import bg from "./images/photorealistic-style-clouds-city.jpg";
import grl from "./images/officegrl.jpg";
import image from "./images/image.png";
import Company from "./images/Company-Branding_team-work.png";

const Introduce1 = () => {
  const image1 = grl,
    image2 = image,
    image3 = Company;

  return (
    <>
      <div className="about-us" style={{ backgroundImage: `url(${bg})` }}>
        <h1>For company</h1>

        <div className="box _1">
          <div className="pic">
            <img src={image1} alt="" />
          </div>
          <p className="text">
            HUMASCOT ນຳສະເໜີການໃຫ້ບໍລິການທາງດ້ານ Hardware ແລະ Software
            ໂດຍການນຳໃຊ້ທາງບັນຍາ ແລະ ສະເໜີການຈ້າງງານ ແລະ ການຈັດການໃນທ່ອງຖິ່ນ
            ສຳລັບບໍລິສັດເກົາຫຼີ ແລະ ວິສະວະກອນລາວ
          </p>
        </div>
        <div className="box _2">
          <div className="pic">
            <img src={image2} alt="" />
          </div>
          <p className="text">
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
          <p className="text">
            ບໍລິສັດຂອງພວກເຮົາສະເໜີການຈ້າງງານອອນໄລນ໌, ການຈັດການໂຄງການ ແລະ
            ການສຳມະນາໃນທ້ອງຖິ່ນ.
          </p>
        </div>
        <div className="box _1">
          <div className="pic">
            <img src={image3} alt="" />
          </div>
          <h2>ລະ​ບົບ​ການ​ຄຸ້ມ​ຄອງ​ປະ​ຈຸ​ບັນ</h2>
          <h3>ການຄຸ້ມ​ຄອງ​ໂຄງການ</h3>
          <ul>
            <li>
              ສະໜັບສະໜູນການສຳມະນາອອນໄລນ໌ສອງຄັ້ງຕໍ່ອາທິດ
              (ສະໜັບສະໜູນການແປພາສາແບບຣີວໄທມ໌)
            </li>
            <li>ສົ່ງລາຍງານທາງທຸລະກິດອາທິດລະສອງຄັ້ງ</li>
            <li>
              ຮັກສາຄວາມລັບຂອງບໍລິສັດໂດຍການສະຫນອງສະພາບແວດລ້ອມທີ່ປອດໄພໃນທ້ອງຖິ່ນ
            </li>
            <li>
              ສະຫນັບສະຫນູນກອງປະຊຸມທຸລະກິດທີ່ບໍ່ເປັນປົກກະຕິ
              (ລະບົບການຈອງຫ້ອງປະຊຸມອອນໄລນ໌)
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Introduce1;
