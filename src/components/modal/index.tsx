import { useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";

type ModalProps = {
  isShown: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
};

export function Modal({ isShown, closeModal, title, children }: ModalProps) {
  const outsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { body } = document;

    function onClick(e: MouseEvent) {
      if (isShown && outsideRef.current === e.target) closeModal();
    }

    body.addEventListener("click", onClick);

    return () => {
      body.removeEventListener("click", onClick);
    };
  }, [isShown, closeModal]);

  useEffect(() => {
    const { body } = document;

    if (isShown) {
      body.classList.add("overflow-y-hidden");
    } else {
      body.classList.remove("overflow-y-hidden");
    }
    return () => body.classList.remove("overflow-y-hidden");
  }, [isShown]);

  if (!isShown) return null;

  return (
    <div
      className="w-screen h-screen bg-black/40 fixed top-0 left-0 z-[100] p-4 overflow-y-scroll"
      ref={outsideRef}
    >
      <div className="bg-neutral-50 p-10 rounded max-w-3xl w-full sm:w-4/5 md:w-3/5 lg:w-2/5 my-4 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">{title}</h1>

          <button type="button" onClick={closeModal}>
            <FiX color="#000" size={28} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
