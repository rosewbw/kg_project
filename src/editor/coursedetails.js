import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './editor.css'
import $ from 'jquery';
import TabController from '../utils/tabcontrol';
import {TeachUnit, Course} from './componentConstructor';


class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tUnit: {}
        };
        this.cancelEditor = this.cancelEditor.bind(this);
        this.onCourseInfoChanged = this.onCourseInfoChanged.bind(this);
    }


    cancelEditor() {
        ReactDOM.unmountComponentAtNode(document.getElementById('tUnitEdit'));
    }

    componentDidMount() {
        // let kUnitData = this.props.kUnitData;
        // let tUnitData;
        // if (kUnitData) {
        //     if (kUnitData.teachUnit.length === 0) {
        //         tUnitData = new TeachUnit(kUnitData.id);
        //     } else {
        //         tUnitData = kUnitData.teachUnit[0]
        //     }
        //     this.setState({
        //         tUnit: tUnitData
        //     }, () => {
        //         this.props.teachUnitChanged(this.state.tUnit);
        //     })
        //
        // }
    }

    onCourseInfoChanged(data){

    }


    render() {
        return (
            <div id="editorContainerArea" className="editorContainerArea">
                <div id="editorContainer" className="editorContainer">
                    <EditorHeader closeBtn={this.cancelEditor}/>
                    <div id="editorBody" className="editorBody">
                        <CourseInfo courseInfoChanged={this.onCourseInfoChanged}/>
                    </div>
                </div>
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

const BasicInfo = ({}) => {
    return (
        <div/>
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

class CourseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tUnit: []
        };
        this.onBaseInfoChanged = this.onBaseInfoChanged.bind(this);
    }

    onBaseInfoChanged(data) {
        this.props.courseInfoChanged(data)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="courseInfo" className="courseInfo">
                <TabController>
                    <BasicInfo name="基础设置" basicInfoChanged={this.onBaseInfoChanged}/>
                    <MainCourse name="主课时设置"/>
                </TabController>
            </div>
        )
    }
}

export default CourseDetails;