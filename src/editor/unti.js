import React, {Component} from 'react';

class Unit extends Component {
    render(){
        let styles = {
            'position': 'absolute',
            'margin': '0'
        };
        let size = 1;
        return (
            <div id={this.props.childId} className="canvas-api-imgbox" style = {styles}>
                <imput type="text"
                       value={'Node'+ this.props.nodeNum}
                       className="canvas-api-img-title no-border-input"
                       style={{
                           'width':size
                       }}
                />
            </div>
        )
    }
}

export default Unit;