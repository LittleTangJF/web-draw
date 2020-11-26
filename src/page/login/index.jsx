import React, {Component} from 'react';
import {Form, Input,Row,Col, Button, Modal} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css'
import logo from "../../asset/img/makoologo.png";
import axios from 'axios'

class Index extends Component {
    onFinish = values => {
        axios({
            url: '/lottery/login',
            method: 'post',
            headers: { 'content-type': 'application/json' },
            data: values,
        }).then(res => {
            console.log(res)
            let sessionID = res.data.data.session_id
            localStorage.setItem('session_id', sessionID)
            this.props.history.replace('/draw')
        }).catch(err => {
            console.log('2020-11-24 09:43:33打印：err', err.response)
            let msg = err?.response?.data?.errmsg || '发生异常！'
            Modal.error({
                title: '提示',
                content: `${msg}`,
            });
        })
    };
    render() {

        return (
            <div className='login'>
                <div>
                    <Row align="middle" justify='center'>
                        <Col span={24} className='draw-logo'>
                            <img src={logo} alt="logo"/>
                        </Col>
                    </Row>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={this.onFinish.bind(this)}
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: '请输入用户名'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: '请输入密码'}]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Index;