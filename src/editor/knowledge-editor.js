import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './editor.css'

import TeachUnitEditor from './teachunit-editor';

// import {TeachUnit, Course} from './componentConstructor';

import {Input, Select} from 'antd';
import {Row, Col} from 'antd';
import {Button} from 'antd';

const Option = Select.Option;


class KnowledgeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kUnit: this.props.kUnitData,
            username:this.props.username
        };
        this.cancelHandler = this.cancelHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.kUnitInfoChange = this.kUnitInfoChange.bind(this);
        this.tUnitEdit = this.tUnitEdit.bind(this);
        this.onTeachUnitChanged = this.onTeachUnitChanged.bind(this);

        //不知道有没有什么好方法
        this.parentRelationAdd = this.parentRelationAdd.bind(this);
        this.childRelationAdd = this.childRelationAdd.bind(this);
        this.relyRelationAdd = this.relyRelationAdd.bind(this);
        this.relateRelationAdd = this.relateRelationAdd.bind(this);
        this.broRelationAdd = this.broRelationAdd.bind(this);
        this.paraRelationAdd = this.paraRelationAdd.bind(this);

        this.parentRelationDel = this.parentRelationDel.bind(this);
        this.childRelationDel = this.childRelationDel.bind(this);
        this.relyRelationDel = this.relyRelationDel.bind(this);
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

    parentRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'related');
        this.kUnitAdd(addNode, kUnit, 'related');
    }

    childRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'contain');
        this.kUnitAdd(addNode, kUnit, 'parent');
    }

    relyRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'isBeingRelyOnBy');
        this.kUnitAdd(addNode, kUnit, 'isRelyOnTo');
    }

    relateRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'rely');
        this.kUnitAdd(addNode, kUnit, 'rely');
    }

    broRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'brothers');
        this.kUnitAdd(addNode, kUnit, 'brothers');
    }

    paraRelationAdd(value) {
        let kUnit = this.state.kUnit;
        let addNode = this.getkUnitObjectById(value);
        this.kUnitAdd(kUnit, addNode, 'parent');
        this.kUnitAdd(addNode, kUnit, 'contain');
    }

    parentRelationDel(value) {
        console.log(value)
    }

    childRelationDel(value) {
        console.log(value)
    }

    relyRelationDel(value) {
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
            if (kUnits[index].id === id) {
                return kUnits[index]
            }
        }
    };

    kUnitAdd = (targetNode, addUnit, type) => {
        console.log()
        targetNode[type].push(addUnit);
        console.log( targetNode[type])
    };

    kUnitDel = () => {

    };


    onSelect = (value) => {
        console.log(value);
        // const kUnit = this.state.kUnit;
        // const knowledgeUnitList = this.props.knowledgeUnitList;
        // let unitSelected;
        // for (let index in knowledgeUnitList) {
        //     if (knowledgeUnitList[index].name === value) {
        //         unitSelected = knowledgeUnitList[index]
        //     }
        // }
    };

    componentDidMount() {

    }

    render() {
        console.log()
        const kUnit = this.state.kUnit;
        const knowledgeUnitList = this.props.knowledgeUnitList;
        const children = [];
        for (let index in knowledgeUnitList) {
            if (knowledgeUnitList[index].id !== kUnit.id) {
                children.push(<Option key={knowledgeUnitList[index].id}>{knowledgeUnitList[index].name}</Option>);
            }
        }
        let defaultChildren = {
            parent: [],
            isBeingRelyOnBy: [],
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
                                                defaultValue={kUnit.name}
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
                                                defaultValue={defaultChildren.parent}
                                                onSelect={this.parentRelationAdd}
                                                onDeselect={this.parentRelationDel}
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
                                                defaultValue={defaultChildren.contain}
                                                onSelect={this.childRelationAdd}
                                                onDeselect={this.childRelationDel}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        <div id="relyNode" className="relyNode">
                                            <label>下一个课程</label>
                                            <Select
                                                mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="Please select"
                                                defaultValue={defaultChildren.isBeingRelyOnBy}
                                                onSelect={this.relyRelationAdd}
                                                onDeselect={this.relyRelationDel}
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
                                                defaultValue={defaultChildren.related}
                                                onSelect={this.relateRelationAdd}
                                                onDeselect={this.relateRelationDel}
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                        {/*<div id="brothersNode" className="brothersNode">*/}
                                            {/*<label>兄弟关系</label>*/}
                                            {/*<Select*/}
                                                {/*mode="multiple"*/}
                                                {/*style={{width: '100%'}}*/}
                                                {/*placeholder="Please select"*/}
                                                {/*defaultValue={defaultChildren.brothers}*/}
                                                {/*onSelect={this.broRelationAdd}*/}
                                                {/*onDeselect={this.broRelationDel}*/}
                                            {/*>*/}
                                                {/*{children}*/}
                                            {/*</Select>*/}
                                        {/*</div>*/}
                                        {/*<div id="parallelNode" className="parallelNode">*/}
                                            {/*<label>平行关系</label>*/}
                                            {/*<Select*/}
                                                {/*mode="multiple"*/}
                                                {/*style={{width: '100%'}}*/}
                                                {/*placeholder="Please select"*/}
                                                {/*defaultValue={defaultChildren.parallel}*/}
                                                {/*onSelect={this.paraRelationAdd}*/}
                                                {/*onDeselect={this.paraRelationDel}*/}
                                            {/*>*/}
                                                {/*{children}*/}
                                            {/*</Select>*/}
                                        {/*</div>*/}

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

