import "./Screen.css";

const ResultScreen = ({ value }) => {
	return (
		<div className="screen" aria-label="result-screen" max={70}>
			{value}
		</div>
	);
};

export default ResultScreen;
