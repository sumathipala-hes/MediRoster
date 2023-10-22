import React,{useState,useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import axios from 'axios'
import { consultantsGrid } from '../data/dummy';
import { AddConsultant, Header } from '.';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../contexts/ContextProvider"; 
  const Consultants = () => {
    const [consultants, setConsultants] = useState([]);
    const [selectedConsultantId, setSelectedConsultantId] = useState([])
  const {user} = useStateContext();
  const [showComponent, setShowComponent] = useState(false);
  const navigate= useNavigate();
  
  useEffect(() => {
   
    const fetchData= async()=>{
      try{
        const {data}=await axios.get("/api/user/getConsultants");
        setConsultants(data);
        console.log(consultants)
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




  //const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const handleToolbarClick=()=>{
   
    console.log('first')
   
      
      const handleDelete=async()=>{
        await axios.delete(`/api/user/deleteUser/?ids=${selectedConsultantId.join(',')}`)
        .then((data)=>{
          console.log(data);
        
        }).catch(()=>{
          console.log('Error happening')
        })
        
      }
      handleDelete();
      navigate('/consultant')
    
  };
  const handleRowSelected = (args) => {
    const selectedRow = args.data;
    console.log(selectedRow)
    setSelectedConsultantId([...selectedConsultantId,selectedRow._id]); // Assuming the doctor's ID is stored in a property named 'id'
  };
  const handleClick = () => {
    
      setShowComponent((prevShowComponent) => !prevShowComponent);} // Toggle the value

  return (
    <div className='relative'>
    <div className='md:pl-20 pl-7 text-3xl font-semibold z-0'>Doctors</div>
      <div className='absolute z-20 container mx-auto flex-col justify-center items-center pl-2'>
      <button onClick={handleClick} className='bg-blue-900 hover:bg-blue-800 rounded-md p-1 md:ml-20 ml-6 text-white'>Add Doctors</button>
      {showComponent && <AddConsultant  />} </div>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl z-0">
    <GridComponent
      dataSource={consultants}
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
      allowSorting
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {consultantsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        
      </ColumnsDirective>
      <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
    </GridComponent>
  </div></div>

    
  );
};

export default Consultants;
