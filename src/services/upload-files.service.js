import http from "../http-common";
import authHeader from './auth-header'
class UploadFilesService {
  
  upload(ownerId, ownerRole, file, onUploadProgress) {
    const user = JSON.parse(localStorage.getItem('user'));

    let formData = new FormData();

    formData.append("file", file);

    /*let metadata = {
      ownerName: "marian",
      ownerRole: "student",
      postDate: "'2021-09-28 00:45:00'"
    }*/

    //formData.append("metadata", metadata);

    return http.post("/upload?ownerId=" + ownerId + "&ownerRole=" + ownerRole, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
         "Authorization": "Bearer " + user 
      },
      onUploadProgress,
    });
  }

  getFiles() {
    const user = JSON.parse(localStorage.getItem('user'));
    return http.get("/files",{
      headers:{
        "Authorization": "Bearer " + user 
      }
    });
  }
}

export default new UploadFilesService();
