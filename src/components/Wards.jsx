import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Toolbar, Selection,Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { wardsData, contextMenuItems, wardsGrid } from '../data/dummy';
import { AddWard, Header } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Wards = () => {
  const [wards, setWards] = useState([]);
  const {user}=useStateContext();
  const[selectedWardId,setSelectedWardId]=useState([]);
  const navigate= useNavigate();
  const toolbarOptions =user && user.role==="admin"? ['Delete']:[];
  const selectionsettings = { persistSelection: true };
  useEffect(() => {
    // Make a GET request to your Flask API
    const fetchData= async()=>{
      try{
        const {data}=await axios.get("/api/wards/getWards");
        setWards(data);
        console.log(wards)
      }
     catch(err){
      console.log('error in fetching')
     }
    }
    if(user){
      fetchData();
    }
   else{
    navigate('/login')
   }
  }, [user,navigate]);
  const editing = { allowDeleting: true, allowEditing: true };
  const [showComponent, setShowComponent] = useState(false);
  const handleRowSelected = (args) => {
    const selectedRow = args.data;
    console.log(selectedRow)
    setSelectedWardId([...selectedWardId,selectedRow._id]); 
  };
  const handleClick = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent); // Toggle the value
  };

    const handleToolbarClick = async () => {
      
      
      if (selectedWardId.length === 0) {
        // No wards selected for deletion, return early
        return;
      }
    
      try {
        await axios.delete(`/api/wards/deleteWards/?ids=${selectedWardId.join(',')}`);
        console.log('Delete request sent successfully');
      } catch (error) {
        console.error('Error while deleting:', error);
      }
    
      navigate('/wards');
    };
    
    
 
  return (
    <div className='relative'>
      <div className='md:pl-20 pl-7 text-3xl font-semibold z-0'>Wards</div>
      <div className='absolute z-20 container mx-auto flex-col justify-center items-center pl-2'>
      {user && user.role==="admin"?
        <button onClick={handleClick} className='bg-blue-900 hover:bg-blue-800 rounded-md p-1 md:ml-20 ml-6 text-white'>Add wards</button>
        :
        <></>} 
      {showComponent && <AddWard />} </div>
        <div className="relative m-2 md:m-10 mt-10 p-2 md:p-10 bg-white rounded-md z-10">
        <GridComponent
  id="gridcomp"
  dataSource={wards}
  enableHover={false}
  allowPaging
  pageSettings={{ pageCount: 5 }}
  toolbar={toolbarOptions}
  toolbarClick={handleToolbarClick}
  editSettings={editing}
  selectionSettings={{
    persistSelection: true,
    checkboxOnly: true,
    mode: 'Row',
    enableSimpleMultiRowSelection: false,
  }}
  
  rowSelected={handleRowSelected}
  
>
  <ColumnsDirective>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    {wardsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
  </ColumnsDirective>
  <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
</GridComponent>

    </div>
    </div>
    
  );
};
export default Wards;
