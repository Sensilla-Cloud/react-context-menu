import React from 'react';

export type ContextMenuProps = {
  children?: React.ReactElement;
  items?: React.ReactNode[];
  className?: string;
  containerClassName?: string;
  portalTarget?: Element;
};
