import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CheckIcon from "./CheckIcon";

const ColorCode = ({colors, onChange, resetValue}) => {
	// eslint-disable-next-line no-unused-vars
	const [selectedOption, setSelectedOption] = useState(colors[0]);

	useEffect(() => {
		if (resetValue) {
			const option = colors.find((opt) => opt.name === resetValue);
			if (option) {
				setSelectedOption(option);
			}
		}
	}, [resetValue, colors]);

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		onChange(option.name); // Passing the selected value to the parent component
	};
	return (
		<div className="md:flex gap-8 items-center justify-center mt-2 hidden">
			{colors?.map((item) => {
				const {color, name, id} = item;
				return (
					<div
						key={id}
						className="text-center flex flex-col items-center cursor-pointer w-full"
						onClick={() => handleOptionClick(item)}
					>
						<span className="text-gray-400 capitalize text-sm mb-2">{name}</span>
						<div className={`h-14 w-2/3 rounded-full ml-0 ${color} flex justify-end items-end`}>
							{selectedOption.name === name ? <CheckIcon /> : null}
						</div>
					</div>
				);
			})}
		</div>
	);
};

ColorCode.propTypes = {
	colors: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	resetValue: PropTypes.string,
};

export default ColorCode;
