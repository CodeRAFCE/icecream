import PropTypes from "prop-types";
import AlertIcon from "./AlertIcon";
import InfoIcon from "./InfoIcon";
import SuccessIcon from "./SuccessIcon";
import Alert from "./Alert";

const MessageStatus = ({messageStatus}) => {
	return (
		<>
			{messageStatus ? (
				<div className={`${messageStatus.status === "ALERT" ? "flex justify-center" : "hidden"} `}>
					{messageStatus.status === "ALERT" && (
						<Alert icon={<AlertIcon />} message={messageStatus.message} color={"bg-red-300"} />
					)}
				</div>
			) : null}

			{messageStatus ? (
				<div className={`${messageStatus.status === "INFO" ? "inline-block" : "hidden"}`}>
					{messageStatus.status === "INFO" && (
						<Alert icon={<InfoIcon />} message={messageStatus.message} color="bg-sky-300" />
					)}
				</div>
			) : null}

			{messageStatus ? (
				<div className={`${messageStatus.status === "SUCCESS" ? "inline-block" : "hidden"}`}>
					{messageStatus.status === "SUCCESS" && (
						<Alert icon={<SuccessIcon />} message={messageStatus.message} color="bg-lime-300" />
					)}
				</div>
			) : null}
		</>
	);
};

MessageStatus.propTypes = {
	messageStatus: PropTypes.object.isRequired,
};

export default MessageStatus;
