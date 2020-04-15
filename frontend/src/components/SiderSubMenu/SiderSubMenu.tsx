import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
import { setCurrentBoard } from 'Features/appSlice';

export interface MenuProps {
  id: string;
  icon?: string;
  title: string;
}

export interface SiderMenuProps {
  id: string;
  icon?: string;
  title: string;
  menuEntries: Array<MenuProps>;
  selected?: string;
}

export const SiderSubMenu: React.FC<SiderMenuProps> = ({ id, title, menuEntries, selected }: SiderMenuProps) => {
  const dispatch = useDispatch();
  const selectedKey = [selected?.toString() ?? ''];

  const selectBoard = (id: string): void => {
    dispatch(setCurrentBoard(id));
  };

  return (
    <Menu theme="dark" selectedKeys={selectedKey} defaultOpenKeys={[id]} mode="inline">
      <SubMenu key={id} title={<span>{title}</span>}>
        {menuEntries.map(function (item) {
          return (
            <Menu.Item key={item.id}>
              <Link to={`/boards/${item.id}`} onClick={(): void => selectBoard(item.id)}>
                {item.title}
              </Link>
            </Menu.Item>
          );
        })}
      </SubMenu>
    </Menu>
  );
};
