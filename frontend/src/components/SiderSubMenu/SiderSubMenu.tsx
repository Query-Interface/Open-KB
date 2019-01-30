import * as React from 'react';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

export interface MenuProps {
    id: number,
    icon?: string,
    title: string
}

export interface SiderMenuProps {
    id: string;
    icon?: string;
    title: string;
    menuEntries: Array<MenuProps>
}

export class SiderSubMenu extends React.Component<SiderMenuProps, {}> {

    constructor (props: SiderMenuProps){
        super(props);
    }

    render() {
        var defaultKey : any = "";
        if (this.props.menuEntries.length > 0) {
            defaultKey = this.props.menuEntries[0].id;
        }
        return <Menu theme="dark" defaultSelectedKeys={[defaultKey]} mode="inline">
            <SubMenu key={this.props.id}
                title={<span><Icon type={this.props.icon} /><span>{this.props.title}</span></span>} >
                {this.props.menuEntries.map(function(item) {
                    return <Menu.Item key={item.id} >
                    {item.title}
                    </Menu.Item>
                })
                }
            </SubMenu>
        </Menu>
    }
}