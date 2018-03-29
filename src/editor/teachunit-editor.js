import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './editor.css'
// import $ from 'jquery';
import TabController from '../utils/tabcontrol';
import {TeachUnit, Course} from './componentConstructor';

import {Row, Col} from 'antd';
import {Tabs, Icon} from 'antd';
import {Input, Select, InputNumber, DatePicker, AutoComplete, Cascader} from 'antd';

const TabPane = Tabs.TabPane;
const InputGroup = Input.Group;
const Option = Select.Option;

class TeachUnitEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tUnit: {}
        };
        this.cancelEditor = this.cancelEditor.bind(this);
        this.onTeachUnitChanged = this.onTeachUnitChanged.bind(this);
        this.onCourseUnitChanged = this.onCourseUnitChanged.bind(this);
    }


    cancelEditor() {
        this.props.teachUnitChanged(this.state.tUnit);
        ReactDOM.unmountComponentAtNode(document.getElementById('tUnitEdit'));
    }

    componentDidMount() {
        let kUnitData = this.props.kUnitData;
        let tUnitData;
        console.log(kUnitData);
        if (kUnitData) {
            if (kUnitData.teachUnit.length === 0) {
                tUnitData = new TeachUnit(kUnitData.id);
            } else {
                tUnitData = kUnitData.teachUnit[0]
            }
            console.log(tUnitData);
            this.setState({
                tUnit: tUnitData
            }, function () {
                console.log(this.state.tUnit);
                console.log('2222');
            })

        }
    }

    //这个写的就超烂了
    onTeachUnitChanged(data) {
        console.log(data);
    }

    onCourseUnitChanged(data) {
        console.log(data);
    }

    render() {
        console.log(this.state.kUnit);
        return (
            <div id="editorContainerArea" className="editorContainerArea">
                <div id="editorContainer" className="editorContainer">
                    <EditorHeader closeBtn={this.cancelEditor}/>
                    <div id="editorBody" className="editorBody">
                        <CourseEdit
                            kUnitData={this.state.kUnit}
                            onTeachUnitChanged={this.onTeachUnitChanged}
                            onCourseUnitChanged={this.onCourseUnitChanged}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


class CourseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tUnit: [],
            mCUnit: [],
            aCUnit: []
        };
        this.onBasicInfoChanged = this.onBasicInfoChanged.bind(this);
    }

    onBasicInfoChanged(data) {
        this.props.onTeachUnitChanged(data)
    }

    componentWillReceiveProps() {
        let kUnitData = this.props.kUnitData;
        let mCUnit, aCUnit = [];
        console.log(kUnitData);
        if (kUnitData) {
            if (kUnitData.mCourseUnit.length === 0) {
                mCUnit = new Course('main', kUnitData.id);
            } else {
                mCUnit = kUnitData.mCourseUnit[0];
            }
            if (kUnitData.mCourseUnit.length !== 0) {
                aCUnit = kUnitData.mCourseUnit;
            }
            this.setState({
                tUnit: kUnitData,
                mCUnit:mCUnit,
                aCUnit:aCUnit
            }, function () {
                console.log(this.state);
            })
        }
    }


    render() {
        return (
            <div id="teachunit" className="teachunit">
                <Row gutter={16}>
                    <Col className="gutter-row" span={18}>
                        <Row gutter={2}>
                            <Col className="gutter-row" span={18}>
                                <section>
                                    <MainVideoArea/>
                                </section>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box">辅课时列表</div>
                            </Col>
                        </Row>
                        <Row gutter={2}>
                            <Col span={18}>
                                <section id="teachUnitInfo" className="teachUnitInfo">
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab={<span><Icon type="edit"/>基础设置</span>} key="1">
                                            {/*<BasicInfo*/}
                                                {/*onBasicInfoChanged={this.onBasicInfoChanged}*/}
                                                {/*tUnit={this.state.tUnit}*/}
                                            {/*/>*/}
                                        </TabPane>
                                        <TabPane tab={<span><Icon type="file"/>主课时设置</span>} key="2">
                                            Tab 2
                                        </TabPane>
                                        <TabPane tab={<span><Icon type="file-text"/>辅课时设置</span>} key="3">
                                            Tab 3
                                        </TabPane>
                                    </Tabs>
                                </section>
                            </Col>
                        </Row>

                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">素材列表</div>
                    </Col>
                </Row>

            </div>
        )
    }
}


