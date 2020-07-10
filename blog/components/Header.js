import React from 'react'
import '../static/style/components/header.css'
import {Row, Col, Menu, Icon} from 'antd'
import {
    SmileOutlined,
    HomeOutlined,
    YoutubeOutlined,
    FileTextOutlined
  } from '@ant-design/icons';

const Header = () => (
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">
                     Zhaoyu Cheng
                </span>
                <span className="header-txt">cs and love</span>
            </Col>

            <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu
                    mode="horizontal"
                >
                    <Menu.Item key="home">
                    <HomeOutlined />
                        Main Page
                    </Menu.Item>
                    <Menu.Item key="video">
                    <FileTextOutlined />
                        Article
                    </Menu.Item>
                    <Menu.Item key="life">
                    <SmileOutlined />
                        Life
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header
