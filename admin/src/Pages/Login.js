import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon,Button ,Spin, message } from 'antd';
import '../static/css/login.css';
import servicePath from '../config/apiUrl'
import axios from 'axios'
import {
    KeyOutlined,
    UserOutlined
} from '@ant-design/icons';

function Login(props){
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = ()=>{
        setIsLoading(true)
        if(!userName){
            message.error("Username can't be empty")
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false;
        }
        else if(!password){
            message.error("Password can't be empty")
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false;
        }
        let dataProps = {
            'userName':userName,
            'password':password
        }
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
            withCredentials: true
        }).then(
           res=>{
                setIsLoading(false)
                if(res.data.data=='Success Login'){
                    localStorage.setItem('openId',res.data.openId)
                    props.history.push('/index')
                }else{
                    message.error('Incorrect username or password')
                }
           }
        )

        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    return (
        <div className="login-div">

            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Zhaoyu Cheng Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > Log in </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login

