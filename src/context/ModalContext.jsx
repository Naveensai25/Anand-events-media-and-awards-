// src/context/ModalContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent }}>
      {children}
      {/* Modal Backdrop */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <span className="text-gray-600 text-lg">×</span>
            </button>
            
            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useMultiFormModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useMultiFormModal must be used within a ModalProvider');
  }
  return context;
};