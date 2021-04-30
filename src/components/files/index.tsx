import * as React from 'react';
import NavBar from "../../helpers/nav-bar";

export default class Files extends React.Component<any, any> {
  render() {
    return (
      <>
        <NavBar 
            nav0={<h1>HELLO</h1>}
            nav1={<h1>THERE</h1>}
            nav2={<h1>GENERAL</h1>}
        >
        </NavBar>
      </>
      );
  }
}