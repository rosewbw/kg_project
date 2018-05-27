import React, { Component } from 'react';
import { VizulyWeightedTree } from '../utils/Vizuly';

import './index.css'

class CourseContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course:null
        };

        this.courseToData = this.courseToData.bind(this);
    }

    courseToData(course) {
        if(!course||!course.data){
            return null
        }
        let rootNode;
        let result
        const createTree = (root) => {
            root.children = [];
            if (!root.hasChildNode || root.hasChildNode.length === 0) return;
            root.hasChildNode.forEach(id => root.children.push(course.data.filter(node => node._id === id)[0]));
            root.children.forEach(item => createTree(item));
            return root;
        };

        course.data.forEach(item => {
            item.value = 0.8;
            if(item.root === true){
                rootNode = item
            }
        });
        //course.data[0].value = 100;
        let data = createTree(rootNode);
        return data;
    }


    getData = (data,callback) => {
            this.setState({
                course:data
            },()=>{
                this.props.updateCurrentLesson(this.props.projectId)
                callback()
            })
    };

    render() {

        return <VizulyWeightedTree
            projectId={this.props.projectId}
            data={this.courseToData(this.state.course)}
            originData={this.state.course &&this.state.course.data}
            onInit={this.getData}/>;
    }
}

const NoCurrentLesson = () => {
    return (
        <div className='noCurrentLesson'>
            暂无课程
        </div>
    );
}

export {
    NoCurrentLesson,
    CourseContent
}
export default CourseContent;