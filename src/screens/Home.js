import React, { useEffect,useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { Link } from 'react-router-dom'; // 👈 Thêm dòng này

function Home() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.product);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
     <div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl font-semibold">Product List</h1>

  {/* Dropdown menu */}
  <div className="relative inline-block text-left">
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={() => setShowMenu((prev) => !prev)}
    >
      + Create
    </button>

    {showMenu && (
      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
        <Link
          to="/create-category"
          className="block px-4 py-2 hover:bg-gray-100"
          onClick={() => setShowMenu(false)}
        >
          Create Category
        </Link>
        <Link
          to="/create"
          className="block px-4 py-2 hover:bg-gray-100"
          onClick={() => setShowMenu(false)}
        >
          Create Product
        </Link>
      </div>
    )}
  </div>
</div>


      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-contain rounded mb-2 bg-white p-2"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
