import "./Screen.css";

const InputScreen = ({ value }) => {
	return (
		<div className="screen" aria-label="value-screen" max={70}>
			{value}
		</div>
	);
};

export default InputScreen;
