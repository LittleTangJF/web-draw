import React, {Component} from 'react';
import './index.css'
import logo from '../../asset/img/makoologo.png'
import {Row, Col, Radio, Button} from 'antd'
import DrawItem from './draw-item'
import {phone} from './phone'
class Draw extends Component {
    constructor() {
        super();
        this.state = {
            value: 1,
            start: false,
            list: phone,
            realPhone: 13577778888
        }
    }

    componentDidMount() {
        let {list} = this.state
        this.init()
        this.setState({list: list.concat([this.state.realPhone])})
    }
    // 初始化抽奖数组
    init(){
        let {list} = this.state
        // [].unshift.call(list,'?')
        this.setState({list: list.unshift('?')})

    }
    // 切换tab人数
    onChange = (e) => {
        console.log(e, '切换');
        let {value,start} = this.state
        if(start)return
        if (e.target.value === value) return
        this.setState({
            value: e.target.value
        })
    }
    // 开始抽奖
    handleDraw = () => {
        let {start,value} = this.state
        this.setState({start: !start})
        if (start) {
            if(value===1){
                this.refs.draw.handleStopDraw()
            }else {
                [0,1,2,3,4].forEach((d)=>{
                    this.refs[`draw${d}`].handleStopDraw()
                })
            }

        } else {
            if(value===1){
                this.refs.draw.handleStartDraw()
            }else {
                [0,1,2,3,4].forEach((d)=>{
                    this.refs[`draw${d}`].handleStartDraw()
                })
            }
        }
        console.log(this.refs.onlyOne, ' ----refs');
    }

    render() {
        let {value, start, list} = this.state
        console.log(list, 9999);
        return (
            <div className='main'>
                <div className='draw'>
                    <Row align="middle" justify='center'>
                        <Col span={24} className='draw-logo'>
                            <img src={logo} alt="logo"/>
                        </Col>
                    </Row>
                    <div className='draw-main'>
                        <div className="draw-mock"></div>
                        <div className="draw-status draw-ct" style={{opacity:start ? 1: 0 }}>正在抽奖···</div>
                        {value===1&&<DrawItem start={start} ref={'draw'} list={list}/>}
                        {value===2&&<>
                            <DrawItem start={start} ref={'draw0'} list={list}/>
                            <DrawItem ref={'draw1'}  list={list}/>
                            <DrawItem ref={'draw2'}  list={list}/>
                            <DrawItem ref={'draw3'}  list={list}/>
                            <DrawItem ref={'draw4'}  list={list}/></>}
                        <div className='draw-info draw-ct'>
                            当前已有{3}位用户成功拼团，获得抽奖资格
                        </div>
                    </div>

                    <div className='draw-Radio draw-ct'>
                        <Radio.Group value={value} onChange={this.onChange.bind(this)}>
                            <Radio value={1}>单人抽奖</Radio>
                            <Radio value={2}>多人抽奖</Radio>
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