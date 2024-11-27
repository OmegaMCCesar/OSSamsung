import React from "react";

const SchBar = ({onSearch}) => {
    return (
        <div>
            <input type="text" placeholder="Buscar" onChange={(e) => onSearch(e.target.value)} />
        </div>
    )
}

export default SchBar;