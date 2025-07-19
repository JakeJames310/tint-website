'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CardOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function CardOverlay({
  isOpen,
  onClose,
  title,
  children
}: CardOverlayProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (event: React.MouseEvent) => {
    // Close modal when clicking on the backdrop (not the modal content)
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60" 
            onClick={handleBackdropClick}
          />
          
          {/* Simple Modal Card */}
          <div
            ref={modalRef}
            className="relative bg-white text-black rounded-lg p-6"
            style={{ 
              width: '90vw',
              maxWidth: '1200px',
              height: '90vh',
              maxHeight: '800px',
              zIndex: 10
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{title || 'Modal'}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div 
              className="overflow-y-auto h-full"
              style={{ 
                minHeight: '200px'
              }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Export a simpler version for basic usage
export function SimpleCardOverlay({
  isOpen,
  onClose,
  children,
  title
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <CardOverlay
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      {children}
    </CardOverlay>
  );
}

// Export a confirmation dialog variant
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <CardOverlay
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="space-y-4">
        <p className="text-muted-foreground">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="btn btn-ghost"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="btn btn-primary"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </CardOverlay>
  );
}
