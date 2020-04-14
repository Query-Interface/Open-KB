import * as React from 'react';
import { Menu } from 'antd';
import { ProjectOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

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

export class SiderSubMenu extends React.Component<SiderMenuProps, {}> {
  constructor(props: SiderMenuProps) {
    super(props);
  }

  render(): JSX.Element {
    const selectedKey = [this.props.selected?.toString() ?? ''];
    return (
      <Menu theme="dark" selectedKeys={selectedKey} defaultOpenKeys={[this.props.id]} mode="inline">
        <SubMenu
          key={this.props.id}
          title={
            <span>
              {this.getIcon(this.props.icon)}
              <span>{this.props.title}</span>
            </span>
          }
        >
          {this.props.menuEntries.map(function (item) {
            return <Menu.Item key={item.id}>{item.title}</Menu.Item>;
          })}
        </SubMenu>
      </Menu>
    );
  }

  private getIcon(name?: string): React.ReactElement | null {
    if (name) {
      switch (name) {
        case 'project':
          return <ProjectOutlined />;
        default:
          return null;
      }
    }
    return null;
  }
}
