import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './editor.css'
import $ from 'jquery';
import TabController from '../utils/tabcontrol';
import {TeachUnit, Course} from './componentConstructor';

import {Row, Col} from 'antd';
import {Tabs, Icon, Tag} from 'antd';
import {Input, Select, InputNumber, DatePicker, AutoComplete, Cascader} from 'antd';

const TabPane = Tabs.TabPane;
const InputGroup = Input.Group;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class TeachUnitEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tUnit: this.props.kUnitData,
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
    }

    //这个写的就超烂了
    onTeachUnitChanged(data) {
        console.log(data);
    }

    onCourseUnitChanged(data) {
        console.log(data);
    }

    render() {
        return (
            <div id="editorContainerArea" className="editorContainerArea">
                <div id="editorContainer" className="editorContainer">
                    <EditorHeader closeBtn={this.cancelEditor}/>
                    <div id="editorBody" className="editorBody">
                        <CourseEdit
                            tUnitData={this.state.tUnit}
                            // tMaterialList={this.state.tMaterialList}
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
    constructor(props){
        super(props);
        this.state = {
            tUnit:this.props.tUnitData,
            mCUnit:this.props.tUnitData.mCourseUnit,
            aCUnit:this.props.tUnitData.aCourseUnit,
            tMList:[],
        };
        this.onBasicInfoChanged = this.onBasicInfoChanged.bind(this);
        this.onMainCourseInfoChanged = this.onMainCourseInfoChanged.bind(this);
        this.onMainCourseMaterialInfoChanged = this.onMainCourseMaterialInfoChanged.bind(this);
    }

    onBasicInfoChanged = (data) => {
        this.props.onTeachUnitChanged(data)
    };

    onMainCourseInfoChanged = (data) => {
        this.setState({
            mCUnit:data
        })
    };

    onMainCourseMaterialInfoChanged = (data) => {
        let materialId = data;
        let mCUnit = this.state.mCUnit;
        let tMList = this.state.tMList;
        for(let index in tMList){
            if(tMList[index].id === materialId){
                mCUnit.material.push(tMList[index]);
                this.setState({
                    mCUnit:mCUnit
                })
            }
        }
    };
    componentDidMount(){
        let _this = this;
        // let kUnitData = this.props.kUnitData;
        // let tUnitData;
        // if (kUnitData) {
        //     if (kUnitData.teachUnit.length === 0) {
        //         tUnitData = new TeachUnit(kUnitData.id);
        //     } else {
        //         tUnitData = kUnitData.teachUnit[0]
        //     }
        //     console.log(tUnitData);
        //     this.setState({
        //         tUnit: tUnitData
        //     }, function () {
        //         console.log(this.state.tUnit);
        //         console.log('2222');
        //     })
        //
        // }
        $.ajax('/getMediaList',{
            type:"POST",
            dataType:'json',
            data:{
                username:_this.state.tUnit.username || 'debug-user'
            },
            success:(res) => {
                _this.setState({
                    tMList:[]
                });
                console.log(res);
            },
            error:(err) => {
                console.log(err)
            }

        })
    }
    /*
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
    */
    render(){
        return (
            <div id="teachunit" className="teachunit">
                <Row gutter={16}>
                    <Col className="gutter-row" span={18}>
                        <Row gutter={2}>
                            <Col className="gutter-row" span={18}>
                                <section>
                                    <MainVideoArea
                                        materialData={this.state.mCUnit.material}
                                    />
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
                                            <BasicInfo
                                                onBasicInfoChanged={this.onBasicInfoChanged}
                                                tUnit={this.state.tUnit}
                                            />
                                        </TabPane>
                                        <TabPane tab={<span><Icon type="file"/>主课时设置</span>} key="2">
                                            <MainCourseInfo
                                                tMaterialList={this.state.tMList}
                                                mCourseUnit={this.state.mCUnit}
                                                onMainCourseInfoChanged={this.onMainCourseInfoChanged}
                                                onMainCourseMaterialInfoChanged={this.onMainCourseMaterialInfoChanged}
                                            />
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

};


const EditorHeader = ({closeBtn}) => {
    return (
        <div id="editorHeader" className="editorHeader">
            <span onClick={closeBtn}>×</span>
        </div>)
};


const MainVideoArea = (props) => {
    let materialData = props.materialData;
    let url = materialData.url;
    let type = materialData.type;
    let playArea;
    if(type === 'video'){
        playArea = <video id="editor-video" src={url} controls="controls"/>
    }else if(type === 'image'){
        playArea = <img id="editor-video" src={url} />;
    }else{
        playArea = <video id="editor-video" src={url} controls="controls"/>
    }
    return (
        <div id="editor-video-area">
            {playArea}
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
        tUnit.keyword = value;
        basicInfoChanged(tUnit);
    }

    function statusChange(value) {
        tUnit.status = value;
        basicInfoChanged(tUnit);
    }

    const basicInfoChange = (e) => {
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
                                defaultValue={tUnit.keyword}
                                id="keyword"
                            >
                                {children}
                            </Select>
                        </Col>
                    </InputGroup>
                    <InputGroup label="status" size="middle">
                        <Col span={8}>
                            <label>教学单元发布状态</label>
                            <Select
                                defaultValue={tUnit.status || '未发布'}
                                style={{width: '100%'}}
                                id="status"
                                onChange={statusChange}>
                                <Option value="publish">已发布</Option>
                                <Option value="unpublish">未发布</Option>

                            </Select>
                        </Col>
                    </InputGroup>
                </div>
            </section>
        </div>
    )
};

const MainCourseInfo = (props) => {
    let mCInfo = props.mCourseUnit;
    let mCInfoChanged = props.onMainCourseInfoChanged;
    let tMaterialList = props.tMaterialList;
    const mainCourseInfoChanged = (e, option) => {
        console.log(e, option);
    };

    const mainCourseMaterialInfoChanged = (data) => {
        props.onMainCourseMaterialInfoChanged(data);
    };

    const mCInfoChange = (e) => {
        let targetId = e.target.id;
        mCInfo[targetId] = e.target.value;
        mCInfoChanged(mCInfo);
    };

    const dHandleChange = (value) => {
        mCInfo.difficulty = value;
        mCInfoChanged(mCInfo);
    };
    const iDHandleChange = (value) => {
        mCInfo.interactionDegree = value;
        mCInfoChanged(mCInfo);
    };

    const iTHandleChange = (value) => {
        mCInfo.interactionType = value;
        mCInfoChanged(mCInfo);
    };

    const lOTHandleChange = (value) => {
        mCInfo.learningObjectType = value;
        mCInfoChanged(mCInfo);
    };
    const children = [];
    let type;
    for(let index in tMaterialList){
        if(tMaterialList[index]){
            type = tMaterialList[index].type;
            children[type].push(<Option key={tMaterialList[index].id}>{tMaterialList[index].name}</Option>);
        }
    }
    return (
        <div>
            <Row>
                <Col className="gutter-row" span={8}>
                    <section id="mainCourseBasicInfo" className="mainCourseBasicInfo">
                        <div onChange={mCInfoChange}>
                            <InputGroup label="title" size="middle">
                                <Col>
                                    <label>主课时名称</label>
                                    <Input
                                        defaultValue={mCInfo.title}
                                        id="title"
                                    />
                                </Col>
                            </InputGroup>
                            <InputGroup label="difficulty" size="middle">
                                <Col>
                                    <label>课时难度</label>
                                    <Select
                                        defaultValue={mCInfo.difficulty || '中'}
                                        style={{width: '100%'}}
                                        id="difficulty"
                                        onChange={dHandleChange}
                                    >
                                        <Option value="veryhigh">很高</Option>
                                        <Option value="high">高</Option>
                                        <Option value="middle">中</Option>
                                        <Option value="low">低</Option>
                                        <Option value="verylow">很低</Option>
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup label="interactionDegree" size="middle">
                                <Col>
                                    <label>交互程度</label>
                                    <Select
                                        defaultValue={mCInfo.interactionDegree || '中'}
                                        style={{width: '100%'}}
                                        id="status"
                                        onChange={iDHandleChange}
                                    >
                                        <Option value="veryhigh">很高</Option>
                                        <Option value="high">高</Option>
                                        <Option value="middle">中</Option>
                                        <Option value="low">低</Option>
                                        <Option value="verylow">很低</Option>
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup label="interactionType" size="middle">
                                <Col>
                                    <label>交互类型</label>
                                    <Select
                                        defaultValue={mCInfo.interactionType || '未定义'}
                                        style={{width: '100%'}}
                                        id="status"
                                        onChange={iTHandleChange}
                                    >
                                        <Option value="active">主动型</Option>
                                        <Option value="commentary">解说型</Option>
                                        <Option value="mixing">混合型</Option>
                                        <Option value="undefined">未定义</Option>
                                    </Select>
                                </Col>
                            </InputGroup>
                            <InputGroup label="learningObjectType" size="middle">
                                <Col>
                                    <label>学习对象类型</label>
                                    <Select
                                        defaultValue={mCInfo.learningObjectType || '未定义'}
                                        style={{width: '100%'}}
                                        id="status"
                                        onChange={lOTHandleChange}
                                    >
                                        <Option value="video">视频</Option>
                                        <Option value="audio">音频</Option>
                                        <Option value="image">图片</Option>
                                        <Option value="word">文字</Option>
                                        <Option value="webpage">网页链接</Option>
                                        <Option value="richmedia">富媒体作品</Option>
                                    </Select>
                                </Col>
                            </InputGroup>
                        </div>
                    </section>
                </Col>
                <Col className="gutter-row" span={8}>
                    <section id="mainCourseMaterialInfo" className="mainCourseMaterialInfo">
                        <div >
                            <label>请选择主课时素材</label>
                            <br/>
                            <Select
                                defalt
                                style={{ width: 200 }}
                                defaultValue={mCInfo.material[0]||''}
                                id="material"
                                onChange={mainCourseMaterialInfoChanged}
                            >
                                {children}
                                <OptGroup label="图片">
                                    {/*{children.image}*/}
                                    <Option key="1" >Jack</Option>
                                    <Option key="2" >Lucy</Option>
                                </OptGroup>
                                {/*<OptGroup label="文字">*/}
                                    {/*{children.word}*/}
                                {/*</OptGroup>*/}
                                {/*<OptGroup label="音频">*/}
                                    {/*{children.audio}*/}
                                {/*</OptGroup>*/}
                                {/*<OptGroup label="视频">*/}
                                    {/*{children.video}*/}
                                {/*</OptGroup>*/}
                                {/*<OptGroup label="动画">*/}
                                    {/*{children.flash}*/}
                                {/*</OptGroup>*/}
                                {/*<OptGroup label="链接">*/}
                                    {/*{children.webpage}*/}
                                {/*</OptGroup>*/}
                                {/*<OptGroup label="富媒体">*/}
                                    {/*{children.richmedia}*/}
                                {/*</OptGroup>*/}
                            </Select>
                        </div>
                    </section>
                </Col>
                <Col className="gutter-row" span={8}>
                    <section id="mainCourseStatInfo" className="mainCourseStatInfo">
                        <div onChange={mainCourseInfoChanged}>
                            <InputGroup label="title" size="middle">
                                <Col>
                                    <section>
                                        <div >
                                            <span>点击人数：</span>{mCInfo.clickNum}
                                        </div>
                                    </section>
                                </Col>
                            </InputGroup>
                            <InputGroup label="difficulty" size="middle">
                                <Col>
                                    <section>
                                        <div >
                                            <span>观看人数：</span>{mCInfo.watchNum}
                                        </div>
                                    </section>
                                </Col>
                            </InputGroup>
                            <InputGroup label="averageRetentionRate" size="middle">
                                <Col>
                                    <section>
                                        <div >
                                            <span>平均滞留率：</span>{mCInfo.averageRetentionRate}
                                        </div>
                                    </section>
                                </Col>
                            </InputGroup>
                            <InputGroup label="semanticDensity" size="middle">
                                <Col>
                                    <section>
                                        <div >
                                            <span>典型学习时间：</span>{mCInfo.semanticDensity}
                                        </div>
                                    </section>
                                </Col>
                            </InputGroup>

                        </div>
                    </section>
                </Col>
            </Row>

        </div>
    )
};

const ListItem = ({itemId}, {itemName}) => {
    return (
        <div id={itemId} className="item">{itemName}</div>
    )
};


export default TeachUnitEditor;