import {Avatar,Divider, Tag, Tooltip} from 'antd'
import '../static/style/components/author.css'
import {
    GithubOutlined,
    LinkedinOutlined,
    MailOutlined
  } from '@ant-design/icons';
const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="../static/style/components/cat.jpg"  /></div>
            <div className="author-introduction">
                Graduate Student from University of Illinois at Urbana-Champaign, tring to be a software delevoper
                <div className = "author-tag">
                    <Tag color="magenta">ZJU</Tag>
                    <Tag color="green">UIUC</Tag>
                    <Tag color="geekblue">MS in ME & CS(maybe)</Tag>
                </div>
                <Divider>Social</Divider>
                <Tooltip title="Github : https://github.com/zjuiuczy">
                    <a href="https://github.com/zjuiuczy" target="_blank">
                    <Avatar size={28} icon={<GithubOutlined />} className="account"  />
                    </a>
                </Tooltip>
                <Avatar size={28} icon={<LinkedinOutlined />}  className="account" />
                <Avatar size={28} icon={<MailOutlined />}  className="account"  />

            </div>
        </div>
    )

}

export default Author