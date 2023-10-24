import video from "../../assets/video.mp4";
import banner from "../../assets/banner.png";
import "./PromoVideo.css";
import { RefObject, useEffect } from "react";

interface IPromoVideo {
  refVideo: RefObject<HTMLVideoElement>;
  isFormActive: boolean;
  setIsFormActive: (value: boolean) => void;
  hiddenStyle: string;
}

const PromoVideo = ({refVideo, isFormActive, setIsFormActive, hiddenStyle}: IPromoVideo) => {
  
    useEffect(() => {
    if (!isFormActive) {
      refVideo.current?.play();
    } else {
      refVideo.current?.pause();
      setIsFormActive(true)
    }
  }, [isFormActive, refVideo, setIsFormActive]);

  const handleFormOpen = () => {
    setIsFormActive(true)
  }

  return (
    <div className="video_container" style={{ display: hiddenStyle }}>
      <video width="1280" height="720" autoPlay muted className="video" ref={refVideo}>
        <source src={video} type="video/mp4" />
      </video>
      <button onClick={handleFormOpen}>
        <img
          className="video_banner"
          src={banner}
          alt="video banner"
        />
      </button>
    </div>
  );
};

export default PromoVideo;
