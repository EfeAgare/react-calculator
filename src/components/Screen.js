import "./Screen.css";

const Screen = ({ value }) => {
	return (
		<div className="screen" aria-label="value-screen" max={70}>
			{value}
		</div>
	);
};

export default Screen;
