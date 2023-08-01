import PropTypes from "prop-types";

const Alert = ({message, icon, color}) => {
	return (
		<div
			className={`m-2 flex items-center gap-3 justify-center py-3 md:max-w-4xl md:mx-auto rounded-md ${color} h-14 px-4`}
		>
			{icon}
			<span className="text-md font-semibold text-white">{message}</span>
		</div>
	);
};

Alert.propTypes = {
	message: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
};

export default Alert;

//absolute bottom-0 left-2/4 translate-y-[-10%] translate-x-[-50%]
