import Header from "./components/header";
import Search from "./components/search";
import Footer from "./components/footer";
import Suggest from "./components/suggest";

import "../src/index.css";
import {ListMusei} from "./components/listMusei";

function MainPage() {
  return (
    <>
        <Header />
        <Search />
        <ListMusei/>
        <Suggest />
        <Footer />
    </>
  );
}

export default MainPage;
