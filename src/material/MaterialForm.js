import React, { Component } from 'react';
import { request } from '../utils';

import {Form, Input, Icon, Select, Button, Upload, message} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const INIT_FORM_VALUES = {
    materialName: '',
    materialType: '视频',
    description: '',
    keyword: '',
    language: '中文',
}; // 默认初始化的值，会被传入的 props.initValues 覆盖

/**
 * @props {function} onStart - 表单上传前执行的函数
 * @props {function} onFinish - 传输完成后执行的函数（无论成功与否均会执行），返回 { success: true/false, data }
 * @props {string} materialId - 修改资源时的资源 ID
 * @props {object} initValues - 初始化表单项
 * @props {function} onCancel - 点击取消按钮时的事件
 */
class MaterialForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            inputValue:''
        };

    }

    resetForm = newValues => {
        this.setState({
            fileList: [],
            uploading: false
        });
    };

    resetBtnStatus = () => {
        this.setState({
            uploading: false
        });
    };

    handleStartUpload = res => {
        this.props.onStart && this.props.onStart(res);
    };

    handleFinishUpload = res => {
        this.props.onFinish && this.props.onFinish(res);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleStartUpload();

        // 往表单中存入文件上传信息
        const { fileList } = this.state;
        let formData = new FormData();
        fileList.forEach(file => formData.append('upfile', file));
        this.setState({
            uploading: true,
        });

        // 校验表单信息
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) { return message.error(err.toString()); }

            for(let index in values){
                formData.append(index, values[index]);
            }

            const onSuccess = data => {
                this.resetForm(data);
                this.handleFinishUpload({ success: true, data });
            };

            const onError = err => {
                this.resetBtnStatus();
                message.error(err.toString());
                this.handleFinishUpload({ success: false, data: err });
            };

            /* 根据是否传入 materialId 判断是更新资源还是上传资源 */
            const { materialId } = this.props;
            let job;
            if (materialId) {
                job = request.put('/updateMaterial' + '?materialId=' + materialId, {
                    body: formData
                })
            }
            else {
                job = request.post('/upload', {
                    body: formData
                })
            }

            job.then(onSuccess)
                .catch(onError);
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
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
        const controlBtnLayout = {
            wrapperCol: {
                span: 19,
                offset: 5,
            },
        };

        this.initValues = Object.assign(INIT_FORM_VALUES, this.props.initValues);
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

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="资源名称"
                >
                    {getFieldDecorator('materialName', {
                        rules: [{
                            type: 'string', message: '请输入资源的名称',
                        }, {
                            required: true, message: '请输入资源的名称',
                        }],
                        initialValue: this.initValues.materialName,
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
                            type: 'string', message: '请输入资源的类别',
                        }, {
                            required: true, message: '请输入资源的类别' +
                            '',
                        }],
                        initialValue: this.initValues.materialType,
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
                        initialValue: this.initValues.description,
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
                        initialValue: this.initValues.keyword,
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
                        initialValue: this.initValues.language,
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
                <FormItem {...controlBtnLayout}>
                    <Button type="primary"
                            htmlType="submit"
                            className="uploadStart"
                            disabled={uploading}
                            loading={uploading}
                    >
                        {uploading ? '上传中' : '保存'}
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        disabled={uploading}
                        onClick={this.props.onCancel}
                    >
                        取消
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedMaterialForm = Form.create()(MaterialForm); // 增加表单校验
export default WrappedMaterialForm;


