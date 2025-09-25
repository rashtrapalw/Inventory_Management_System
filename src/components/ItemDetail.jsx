function ItemDetail({ item, onBack }) {
  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-3" onClick={onBack}>
        ← Back
      </button>
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <img
          src={item.image}
          className="card-img-top mx-auto d-block mt-3"
          alt={item.name}
          style={{ height: "200px", width: "200px", objectFit: "contain" }}
        />
        <div className="card-body text-center">
          <h3 className="card-title">{item.name}</h3>
          <p className="card-text">{item.description}</p>
          <p className="fw-bold">Price: ${item.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
