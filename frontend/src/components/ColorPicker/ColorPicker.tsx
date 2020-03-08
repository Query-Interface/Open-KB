import React from 'react';
import './style.css';

interface ColorPickerProps {
    selected: string;
    onSelectColor: (color: Colors) => void;
}

const ColorPicker = ({selected, onSelectColor} : ColorPickerProps) => {
    return <div className="picker">
        <div className="picker-color-row">
            {Object.keys(Colors).slice(0, 5).map(
                (color) => <div className="picker-color-box" key={color}
                style={{backgroundColor:Colors[color]}} onClick={(e) => onSelectColor(Colors[color])} />)}
        </div>
        <div className="picker-color-row">
            {Object.keys(Colors).slice(5, 10).map(
                (color) => <div className="picker-color-box" key={color}
                style={{backgroundColor:Colors[color]}} onClick={(e) => onSelectColor(Colors[color])} />)}
        </div>
    </div>
};

export enum Colors {
    GeekBlue = "#85a5ff",
    Cyan = "#5cdbd3",
    Green = "#95de64",
    Yellow = "#fff566",
    Purple = "#b37feb",
    Magenta = "#ff85c0",
    Red = "#ff7875",
    Orange = "#ffc069",
    DayBreakBlue = "#69c0ff",
    Grey = "#d9d9d9"
}

export default ColorPicker;

