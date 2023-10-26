import Form from "../form";
import NavigationBoard from "../navigation-board";
import css from "./index.module.css";

const App = () => {
  return (
    <main className={css.main}>
      <NavigationBoard>
        <Form />
      </NavigationBoard>
    </main>
  );
};

export default App;
