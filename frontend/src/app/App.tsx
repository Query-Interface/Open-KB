import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { SiderSubMenu } from 'Components/SiderSubMenu/SiderSubMenu';
import HomePage from 'Pages/home/HomePage';
import { setCurrentBoard, toggleSlider, fetchBoards } from 'Features/appSlice';
import { toggleEditPanel } from 'Features/editPanel/editPanelSlice';
import EditPanel from 'Features/editPanel/EditPanel';
import BoardPage from 'Pages/board/BoardPage';

const { Header, Content, Sider } = Layout;
const PRODUCT_NAME = 'Open KB';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state: RootState) => state.appDisplay.sliderCollapsed);
  const boardSelected = useSelector((state: RootState) => state.appDisplay.boardId);
  const boards = useSelector((state: RootState) => state.appDisplay.boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const toggleMenu = (): void => {
    dispatch(toggleSlider());
  };
  const toggleRightPane = (): void => {
    dispatch(toggleEditPanel());
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setBoard = (boardId: string): void => {
    dispatch(setCurrentBoard(boardId));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div className="logo">{PRODUCT_NAME}</div>
        <SiderSubMenu
          id="subBoards"
          title="Boards"
          icon="project"
          menuEntries={boards}
          selected={boardSelected ?? undefined}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggleMenu,
            })}
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
              className="right"
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3" onClick={toggleRightPane}>
                nav 3
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Layout>
          <Content style={{ marginTop: '24px', background: '#fff', minHeight: 280, position: 'relative' }}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/boards/">
                  <BoardPage />
                </Route>
              </Switch>
            </Router>
          </Content>
          <EditPanel />
        </Layout>
      </Layout>
    </Layout>
  );
  /*<Footer style={{ textAlign: 'center' }}>
        {PRODUCT_NAME} ©2020 Created by Query-Interface
    </Footer>*/
};

export default App;
