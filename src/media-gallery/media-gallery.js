import React,{Component} from 'react';
// import FileUpload from '../upload/fileupload'
import FileUpload from '../upload/filesupload'

class MediaGallery extends Component{
    render(){
        return(
            <div id="mediaGallery" className="mediaGallery" style={{height:'100%'}}>
                <FileUpload style={{width:'50%'}}/>
            </div>
        )
    }
}
export default MediaGallery;