import { GetMusei } from "./crud/crudMuseo";

const ListMusei = () => {
  return (
    <div className="search-container">
      <div className="search-filter">
        <h3>Filtraggi</h3>
        <h4>come va?</h4>
        <h4>come va?</h4>
      </div>
      <div className="museum-search">
        <GetMusei />
      </div>
    </div>
  );
};

export { ListMusei };
