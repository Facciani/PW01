import Header from "./components/header";
import "../src/index.css";
import Footer from "./components/footer";
import imgpaginaMostra from "../src/components/img/imgpaginaMostra.jpeg";

function PaginaMostra() {
  return (
    <>
      <Header />
      <div class="container-mostra">
        <div class="text-mostra">
          A misura di bambino. Crescere nell'antica Roma
        </div>
        <img src={imgpaginaMostra}></img>
      </div>
      <Footer />
    </>
  );
}
export default PaginaMostra;
