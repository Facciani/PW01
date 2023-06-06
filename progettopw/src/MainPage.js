import Header from "./components/header";
import Search from "./components/search";
import Suggest from "./components/suggestt";
import Footer from "./components/footer";

import "../src/index.css";

function MainPage() {
  return (
    <>
      <Header />
      <Search />
      <Suggest />
      <Footer />
    </>
  );
}

export default MainPage;
