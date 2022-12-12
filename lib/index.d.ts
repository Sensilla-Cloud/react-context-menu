import React from 'react';

type ContextMenuProps = {
    children?: React.ReactElement;
    items?: React.ReactNode[];
    className?: string;
    containerClassName?: string;
    portalTarget?: Element;
};

declare const ContextMenu: React.FC<ContextMenuProps>;

type SubMenuProps = {
    component: React.ReactElement;
    children?: React.ReactElement[];
    className?: string;
    containerClassName?: string;
};

export { ContextMenuProps, SubMenuProps, ContextMenu as default };
