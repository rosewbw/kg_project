import React,{Component} from 'react';

import FileUpload from '../fileupload/fileupload'

class MediaGallery extends Component{
    render(){
        return(
            <div id="media-gallery">
                <h1>文件上传</h1>
                <FileUpload/>
            </div>

        )
    }
}
export default MediaGallery;