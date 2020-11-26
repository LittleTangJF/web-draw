import React, {Component} from 'react';
import './index.css'
import logo from '../../asset/img/makoologo.png'
import {Row, Col, Radio, Button, Modal} from 'antd'
import DrawItem from './draw-item'
import {phone} from './phone'
import axios from 'axios'

class Draw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1, //value: 1 当前抽奖1位 value: 5 当前抽奖5位
            start: false, // 开始滚动抽奖
            list: phone, //value: 1 当前抽奖1位
            list0: phone,//value: 5 当前抽奖第一列位
            list1: phone,//value: 5 当前抽奖第二列位
            list2: phone,//value: 5 当前抽奖第三列位
            list3: phone,//value: 5 当前抽奖第四列位
            list4: phone,//value: 5 当前抽奖第五列位
            numbers: 0, // 从后台获取所有的拼团数量
        }
    }

    componentDidMount() {
        this.init()
        this.getGroupNumber()
        console.log(phone, 'phone');
    }

    // 初始化抽奖数组
    init() {
        this.setState({
            list: phone,
            list0: phone,
            list1: phone,
            list2: phone,
            list3: phone,
            list4: phone,
        })
        // this.setState({list: phone.unshift('?')})
    }

    // 获取开团人数
    getGroupNumber() {
        let headers = this.getHeaders()
        axios({
            url: '/lottery/get_group_success_mobile',
            method: 'get',
            headers
        }).then(({data}) => {
            console.log(data, '获取开团')
            if (data) {
                let numbers = data.data.numbers
                this.setState({numbers: numbers || 0})
            }
        }).catch(err => {
            this.isCatchErr(err)
        })
    }

    // 获取抽奖结果
    getDrawPhoneNumber(callback) {
        let {value} = this.state
        let headers = this.getHeaders()
        axios({
            url: '/lottery',
            method: 'post',
            headers,
            data: {
                type: value === 1 ? 1 : 5
            }
        }).then(res => {
            if (res.data) {
                console.log(res.data, 'res.data');
                let {data: {success}} = res.data
                if (value === 1) {
                    this.noMore(success, (isStop) => {
                        if (isStop) {
                            console.log(isStop, 1);
                            // 如果没有数据就不开始
                            callback(true)
                            return
                        }
                        let newSuccess = success.map((d) => {
                            return this.filterPhone(d)
                        })
                        console.log(newSuccess, '什么鬼');
                        this.setState({list: phone.concat(newSuccess)})
                        callback()
                    })
                } else {
                    this.noMore(success, (isStop) => {
                        if (isStop) {
                            console.log(isStop, 1);
                            // 如果没有数据就不开始
                            callback(true)
                            return
                        }
                        let newSuccess = success.map((d) => {
                            return this.filterPhone(d)
                        })
                        console.log(newSuccess, '把号码格式整理成3 4 4');
                        let arrf = ['000 0000 0000', '000 0000 0000', '000 0000 0000', '000 0000 0000', '000 0000 0000']
                        let arrs = [...newSuccess, ...arrf]
                        this.setNumberFive(arrs)
                        callback()
                    })
                }
            }
        }).catch(err => {
            this.isCatchErr(err)
        })
    }

    // 切换tab人数
    onChange = (e) => {
        console.log(e, '切换');
        let {value, start} = this.state
        if (start) return
        if (e.target.value === value) return
        this.init()
        this.setState({
            value: e.target.value
        })
    }

    // 开始抽奖
    handleDraw = () => {
        let {start} = this.state
        if (!start) {
            this.getDrawPhoneNumber((isStop) => {
                console.log(isStop, 2);
                // 如果没有数据就不启动抽奖
                if (isStop) return
                this.getStart()
                console.log(isStop, 6);
            })
        } else {
            this.getStart()
        }
    }

    // 启动抽奖
    getStart() {
        let {start, value} = this.state
        this.setState({start: !start})
        if (start) {
            if (value === 1) {
                this.refs.draw.handleStopDraw()
            } else {
                [0, 1, 2, 3, 4].forEach((d) => {
                    this.refs[`draw${d}`].handleStopDraw()
                })
            }
        } else {
            if (value === 1) {
                this.refs.draw.handleStartDraw()
            } else {
                [0, 1, 2, 3, 4].forEach((d) => {
                    this.refs[`draw${d}`].handleStartDraw()
                })
            }
        }
        console.log(this.refs.onlyOne, ' ----refs');
    }

    // 报错catch
    isCatchErr(err) {
        console.log('2020-11-24 09:43:33打印：err', err.response)
        let msg = err?.response?.data?.errmsg || '发生异常！'
        Modal.error({
            title: '提示',
            content: `${msg}`,
        });
        if (err?.response?.data?.errcode === 100422) {
            this.props.history.replace('/')
        }
    }

    // 获取headers
    getHeaders() {
        let headers = {};
        headers['Content-Type'] = 'application/json'
        if (localStorage.getItem('session_id')) {
            headers['session-id'] = localStorage.getItem('session_id')
        }
        return headers
    }

    /**
     * 电话号码设置间隔
     */
    filterPhone = (phone = '00000000000') => {
        let res = phone.replace(/^(.{3})(.*)(.{4})$/g, '$1 $2 $3');
        console.log(res, '变成什么鬼'); // 888 8888 8888
        return res;
    }

    // 如果没得数据了
    noMore(arr, callback) {
        if (!arr.length) {
            Modal.error({
                title: '提示',
                content: `没有号码可以抽奖了`,
            });
            callback(true) // 没有就不开始启动滚动抽奖了
            return
        }
        callback() // 执行下一步
    }

    // 如果是5个号码
    setNumberFive(arr) {
        arr.forEach((d, index) => {
            if (index === 0) {
                this.setState({
                    list0: phone.concat(d)
                })
            }
            if (index === 1) {
                this.setState({
                    list1: phone.concat(d)
                })
            }
            if (index === 2) {
                this.setState({
                    list2: phone.concat(d)
                })
            }
            if (index === 3) {
                this.setState({
                    list3: phone.concat(d)
                })
            }
            if (index === 4) {
                this.setState({
                    list4: phone.concat(d)
                })
            }
        })
    }

    render() {
        let {value, start, list, list0, list1, list2, list3, list4, numbers} = this.state
        console.log(numbers, 'numbers');
        return (
            <div className='main'>
                <div className='draw'>
                    <Row align="middle" justify='center'>
                        <Col span={24} className='draw-logo'>
                            <img src={logo} alt="logo"/>
                        </Col>
                    </Row>
                    <div className='draw-main'>
                        <div className="draw-mock" style={{pointerEvents: start ? 'auto' : 'none'}}/>
                        <div className="draw-status draw-ct" style={{opacity: start ? 1 : 0}}>正在抽奖···</div>
                        {value === 1 && <DrawItem start={start} ref={'draw'} list={list}/>}
                        {value === 2 && <>
                            <DrawItem start={start} ref={'draw0'} list={list0}/>
                            <DrawItem ref={'draw1'} list={list1}/>
                            <DrawItem ref={'draw2'} list={list2}/>
                            <DrawItem ref={'draw3'} list={list3}/>
                            <DrawItem ref={'draw4'} list={list4}/></>}
                        <div className='draw-info draw-ct'>
                            当前已有 {numbers} 位用户成功拼团，获得抽奖资格
                        </div>
                    </div>

                    <div className='draw-Radio draw-ct'>
                        <Radio.Group value={value} onChange={this.onChange.bind(this)}>
                            <Radio value={1}>单人抽奖</Radio>
                            <Radio value={2}>五人抽奖</Radio>
                        </Radio.Group>
                    </div>
                    <div className='draw-ct'>
                        <Button type="primary" danger onClick={this.handleDraw.bind(this)}>
                            {start ? '停止抽奖' : '开始抽奖'}
                        </Button>
                    </div>

                </div>
            </div>

        );
    }
}

export default Draw;