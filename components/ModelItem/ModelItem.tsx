import React from 'react';
import ButtonStartChat from '@/components/ui/ButtonStartChat';
import styles from './ModelItem.module.css';
import { ModelProvider } from '@/components/context/ModelContext';

interface ModelItemProps {
    bgUrl: string;
    modelName: string;
    modelDesc?: string;
    className?: string;
  }

const ModelItem: React.FC<ModelItemProps> = ({ bgUrl, modelName, modelDesc, className }) => {
    return (
        <ModelProvider modelName={modelName}>
            <div style={{
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} 
            className={`${className} ${styles.modelItem} rounded-2xl relative`}>
                <ButtonStartChat />
                <span className="modelDesc absolute bottom-12 left-4 text-white text-xl">{modelDesc}</span>
                <span className="modelName absolute bottom-4 left-4 text-2xl font-semibold text-white">{modelName}</span>
            </div>
        </ModelProvider>
    );
};

export default ModelItem;
