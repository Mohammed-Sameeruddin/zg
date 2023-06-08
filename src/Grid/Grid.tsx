import { Box, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridAddIcon,
  GridColDef,
  GridDeleteIcon,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { SharedMap } from 'fluid-framework';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircle';

interface ISharedMap {
  sharedMap: SharedMap;
}

interface IRow {
  id: number;
  lastName: String;
  firstName: String;
  age: number;
}

const rows: any[] = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const MyDataGrid = (props: ISharedMap) => {
  const myMap = props.sharedMap;

  const handleHeaders = (params: any) => {
    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <p onClick={() => handleHeaderNames(params.colDef)}>
            {params.colDef.headerName}
          </p>

          <IconButton onClick={() => deleteColumn(params.colDef)} size="small">
            <RemoveCircleOutlineOutlinedIcon color="secondary" />
          </IconButton>
        </Box>
      </>
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
      disableColumnMenu: true,
      renderHeader: handleHeaders,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
      disableColumnMenu: true,
      renderHeader: handleHeaders,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
      disableColumnMenu: true,
      renderHeader: handleHeaders,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      disableColumnMenu: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      renderHeader: handleHeaders,
    },
    {
      field: 'action',
      headerName: 'Action',
      align: 'right',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={() => deleteRow(params.id as number)}>
              <GridDeleteIcon color="warning" />
            </IconButton>
          </Box>
        );
      },
      renderHeader: handleHeaders,
    },
  ];

  const [dataRows, setDataRows] = useState<any[]>(rows ?? []);

  const [dataColumns, setDataColumns] = useState<any[]>(columns ?? []);

  const handleRowUpdate = (newRow: any, oldRow: any) => {
    const removeRow = dataRows.filter((row) => row.id !== oldRow.id);
    removeRow.splice(newRow.id - 1, 0, newRow);
    setDataRows(removeRow);
    myMap.set('rows', removeRow);
    return newRow;
  };

  const addRow = () => {
    const newRow: IRow = {
      id: dataRows.length + 1,
      lastName: '',
      firstName: '',
      age: 0,
    };
    setDataRows((prev) => [...prev, newRow]);
    const getRowMap = myMap.get('rows') ?? [];
    getRowMap.push(newRow);
    myMap.set('rows', getRowMap);
  };

  const deleteRow = (id: number) => {
    const tempRows = [];
    let myMapRows = myMap.get('rows');
    if (!myMapRows) {
      myMapRows = dataRows;
    }
    for (let i = 0; i < myMapRows.length; i++) {
      if (myMapRows[i].id != id) {
        tempRows.push(myMapRows[i]);
      }
    }
    setDataRows(tempRows);
    myMap.set('rows', tempRows);
  };

  const reArrangeColumn = (columnSet: any[]) => {
    const temp = columnSet[columnSet.length - 1];
    columnSet[columnSet.length - 1] = columnSet[columnSet.length - 2];
    columnSet[columnSet.length - 2] = temp;
    setDataColumns(columnSet);
    myMap.set('columns', columnSet);
  };

  const addColumn = () => {
    const columnName = prompt('Enter the column name');
    const dataType = prompt('Enter the data type (number or string)');
    const newColumn = {
      field: columnName!.replace(/ /g, '_'),
      headerName: columnName,
      type: dataType,
      editable: true,
      disableColumnMenu: true,
      renderHeader: handleHeaders,
    };
    const newColumnsSet = [...dataColumns, newColumn];
    reArrangeColumn(newColumnsSet);
  };

  const deleteColumn = (header: any) => {
    const headerValue = header.headerName;
    let mapColumns = myMap.get('columns');
    if (!mapColumns) {
      mapColumns = dataColumns;
    }
    const removeCol = mapColumns.filter(
      (col: any) => col.headerName != headerValue,
    );
    setDataColumns(removeCol);
    myMap.set('columns', removeCol);
  };

  const handleHeaderNames = (header: any) => {
    const headerValue = header.headerName;
    const headerType = header.type;
    const myVal = prompt('Enter new header value', headerValue) as string;
    const newType = prompt('Enter new header type', headerType);
    if (!myVal) {
      return;
    }
    let mapColumns = myMap.get('columns');
    if (!mapColumns) {
      mapColumns = dataColumns;
    }
    const editHeaderIndex = mapColumns.findIndex(
      (col: any) => col.headerName == headerValue,
    );
    const removeCol = mapColumns.filter((col: any) => {
      if (col.headerName != headerValue) {
        return true;
      }
      return false;
    });
    const newCol: any = dataColumns[editHeaderIndex];
    newCol.headerName = myVal;
    newCol.type = newType;
    newCol.renderHeader = handleHeaders;
    const temp = removeCol;
    temp.splice(editHeaderIndex, 0, newCol);
    setDataColumns(temp);
    myMap.set('columns', temp);
  };

  const updateRows = () => {
    const rowMap = myMap.get('rows');
    if (!rowMap) {
      setDataRows(rows);
    } else {
      setDataRows(rowMap);
    }
  };

  const updateColumns = () => {
    const columnMap = myMap.get('columns');
    if (!columnMap) {
      setDataColumns(columns);
    } else {
      setDataColumns(columnMap);
    }
  };

  myMap.on('valueChanged', updateRows);

  myMap.on('valueChanged', updateColumns);

  useEffect(() => {
    updateRows();
    updateColumns();
  }, []);

  return (
    <>
      <Box sx={{ height: 400, width: 'auto' }}>
        <h3>Collaborative DataGrid</h3>
        <DataGrid
          rows={dataRows ?? []}
          columns={dataColumns ?? []}
          disableRowSelectionOnClick
          hideFooter={true}
          autoHeight
          processRowUpdate={handleRowUpdate}
          onProcessRowUpdateError={(err) => {
            throw err;
          }}
        />
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
          }}
        >
          <Button variant="text" startIcon={<GridAddIcon />} onClick={addRow}>
            Add Row
          </Button>
          <Button
            variant="text"
            startIcon={<GridAddIcon />}
            onClick={addColumn}
          >
            Add Column
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default MyDataGrid;
