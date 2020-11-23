import React, {Component} from 'react';
import {Form, Input,Row,Col, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css'
import logo from "../../asset/img/makoologo.png";
import axios from 'axios'
import {API} from "../../services";

class Index extends Component {
    onFinish = values => {
        console.log('Received values of form: ', values);
        // API.do_login(values)
        axios({
            url: 'http://lolita.chocloud.cn/lolita_api_v2/index.php/api/lottery/login',
            method: 'post',
            data: values,
        }).then(res => {
            console.log(res)
        })
        // axios.post('/lolita_api_v2/index.php/api/lottery/login',values)
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    };
    doLogin=()=>{

    }
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