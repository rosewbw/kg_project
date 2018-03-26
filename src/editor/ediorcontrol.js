import React, {Component} from 'react';
import Editor from './editor'



class EditorControl extends Component{
    constructor(props){
        super(props);
        this.state={
            hasCreate:false,
            projectName:''
        };
        this.getEditorComponent = this.getEditorComponent.bind(this);
        this.stateChange = this.stateChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    getEditorComponent(){
        if(!this.state.hasCreate){
            return <EditorInfo onButtonClick={this.onButtonClick} stateChange={this.stateChange}/>
        }else{
            return <Editor projectName={this.state.projectName}/>
        }
    }
    onButtonClick(e){
        this.setState({
            hasCreate:true
        })
    }
    stateChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }

    render(){
        return (
            <div style={{width:'100%',height:'100%'}}>
                {this.getEditorComponent()}
            </div>
        )
    }
}

const EditorInfo = (props) => {
    const {onButtonClick,stateChange} = props;
    return(
        <div onChange={(e) => stateChange(e)} style={{width:'100%',height:'100%'}}>
            <input name="projectName" className="projectName" placeholder="请输入课程名称"/>
            <button onClick={(e)=> onButtonClick(e) } >创建课程</button>
        </div>
    )
};

export default EditorControl