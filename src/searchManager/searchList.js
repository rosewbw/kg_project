import React, {Component} from 'react';

import SearchInput from './searchInput'
import InfiniteScroll from 'react-infinite-scroller';
import './index.css'


import {Form, Input} from 'antd';
import {Card, Icon, Avatar} from 'antd';
import {Row, Col} from 'antd';
import {Progress} from 'antd';
import {List, message, Spin} from 'antd';

import 'bootstrap/dist/css/bootstrap.css';

const Search = Input.Search;
const FormItem = Form.Search;
const {Meta} = Card;

class SearchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expand: false,
        }
    }

    updateSearchList = (data) => {
        console.log(data)
    }


    render() {
        const children = [];
        return (
            <div id="searchList" className="searchList">
                <Row gutter={100}
                     justify="center"
                     type="flex">
                    <Col span={10}>
                        <SearchItemOfLesson
                            url="data:image/jpeg;base64,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"
                            title="数列极限"
                            description="这个是数列极限的课程，请认真的学习"/>
                    </Col>
                    <Col span={10}>
                        <SearchItemOfLesson/>
                    </Col>
                </Row>
                <Row justify="center"
                     type="flex">
                    <Col span={22}>
                        <SearchItemOfKnowledge/>
                    </Col>
                </Row>
            </div>
        );
    }
}


// const SearchItemOfKnowledge = (props) => {
//     const data = [
//         {
//             title: 'Ant Design Title 1',
//         },
//         {
//             title: 'Ant Design Title 2',
//         },
//         {
//             title: 'Ant Design Title 3',
//         },
//         {
//             title: 'Ant Design Title 4',
//         },
//     ];
//     return (
//         <div className="searchItem">
//             <Row
//                 type="flex"
//                 justify="center"
//             >
//                 <Col span={6}>
//                     <Card
//                         style={{width: 300}}
//                         cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
//                         actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
//                     >
//                         <Meta
//                             avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
//                             title="Card title"
//                             description="This is the description"
//                         />
//                     </Card>
//                 </Col>
//                 <Col span={12}>
//                     <List
//                         bordered="true"
//                         itemLayout="horizontal"
//                         dataSource={data}
//                         renderItem={item => (
//                             <List.Item>
//                                 <List.Item.Meta
//                                     avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
//                                     title={<a href="https://ant.design">{item.title}</a>}
//                                     description="Ant Design, a design language for background applications, is refined by Ant UED Team"
//                                 />
//                             </List.Item>
//                         )}
//                     />
//                 </Col>
//             </Row>
//
//
//         </div>
//
//     )
// }


const SearchItemOfKnowledge = (props) => {
    return (
        <div className="d-flex col-md-12 mb-4" style={{height: '26rem'}}>
            <div className="main-course col-md-4">
                <MainCourse
                    url="data:image/jpeg;base64,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"
                    title="数列极限"
                    description="这个是数列极限的课程，请认真的学习"
                    type="视频"
                    difficulty="困难"
                    percent="80"
                    checkFullInfo={null}
                />
            </div>
            <div className="sub-course list-group col-md-8 ">
                <AidCourse
                    title="数列的极限补充课程"
                    difficulty="困难"
                    duration="100s"
                    type="视频"
                    description="本视频讲述了巴拉巴拉"
                />
            </div>
        </div>
    )
}

const AidCourse = (props) => {
    const {title, difficulty, duration, type, description} = props;
    return (
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between sub-course-title">
                <h5 className="mb-1">{title}</h5>
                <small>时长：{duration}</small>
            </div>
            <p className="mb-1">{description}</p>
            <small>类型：{type}</small>
            <small>难度：{difficulty}</small>
        </a>
    )
};

const MainCourse = (props) => {
    const {url, title, description, percent, userName} = props;
    const {checkFullInfo} = props;
    return (
        <div className="card mb-4 box-shadow">
            <img className="card-img-top"
                 data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                 style={{height: '12rem', width: '100%', display: 'block'}}
                 src={url}
                 data-holder-rendered="true"/>
            <div className="card-body main-course-body"
                 style={{height: '14rem', width: '100%'}}>
                <div className="d-flex w-100 justify-content-between main-course-title" style={{height: '2rem'}}>
                    <h5 className="mb-1">{title}</h5>
                </div>
                <p className="mb-1 main-course-description"
                   style={{height: '4rem'}}>{description}</p>

                <div className="sim-progress">
                    <label>相似度</label>
                    <Progress
                        percent={percent}
                        showInfo="false"
                        size="small"
                    />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <small>教师：{userName}</small>
                    <button
                        onClick={checkFullInfo}
                        type="button"
                        className="btn btn-sm btn-outline-secondary">查看教学单元
                    </button>

                </div>

            </div>
        </div>
    )
};

const SearchItemOfLesson = (props) => {
    const {url, title, description, userName} = props;
    const {checkFullInfo} = props;
    return (
        <div className="card mb-4 box-shadow">
            <img className="card-img-top"
                 data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                 style={{height: '20rem', width: '100%', display: 'block'}}
                 src={url}
                 data-holder-rendered="true"/>
            <div className="card-body main-course-body"
                 style={{height: '14rem', width: '100%'}}>
                <div className="d-flex w-100 justify-content-between main-course-title" style={{height: '2rem'}}>
                    <h5 className="mb-1">{title}</h5>
                </div>
                <p className="mb-1 main-course-description"
                   style={{height: '7rem'}}>{description}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <h6>教师：{userName}</h6>
                    <h6>发布时间：{userName}</h6>
                    <button
                        onClick={checkFullInfo}
                        type="button"
                        className="btn btn-sm btn-outline-secondary">
                        查看课程信息
                    </button>

                </div>

            </div>
        </div>
    )
}


export default SearchList