import './caesarOptions.css'

interface CaesarOptionsProps {
    shift: number;
    onShiftChange: (shift: number) => void;
}

function CaesarOptions({ shift, onShiftChange }: CaesarOptionsProps) {
    const handleIncrement = () => {
        const newShift = isNaN(shift) ? 1 : shift + 1;
        onShiftChange(newShift);
    };

    const handleDecrement = () => {
        const newShift = isNaN(shift) ? -1 : shift - 1;
        onShiftChange(newShift);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onShiftChange(value);
    };

    return (
        <div className="caesar-options">
            <label htmlFor="shift">Shift:</label>
            <div className="shift-control">
                <button 
                    type="button"
                    className="shift-button" 
                    onClick={handleDecrement}
                    aria-label="Decrease shift"
                >
                    −
                </button>
                <input 
                    type="number" 
                    id="shift" 
                    name="shift" 
                    value={shift}
                    onChange={handleInputChange}
                    className="shift-input"
                />
                <button 
                    type="button"
                    className="shift-button" 
                    onClick={handleIncrement}
                    aria-label="Increase shift"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default CaesarOptions