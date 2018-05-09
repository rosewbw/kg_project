import React, {Component} from 'react';
import Editor from './editor'
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import defaultImg from './defaultImg.jpg'
import './editor.css'
import 'bootstrap/dist/css/bootstrap.css';
import fetch from 'isomorphic-fetch';
import {Button, Modal, Form, Input, Radio} from 'antd';

const FormItem = Form.Item;
const history = createHistory();

class EditorControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: [],
            visible: false,
            username: '',
            currentProjectId:''
        };
        this.stateChange = this.stateChange.bind(this);
        this.onCreateHandle = this.onCreateHandle.bind(this);
        this.getProjectData = this.getProjectData.bind(this);
        this.request = this.request.bind(this);
        this.addProject = this.addProject.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    getProjectData(username, callback) {
        this.request('/getProject', {username: username}, callback);
    }

    request(url, data, callback) {
        let token = localStorage.getItem('token');
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
            if (res.status === 'success') {
                let options = res.data;
                callback(options);
            } else {
                alert("验证失败，请重新登录");
                history.push('login');
            }

        })
    }

    addProject(newProjectData, callback) {
        this.request('/addProject', {username: this.state.username, newProjectData: newProjectData}, callback);
    }

    onCreateHandle(data) {
        let _this = this;
        this.addProject(data, function (res) {
            let projectData = _this.state.projectData;
            projectData.push(res);
            _this.setState({
                projectData: projectData
            })
        });

    }

    onEditClick(e){
        const { history, match } = this.props;
        const courseid = e.target.parentNode.dataset.pid;

        this.setState({
            currentProjectId: courseid,
        });
        history.push({
            pathname: `${match.url}/edit`,
            search: `?courseid=${courseid}`,
        });
    }

    onSaveClick(e){
        const _this = this;
        _this.request('/getProject', {username: _this.state.username}, function (res) {
            const projectData = res;
            const { history, match } = this.props;

            history.push(`${match.url}`);
            _this.setState({
                projectData:projectData
            })
        });

    }

    onDeleteClick(e){
        let pid = e.target.parentNode.dataset.pid;
        let _this = this;
        _this.request('/deleteProject',{username:_this.state.username,projectId:pid},function (e) {
            let pData = e;
            _this.setState({
                projectData:pData
            })
        })
    }

    stateChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }

    componentDidMount() {
        let _this = this;
        let username = this.props.username;
        this.getProjectData(username, function (res) {
            let projectData = res;
            _this.setState({
                username: username,
                projectData: projectData
            })
        });
    }

    render() {
        const { match } = this.props;

        return (
            <div style={{width: '100%', height: '100%'}}>
                <Route path={`${match.url}/edit`} render={() => (
                    <Editor projectId={this.state.currentProjectId}
                              username={this.state.username}
                              onSaveClick={this.onSaveClick}
                    />)}
                />
                <Route exact path={`${match.url}`} render={() => (
                    <EditorInfo onEditClick={this.onEditClick}
                                stateChange={this.stateChange}
                                projectData={this.state.projectData}
                                username={this.state.username}
                                onCreateHandle={this.onCreateHandle}
                                onDeleteClick={this.onDeleteClick}
                    />)}
                />
            </div>
        )
    }
}

const EditorInfo = (props) => {
    const {projectData, onCreateHandle} = props;
    const {onEditClick, onDeleteClick, onPublishClick} = props;
    let children = [];
    if (projectData.length === 0) {
        children.push(<NoProject key={0}/>)
    } else {
        for (let index in projectData) {
            let project = projectData[index];
            children.push(
                <div className="col-2" key={index}>
                    <ProjectBox
                        pData={project}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                        onPublishClick={onPublishClick}
                    />
                </div>
            );
        }
    }
    return (
        <div>
            <section className="jumbotron text-center" style={{padding: '1rem 1rem'}}>
                <div className="container" style={{height: '100%'}}>
                    <h3 className="jumbotron-heading">课程管理</h3>
                    <CreateClass onCreateHandle={onCreateHandle}/>
                </div>
            </section>
            <div className="galleryWrapper" style={{margin: '1rem'}}>
                <div className="row justify-content-start">
                    {children}
                </div>
            </div>
        </div>
    )
};

const ProjectBox = (props) => {
    const pData = props.pData;
    let publishStatus,publishStatusClassName;
    const {onEditClick, onDeleteClick, onPublishClick} = props;
    if(pData.publishStatus === 'unPublish'){
        publishStatusClassName = 'unPublish';
        publishStatus = '未发布';
    }else{
        publishStatus = '已发布';
        publishStatusClassName = 'publish';
    }
    return (
        <div className="card mb-4 box-shadow" >
            <img className="card-img-top" src={pData.thumbnailUrl||defaultImg}
                 alt="Card image cap"/>
            <div className="card-body">
                <div className="projectName" style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis' }}>{pData.projectName}</div>
                <p className="card-text" style={{overflow:'hidden'}} title={pData.description}>{pData.description}</p>
                <div className="d-flex justify-content-between align-items-center buttonGroup">
                    <div className="btn-group" data-pid={pData._id}>
                        <button type="button" className="btn btn-sm btn-outline-secondary edit" onClick={onEditClick}>编辑</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary delete" onClick={onDeleteClick}>删除</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary publishStatus" onClick={onPublishClick}>
                            <span className={publishStatusClassName}>{publishStatus}</span>
                        </button>
                    </div>

                </div>
                <div className="text-muted"><small>创建时间：{pData.createDate}</small></div>
                <div className="text-muted"><small>更新时间：{pData.updateDate}</small></div>
            </div>
        </div>
    )
};

const NoProject = ({}) => {
    let style = {
        margin: '100px auto',
        fontSize: '32px'
    };
    return (
        <div style={style}>请创建课程</div>
    )
};

class CreateClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };

    }

    showModal = () => {
        this.setState({visible: true});
    };
    handleCancel = () => {
        this.setState({visible: false});
    };
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.onCreateHandle(values);
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
        });
    };
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>创建课程</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}


const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="Title">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'Please input the title of collection!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="description">
                            {getFieldDecorator('description')(<Input type="textarea"/>)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

export default EditorControl