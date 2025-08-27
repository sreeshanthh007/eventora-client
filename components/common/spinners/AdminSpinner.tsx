import React from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from '@/assets/loading.json'; 

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
    <Lottie animationData={loaderAnimation} loop autoplay style={{ height: 100, width: 100 }} />
    </div>
  );
};

export default Spinner;