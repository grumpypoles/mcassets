const EquipmentHeader = ( {type, eqData} ) => {
    
    
    const arg1 = eqData[0].selcode
    const arg2 = eqData[0].year
    const arg3 = eqData[0].model
    const arg4 = eqData[0].make
    let arg5 

    if (type === 'Mast' || type === 'Boom') {
        arg5 = eqData[0].length;
    } else if (type === 'Sundry') {
        arg5 = eqData[0].type;
    } else {
        arg5 = eqData[0].size;
    }
    
    return (  
        <div className="w-full px-5 py-3 text-2xl font-bold rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400">

        <h1>{type}: {arg1} {arg2} {type !== 'Sundry' &&  arg3} {arg4} {arg5}</h1>
        </div>
    );
}
 
export default EquipmentHeader;