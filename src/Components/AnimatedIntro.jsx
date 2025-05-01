import React, { useEffect, useState } from 'react';

const content = `Welcome to my <strong>Dummy app</strong>. 
This is my SMIT assignment built using React. 
It includes two main applications 
a <strong>Todo App</strong> with full <strong>CRUD</strong> functionality, and a <strong>Product App</strong> 
that uses <strong>REST API</strong> integration with <strong>TanStack Query</strong>. 
Both apps are styled and optimized for performance.`;


const AnimatedIntro = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + content[index]);
        setIndex(index + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div
      className="text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed p-4"
      dangerouslySetInnerHTML={{ __html: displayedText }}
    />
  );
};

export default AnimatedIntro;
