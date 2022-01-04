import React, { useRef, useState } from 'react';

interface OverlayProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Overlay: React.FC<OverlayProps> = ({
  visible,
  setVisible,
  children,
}): JSX.Element => {
  const element = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={element}
      className={`overlay${!visible ? ' hidden' : ''}`}
      onClick={(event) => {
        if (element.current === event.target) {
          setVisible(false);
        }
      }}
    >
      {children}
    </div>
  );
};
