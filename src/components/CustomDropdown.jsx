import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const CustomDropdown = ({options, onChange, resetValue}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(options[0]);

	// Update the selectedOption when the resetValue changes
	useEffect(() => {
		if (resetValue) {
			const option = options.find((opt) => opt.name === resetValue);
			if (option) {
				setSelectedOption(option);
			}
		}
	}, [resetValue, options]);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		setIsOpen(false);
		onChange(option.name); // Passing the selected value to the parent component
	};

	return (
		<>
			{isOpen ? (
				<div className="absolute inset-0 bg-black opacity-0 z-10" onClick={handleClose} />
			) : null}

			<div className="relative md:hidden">
				<div
					onClick={toggleDropdown}
					className="cursor-pointer shadow-[0px_1px_5px_0px_rgba(0,0,0,0.20)] bg-white rounded-full py-4 px-6 flex items-center mt-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				>
					<div className="flex items-center gap-2">
						<div className={`h-6 w-6 rounded-full ${selectedOption.color}`}></div>
						<span className="uppercase">{selectedOption.name}</span>
					</div>
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
						<svg
							className={`fill-current h-5 w-5 ${isOpen ? "transform rotate-180" : ""}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M14.95 9.95l-4 4c-.2.2-.45.3-.7.3s-.5-.1-.7-.3l-4-4c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L10 11.6l3.6-3.6c.4-.4 1-.4 1.4 0s.4 1 0 1.4z" />
						</svg>
					</div>
				</div>
				{isOpen && (
					<div className="mt-2 py-1 bg-white border border-gray-300 rounded-lg shadow-lg absolute z-50 w-full">
						{options.map((option) => {
							const {color, name, id} = option;
							return (
								<div
									key={id}
									onClick={() => handleOptionClick(option)}
									className={`cursor-pointer py-2 px-4 hover:bg-gray-200 ${
										selectedOption.color === color ? "bg-gray-100" : ""
									} flex items-center gap-2`}
								>
									<div className={`h-6 w-6 rounded-full ${color}`}></div>
									<span className="uppercase">{name}</span>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

CustomDropdown.propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	resetValue: PropTypes.string,
};

export default CustomDropdown;
