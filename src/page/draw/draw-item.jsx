import React, {Component} from 'react';
import {Row, Col} from 'antd'
import 'antd/dist/antd.css';

class DrawItem extends Component {
    constructor(props) {
        super(props);
        this.refList = React.createRef();
    }

    componentDidMount() {
        let sef = this.refList
        this.setState({height: this.refList.current.scrollHeight}, () => {
            sef.current.addEventListener('scroll', this.canSelect, false)
        })
        console.log(this.props, 8888);
    }

    componentWillUnmount() {
        let ref = this.refList
        clearInterval(this.listScrol)
        ref.current.removeEventListener('scroll', this.canSelect, false)
        this.refList.current.scrollTo(0, 0);
    }

    // 监听滚动事件，并滚动到最后一个
    canSelect = () => {
        this.refList.current.scrollTo(0, this.state.height);
    }

    // 更新高度
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({height: this.refList.current.scrollHeight})
    }

    // 停止滚动
    handleStopDraw = () => {
        let ref = this.refList
        clearInterval(this.listScrol)
        // 跳到数组的最后一个，中奖的位置
        ref.current.scrollTo(0, this.state.height);
        ref.current.addEventListener('scroll', this.canSelect, false)
        console.log(ref, 54545);
        // ref.current.scrollHeight=360
    }

    // 开始滚动
    handleStartDraw = () => {
        let ref = this.refList
        ref.current.removeEventListener('scroll', this.canSelect, false)
        let speed = 10
        let scrollPx = 0
        this.listScrol = setInterval(() => {
            scrollPx += 45;
            if (scrollPx > ref.current.scrollHeight) {
                // 调回起点，重置scrollPx
                ref.current.scrollTo(0, 0);
                scrollPx = 0
            } else {
                ref.current.scrollTo(0, scrollPx);
            }
        }, speed);
    }

    render() {
        return (
            <Row>
                <Col span={12} offset={6}>
                    <div style={{touchAction: 'none'}} className='draw-item scrollbar' ref={this.refList}>
                        {this.props.list.length && this.props.list.map((d, index) => {
                            return <p key={index}>{d}</p>
                        })}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default DrawItem;