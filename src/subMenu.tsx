import React from 'react';
import { createPortal } from 'react-dom';
import { SubMenuProps } from './subMenu.types';

const SubMenu: React.FC<SubMenuProps> = ({
  component,
  children,
  className,
  containerClassName
}) => {
  const listenerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState([0, 0]);

  const mouseEnter = () => {
    setOpen(true);
  };

  const mouseLeave = (event: MouseEvent) => {
    if (!menuRef.current?.contains((event as any).toElement)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (open && listenerRef.current) {
      listenerRef.current.addEventListener('mouseleave', mouseLeave);
      const { x, y, width } = listenerRef.current.getBoundingClientRect();
      setAnchor([x + width, y]);
      menuRef.current?.addEventListener('mouseleave', mouseLeave);
    } else {
      listenerRef.current?.removeEventListener('mouseleave', mouseLeave);
      menuRef.current?.removeEventListener('mouseleave', mouseLeave);
    }
  }, [open]);

  React.useEffect(() => {
    if (open && menuRef.current && listenerRef.current) {
      const { offsetWidth } = menuRef.current;
      const right = anchor[0] + offsetWidth;
      const { innerWidth } = window;
      if (right > innerWidth) {
        menuRef.current.style.left = `${
          anchor[0] - listenerRef.current.clientWidth - offsetWidth
        }px`;
      }
    }
  }, [anchor]);

  React.useEffect(() => {
    if (listenerRef && listenerRef.current) {
      listenerRef.current.addEventListener('mouseenter', mouseEnter);

      return () => {
        listenerRef.current?.removeEventListener('mouseenter', mouseEnter);
      };
    }
  }, [listenerRef]);

  return (
    <>
      {React.cloneElement(component, {
        ref: listenerRef
      })}
      {createPortal(
        <div className={containerClassName ?? 'react-context-menu-container'}>
          {open ? (
            <div
              style={{
                position: 'absolute',
                top: `${anchor[1]}px`,
                left: `${anchor[0]}px`,
                flexDirection: 'column',
                display: 'flex',
                zIndex: 99,
                userSelect: 'none'
              }}
              ref={menuRef}
              className={className}
            >
              {children}
            </div>
          ) : null}
        </div>,
        document.body
      )}
    </>
  );
};

export default SubMenu;
