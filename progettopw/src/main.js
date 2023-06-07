import Header from "./components/header";
import Search from "./components/search";
import Footer from "./components/footer";

import "../src/index.css";
import {ListMusei} from "./components/listMusei";

function MainPage() {
  return (
    <>
        <Header />
        <Search />
        <ListMusei/>
        <Footer />
    </>
  );
}

export default MainPage;
