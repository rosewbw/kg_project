import React,{Component} from 'react';
import FileUpload from '../upload/fileupload'

class MediaGallery extends Component{
    render(){
        return(
            <div id="mediaGallery" className="mediaGallery">
                <FileUpload />
            </div>
        )
    }
}
export default MediaGallery;