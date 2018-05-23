import React, {Component} from 'react';
import './fileupload.css';
import $ from 'jquery';

import {Form, Input, Select, Button} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            knowledge: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values)
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    componentWillMount() {
        $.ajax({
            url: '/getTeacherKnowledge',
            method: "POST",
            data: teacherInfo,
            success: (res) => {
                this.setState({
                    knowledge: res
                })
            },
            error: () => {
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        console.log(this.props.form);
        const {autoCompleteResult} = this.state;

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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );


        return (
            <Form onSubmit={this.handleSubmit} style={{width: '50%'}}>
                <FormItem
                    {...formItemLayout}
                    label="资源名称"
                >
                    {getFieldDecorator('materialName', {
                        rules: [{
                            type: 'materialName', message: '请输入上传的素材的名称',
                        }, {
                            required: true, message: '请输入上传的素材的名称',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="资源描述"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入资源的描述信息',
                        }, {
                            required: true, message: '请输入资源的描述信息',
                        }],
                    })(
                        <Input type="description"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="资源关键字"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入资源的关键字',
                        }, {
                            required: true, message: '请输入资源的关键字',
                        }],
                    })(
                        <Input type="description"/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">上传</Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedRegistrationForm = Form.create()(UploadForm);
const teacherInfo = {};
export default WrappedRegistrationForm


