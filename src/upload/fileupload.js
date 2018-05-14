import React from 'react';
import './fileupload.css';
import {Upload, Button, Icon, message} from 'antd';
import fetch from 'isomorphic-fetch';
import Uploadform from './uploadform'


class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, {
                uid: -2,
                name: 'yyy.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
            uploading: false
        };
    }


    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });


        fetch('/upload', {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization":token
            },
            body: formData
        }).then(res => {
            this.setState({
                fileList: [],
                uploading: false
            });
            alert('文件上传成功');
            console.log(this.state.fileList)
        })
    }

    render() {
        const {uploading} = this.state;
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
            // defaultFileList: [...fileList],
            fileList: this.state.fileList,
            // multiple: true,
            // listType: 'picture',
            // defaultFileList: [...fileList],
            listType: 'picture',

            className: 'upload-list-inline',
        };
        return (
            <div style={{width:'50%'}}>
                <Uploadform/>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload"/> Select File
                    </Button>
                </Upload>
                <Button
                    className="upload-demo-start"
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={this.state.fileList.length === 0}
                    loading={uploading}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        )
    }
}




const fileList = [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

export default FileUpload