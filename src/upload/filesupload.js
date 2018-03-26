import React, {Component} from 'react';
import $ from 'jquery';
import fetch from 'isomorphic-fetch';

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import {Upload, message} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

let uuid = 0;


class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            inputValue:''
        }
    }

    handleSelectChange = (value) => {
        // const { form } = this.props;
        // // can use data-binding to get
        // const keys = value;//form.getFieldValue('keys');
        // // can use data-binding to set
        // // important! notify form to detect changes
        // form.setFieldsValue({
        //     keys: keys,
        // });
    };



    handleSubmit = (e) => {
        e.preventDefault();
        //文件上传
        const {fileList} = this.state;
        let formData = new FormData();
        fileList.forEach((file) => {
            formData.append('upfile', file);
        });
        this.setState({
            uploading: true,
        });

        //校验表单信息
        this.props.form.validateFieldsAndScroll((err, values) => {
            for(let index in values){
                formData.append(index, values[index]);
            }


            console.log(values);
            if (!err) {
                $.ajax({
                    url: '/upload',
                    data: formData,
                    type:"POST",
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: (res) => {
                        this.setState({
                            fileList: [],
                            uploading: false
                        });
                        alert('文件上传成功');
                        this.props.form.setFieldsValue({
                            materialName: '',
                            description:'',
                            keyword:'',
                            language:'',
                            materialType:''
                        });
                    },
                    error: function (res) {
                        console.log(JSON.stringify(res));
                    }
                })
                // fetch('/upload', {
                //     method: 'POST',
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     },
                //     body: formData
                // }).then(res => {
                //     this.setState({
                //         fileList: [],
                //         uploading: false
                //     });
                //     alert('文件上传成功');
                //     console.log(this.state.fileList)
                // })
            }
        });
    };

    componentWillMount() {
        // $.ajax({
        //     url: '/getTeacherKnowledge',
        //     method: "POST",
        //     data: teacherInfo,
        //     success: (res) => {
        //         this.setState({
        //         })
        //     },
        //     error: () => {
        //     }
        // })
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {autoCompleteResult} = this.state;
        const {uploading} = this.state;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const props = {
            onRemove: (file) => {
                this.setState(({fileList}) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({fileList}) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
            listType: 'picture',
            className: 'upload-list-inline',
        };

        // getFieldDecorator('keys', { initialValue: [] });
        // const keys = getFieldValue('keys');
        // console.log(keys);
        // const formItems = (keys) => {
        //     return (
        //         <FormItem
        //             {...formItemLayout}
        //             label={index === 0 ? 'Passengers' : ''}
        //             required={false}
        //         >
        //             {getFieldDecorator(`names[${k}]`, {
        //                 validateTrigger: ['onChange', 'onBlur'],
        //                 rules: [{
        //                     required: true,
        //                     whitespace: true,
        //                     message: "Please input passenger's name or delete this field.",
        //                 }],
        //             })(
        //                 <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
        //             )}
        //         </FormItem>
        //     );
        // };
        return (
            <Form onSubmit={this.handleSubmit}
                  style={{width: '20%', textAlign: 'center', height: '100%', margin: '2%'}}>
                <h1>资源上传</h1>
                <FormItem
                    {...formItemLayout}
                    label="资源名称"
                >
                    {getFieldDecorator('materialName', {
                        rules: [{
                            type: 'string', message: '请输入上传的素材的名称',
                        }, {
                            required: true, message: '请输入上传的素材的名称',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="资源类别"
                >
                    {getFieldDecorator('materialType', {
                        rules: [{
                            type: 'string', message: '请输入上传的素材的类别',
                        }, {
                            required: true, message: '请输入上传的素材的类别' +
                            '',
                        }],
                    })(
                        <Select
                            onChange={this.handleSelectChange}
                        >
                            <Option value="动画">动画</Option>
                            <Option value="图片">图片</Option>
                            <Option value="文本">文本</Option>
                            <Option value="视频">视频</Option>
                            <Option value="试题">试题</Option>
                            <Option value="课件">课件</Option>
                            <Option value="音频">音频</Option>
                        </Select>
                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="资源描述"
                >
                    {getFieldDecorator('description', {
                        rules: [{
                            type: 'string', message: '请输入资源的描述信息',
                        }, {
                            required: true, message: '请输入资源的描述信息',
                        }],
                    })(
                        <Input type="string"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="资源关键字"
                >
                    {getFieldDecorator('keyword', {
                        rules: [{
                            type: 'string', message: '请输入资源的关键字',
                        }, {
                            required: true, message: '请输入资源的关键字',
                        }],
                    })(
                        <Input type="string"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="资源语种"
                >
                    {getFieldDecorator('language', {
                        rules: [{
                            type: 'string', message: '请输入资源的语种',
                        }, {
                            required: true, message: '请输入资源的语种',
                        }],
                    })(
                        <Input type="string"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="上传文件"
                >
                    <Upload {...props} >
                        <Button>
                            <Icon type="upload"/> 选择文件
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary"
                            htmlType="submit"
                            className="uploadStart"
                            onClick={this.handleUpload}
                            disabled={this.state.fileList.length === 0}
                            loading={uploading}
                    >
                        {uploading ? '等待上传' : '开始上传'}
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedRegistrationForm = Form.create()(FileUpload);
const teacherInfo = {};
export default WrappedRegistrationForm


