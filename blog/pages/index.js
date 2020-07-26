import Head from 'next/head'
import Link from 'next/link'
import React, {useState} from 'react'
import {Row, Col, List, Icon, Tag} from 'antd'
import {
  CalendarOutlined,
  FolderOpenOutlined,
  FireOutlined,
  FileOutlined
} from '@ant-design/icons';
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'

import '../static/style/pages/index.css'
import 'highlight.js/styles/monokai-sublime.css'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'

const Home = (res) =>{
  const [mylist, setMylist] = useState(res.topList); // top
  const [rencentList, setRecentList] = useState(res.list) // recent
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
      highlight: function (code) {
             return hljs.highlightAuto(code).value;
     }
  }); 
  return (
    <div>
    <Head>
      <title>Home</title>
    </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
        <Col  xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div className="comm-left">
          <List
            // header={<h2>TOP Posts</h2>} 
            itemLayout = "vertical"
            dataSource = {mylist}
            renderItem = { item => (
              <List.Item>
              <div className = "list-title">
              <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                <a>{item.title}</a>
              </Link>
              </div>
              <div className="list-icon">
                <span><Tag color = "#f50">TOP</Tag></span>
                <span><CalendarOutlined /> {item.addTime}</span>
                <span><FolderOpenOutlined />{item.typeName}</span>
                <span><FireOutlined /> {item.view_count}</span>
              </div>
              <div className="list-content" 
              dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
              </div>
              <div className = "list-go">
              <FileOutlined /> &nbsp;
              <span>
                <Link href = {{pathname:'/detailed', query:{id:item.id}}}>
                  Full Text
                </Link>
              </span>
              </div>
              </List.Item>
            )

            }
          />
          </div>
        
          
          <br></br>
          
          
          
          <div className="comm-left">
                
              
                <List
                  header={<div className="list-header">Recent Posts</div>}
                  itemLayout="vertical"
                  dataSource={rencentList}
                  renderItem={item => (
                    <List.Item>
                      <div className="list-title"  >
                        <Link  href={{pathname:'/detailed',query:{id:item.id}}} >
                          <a>{item.title}</a>
                        </Link>
                      </div>
                      <div className="list-icon">
                      <span><CalendarOutlined /> {item.addTime}</span>
                      <span><FolderOpenOutlined />{item.typeName}</span>
                      <span><FireOutlined /> {item.view_count}</span>
                      </div>
                      <div className="list-context"
                          dangerouslySetInnerHTML={{__html:item.introduce}}
                      >
                      </div>  
                      <div className = "list-go">
                          <FileOutlined /> &nbsp;
                          <span>
                            <Link href = {{pathname:'/detailed', query:{id:item.id}}}>
                              Full Text
                            </Link>
                          </span>
                          </div>
                    </List.Item>
                  )}
                />  
                  
              </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
  </div>
  )
}

Home.getInitialProps = async ()=>{

  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        console.log('result:',res.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}
  


export default Home