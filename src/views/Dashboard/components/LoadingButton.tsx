import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';

interface Props {
  title: string;
  onClick: () => Promise<void>;
  variant?: 'primary' | 'secondary';
}

export const LoadingButton: React.FC<Props> = ({
  title,
  onClick,
  variant = 'primary'
}) => {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      onClick().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button variant={variant} disabled={isLoading} onClick={handleClick}>
      {isLoading ? 'Loading…' : title}
    </Button>
  );
};
