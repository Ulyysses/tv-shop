import { useRef, useState } from "react";
import Form from "../form";
import NavigationBoard from "../navigation-board";
import css from "./index.module.css";
import PromoVideo from "../promo-video";

const App = () => {
  const [isFormActive, setIsFormActive] = useState(false);
  const refVideo = useRef<HTMLVideoElement | null>(null);

  return (
    <main className={css.main}>
      <NavigationBoard>
        <PromoVideo
          refVideo={refVideo}
          isFormActive={isFormActive}
          setIsFormActive={setIsFormActive}
        />
        <Form isFormActive={isFormActive} setIsFormActive={setIsFormActive} />
      </NavigationBoard>
    </main>
  );
};

export default App;
