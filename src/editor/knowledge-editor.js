import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './editor.css'

import TeachUnitEditor from './teachunit-editor';

import {Input, Select} from 'antd';
import {Row, Col} from 'antd';
import {Button} from 'antd';

const Option = Select.Option;
const InputGroup = Input.Group;


class KnowledgeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kUnit: this.props.kUnitData,
            username: this.props.username
        };
        this.cancelHandler = this.cancelHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.kUnitInfoChange = this.kUnitInfoChange.bind(this);
        this.tUnitEdit = this.tUnitEdit.bind(this);
        this.onTeachUnitChanged = this.onTeachUnitChanged.bind(this);

        //不知道有没有什么好方法
        this.parentRelationAdd = this.parentRelationAdd.bind(this);
        this.childRelationAdd = this.childRelationAdd.bind(this);
        this.relateRelationAdd = this.relateRelationAdd.bind(this);
        this.broRelationAdd = this.broRelationAdd.bind(this);
        this.paraRelationAdd = this.paraRelationAdd.bind(this);

        this.parentRelationDel = this.parentRelationDel.bind(this);
        this.childRelationDel = this.childRelationDel.bind(this);
        this.relateRelationDel = this.relateRelationDel.bind(this);
        this.broRelationDel = this.broRelationDel.bind(this);
        this.paraRelationDel = this.paraRelationDel.bind(this);

        this.getkUnitObjectById = this.getkUnitObjectById.bind(this);
        this.kUnitAdd = this.kUnitAdd.bind(this);
        this.kUnitDel = this.kUnitDel.bind(this);

    }

    cancelHandler() {
        ReactDOM.unmountComponentAtNode(document.getElementById('unitEdit'));
    }

    saveHandler() {
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
        ReactDOM.render(
            <TeachUnitEditor
                kUnitData={this.state.kUnit.teachUnit}
                teachUnitChanged={this.onTeachUnitChanged}
                username={this.state.username}
            />
            , document.getElementById('tUnitEdit')
        )
    }


    onTeachUnitChanged(tUnit) {
    }


    kUnitInfoChange(e) {
        let inputType = e.target.id;
        if(inputType === 'synonym'){
            return
        }
        let inputValue = e.target.value;
        let kUnit = this.state.kUnit;
        kUnit[inputType] = inputValue;
        this.setState({
            kUnit: kUnit
        });
        if (inputType === 'name' || inputType === 'thumbnailUrl') {
            this.props.onUpdateUrlAndName(kUnit._id, inputType, inputValue);
        }
    }

    parentRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'hasParentNode');
        this.kUnitAdd(addNode, kUnit, 'hasChildNode');
    }

    childRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'hasChildNode');
        this.kUnitAdd(addNode, kUnit, 'hasParentNode');
    }

    relyByRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'hasBeRelyByNode');
        this.kUnitAdd(addNode, kUnit, 'hasRelyOnNode');
    }

    relyOnRelationAdd = (value) => {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'hasRelyOnNode');
        this.kUnitAdd(addNode, kUnit, 'hasBeRelyByNode');
    }

    relateRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'hasRelateNode');
        this.kUnitAdd(addNode, kUnit, 'hasRelateNode');
    }

    broRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'hasBrotherNode');
        this.kUnitAdd(addNode, kUnit, 'hasBrotherNode');
    }

    paraRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'hasParallelNode');
        this.kUnitAdd(addNode, kUnit, 'hasParallelNode');
    }

    onNextLKnowledgeAdd = (value) => {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
    };

    onPrevLKnowledgeAdd = (value) => {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
    };

    onNextLKnowledgeDel = (value) => {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
    };

    onPrevLKnowledgeDel = (value) => {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
    };


    parentRelationDel(value) {
        console.log(value)
    }

    childRelationDel(value) {
        console.log(value)
    }

    relyByRelationDel = (value) => {
        console.log(value)
    }

    relyOnRelationDel = (value) => {
        console.log(value)
    }

    relateRelationDel(value) {
        console.log(value)
    }

    broRelationDel(value) {
        console.log(value)
    }

    paraRelationDel(value) {
        console.log(value)
    }

    getkUnitObjectById = (id) => {
        const kUnits = this.props.knowledgeUnitList;
        for (let index in kUnits) {
            if (kUnits[index]._id === id) {
                return kUnits[index]
            }
        }
    };

    kUnitAdd = (targetNode, addUnit, type) => {
        targetNode[type].push(addUnit);
        console.log(targetNode[type])
    };

    kUnitDel = () => {

    };


    onSelect = (value) => {

    };

    onKnowledgeKeywordChanged = (data) => {
        let kUnit = this.state.kUnit;
        kUnit.synonym = data;
        this.setState({
            kUnit:kUnit
        })
    };

    componentDidMount() {

    }

    render() {
        const kUnit = this.state.kUnit;
        const knowledgeUnitList = this.props.knowledgeUnitList;
        const children = [];
        for (let index in knowledgeUnitList) {
            if (knowledgeUnitList[index]._id !== kUnit._id) {
                children.push(<Option key={knowledgeUnitList[index]._id}>{knowledgeUnitList[index].title}</Option>);
            }
        }

        const synonym = [];
        for (let index in kUnit.synonym) {
            synonym.push(<Option key={kUnit.synonym[index]}>{kUnit.synonym[index]}</Option>);
        }


        let defaultChildren = {
            hasParentNode: [],
            hasBeRelyByNode: [],
            hasRelateNode: [],
            hasChildNode: [],
            hasParallelNode: []
        };

        let hasPrevNode = kUnit.hasPrevNode;
        let hasNextNode = kUnit.hasNextNode;
        for (let item in defaultChildren) {
            if (kUnit[item]) {
                kUnit[item].map((object) => {
                    defaultChildren[item].push(object.title);
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
                                                defaultValue={kUnit.title}
                                            />
                                        </section>
                                        <section>
                                            <label>知识点缩略图</label>
                                            <Input
                                                id="thumbnailUrl"
                                                size="small"
                                                defaultValue={kUnit.thumbnailUrl}
                                            />
                                        </section>
                                        <section>
                                            <label>知识点大纲要求难度（0-100）</label>
                                            <Input
                                                id="demand"
                                                size="small"
                                                defaultValue={kUnit.demand}
                                            />
                                        </section>
                                        <section>
                                            <label>知识点学生掌握程度（0-100）</label>
                                            <Input
                                                id="achieve"
                                                size="small"
                                                defaultValue={kUnit.achieve}
                                            />
                                        </section>
                                        <section>
                                            <label>知识点同义词</label>
                                            <Select
                                                mode="tags"
                                                style={{width: '100%'}}
                                                placeholder="知识点同义词"
                                                onChange={this.onKnowledgeKeywordChanged}
                                                defaultValue={kUnit.synonym}
                                                id="synonym"
                                            >
                                                {synonym}
                                            </Select>
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
                                            <label>父知识点</label>
                                            <Select
                                                label="父知识点"
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="请选择"
                                                defaultValue={defaultChildren.hasParentNode}
                                                onSelect={this.parentRelationAdd}
                                                onDeselect={this.parentRelationDel}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="containNode" className="containNode">
                                            <label>子知识点</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="请选择"
                                                defaultValue={defaultChildren.hasChildNode}
                                                onSelect={this.childRelationAdd}
                                                onDeselect={this.childRelationDel}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="relyNode" className="relyNode">
                                            <label>受依赖知识点</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="请选择"
                                                defaultValue={defaultChildren.hasBeRelyByNode}
                                                onSelect={this.relyByRelationAdd}
                                                onDeselect={this.relyByRelationDel}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="relyNode" className="relyNode">
                                            <label>依赖的知识点</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="请选择"
                                                defaultValue={defaultChildren.hasRelyOnNode}
                                                onSelect={this.relyOnRelationAdd}
                                                onDeselect={this.relyOnRelationDel}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="relatedNode" className="relatedNode">
                                            <label>相关知识点</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="请选择"
                                                defaultValue={defaultChildren.hasRelateNode}
                                                onSelect={this.relateRelationAdd}
                                                onDeselect={this.relateRelationDel}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="brothersNode" className="brothersNode">
                                            <label>同义知识点</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="请选择"
                                                defaultValue={defaultChildren.hasSynonymNode}
                                                onSelect={this.broRelationAdd}
                                                onDeselect={this.broRelationDel}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="parallelNode" className="parallelNode">
                                            <label>上一个知识点</label>
                                            <Select

                                                style={{width: '100%'}}
                                                placeholder="请选择"
                                                defaultValue={hasPrevNode}
                                                onSelect={this.paraRelationAdd}
                                                onDeselect={this.paraRelationDel}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="parallelNode" className="parallelNode">
                                            <label>下一个知识点</label>
                                            <Select
                                                style={{width: '100%'}}
                                                placeholder="请选择"
                                                defaultValue={hasNextNode}
                                                onSelect={this.paraRelationAdd}
                                                onDeselect={this.paraRelationDel}
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
                                        <Button onClick={this.saveHandler}>保存</Button>


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

