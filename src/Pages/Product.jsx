import React, { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { UserContext } from '../context/userContext';


const Product = () => {
  const { id } = useParams();
  const { Theme } = useContext(UserContext); 

  useEffect(() => {
    document.title = 'Product';
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () =>
      fetch(`https://dummyjson.com/products/${id}`).then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      }),
  });

  return (
    <>
      <Navbar title="Product App" showLogo={false} />

      {isLoading && <div className="p-10 text-center">Loading...</div>}
      {isError && <div className="p-10 text-center">{error.message}</div>}

      {!isLoading && !isError && data && (
        <div className={`flex justify-center items-center min-h-screen p-10 transition-all ${Theme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
          <Card className={`w-full md:w-[450px] lg:w-[500px] shadow-md hover:shadow-lg transition-all duration-300 rounded-lg 
            ${Theme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
            <CardHeader
              color="transparent"
              floated={false}
              className="p-0 h-72 overflow-hidden rounded-t-lg"
            >
              <img
                src={data?.thumbnail}
                alt={data.title}
                className="h-full w-full object-contain object-center"
              />
            </CardHeader>
            <CardBody className={`flex flex-col gap-4 p-6 ${Theme ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <Typography variant="h4" className={`font-semibold ${Theme ? 'text-white' : 'text-gray-900'}`}>
                {data?.title}
              </Typography>
              <Typography className={Theme ? 'text-gray-300' : 'text-gray-600'}>
                {data?.description}
              </Typography>
              <Typography variant="small" className={`text-sm ${Theme ? 'text-gray-400' : 'text-gray-500'}`}>
                Category: {data?.category}
              </Typography>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default Product;
