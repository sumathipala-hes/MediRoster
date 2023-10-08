import React, { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { wardsData, contextMenuItems, wardsGrid } from '../data/dummy';
import { AddWard, Header } from '../components';

const Wards = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent); // Toggle the value
  };
  return (
    <div className='relative'>
      <div className='md:pl-20 pl-7 text-3xl font-semibold z-0'>Wards</div>
      <div className='absolute z-20 container mx-auto flex-col justify-center items-center pl-2'>
      
      <button onClick={handleClick} className='bg-blue-900 hover:bg-blue-800 rounded-md p-1 md:ml-20 ml-6 text-white'>Add wards</button>
      {showComponent && <AddWard />} </div>
        <div className="relative m-2 md:m-10 mt-10 p-2 md:p-10 bg-white rounded-md z-10">
      <GridComponent
        id="gridcomp"
        dataSource={wardsData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {wardsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
    </div>
    
  );
};
export default Wards;
