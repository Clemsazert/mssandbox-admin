import React from 'react';

import Spinner from 'react-bootstrap/Spinner';
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
}

export const BaseModal: React.FC<ModalProps> = ({
  show,
  title,
  children,
  onClose,
  buttons = [],
  closeButton = false,
  size = undefined
}) => (
  <Modal show={show} onHide={onClose} size={size}>
    <Modal.Header closeButton={closeButton}>
      {title && <Modal.Title>{title}</Modal.Title>}
    </Modal.Header>
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

export const DotaLoader: React.FC<{show: boolean}> = ({ show }) => (
  <BaseModal show={show}>
    <img src="/dota_logo.png" alt="dota 2 logo <3" width={40} height={40} />
    <Spinner animation="border" />
  </BaseModal>
);
