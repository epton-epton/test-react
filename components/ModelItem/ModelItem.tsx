import React from 'react';
import Logo from '@/components/ui/ButtonStartChat';
import ButtonStartChat from '@/components/ui/ButtonStartChat';
import styles from './modelItem.module.css';

interface ModelItemProps {
    bgUrl: string;
    modelName: string;
    modelDesc?: string;
    className?: string;
  }

const ModelItem: React.FC<ModelItemProps> = ( {bgUrl, modelName, modelDesc, className}) => {
    return (
        <div style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} 
        className={`${className} ${styles.modelItem} rounded-2xl relative`}>
            <ButtonStartChat modelNameChat={modelName}/>
            <span className="modelDesc absolute bottom-12 left-4 text-white text-xl">{modelDesc}</span>
            <span className="modelName absolute bottom-4 left-4 text-2xl font-semibold text-white">{modelName}</span>
        </div>
    );
};

export default ModelItem;