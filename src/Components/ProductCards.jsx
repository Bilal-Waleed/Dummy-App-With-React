import React, { useContext } from 'react';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProductCards = ({ products }) => {
  const { Theme } = useContext(UserContext);

  return (
    <div className={`flex flex-wrap justify-center gap-8 p-10 transition-all ${Theme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {products?.map((product) => {
        const { thumbnail, id, title, description } = product;
        return (
          <Link to={`/product/${id}`} key={id} className="w-full md:w-[45%] lg:w-[30%]">
            <Card className={`w-full shadow-md hover:shadow-lg transition-all duration-300 rounded-lg 
              ${Theme ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <div className={`h-64 ${Theme ? 'bg-gray-700' : 'bg-white'} flex items-center justify-center rounded-t-lg overflow-hidden`}>
                <img
                  src={thumbnail}
                  alt={title}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <CardBody className="flex flex-col gap-2 p-5">
                <Typography variant="h6" className={`font-semibold ${Theme ? 'text-white' : 'text-gray-900'}`}>
                  {title}
                </Typography>
                <Typography className={`text-sm ${Theme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {description.length > 100 ? description.slice(0, 100) + '...' : description}
                </Typography>
                <Button
                  className={`text-xs font-bold px-6 py-3 rounded-md w-fit mt-4 text-left
                    ${Theme ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                >
                  Read More
                </Button>
              </CardBody>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductCards;
