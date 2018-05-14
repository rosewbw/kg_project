import { Upload, Icon, Modal } from 'antd';
import React, { Component } from 'react';
import $ from 'jquery';


class Fileupload extends Component {
    constructor(props){
        super(props);
        this.state = {
            previewVisible: false,
            previewUrl: '',
            fileList: [],
        };
    }
    componentWillMount(){
        //获取用户媒体列表
        /*
        $.ajax({
            async:false,
            type:"get",
            url:"/getUserMediaList",
            success:function (data) {
                this.setState({fileList:data})
            }
        });
        */
        let defaultdata = [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },{
            uid: -2,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },{
            uid: -3,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }]
        this.setState({fileList:defaultdata})
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewUrl: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    render() {
        const { previewVisible, previewUrl, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className="clearfix">
                <Upload
                    action="/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 100 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewUrl} />
                </Modal>
            </div>
        );
    }

}

export default Fileupload;






