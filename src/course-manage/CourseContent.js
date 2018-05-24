import React, { Component } from 'react';
import { VizulyWeightedTree } from '../utils/Vizuly';

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
        const createTree = (root) => {
            console.log(root)
            if (!root.hasChildNode || root.hasChildNode.length === 0) return;
            root.children = [];
            root.hasChildNode.forEach(id => root.children.push(course.data.filter(node => node._id === id)[0]));
            root.children.forEach(item => createTree(item));
            return root;
        };

        course.data.forEach(item => item.value = 0.5);
        //course.data[0].value = 100;
        let data = createTree(course.data[0]);
        console.log('data is ', data);

        return data;
    }


    getData = (data,callback) => {
            this.setState({
                course:data
            },()=>{
                callback()
            })
    };

    render() {

        return <VizulyWeightedTree data={this.courseToData(this.state.course)} odata={this.state.course &&this.state.course.data} onInit={this.getData}/>;
    }
}

export default CourseContent;