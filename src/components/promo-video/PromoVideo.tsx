import { RefObject, useEffect, useRef } from "react";

import video from "../../assets/video.mp4";
import banner from "../../assets/banner.png";

import css from "./index.module.css";

interface IPromoVideo {
  refVideo: RefObject<HTMLVideoElement>;
  isFormActive: boolean;
  setIsFormActive: (value: boolean) => void;
}

const PromoVideo = ({
  refVideo,
  isFormActive,
  setIsFormActive,
}: IPromoVideo) => {
  const refBanner = useRef<HTMLButtonElement | null>(null);

  const handleFormOpen = () => {
    setIsFormActive(true);
  };

  useEffect(() => {
    if (!isFormActive) {
      refVideo.current?.play();
    } else {
      refVideo.current?.pause();
      setIsFormActive(true);
    }
  }, [isFormActive, refVideo, setIsFormActive]);

  useEffect(() => {
    if (refBanner.current && !isFormActive) {
      refBanner.current.focus();
    }
  }, [isFormActive]);

  return (
    <div className={isFormActive ? css.video_none : css.video_container}>
      <video
        width="1280"
        height="720"
        autoPlay
        muted
        loop
        className={css.video}
        ref={refVideo}
      >
        <source src={video} type="video/mp4" />
      </video>
      <button
        onClick={handleFormOpen}
        ref={refBanner}
        className={css.video_banner}
      >
        <img src={banner} alt="video banner" />
      </button>
    </div>
  );
};

export default PromoVideo;
