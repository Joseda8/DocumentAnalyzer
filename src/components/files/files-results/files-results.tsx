import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import { GridColDef, GridValueGetterParams } from "@material-ui/data-grid";
import DataTable from "../../../helpers/table";
import GenericModal from "../../../helpers/generic-modal";
import files from "../../../data/files";
import { Typography } from '@material-ui/core';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { 
    field: 'title', 
    headerName: 'Filename', 
    width: 500,
    headerAlign: 'left',
    align: "left",
    renderCell: (params: GridValueGetterParams) => {
      const title: string = `${params.getValue("title")}`;
      const url: string = `${params.getValue("url")}`;

      return <a href={url}>{title}</a>
    }
  },

  {
    field: 'status',
    headerName: 'Status',
    description: 'This column is not sortable.',
    sortable: false,
    width: 400,
    headerAlign: 'left',
    align: "left",
    //type: 'number',

    renderCell: (params: GridValueGetterParams) => {
        const status: boolean = !!params.getValue("status")!;
        const documents: any = params.getValue("userDocumentReferences")!;

        const items: JSX.Element[] = [];
        for(const file of documents){
          items.push(<div key={file.name}><Typography>{file.name}: {file.qty}</Typography></div>);
        }

        if(status){
          if(documents.length === 0){
            return <Button style={{ backgroundColor: "#379683", color: "white", textTransform: 'capitalize' }} variant="contained" disabled>No matches</Button>
          }
          return <GenericModal>{items}</GenericModal>;
        }
        return <Button style={{ backgroundColor: "#5D5C61", color: "white", textTransform: 'capitalize' }} variant="contained" disabled>Not processed</Button>
    }
  }
];

// const define_rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', height: 88, age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', height: 88, age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', height: 88, age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', height: 88, age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', height: 88, age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, height: 88, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', height: 88, age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', height: 88, age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', height: 88, age: 65 },
// ];

export default (() => {

    const [data, setData] = useState([{id: 0, title: "No files", status: false, url: "google.com", userDocumentReferences: [{}], owner: ""}]);

    useEffect(() => {
      setData(files);
    }, [])

    function onClick() {
        const new_rows: any = [];
        data.forEach(val => new_rows.push(Object.assign({}, val)));
        new_rows[0].title = "Desde cierto punto de vista";
        new_rows.push({id: 0, title: "No files", status: false, url: "google.com", userDocumentReferences: [{}], owner: ""});
        setData(new_rows);
    }

    return (
        <>
          <button onClick={onClick}>Test Change</button>
          <h2>Results files</h2>
          <DataTable  rows={data} columns={columns} pageSize={5} height={400}/>
        </>
    );
  }) as React.SFC;


// const this_json = {
//     columns: [{field: "product", headerName: "Product", width: 110}, {field: "qty", headerName: "Quantity", width: 110}],
//     rows: [{id: "0", product: "Papas", qty: 500}, {id: "1", product: "Tomate", qty: 100}]
// };
