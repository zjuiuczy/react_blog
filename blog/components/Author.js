import {Avatar,Divider} from 'antd'
import '../static/style/components/author.css'
import {
    GithubOutlined,
    LinkedinOutlined,
    MailOutlined
  } from '@ant-design/icons';
const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg"  /></div>
            <div className="author-introduction">
                Graduate Student from University of Illinois at Urbana-Champaign, tring to be a software delevoper
                <Divider>Social</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account"  />
                <Avatar size={28} icon={<LinkedinOutlined />}  className="account" />
                <Avatar size={28} icon={<MailOutlined />}  className="account"  />

            </div>
        </div>
    )

}

export default Author