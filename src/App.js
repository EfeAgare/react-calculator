import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import InputScreen from "./components/InputScreen";
import ButtonBox from "./components/ButtonBox";
import ResultScreen from "./components/ResultScreen";
import { parseCalculatorJsonParse } from "./utils/parseCalculatorJsonParse ";
import { ButtonValues } from "./components/ButtonValues";

const App = () => {
	// manage state
	let [calculator, setCalculator] = useState({ equation: "", result: 0 });
	let [currentValue, setCurrentValue] = useState("");
	let [plusSign, setPlusSign] = useState("");
	let [minusSign, setMinusSign] = useState("");
	let [multiSign, setMultiSign] = useState("");
	let [modSign, setModSign] = useState("");
	let [divideSign, setDivideSign] = useState("");

	// Handle the signButton ifs
	const handleSignIfs = (
		signFunc,
		signValue,
		calcState,
		pressedButton,
		setValue = setCurrentValue
	) => {
		if (typeof setValue == "function") {
			setValue("");
		}
		if (signValue.toString().includes(`${pressedButton}`)) {
			return calcState.equation;
		} else {
			signFunc((signValue += pressedButton));

			return typeof setValue == "function"
				? calcState.equation + " " + pressedButton + " "
				: calcState.equation + pressedButton;
		}
	};

	const handleEqualSign = (equation) => {
		try {
			const evalResult = parseCalculatorJsonParse(equation);
			return Number.isInteger(evalResult) ? evalResult : evalResult.toFixed(2);
		} catch (error) {
			return "Invalid Value";
		}
	};

	const clearAllSignValue = () => {
		setPlusSign("");
		setMinusSign("");
		setDivideSign("");
		setModSign("");
		setMultiSign("");
	};

	// Handle zero button press
	const handlePressZero = (equation, pressedButton) => {
		if (equation === "" || equation == "0") {
			return (equation = 0);
		} else {
			return (equation += pressedButton);
		}
	};

	// Handle all button press
	const onButtonPress = async (event) => {
		let equation = calculator.equation;
		const pressedButton = event.target.innerHTML;
		let result;

		if (pressedButton === "C") {
			return resetClickHandler();
		} else if (pressedButton === "0") {
			equation = handlePressZero(equation, pressedButton);
		} else if (pressedButton >= "0" && pressedButton <= "9") {
			setCurrentValue((currentValue += pressedButton));
			clearAllSignValue();
			equation += pressedButton;
		} else if (pressedButton === ".") {
			equation = handleSignIfs(
				setCurrentValue,
				currentValue,
				calculator,
				pressedButton,
				null
			);
		} else if (pressedButton === "+") {
			equation = handleSignIfs(
				setPlusSign,
				plusSign,
				calculator,
				pressedButton
			);
		} else if (pressedButton === "-") {
			equation = handleSignIfs(
				setMinusSign,
				minusSign,
				calculator,
				pressedButton
			);
		} else if (pressedButton === "*") {
			equation = handleSignIfs(
				setMultiSign,
				multiSign,
				calculator,
				pressedButton
			);
		} else if (pressedButton === "mod") {
			equation = handleSignIfs(setModSign, modSign, calculator, "%");
		} else if (pressedButton === "/") {
			equation = handleSignIfs(
				setDivideSign,
				divideSign,
				calculator,
				pressedButton
			);
		} else if (pressedButton === "=") {
			result = handleEqualSign(equation);
		}

		setCalculator({ equation: equation, result: result });
	};

	// initialize all state values
	const resetClickHandler = () => {
		setCalculator({ equation: "", result: 0 });
		setCurrentValue("");
	};

	return (
		<Wrapper>
			<InputScreen value={calculator.equation ? calculator.equation : null} />
			<ResultScreen value={calculator.result ? calculator.result : null} />
			<ButtonBox>
				<ButtonValues
					onButtonPress={onButtonPress}
				/>
			</ButtonBox>
		</Wrapper>
	);
};

export default App;
