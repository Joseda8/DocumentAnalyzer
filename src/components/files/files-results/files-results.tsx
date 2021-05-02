import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { GridColDef, GridApi, GridValueGetterParams } from "@material-ui/data-grid";
import DataTable from "../../../helpers/table";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
  {
    field: 'height',
    headerName: 'Height',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    type: 'number',

    renderCell: (params: GridValueGetterParams) => {
        const onClick = () => {
            const api: GridApi = params.api;

            const fields = api.getAllColumns().map((c) => c.field).filter((c) => c !== "__check__" && !!c);
            
            const thisRow: {[index: string]:any} = {}

            fields.forEach((f: any) => {
                thisRow[f] = params.getValue(f);
            });


            return alert(JSON.stringify(thisRow, null, 4));
        };

        return <Button onClick={onClick}>Click</Button>;
    }
  }
];

const define_rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', height: 88, age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', height: 88, age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', height: 88, age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', height: 88, age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', height: 88, age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, height: 88, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', height: 88, age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', height: 88, age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', height: 88, age: 65 },
];

export default (() => {

    const [data, setData] = useState(define_rows);

    function onClick() {
        const new_rows: any = [];
        data.forEach(val => new_rows.push(Object.assign({}, val)));
        new_rows[0].firstName = "Joseda8";
        new_rows.push({ id: 10, lastName: 'Cobain', firstName: 'Kurt', height: 100, age: 27 });
        setData(new_rows);
    }
    

    return (
        <>
            <h2>Results files</h2>
            <Button onClick={onClick}>Click</Button>
            <DataTable  rows={data} columns={columns} pageSize={5} height={500}/>
        </>
    );
  }) as React.SFC;


// const this_json = {
//     columns: [{field: "product", headerName: "Product", width: 110}, {field: "qty", headerName: "Quantity", width: 110}],
//     rows: [{id: "0", product: "Papas", qty: 500}, {id: "1", product: "Tomate", qty: 100}]
// };
