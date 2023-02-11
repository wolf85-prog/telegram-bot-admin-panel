import React from 'react';

const MySelect = (p) => {
    return (
        <select 
            value={p.value}
            onChange={event => p.onChange(event.target.value)}
        >
            <option value="">{p.defaultValue}</option>
            {p.options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}

        </select>
    )
};

export default MySelect;