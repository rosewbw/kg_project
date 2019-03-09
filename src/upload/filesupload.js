import React, { Component } from 'react';
import $ from 'jquery';

import { Form, Input, Icon, Select, Button } from 'antd';
import { Upload, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      inputValue: ''
    };
  }

  getToken = () => localStorage.getItem('token');

  handleStartUpload = () => {
    this.props.onStart();
  };

  handleFinishUpload = res => {
    res.status === 'error'
      ? message.error(res.message)
      : message.success('上传成功！');

    this.props.onFinish();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleStartUpload();

    //文件上传
    const { fileList } = this.state;
    let formData = new FormData();
    fileList.forEach(file => {
      formData.append('upfile', file);
    });
    this.setState({
      uploading: true
    });

    //校验表单信息
    this.props.form.validateFieldsAndScroll((err, values) => {
      const token = this.getToken();

      for (let index in values) {
        formData.append(index, values[index]);
      }

      if (!err) {
        $.ajax({
          url: '/upload',
          data: formData,
          type: 'POST',
          headers: {
            Authorization: token
          },
          contentType: false,
          processData: false,
          cache: false,
          success: res => {
            this.setState({
              fileList: [],
              uploading: false
            });
            this.props.form.setFieldsValue({
              materialName: '',
              description: '',
              keyword: '',
              language: '',
              materialType: ''
            });

            this.handleFinishUpload(res);
          },
          error: res => {
            this.handleFinishUpload(res);
          }
        });
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { uploading } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const props = {
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file]
        }));
        return false;
      },
      fileList: this.state.fileList,
      listType: 'picture',
      className: 'upload-list-inline'
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="资源名称">
          {getFieldDecorator('materialName', {
            rules: [
              {
                type: 'string',
                message: '请输入上传的素材的名称'
              },
              {
                required: true,
                message: '请输入上传的素材的名称'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="资源类别">
          {getFieldDecorator('materialType', {
            rules: [
              {
                type: 'string',
                message: '请输入上传的素材的类别'
              },
              {
                required: true,
                message: '请输入上传的素材的类别'
              }
            ]
          })(
            <Select onChange={this.handleSelectChange}>
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
        <FormItem {...formItemLayout} label="资源描述">
          {getFieldDecorator('description', {
            rules: [
              {
                type: 'string',
                message: '请输入资源的描述信息'
              },
              {
                required: true,
                message: '请输入资源的描述信息'
              }
            ]
          })(<Input type="string" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="资源关键字">
          {getFieldDecorator('keyword', {
            rules: [
              {
                type: 'string',
                message: '请输入资源的关键字'
              },
              {
                required: true,
                message: '请输入资源的关键字'
              }
            ]
          })(<Input type="string" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="资源语种">
          {getFieldDecorator('language', {
            rules: [
              {
                type: 'string',
                message: '请输入资源的语种'
              },
              {
                required: true,
                message: '请输入资源的语种'
              }
            ]
          })(<Input type="string" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="上传文件">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 选择文件
            </Button>
          </Upload>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="uploadStart"
            disabled={this.state.fileList.length === 0}
            loading={uploading}
          >
            {uploading ? '等待上传' : '开始上传'}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(FileUpload);
export default WrappedRegistrationForm;
