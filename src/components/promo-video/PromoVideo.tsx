import video from "../../assets/video.mp4";
import banner from "../../assets/banner.png";
import css from "./index.module.css";
import { RefObject, useEffect, useRef } from "react";

interface IPromoVideo {
  refVideo: RefObject<HTMLVideoElement>;
  isFormActive: boolean;
  setIsFormActive: (value: boolean) => void;
  hiddenStyle: string;
}

const PromoVideo = ({refVideo, isFormActive, setIsFormActive, hiddenStyle}: IPromoVideo) => {
  const refBanner = useRef<HTMLButtonElement | null>(null);

  const handleFormOpen = () => {
    setIsFormActive(true)
  }

    useEffect(() => {
    if (!isFormActive) {
      refVideo.current?.play();
    } else {
      refVideo.current?.pause();
      setIsFormActive(true)
    }
  }, [isFormActive, refVideo, setIsFormActive]);

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        refBanner.current
      ) {
        refBanner.current.focus();
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  return (
    <div className={css.video_container} style={{ display: hiddenStyle }}>
      <video width="1280" height="720" autoPlay muted className={css.video} ref={refVideo}>
        <source src={video} type="video/mp4" />
      </video>
      <button onClick={handleFormOpen} ref={refBanner} className={css.video_banner}>
        <img
          src={banner}
          alt="video banner"
        />
      </button>
    </div>
  );
};

export default PromoVideo;
