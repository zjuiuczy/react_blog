import React, {useState} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {Route} from 'react-router-dom';
import { 
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../static/css/adminindex.css';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const[collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };
  
  const handleClickArticle = e=>{
    console.log(e.item.props)
    if(e.key=='addArticle'){
      props.history.push('/index/add')
    }else{
      props.history.push('/index/list')
    }

  }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              WorkStation
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              AddArticle
            </Menu.Item>

            <SubMenu key="sub1" icon={<FileOutlined />} title="Articles"
            onClick = {handleClickArticle}
            >
              <Menu.Item key="addArticle">AddArticle</Menu.Item>
              <Menu.Item key="articleList">ArticleList</Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" icon={<TeamOutlined />} title="Commments">
              <Menu.Item key="5">Team 1</Menu.Item>
              <Menu.Item key="6">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Backstage</Breadcrumb.Item>
              <Breadcrumb.Item>WorkStation</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div>
                <Route path = "/index/" exact component = {AddArticle}    />
                <Route path="/index/add/" exact   component={AddArticle} />
                <Route path="/index/list/"   exact component={ArticleList} />
                <Route path="/index/add/:id"   exact component={AddArticle} />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Zhaoyu Cheng ©2020 </Footer>
        </Layout>
      </Layout>
    );
}

export default AdminIndex