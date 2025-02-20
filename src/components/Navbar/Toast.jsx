import React, { useEffect } from 'react';

export const Toast = ({ message, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 2000);
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 text-teal-300 px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
      {message}
    </div>
  );
}; 