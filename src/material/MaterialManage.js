import React, { Component } from 'react';
import { Layout, Button, Modal } from 'antd';

import {FileUploaderModal} from '../upload';
import MaterialList from './MaterialList';
import { request } from '../utils';

const { Header, Content } = Layout;

class MaterialManage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            materials: []
        };

        this.deleteMaterial = this.deleteMaterial.bind(this);
    }

    componentDidMount() {
        request.get('/materials')
            .then(materials => {
                console.log(materials);
                this.setState({materials});
            });
    }

    deleteMaterial(materialId) {
        const originMaterials = this.state.materials;
        let materials = originMaterials.filter(({id}) => id !== materialId);
        this.setState({ materials });

        // 发送到后端
    }

    render(){
        let { materials } = this.state;

        return(
            <Layout>
                <Header style={{ backgroundColor: 'white' }}>
                    <MaterialUploader />
                </Header>
                <Content style={{ padding: '16px'}}>
                    <MaterialList materials={materials}
                                  deleteMaterial={this.deleteMaterial}/>
                </Content>
            </Layout>

        )
    }
}

class MaterialUploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        }
    }

    showModal = () => {
        this.setState({
            showModal: true,
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    render() {
        return (
            <div>
                <Button
                    type={'primary'}
                    size={'large'}
                    onClick={this.showModal}
                >
                    上传资源
                </Button>
                <FileUploaderModal
                    visible={this.state.showModal}
                    onClose={this.closeModal}
                />
            </div>
        )
    }

}

export default MaterialManage;