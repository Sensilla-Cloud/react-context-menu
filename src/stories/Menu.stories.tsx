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
        {args.nested && (
          <div style={{ position: 'relative' }}>
            <RealMenu
              items={args.MenuItems3.map((item: string) => (
                <span key={item}>{item}</span>
              ))
                .concat([<hr key="nested-sep" />])
                .concat(
                  args.MenuItems4.map((item: string) => (
                    <span key={item}>{item}</span>
                  ))
                )}
              className="context-menu"
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 100,
                  height: 100,
                  backgroundColor: '#444',
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: '100px'
                }}
              >
                Or me!
              </div>
            </RealMenu>
          </div>
        )}
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

export const NestedTriggers: ComponentStory<typeof ContextMenu> = (args) => {
  return <ContextMenu {...args} nested />;
};

NestedTriggers.args = {
  ...DefaultArgs,
  MenuItems3: ['Item 11', 'Item 12', 'Item 13'],
  MenuItems4: ['Item 14']
};
