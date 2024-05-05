import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../../styles/feed/create/image.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../basic/Button";

const Image = () => {
  const [showImages, setShowImages] = useState([]);

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    setShowImages(imageUrlLists);
    console.log(showImages);
  };

  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <div className="Image">
      <label htmlFor="file">
        <div className="btn">이미지 추가</div>
      </label>
      <input
        type="file"
        id="file"
        onChange={handleAddImages}
        multiple
        style={{ display: "none" }}
      />
      {showImages.length >= 1 && (
        <div className="images">
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="image-btn"
          >
            {showImages.map((image, id) => (
              <SwiperSlide key={id}>
                <img
                  src={image}
                  alt={`Preview ${id}`}
                  width={"100%"}
                  height={"540px"}
                />
                <div
                  className="minus-btn"
                  onClick={() => handleDeleteImage(id)}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </div>
                <label htmlFor="file">
                  <div className="plus-btn">
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </div>
                </label>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Image;
