import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';
import { Layout, Menu, Icon } from 'antd';
import { SiderSubMenu } from '../components/SiderSubMenu/SiderSubMenu';
import  Board  from '../components/Board/Board';
import {
    setCurrentBoard,
    toggleSlider,
    fetchBoards
  } from '../features/appSlice';
import { BoardDetails } from '../api/openkbApi';

const { Header, Content, Footer, Sider } = Layout;
const PRODUCT_NAME: string = "Open KB";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const collapsed = useSelector((state:RootState) => state.appDisplay.sliderCollapsed);
    const boardSelected = useSelector((state:RootState) => state.appDisplay.boardId);
    const boards = useSelector((state:RootState) => state.appDisplay.boards);

    useEffect(() => {
        dispatch(fetchBoards());
    }, [dispatch]);

    const toggle= () => {
        dispatch(toggleSlider());
    };
    const setBoard = (boardId: number) => {
        dispatch(setCurrentBoard(boardId));
    };

    const renderBoard = (boards: Array<BoardDetails>) => {
        if (boards.length > 0) {
            let selectedBoard = boards.filter(b => b.id === boardSelected).pop();
            if (!selectedBoard) {
                selectedBoard = boards[0];
            }

            return <Board boardId={selectedBoard.id} />
        }
        return <div>&nbsp;</div>
    }

    return (
        <Layout style={{ minHeight: '100vh'}}>
            <Sider
            collapsible
            collapsed={collapsed}
            trigger={null}
            >
                <div className="logo" >{PRODUCT_NAME}</div>
                    <SiderSubMenu id="subBoards" title="Boards" icon="project" menuEntries={boards} selected={boardSelected} />
            </Sider>
        <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
                <div>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                        className="right"
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Content style={{
                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, position:'relative'}} >
                    {renderBoard(boards)}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                {PRODUCT_NAME} ©2020 Created by Query-Interface
            </Footer>
        </Layout>
      </Layout>
    );
}

export default App;
