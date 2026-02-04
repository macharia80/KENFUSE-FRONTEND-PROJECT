// src/pages/Marketplace.tsx
const Marketplace = () => {
  const products = [
    { id: 1, name: 'Flower Bouquet', price: 'KES 23000', type: 'Flowers' },
    { id: 2, name: 'Memorial Urn', price: '$KES40000', type: 'Urns' },
    { id: 3, name: 'Sympathy Card Set', price: 'KES2000', type: 'Stationery' },
    { id: 4, name: 'Memorial Candle', price: 'KES2400', type: 'Gifts' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Marketplace</h1>
      
      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          Browse memorial products and services from trusted vendors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 border">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-500">{product.type}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {product.name}
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{product.type}</span>
              <span className="text-blue-600 font-bold">{product.price}</span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Vendor Services
        </h2>
        <p className="text-gray-600">
          Looking to list your products? Contact us to become a vendor.
        </p>
      </div>
    </div>
  );
};

export default Marketplace;