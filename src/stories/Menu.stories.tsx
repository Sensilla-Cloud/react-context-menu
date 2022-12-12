import RealMenu from '..';
import React from 'react';
import { ComponentStory } from '@storybook/react';
import './stories.scss';
import SubMenu from '../subMenu';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  title: 'Context Menu',
  component: RealMenu,
  argsTypes: {
    MenuItems: { type: 'array' },
    MenuItems2: { type: 'array' },
    SubMenuItems: { type: 'array' },
    SubMenuItems2: { type: 'array' }
  }
};

const ContextMenu = ({ ...args }) => {
  const items = args.MenuItems.map((item: string) => (
    <span key={item}>{item}</span>
  ));
  items.push(<hr key="hr" />);
  items.push(
    args.MenuItems2.map((item: string) => <span key={item}>{item}</span>)
  );
  if (args.SubMenuItems) {
    items.push(
      <SubMenu
        className="context-menu"
        component={
          <span>
            SubMenu&nbsp;
            <i
              style={{ fontSize: '12px' }}
              className="fas fa-chevron-right"
            ></i>
          </span>
        }
        key="sub-menu"
      >
        {args.SubMenuItems.map((item: string) => (
          <span key={item}>{item}</span>
        ))}
        <SubMenu
          className="context-menu"
          component={
            <span>
              SubMenu 2&nbsp;
              <i
                style={{ fontSize: '12px' }}
                className="fas fa-chevron-right"
              ></i>
            </span>
          }
        >
          {args.SubMenuItems2.map((item: string) => (
            <span key={item}>{item}</span>
          ))}
        </SubMenu>
      </SubMenu>
    );
  }
  return (
    <RealMenu items={items} className="context-menu">
      <div
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#222',
          color: '#fff',
          textAlign: 'center',
          lineHeight: '300px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        Right-click Me!
      </div>
    </RealMenu>
  );
};

const DefaultArgs = {
  MenuItems: ['Item 1', 'Item 2', 'Item 3'],
  MenuItems2: ['Item 4']
};

export const Basic: ComponentStory<typeof ContextMenu> = (args) => {
  return <ContextMenu {...args} />;
};

Basic.args = DefaultArgs;

export const SubItems: ComponentStory<typeof ContextMenu> = (args) => {
  return <ContextMenu {...args} />;
};

SubItems.args = {
  ...DefaultArgs,
  SubMenuItems: ['Sub-item 1'],
  SubMenuItems2: ['Sub-Sub-Item 1']
};