const EditorHeader = ({closeBtn}) => {
    return (
        <div id="editorHeader" className="editorHeader">
            <span onClick={closeBtn}>×</span>
        </div>)
};


const MainVideoArea = ({videoUrl}) => {
    return (
        <div id="editor-video-area">
            <video id="editor-video" src={videoUrl} controls="controls"/>
            <div id="editor-butn-layer"/>
        </div>
    )
};

const MediaList = ({mediaListInfo}) => {
    let mediaNodes = mediaListInfo.map((item, index) => {
        return (
            <Media imgUrl={item}/>
        );
    });
    return (
        <div id="mediaListContent" className="mediaListContent">
            {mediaNodes}
            <div className="clear-float"/>
        </div>
    )
};

const Media = ({imgUrl}) => {
    return (
        <div className="imgbox">
            <img src={imgUrl}/>
            <span className="video-url-span">{this.props.media.videoUrl}</span>
        </div>
    )
};

const AuxVideoArea = ({}) => {
    return (
        <div/>
    )
};

const BasicInfo = (props) => {
    let basicInfoChanged = props.onBasicInfoChanged;
    let tUnit = props.tUnit;
    const children = [];
    for (let index in tUnit.keyword) {
        children.push(<Option key={tUnit.keyword[index]}>{tUnit.keyword[index]}</Option>);
    }

    function handleChange(value) {
        tUnit.keyword.push(value);
        basicInfoChanged(tUnit);
    }

    const basicInfoChange = (e) => {
        // console.log(tUnit)
        let targetId = e.target.id;
        if (targetId === 'keyword') {
            return;
        }
        tUnit[targetId] = e.target.value;
        basicInfoChanged(tUnit);
    };

    return (
        <div>
            <section id="basicInfo" className="basicInfo">
                <div onChange={basicInfoChange}>
                    <InputGroup label="title" size="middle">
                        <Col span={8}>
                            <label>教学单元名称</label>
                            <Input
                                defaultValue={tUnit.title}
                                id="title"
                            />
                        </Col>
                    </InputGroup>
                    <InputGroup label="description" size="middle">
                        <Col span={8}>
                            <label>教学单元描述信息</label>
                            <Input
                                defaultValue={tUnit.description}
                                id="description"
                            />
                        </Col>
                    </InputGroup>
                    <InputGroup label="keyword" size="middle">
                        <Col span={8}>
                            <label>教学单元关键字</label>
                            <Select
                                mode="tags"
                                style={{width: '100%'}}
                                placeholder="教学单元关键字"
                                onChange={handleChange}
                                id="keyword"
                            >
                                {children}
                            </Select>
                        </Col>
                    </InputGroup>
                    <InputGroup label="status" size="middle">
                        <Col span={8}>
                            <label>教学单元发布状态</label>
                            <Input
                                defaultValue={tUnit.status}
                                id="status"
                            />
                        </Col>
                    </InputGroup>
                </div>
            </section>
        </div>
    )
};

const MainCourse = ({}) => {
    return (
        <div/>
    )
};

const ListItem = ({itemId}, {itemName}) => {
    return (
        <div id={itemId} className="item">{itemName}</div>
    )
};


export default TeachUnitEditor;

/*
<TabController>
    <BasicInfo
        name="基础设置"
        basicInfoChanged={this.onBaseInfoChanged}
        basicInfoComponent={<BasicInfo />}
    />
    <MainCourse name="主课时设置"/>
    <MainCourse name="辅课时设置"/>
</TabController>
*/