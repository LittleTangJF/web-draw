import React, {Component} from 'react';
import {Row, Col} from 'antd'
import 'antd/dist/antd.css';

class DrawItem extends Component {
    constructor(props) {
        super(props);
        this.refList=React.createRef();
    }
    componentDidMount() {
        this.setState({height: this.refList.current.scrollHeight})
        console.log(this.props,  8888);
    }
    componentWillUnmount() {
        clearInterval(this.listScrol)
        this.refList.current.scrollTo(0,0);
    }

    // 停止滚动
    handleStopDraw=()=>{
        let ref = this.refList
        clearInterval(this.listScrol)
        // 跳到数组的最后一个，中奖的位置
        ref.current.scrollTo(0,this.state.height);
        console.log(ref,54545);
        // ref.current.scrollHeight=360
    }
    // 开始滚动
    handleStartDraw=()=>{
        let ref = this.refList
        let speed = 10
        let scrollPx=0
        this.listScrol = setInterval(()=>{
            scrollPx+=30;
            if(scrollPx>ref.current.scrollHeight){
                // clearInterval(this.listScrol)
                ref.current.scrollTo(0,0);
                scrollPx=0
            }else{
                ref.current.scrollTo(0,scrollPx);
            }
        }, speed);
    }
    render() {
        return (
            <Row>
                <Col span={12} offset={6}>
                    <div className='draw-item scrollbar' ref={this.refList}>
                        {this.props.list.length&&this.props.list.map((d,index)=>{
                            return <p key={index}>{d}</p>
                        })}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default DrawItem;