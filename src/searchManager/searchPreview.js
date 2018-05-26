import React, {Component} from 'react';
import ReactDOM from 'react-dom';


import {Row, Col} from 'antd';


class SearchLessonPreview extends Component {
    state = {
        lessonInfo: this.props.lessonInfo
    };

    getFullInfoOfLesson = (lessonId) => {

    };

    cancelEditor = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('searchPreview'));
    }


    componentDidMount() {

    }

    render() {
        const lessonInfo = this.state.lessonInfo.data;
        const lessonId = this.state.lessonInfo.id;
        return (
            <div id="searchPreviewArea" className="searchPreviewArea">
                <div id="previewContainer" className="previewContainer">
                    <EditorHeader closeBtn={this.cancelEditor} title={lessonInfo.title}/>
                    <div id="previewBody" className="previewBody">
                        <Row gutter={16} style={{height: '100%'}}>
                            <Col className="gutter-row" span={16} style={{height: '100%'}}>
                            </Col>
                            <Col className="gutter-row" span={8}>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{height: '100%'}}>
                            <Col className="gutter-row" span={8}>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}


class SearchKnowledgePreview extends Component {
    render() {
        return (
            <div>
                lllllllll
            </div>
        )
    }
}


const EditorHeader = ({closeBtn, title}) => {
    return (
        <div id="editorHeader" className="editorHeader">
            <span style={{fontSize: '17px', position: 'absolute', left: '5px'}}>课程名称：{title}</span>
            <span onClick={closeBtn}>×</span>
        </div>)

};

export {
    SearchKnowledgePreview,
    SearchLessonPreview
}