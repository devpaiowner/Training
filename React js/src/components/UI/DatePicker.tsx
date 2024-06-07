import React from 'react'

interface IDatePicker {
    onChange: (date: Date | null) => void;
    className?: string;
    selected?: any;
}
const DatePicker = ({ onChange, selected }: IDatePicker) => {
    return (<></>
        // <DatePicker
        //     selected={selected}
        //     onChange={(date) => onChange(date)}
        // />
    )
}

export default DatePicker