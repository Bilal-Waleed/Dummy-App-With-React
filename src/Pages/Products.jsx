import { useQuery } from '@tanstack/react-query';
import React, { useState, useContext, useEffect } from 'react';
import ProductCards from '../Components/ProductCards';
import Navbar from '../Components/Navbar';
import { FaSearch } from 'react-icons/fa';
import { UserContext } from '../context/userContext';


const Products = () => {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { Theme } = useContext(UserContext); 

  useEffect(() => {
    document.title = 'All-Products';
  }, []);

  const fetchProduct = async ({ queryKey }) => {
    const [, search] = queryKey;
    const url = search
      ? `https://dummyjson.com/products/search?q=${search}`
      : 'https://dummyjson.com/products';
    const res = await fetch(url);
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: fetchProduct,
    keepPreviousData: true
  });

  const handleSearch = () => {
    setSearch(searchInput.trim());
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === '') {
      setSearch('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Navbar title="Product Page" showLogo={false} />

      <div className={`min-h-screen pb-10 ${Theme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="w-full flex justify-center">
          <div className="p-4 w-[22rem] flex gap-2">
            <input
              className={`px-3 py-2 rounded w-full border outline-none transition-all 
              ${Theme ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
              type="text"
              placeholder="Search Product"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className={'px-4 py-2 rounded transition-all bg-gray-700 text-white hover:bg-gray-600'}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-10 text-center">Loading…</div>
        ) : (
          <div>
            {
              data?.products?.length > 0
                ? <ProductCards products={data.products} />
                : <div className="text-center mt-10">No Products Found</div>
            }
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
