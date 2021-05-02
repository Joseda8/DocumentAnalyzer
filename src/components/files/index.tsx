import * as React from 'react';
import NavBar from "../../helpers/nav-bar";
import UploadFiles from "../files/upload-files/upload-files";
import FilesResults from "./files-results/files-results";

export default class Files extends React.Component<any, any> {
  render() {
    return (
      <>
        <NavBar 
          nav0={<UploadFiles/>}
          nav1={<FilesResults/>}
          nav2={<h1>GENERAL</h1>}
        >
        </NavBar>
      </>
      );
  }
}