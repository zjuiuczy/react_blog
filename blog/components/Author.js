import {Avatar,Divider, Tag, Tooltip} from 'antd'
import axios from 'axios'
import {useState, useEffect} from 'react'
import CountUp from 'react-countup'
import servicePath from '../config/apiUrl'
import '../static/style/components/author.css'
import {
    GithubOutlined,
    LinkedinOutlined,
    MailOutlined
  } from '@ant-design/icons';
const Author =()=>{
    const [ all_view_count , setAll_view_count ] = useState(0);

    useEffect(()=>{
        
        fetchData()
        
    },[])


    const fetchData = async ()=>{
        const result = await axios(servicePath.getAllPartCount).then(
            (res)=>{  return res.data.data  }
          )
          setAll_view_count(result[0].all_view_count)
    }

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="../static/style/components/cat.jpg"  /></div>
            <div className="author-introduction">
                Graduate Student from University of Illinois at Urbana-Champaign, tring to be a software delevoper
                <div className = "author-tag">
                    <Tag color="magenta">ZJU</Tag>
                    <Tag color="green">UIUC</Tag>
                    <Tag color="geekblue">MS in ME & CS(maybe)</Tag>
                    <Tag color="cyan"><CountUp end={all_view_count} /> views</Tag>
                </div>
                <Divider>Social</Divider>
                <Tooltip title="Github : https://github.com/zjuiuczy">
                    <a href="https://github.com/zjuiuczy" target="_blank">
                    <Avatar size={28} icon={<GithubOutlined />} className="account"  />
                    </a>
                </Tooltip>
                <Tooltip title="Linkedin : https://www.linkedin.com/in/zhaoyu-cheng-179a601ab/">
                    <a href="https://www.linkedin.com/in/zhaoyu-cheng-179a601ab/" target="_blank">
                    <Avatar size={28} icon={<LinkedinOutlined />}  className="account" />
                    </a>
                </Tooltip>
                <Tooltip title="Email : zhaoyuc116@gmail.com">
                    <a href="" target="_blank">
                    <Avatar size={28} icon={<MailOutlined />}  className="account"  />
                    </a>
                </Tooltip>

            </div>
        </div>
    )

}

export default Author