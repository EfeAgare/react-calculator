import { btnValues } from "../utils/buttonValues";
import Button from "./Button";

export const ButtonValues = ({ onButtonPress }) => {

	// manipulate the css class to the signs button
	const addClassToSignButton = (btn) => {
		if (btn === "=") {
			return "equals";
		} else if (["C", "mod", "/", "*", "+", "-", "."].includes(btn)) {
			return "sign";
		} else {
			return "";
		}
	};

	return btnValues.flat().map((btn, i) => {
		return (
			<Button
				key={i}
				className={addClassToSignButton(btn)}
				value={btn}
				onClick={onButtonPress}
			/>
		);
	});
};
