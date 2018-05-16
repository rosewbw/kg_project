import React, { Component } from 'react';
import { Row, Col, Card, Icon, Modal } from 'antd';
import { Link } from 'react-router-dom';

import { FormatParser } from '../utils';
import DEFAULT_IMAGE from "../defaultImg.jpg";
const DEFAULT_TYPE = "question-circle-o"; // 默认资源类型对应的图标
const DEFAULT_URL = "#";
const DEFAULT_TITLE = "无标题";
const DEFAULT_DESCRIPTION = "无描述";

const { Meta } = Card;

class MaterialList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleDelete(id) {
        console.log('MaterialList.handleDelete', id);
        this.props.deleteMaterial(id);
    }

    handleEdit(id) {
        console.log(id);
    }

    render() {
        const { editing } = this.state;
        const { materials } = this.props;

        return (
            <div>
                <MaterialEditModal visiable={editing}/>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                    {
                        materials.map(({ _id: id, name, description, format, url, thumbnail }) => (
                            <Col key={id} span={6} style={{ marginBottom: "15px" }}>
                                <MaterialCard
                                    id={id}
                                    name={name}
                                    description={description}
                                    format={format}
                                    url={url}
                                    thumbnail={thumbnail}
                                    onDelete={() => this.handleDelete(id)}
                                    onEdit={()=>this.handleEdit(id)}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}

const MaterialCard = ({ name: title, description, format, url, thumbnail, onDelete, onEdit }) => {
    const formatParser = new FormatParser();
    const type = formatParser.toIcon(format);

    return (
        <Card
            cover={<Link to={url || DEFAULT_URL}>
                <img src={thumbnail || DEFAULT_IMAGE} style={{"height": "150px", "width": "100%" }}/>
            </Link> }
            actions={[<div onClick={onEdit}><Icon type="edit" /></div>,
                <div onClick={onDelete}><Icon type="delete" /></div>]}
        >
            <Meta
                avatar={<Icon type={type || DEFAULT_TYPE} style={{ fontSize: 48 }} />}
                title={ <Link to={url || DEFAULT_URL}>{title || DEFAULT_TITLE}</Link>}
                description={description || DEFAULT_DESCRIPTION}
            />
        </Card>
    );
};

class MaterialEditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }
    }

    handleClose = () => {
        const { onClose } = this.props;
        onClose();
    };

    render () {
        return (
            <Modal
                visible={this.props.visible}
                title="上传资源"
                closable={false}
                okText={"保存"}
                cancelText={"取消"}
                onOK={this.handleSave}
                onCancel={this.handleClose}
            >
                <p>在此编辑资源信息</p>
            </Modal>
        )
    }
}

export default MaterialList;
