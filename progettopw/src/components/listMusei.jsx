import { GetMusei } from "./crud/crudMuseo";

const ListMusei = () => {
  return (
    <div className="search-container">
      <div className="search-filter">
        <h3>Filtraggi</h3>
        <p>ciao</p>
      </div>
      <div className="museum-search">
        <GetMusei />
      </div>
    </div>
  );
};

export { ListMusei };
