import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import FileUpload from './filesupload';

class FileUploaderModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false
    };
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  handleStartUpload = () => {
    this.setState({
      loading: true
    });
  };

  handleFinishUpload = () => {
    this.setState({
      loading: false
    });
  };

  render() {
    const { loading } = this.state;

    return (
      <Modal
        visible={this.props.visible}
        title="上传资源"
        closable={false}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={loading}
            onClick={this.handleClose}
          >
            完成
          </Button>
        ]}
      >
        <FileUpload
          onStart={this.handleStartUpload}
          onFinish={this.handleFinishUpload}
        />
      </Modal>
    );
  }
}

export default FileUploaderModal;
