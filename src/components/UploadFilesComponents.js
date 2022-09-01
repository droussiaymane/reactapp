import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import Message from './Message';
import authService from "../services/auth.service";
class UploadFilesComponents extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      error:false,
      success:false,
      fileInfos: [],
    };

   // const location = useLocation();
   
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload=()=> {
    let currentFile = this.state.selectedFiles[0];
    let ownerId=authService.getCurrentUserId();
    let ownerRole=authService.getCurrentRole();
   
    
    //currentFile = {...currentFile, ownerName: "marius", ownerRole: "teacher", postDate: "2021-09-28 00:45:00"}

    console.log(currentFile)

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(ownerId, ownerRole, currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
          success:true
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          error:true,
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      error,
      success,
      fileInfos,
    } = this.state;

  return (<>
  {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
    <div class="flex justify-center  uploadTop">
      
    <div class="mb-3 w-96 ">
      <label for="formFile" class="form-label inline-block mb-2 text-gray-700 ">Import your file</label>
      <input type="file" onChange={this.selectFile} class="form-control 
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="formFile"/>
    </div>
    <div className='uploadclass'>
    <button  
          disabled={!selectedFiles}
          onClick={this.upload} type="button" class="inline-block px-6 pt-2.5 pb-2 bg-green-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download"
        class="w-3 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor"
          d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z">
        </path>
      </svg>
      Upolad
    </button>

  </div>
  
  </div>
  {error && (<Message color="red"/>) }
  
        
  <div class="flex space-x-2 justify-center">
 
</div>



<div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-center">
          <thead class="border-b bg-gray-800">
            <tr>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              Owner Name
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              Owner Role
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              Post Date
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              File
              </th>
            </tr>
            </thead>
          <tbody>
          {fileInfos &&
              fileInfos.map((file, index) => (
            <tr class="bg-white border-b">
              <td scope="row" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {file.ownerName}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {file.ownerRole}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {file.postDate}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {file.name}
              </td>
            </tr>
        
        ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  </>
  )
}}

export default UploadFilesComponents;