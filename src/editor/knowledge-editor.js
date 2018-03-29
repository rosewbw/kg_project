import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './editor.css'

import TeachUnitEditor from './teachunit-editor';

import {Input, Select} from 'antd';
import {Row, Col} from 'antd';
import {Button} from 'antd';

const Option = Select.Option;


class KnowledgeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kUnit: {}
        };
        this.cancelHandler = this.cancelHandler.bind(this);
        this.kUnitInfoChange = this.kUnitInfoChange.bind(this);
        this.relationChange = this.relationChange.bind(this);
        this.tUnitEdit = this.tUnitEdit.bind(this);
        this.onTeachUnitChanged = this.onTeachUnitChanged.bind(this);
    }

    cancelHandler() {
        this.props.onUpdatekUnit(this.state.kUnit);
        ReactDOM.unmountComponentAtNode(document.getElementById('unitEdit'));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    tUnitEdit(e) {
        //teachUnitChanged={this.onTeachUnitChanged}
        ReactDOM.render(
            <TeachUnitEditor kUnitData={this.state.kUnit} teachUnitChanged={this.onTeachUnitChanged}/>
            , document.getElementById('tUnitEdit')
        )
        // ReactDOM.render(
        //     <KnowledgeEditor
        //         kUnitData={kUnitData}
        //         onUpdatekUnit={this.updateKnowledgeUnit}
        //         knowledgeUnitList={this.state.knowledgeUnitList}
        //         onUpdateUrlAndName={this.onUpdateUrlAndName}
        //
        //     />
        //     , document.getElementById('unitEdit')
        // )
    }


    onTeachUnitChanged(tUnit) {
        let kUnitId, tempkUnit;
        if (!tUnit) {
            return
        }
        kUnitId = tUnit.knowledgeUnitId;
        if(kUnitId === this.state.kUnit.id){
            tempkUnit = this.state.kUnit;
        }
        tempkUnit.teachUnit.push(tUnit);
        this.setState({
            kUnit:tempkUnit
        },function (e) {
            this.props.onUpdatekUnit(this.state.kUnit);
        })
    }


    kUnitInfoChange(e) {
        let inputType = e.target.id;
        let inputValue = e.target.value;

        let kUnit = this.state.kUnit;
        kUnit[inputType] = inputValue;
        this.setState({
            kUnit: kUnit
        })

        if (inputType === 'name' || inputType === 'thumbnailUrl') {
            this.props.onUpdateUrlAndName(kUnit.id, inputType, inputValue);
        }
    }

    relationChange(e) {
        console.log(e);
    }

    componentDidMount() {
        this.setState({
            kUnit: this.props.kUnitData
        })
    }

    render() {


        let kUnit = this.state.kUnit;
        let knowledgeUnitList = this.props.knowledgeUnitList;
        const children = [];
        for (let index in knowledgeUnitList) {
            if (knowledgeUnitList[index].id !== kUnit.id) {
                children.push(<Option key={knowledgeUnitList[index].name}>{knowledgeUnitList[index].name}</Option>);
            }
        }

        let defaultChildren = {
            parent: [],
            rely: [],
            related: [],
            brothers: [],
            contain: [],
            parallel: []
        };
        for (let item in defaultChildren) {
            if (kUnit[item]) {
                kUnit[item].map((object) => {
                    defaultChildren[item].push(object.name);
                })

            }
        }
        return (
            <div id="kEditorContainerArea" className="kEditorContainerArea">
                <div id="kEditorContainer" className="kEditorContainer">
                    <EditorHeader closeBtn={this.cancelHandler}/>
                    <div id="kEditorBody" className="kEditorBody">
                        <Row gutter={16}>
                            <Col className="gutter-row" span={12}>
                                <section id="skUnitInfo" className="skUnitInfo">
                                    <div className="kUnitInfo" onChange={this.kUnitInfoChange}>
                                        <section>
                                            <label>知识点名称</label>
                                            <Input
                                                id="name"
                                                size="small"
                                                value={kUnit.name}
                                            />
                                        </section>
                                        <section>
                                            <label>知识点缩略图</label>
                                            <Input
                                                id="thumbnailUrl"
                                                size="small"
                                                value={kUnit.thumbnailUrl}

                                            />
                                        </section>
                                        <section>
                                            <label>知识点大纲要求难度</label>
                                            <Input
                                                id="demand"
                                                size="small"
                                                value={kUnit.demand}/>
                                        </section>
                                        <section>
                                            <label>知识点学生掌握程度</label>
                                            <Input
                                                id="achieve"
                                                size="small"
                                                value={kUnit.achieve}/>
                                        </section>
                                    </div>
                                </section>
                                <section id="skUnitUrl" className="skUnitUrl">
                                    <div className="kUnitUrl">
                                        <img src={this.state.kUnit.thumbnailUrl}/>
                                    </div>
                                </section>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <section id="skUnitRelation" className="skUnitRelation">
                                    <div className="kUnitRelation">
                                        <div id="parentNode" className="parentNode">
                                            <label>父节点</label>
                                            <Select
                                                label="父节点"
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="Please select"
                                                value={defaultChildren.parent}
                                                onChange={this.relationChange}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="containNode" className="containNode">
                                            <label>子节点</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="Please select"
                                                value={defaultChildren.contain}
                                                onChange={this.relationChange}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="relyNode" className="relyNode">
                                            <label>依赖关系</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="Please select"
                                                value={defaultChildren.rely}
                                                onChange={this.relationChange}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="relatedNode" className="relatedNode">
                                            <label>相关关系</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="Please select"
                                                value={defaultChildren.related}
                                                onChange={this.relationChange}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="brothersNode" className="brothersNode">
                                            <label>兄弟关系</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="Please select"
                                                value={defaultChildren.brothers}
                                                onChange={this.relationChange}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="parallelNode" className="parallelNode">
                                            <label>平行关系</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="Please select"
                                                value={defaultChildren.parallel}
                                                onChange={this.relationChange}
                                            >
                                                {children}
                                            </Select>
                                        </div>

                                    </div>
                                </section>
                                <section id="skUnitBtn" className="skUnitBtn">
                                    <div id="kUnitBtn">
                                        <Button onClick={this.tUnitEdit}>编辑教学单元</Button>
                                        <br/>
                                        <br/>
                                        <Button onClick={this.cancelHandler}>保存</Button>


                                    </div>
                                </section>
                            </Col>
                        </Row>
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

export default KnowledgeEditor

