// components/shared/modal/Modal.tsx

// components/shared/modal/Modal.tsx
import type { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function ModalMemory({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()} // prevent close on modal click
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
