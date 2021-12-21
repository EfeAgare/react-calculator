import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import ResultScreen from "./components/ResultScreen";
import { btnValues } from "./utils/buttonValues";
import { parseCalculatorJsonParse } from "./utils/parseCalculatorJsonParse ";

const App = () => {
	// manage state
	let [calculator, setCalculator] = useState({ equation: "", result: 0 });
	let [currentValue, setCurrentValue] = useState("");
	let [plusSign, setPlusSign] = useState("");
	let [minusSign, setMinusSign] = useState("");
	let [multiSign, setMultiSign] = useState("");
	let [modSign, setModSign] = useState("");
	let [divideSign, setDivideSign] = useState("");

	// manipulate the css class to the signs button
	const addClassToSignButton = (btn) => {
		if (btn === "=") {
			return "equals";
		} else if (["C", "%", "/", "*", "+", "-"].includes(btn)) {
			return "sign";
		} else {
			return "";
		}
	};

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
			alert("Invalid Mathematical Equation");
		}
	};

	const clearAllSignValue = () => {
		setPlusSign("");
		setMinusSign("");
		setDivideSign("");
		setModSign("");
		setMultiSign("");
	};

	const handlePressZero = (equation, pressedButton) => {
		if (equation === "" || equation == "0") {
			return (equation = 0);
		} else {
			return (equation += pressedButton);
		}
	};

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
		} else if (pressedButton === "%") {
			equation = handleSignIfs(setModSign, modSign, calculator, pressedButton);
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

	const resetClickHandler = () => {
		setCalculator({ equation: "", result: 0 });
		setCurrentValue("");
	};

	return (
		<Wrapper>
			<Screen value={calculator.equation ? calculator.equation : null} />
			<ResultScreen value={calculator.result ? calculator.result : null} />
			<ButtonBox>
				{btnValues.flat().map((btn, i) => {
					return (
						<Button
							key={i}
							className={addClassToSignButton(btn)}
							value={btn}
							onClick={onButtonPress}
						/>
					);
				})}
			</ButtonBox>
		</Wrapper>
	);
};

export default App;
