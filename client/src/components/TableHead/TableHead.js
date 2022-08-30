import React from 'react';
import {useSelector} from "react-redux";

const TableHead = () => {

    const {finances} = useSelector(state => state.financesPage)
    const itemsHead = Object.keys(finances[0])
    return (
        <thead className={"TableHead"}>
        <tr>
            {itemsHead.map(itemHead => <th key={itemHead}>
                {itemHead}
            </th>)}
        </tr>
        </thead>

    );
};

export default TableHead;