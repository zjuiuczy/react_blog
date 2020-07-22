import Head from 'next/head'
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import {Row, Col, List, Icon, Breadcrumb} from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import '../static/style/pages/list.css'
import {
  CalendarOutlined,
  FolderOpenOutlined,
  FireOutlined,
  FileOutlined
} from '@ant-design/icons';
import 'highlight.js/styles/monokai-sublime.css'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import { resolveOnChange } from 'antd/lib/input/Input';


const MyList = (list) =>{
  const [mylist, setMylist] = useState(
    list.data
  );
  useEffect(()=>{
    setMylist(list.data)
  })
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
    sanitize:false,
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
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        <div>
        <div className="bread-div">
          <Breadcrumb>
            <Breadcrumb.Item><a href="/">Main Page</a></Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
        </div>

          <List
            itemLayout = "vertical"
            dataSource = {mylist}
            renderItem = { item => (
              <List.Item>
              <div className = "list-title">
                <Link href={{pathname:'/detailed', query:{id: item.id}}}>
                <a>{item.title}</a>
                </Link>
              </div>
              <div className="list-icon">
                <span><CalendarOutlined /> {item.addTime}</span>
                <span><FolderOpenOutlined /> {item.typeName}</span>
                <span><FireOutlined /> {item.view_count}</span>
              </div>
              <div className = "list-context"
              dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
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
            )

            }
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
MyList.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios(servicePath.getListById+id).then(
      (res)=>{
        console.log(res)
        resolve(res.data)
      }
    )
  })

  return await promise
}
  


export default MyList