import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

const sampleProducts = [
  {
    _id: "1",
    name: "Fresh Seer Fish",
    description: "Freshly sourced seer fish with excellent quality.",
    price: "680",
    unit: "kg",
    status: "available",
    category: "Sea Fish",
  },
  {
    _id: "2",
    name: "Fresh Pomfret",
    description: "Fresh pomfret selected for everyday cooking.",
    price: "620",
    unit: "kg",
    status: "available",
    category: "Sea Fish",
  },
  {
    _id: "3",
    name: "Fresh Tiger Prawns",
    description: "Juicy and fresh prawns, perfect for frying.",
    price: "720",
    unit: "kg",
    status: "available",
    category: "Prawns",
  },
  {
    _id: "4",
    name: "Fresh Squid",
    description: "Fresh squid cleaned and ready for cooking.",
    price: "460",
    unit: "kg",
    status: "out_of_stock",
    category: "Squid",
  },
  {
    _id: "5",
    name: "Fresh Sardine",
    description: "Fresh sardines sourced daily.",
    price: "280",
    unit: "kg",
    status: "available",
    category: "Sea Fish",
  },
  {
    _id: "6",
    name: "Fresh Pearl Spot",
    description: "Quality pearl spot suitable for traditional dishes.",
    price: "560",
    unit: "kg",
    status: "available",
    category: "Freshwater Fish",
  },
];

const ProductGrid = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="products-section">
      <div className="section-container">
        <div className="products-header">
          <div>
            <span className="section-label">FRESH TODAY</span>

            <h2>Popular Seafood</h2>

            <p>Fresh products available for delivery.</p>
          </div>

          <div className="product-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search seafood..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <div>🐟</div>
            <h3>No products found</h3>
            <p>Try searching with a different product name.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
