import React,{useState, useEffect} from 'react'
import Head from 'next/head'
import {Row, Col , Icon ,Breadcrumb, Affix, Skeleton} from 'antd'
import MarkNav from 'markdown-navbar'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

import '../static/style/pages/detailed.css'
import 'highlight.js/styles/monokai-sublime.css'

import {
  CalendarOutlined,
  FolderOpenOutlined,
  FireOutlined
} from '@ant-design/icons';

const Detailed = (props) =>{
  useEffect( ()=>{

    setTimeout(()=>{
      myFuction()
    },100)
  },[])
  const [loading,setLoading] = useState(true)
 

  const myFuction = async ()=>{

      let newhtml =await marked(props.article_content)
      //setHtml(newhtml)
      setLoading(false)
      //console.log(tocify.render())
      
  }
const tocify = new Tocify()
const renderer = new marked.Renderer();
renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };


marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
      highlight: function (code) {
             return hljs.highlightAuto(code).value;
     }
  }); 

    let html = marked(props.article_content)
return (
  <div>
    <Head>
      <title>Detail Page</title>
    </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">Main Page</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

           <div>
              <div className="detailed-title">
              {props.title}
              </div>

              <div className="list-icon center">
                <span><CalendarOutlined /> {props.addTime}</span>
                <span><FolderOpenOutlined /> {props.typeName}</span>
                <span><FireOutlined /> {props.view_count}</span>
              </div>

              <div className="detailed-content" 
              dangerouslySetInnerHTML={{ __html: html }}>
              </div>

           </div>

          </div>
      </Col>
      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop = {5}>
          <div className = "detailed-nav comm-box">
            <div className = "nav-title">
              Catalog
            </div>
            <Skeleton loading={loading} active paragraph={{ rows: 6 }} >
            <div className = "toc-list">
              {tocify && tocify.render()}
            </div>
            </Skeleton>
          </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>

   </div>
  )
}

Detailed.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios(servicePath.getArticleById+id).then(
      (res)=>{
        console.log(res)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed