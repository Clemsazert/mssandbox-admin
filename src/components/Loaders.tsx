import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ModalProps {
  show: boolean;
  title?: string;
  onClose?: () => void;
  buttons?: {
    title: string;
    variant:
      | 'link'
      | 'dark'
      | 'light'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info';
    onClick: () => void;
  }[];
  closeButton?: boolean;
  size?: 'sm' | 'lg' | 'xl' | undefined;
  timeout?: number | undefined;
}

export const BaseModal: React.FC<ModalProps> = ({
  show,
  title,
  children,
  onClose,
  buttons = [],
  closeButton = false,
  size = undefined,
  timeout = undefined
}) => {
  const [timeoutClose, setTimeoutClose] = useState<boolean>(true);
  const startTimeout = () => {
    if (timeout) {
      setTimeout(() => { setTimeoutClose(false); }, timeout);
    }
  };
  return (
    <Modal show={show && timeoutClose} onHide={onClose} onEntered={startTimeout} size={size} keyboard>
      {title && (
        <Modal.Header closeButton={closeButton}>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
      {buttons.length > 0 && (
        <Modal.Footer>
          {buttons.map(button => (
            <Button
              variant={button.variant || 'primary'}
              onClick={button.onClick}
            >
              {button.title}
            </Button>
          ))}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export const DotaLoader: React.FC<{ show: boolean }> = ({ show }) => (
  <BaseModal show={show} size="sm" timeout={5000}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img src="/dota_logo.png" alt="dota 2 logo <3" width={40} height={40} style={{ animation: 'spin 2s ease infinite' }} />
    </div>
  </BaseModal>
);
