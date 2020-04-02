import React, { ReactElement } from 'react';
import './style.css';

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

interface ColorPickerProps {
    selected?: string;
    onSelectColor?: (color: Colors) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ColorPicker: React.FC<ColorPickerProps> = ({selected, onSelectColor}: ColorPickerProps): ReactElement => {
    return <div className="picker">
        <div className="picker-color-row">
            {Object.keys(Colors).slice(0, 5).map(
                (color) => <div className="picker-color-box" key={color}
                style={{backgroundColor:Colors[color]}} onClick={(e): void => {
                        if (onSelectColor) {
                            onSelectColor(Colors[color])
                        }
                        e.preventDefault();
                    }
                } />)}
        </div>
        <div className="picker-color-row">
            {Object.keys(Colors).slice(5, 10).map(
                (color) => <div className="picker-color-box" key={color}
                style={{backgroundColor:Colors[color]}} onClick={(e): void => {
                        if (onSelectColor) {
                            onSelectColor(Colors[color])
                        }
                        e.preventDefault();
                    }
                } />)}
        </div>
    </div>
};

export default ColorPicker;
