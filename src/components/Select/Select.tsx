import React, { ReactNode } from "react";





interface SelectProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    children: ReactNode
}



const Select: React.FC<SelectProps> = ({ value, onChange, children }) => {

    return (

        <select
            value={value}
            onChange={onChange}
            className="block w-full mt-1 p-2 rounded-md bg-[#0000000A] text-[0.875rem]"
        >
            {children}
        </select>

    );
};

export default Select;
