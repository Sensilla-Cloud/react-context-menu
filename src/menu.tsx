import React from 'react';
import { createPortal } from 'react-dom';

import { ContextMenuProps } from './menu.types';

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
  className,
  containerClassName,
  portalTarget
}) => {
  const listenerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState([0, 0]);
  const [needReposition, setNeedReposition] = React.useState(false);

  const openContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchor([event.pageX, event.pageY]);
    setOpen(true);
    setNeedReposition(true);
  };

  const handleClickOutside = () => {
    if (open && menuRef.current) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (open && menuRef.current && needReposition) {
      const { offsetHeight, offsetWidth } = menuRef.current;
      const bottom = anchor[1] + offsetHeight;
      const right = anchor[0] + offsetWidth;
      const { innerHeight, innerWidth } = window;
      if (bottom > innerHeight) {
        menuRef.current.style.top = `${anchor[1] - offsetHeight}px`;
      }
      if (right > innerWidth) {
        menuRef.current.style.left = `${anchor[0] - offsetWidth}px`;
      }
    }
    setNeedReposition(false);
  }, [needReposition]);

  React.useEffect(() => {
    if (listenerRef && listenerRef.current) {
      listenerRef.current.addEventListener('contextmenu', openContextMenu);

      return () => {
        listenerRef.current?.removeEventListener(
          'contextmenu',
          openContextMenu
        );
      };
    }
  }, [listenerRef]);

  React.useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [open]);

  return (
    <>
      {children
        ? React.cloneElement(children, {
            ref: listenerRef
          })
        : null}
      {createPortal(
        <div className={containerClassName ?? 'react-context-menu-container'}>
          {open ? (
            <div
              style={{
                position: 'absolute',
                top: anchor[1],
                left: anchor[0],
                flexDirection: 'column',
                display: 'flex',
                zIndex: 99,
                userSelect: 'none'
              }}
              ref={menuRef}
              className={className}
            >
              {items}
            </div>
          ) : null}
        </div>,
        portalTarget ?? document.body
      )}
    </>
  );
};

export default ContextMenu;
