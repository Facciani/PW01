const Search = () => {
  return (
    <div className="form-container">
      <div className="form-box">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="campo1" className="form-label">
              CITTA'
            </label>
            <input
              type="text"
              id="campo1"
              placeholder="City"
              className="input-field"
            />
          </div>
          <div className="form-field">
            <label htmlFor="campo2" className="form-label">
              DISTANZA
            </label>
            <input
              type="text"
              id="campo2"
              placeholder="Distance"
              className="input-field"
            />
          </div>
          <div className="form-field">
            <button className="submit-button">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
