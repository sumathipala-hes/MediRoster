import React,{useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { doctorsData, doctorsGrid } from '../data/dummy';
import { AddDoctor, Header } from '../components';

const Doctors = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
      setShowComponent((prevShowComponent) => !prevShowComponent);} // Toggle the value

  return (
    <div className='relative'>
    <div className='md:pl-20 pl-7 text-3xl font-semibold z-0'>Doctors</div>
      <div className='absolute z-20 container mx-auto flex-col justify-center items-center pl-2'>
      <button onClick={handleClick} className='bg-blue-900 hover:bg-blue-800 rounded-md p-1 md:ml-20 ml-6 text-white'>Add Doctors</button>
      {showComponent && <AddDoctor />} </div>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl z-0">
    <GridComponent
      dataSource={doctorsData}
      enableHover={false}
      allowPaging
      pageSettings={{ pageCount: 5 }}
      selectionSettings={selectionsettings}
      toolbar={toolbarOptions}
      editSettings={editing}
      allowSorting
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {doctorsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective>
      <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
    </GridComponent>
  </div></div>

    
  );
};

export default Doctors;
