import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone';
import LinearProgress from 'material-ui/LinearProgress';
import FilePicker from '../filePicker'
import CONFIG from '../../../../config/app.js'


class File extends React.Component {
	constructor(){
		super()
		this.state = {
			isModalOpen:false,
			file:{}
		}
	}
	componentDidMount(){
		this.fetchImageFromCB(this.props)
	}
	componentWillReceiveProps(props){
		this.fetchImageFromCB(props)
	}
	
	addFile(file){
		this.setState({file:file})
	}
	saveFile(){
		this.props.updateElementData(this.state.file,this.props.columnData.name)
		this.openCloseModal(false)
	}
	downloadFile(){
		let win = window.open(this.state.file.url, '_blank')
  		win.focus()
	}
	deleteFile(){
		this.props.updateElementData(null)
		this.setState({
			file:{}
		})
	}
	fetchImageFromCB(props){
		if(props.elementData){
			props.elementData.fetch({
			  success: function(file) {
			  	this.setState({file:file})
			     //received file Object
			  }.bind(this), error: function(err) {
			      //error in getting file Object
			  }
			});
		}
	}
	getFileIcon(file){
		if(file.type){
			let fileType = file.type.split("/")[1]
			if(fileType){
				if(['png','jpeg','jpg','gif'].indexOf(fileType) > -1){
					return <img src={ file.url } className="fileimagescr"/>
				} else if(CONFIG.iconTypes.indexOf(fileType) > -1){
					return <img src={"/app/assets/images/file/"+fileType+".png"} className="fileimagescr" />
				} else {
					return <img src={"/app/assets/images/file/file.png"} className="fileimagescr" />
				}
			} else {
				return <img src={"/app/assets/images/file/file.png"} className="fileimagescr" />
			}
		}
    }
	getPreviewIcon(file){
		if(file.type){
			let fileType = file.type.split("/")[1]
			if(fileType){
				if(['png','jpeg','jpg','gif'].indexOf(fileType) > -1){
					return <img className={file.document ? 'previewSmallImagerelation' : 'hide'} src={ file.document ?  file.document.url : ''} />
				} else if(CONFIG.iconTypes.indexOf(fileType) > -1){
					return <img src={"/app/assets/images/file/"+fileType+".png"} className={file.document ? 'previewSmallImagerelation' : 'hide'} />
				} else {
					return <img className={file.document ? 'previewSmallImagerelation' : 'hide'} src={'/app/assets/images/file/file.png'} />
				}
			} else {
				return <img className={file.document ? 'previewSmallImagerelation' : 'hide'} src={'/app/assets/images/file/file.png'} />
			}
		}
    }
	cancelFileSave(){
		this.openCloseModal(false)
	}
	openCloseModal(what){
		this.state.isModalOpen = what
		this.setState(this.state)
	}
	handleClose(){

	}
	render() {
		let dialogTitle = <div className="modaltitle">
							<span className="diadlogTitleText">File Editor</span>
							<i className='fa fa-paperclip iconmodal'></i>
						</div>
		return (
            <div className="halfreldivfile ">
            	<span className="textnamerlation"> { this.props.columnData.name } </span>
				<div style={{textAlign:'center'}}>
					{ this.getPreviewIcon(this.state.file) }
					<span className="filenamespan">{ this.state.file.name || "" }</span>
					<button className="btn-primary filepickerotherrelation" onClick={this.openCloseModal.bind(this,true)}>Edit</button>
				</div>
            	<Dialog title={ dialogTitle } modal={false} open={this.state.isModalOpen} onRequestClose={this.handleClose.bind(this)} contentClassName={"bodyClassNamelist"}>
					<div className="filemodal">
						<div className={this.state.file.document ? 'hide' : 'nofilefound'}>
							<i className="fa fa-files-o fileimage" aria-hidden="true"></i>
							<span className="noimagetext">No file found, you can choose to add a file through our File Picker.</span>
							<FilePicker chooseFile={ this.addFile.bind(this) }>
								<button className="btn-primary filepicker">File Picker</button>
							</FilePicker>
						</div>
						<div className={this.state.file.document ? 'nofilefound' : 'hide'}>
							{ this.getFileIcon(this.state.file) }
							<span className="filenamespan">{ this.state.file.name || "" }</span>
							<button className="btn-primary downloadbtn" onClick={ this.downloadFile.bind(this) }>Download</button>
							<FilePicker chooseFile={ this.addFile.bind(this) }>
								<button className="btn-primary filepickerother">File Picker</button>
							</FilePicker>
							<button className="btn-danger deletebtn" onClick={ this.deleteFile.bind(this) }>Delete</button>
						</div>
					</div>
		            <button disabled={ !!!this.state.file.document } className="btn btn-primary fr ml5 clearboth mt10" onClick={this.saveFile.bind(this)}>SAVE</button>
	          		<button className="btn btn-danger fr mt10" onClick={this.cancelFileSave.bind(this,false)}>CLOSE</button>
        		</Dialog>
            </div>
		);
	}
}

export default File;