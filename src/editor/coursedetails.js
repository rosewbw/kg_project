import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './coursedetails.css'
import $ from 'jquery';


class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cDetails: {}
        }
        this.cancelEditor = this.cancelEditor.bind(this);
    }


    cancelEditor() {
        ReactDOM.unmountComponentAtNode(document.getElementById('unitEdit'));
    }

    componentDidMount() {

    }

    render() {
        console.log(this.cancelEditor);
        return (
            <div id="editorContainerArea" className="editorContainerArea">
                <div id="editorContainer" className="editorContainer">
                    <EditorHeader closeBtn={this.cancelEditor}/>
                    <MainVideoArea videoUrl={"1234"}/>
                    <MediaList/>
                    <AuxVideoArea/>
                    <CourseInfo/>
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
}

const MediaList = ({mediaListInfo}) => {
    let mediaNodes = mediaListInfo.map((item,index)=>{
        return (
            <Media imgUrl={item}/>
        );
    })
    return (
        <div id="mediaListContent" className="mediaListContent">
            {mediaNodes}
            <div className="clear-float"></div>
        </div>
    )
}

const Media = ({imgUrl}) => {
    return (
        <div className="imgbox">
            <img src={imgUrl}></img>
            <span className="video-url-span">{this.props.media.videoUrl}</span>
        </div>
    )
}

const AuxVideoArea = ({}) => {
    return (
        <div/>
    )
}

const ListItem = ({itemId},{itemName}) => {
    return(
        <div id={itemId} className="item">{itemName}</div>
    )
}

const CourseInfo = ({}) => {
    return(
        <div id="courseInfo">

        </div>
    )
}

export default CourseDetails;