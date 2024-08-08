// components/Home.tsx
'use client';

import React, { useState } from 'react';
import ModelItem from '@/components/ModelItem/ModelItem';
import styles from '@/components/modelItem/modelItem.module.css';
import dotenv from 'dotenv';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-wrap space-y-3 items-center">
      <div className="w-full">
        <ModelItem bgUrl="/model01.jpeg" modelName='Model One' modelDesc='Best model on our website!' className={`${styles.modelItem100}`} />
      </div>
      <div className="flex w-full space-x-3">
        <ModelItem bgUrl="/model02.webp" modelName='Model Two' modelDesc='' className={`${styles.modelItem25} flex-grow basis-[25%]`} />
        <ModelItem bgUrl="/model03.jpg" modelName='Model Three' modelDesc='' className={`${styles.modelItem35} flex-grow basis-[35%]`} />
        <ModelItem bgUrl="/model04.jpg" modelName='Model Four' modelDesc='' className={`${styles.modelItem40} flex-grow basis-[40%]`} />
      </div>      
     </div>    
  );
};

export default Home;