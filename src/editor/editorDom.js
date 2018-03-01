import React,{Component} from 'react'
import './editor.css'
import $ from 'jquery';
var canvas = require('./editor');

class Editor extends Component{
    constructor(props){
        super(props);
        this.state = {
            medias: [],
            preview: false
        }
        this.getUrlParam = this.getUrlParam.bind(this);
        this.sendElementInfo = this.sendElementInfo.bind(this);
        this.setNewMediaList = this.setNewMediaList.bind(this);

    }
    getUrlParam(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    sendElementInfo(type,info) {
        $.ajax({
            url: this.props.saveinfourl+'?type='+type+'&proName='+this.getUrlParam('proName'),
            type: 'POST',
            dataType: 'json',
            data: {
                elmInfo: JSON.stringify(info)
            },
            success: function(data) {
                if(data.success) {
                    console.log(type+' success!');
                } else {
                    console.log('error! '+data.errMessage);
                    alert('error! '+data.errMessage);
                }
            }.bind(this),
            error: function(xhr,status,err) {
                if(err) {
                    console.log(err);
                    alert('error! '+err);
                }
            }.bind(this)
        });
    }
    setNewMediaList(data) {
        this.setState({
            medias: data.pro.data.medias,
            preview: false
        })
    }
    componentDidMountn() {
        $.ajax({
            url: this.props.initurl+'?proName=' + this.getUrlParam('proName'),
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    medias: data.medias,
                    preview: false
                });
                canvas('#main_canvas', '#mediaList_content', {
                    'info': data.info,
                    'imgBox-class': 'imgbox',
                    'arrowBottom': 3,
                    'arrowHeight': 6,
                    'pathBottom-width': 0,
                    'pathAbove-width': 1,
                    'pathAbove-color': '#ca910a'
                }, this.sendElementInfo);
            }.bind(this),
            error: function(xhr,status,err) {
                console.log(err);
                alert(err);
            }.bind(this)
        });
        // upVideo({
        //     url: '/api/uploading?proName='+$.getUrlParam('proName')+'&type=video',
        //     inputId: 'video-uploader',
        //     containerId: 'progress-container'
        // }, this.setNewMediaList);
    }
    render(){
        return (
            <div id="story_main">
                <div id="main_canva"></div>
            </div>
        )
    }
}
export default Editor;