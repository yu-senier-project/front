import "../../../styles/feed/main/imgs.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
const Imgs = ({ imgList }) => {
  return (
    <div className="Imgs">
      {imgList && (
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {imgList.map((item) => (
            <SwiperSlide>
              <img src={item.uploadFileURL} alt="이미지" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Imgs;
