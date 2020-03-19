import React, { Component } from "react";
import FormInput from "./FormInput";
import DisplayResult from "./DisplayResult";
import Alert from "react-bootstrap/Alert";
import "./App.css";

const DEFAULT_BARBELL_WEIGHT = 45;
const DEFAULT_INPUT_WEIGHT = 225;
const INPUT_WEIGHT_ID = "input-weight-id";
// const BARBELL_WEIGHT_ID = "barbell-weight-id";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			availableWeights: [45, 25, 10, 5, 2.5],
			barbellWeightOptions: [30, 45],
			// barbellWeight: null || DEFAULT_BARBELL_WEIGHT,
			barbellWeight: DEFAULT_BARBELL_WEIGHT,
			targetWeight:
				localStorage.getItem(INPUT_WEIGHT_ID) || DEFAULT_INPUT_WEIGHT,
			calculatedWeights: [],
			closestWeight: 0,
			remainingWeight: 0,
			visible: false
		};
	}
	componentDidMount() {
		console.log('Component Did Mount')
		console.log('-------------------');
		this.calculateTotal();
	}

	/*
	handleToggleBarbellWeight = weight => {
		this.setState({ barbellWeight: weight });
	};
	*/

	setWeight = evt => {
		this.setState({ targetWeight: evt.target.value });
	};

	validate = () => {
		let isError = false;
		if (this.state.targetWeight <= this.state.barbellWeight) {
			isError = true;
		}
		this.setState({
			visible: isError
		});

		return isError;
	};

	onCalculateWeight = evt => {
		evt.preventDefault();

		let err = this.validate();

		if (!err) {
			this.setState({
				visible: false
			});
			this.calculateTotal();
		}
	};

	calculateTotal = () => {
		const calculatedWeights = [];
		let singleSide =
			(this.state.targetWeight - this.state.barbellWeight) / 2;

		this.state.availableWeights.forEach(weight => {
			let count = Math.floor(singleSide / weight);
			singleSide -= weight * count;
			calculatedWeights.push({
				weight,
				count
			});
		});

		this.setState({
			calculatedWeights,
			closestWeight: this.state.targetWeight - singleSide * 2,
			remainingWeight: singleSide * 2
		});

		localStorage.setItem(INPUT_WEIGHT_ID, this.state.targetWeight);
	};

	render() {
		return (
			<div className="App">
				<div className="App-content">
					<div className="App-header">
						<h1 className="App-title">
							Barbell Loading Calculator
						</h1>
					</div>

					<div className="App-input">
						<div className="target-weight">
							<FormInput
								onToggleBarbellWeight={
									this.handleToggleBarbellWeight
								}
								barbellWeightOptions={
									this.state.barbellWeightOptions
								}
								onCalculateWeight={this.onCalculateWeight}
								targetWeight={this.state.targetWeight}
								barbellWeight={this.state.barbellWeight}
								setWeight={this.setWeight}
								visible={this.state.visible}
							/>
						</div>
						<br />
					</div>
					<Alert variant="danger" show={this.state.visible}>
						Unable to calculate target weight.
					</Alert>
					<div className="App-result">
						{!this.state.visible ? (
							<DisplayResult
								targetWeight={this.state.targetWeight}
								barbellWeight={this.state.barbellWeight}
								calculatedWeights={this.state.calculatedWeights}
								closestWeight={this.state.closestWeight}
								remainingWeight={this.state.remainingWeight}
							/>
						) : null}
					</div>
				</div>
			</div>
		);
	}


}

export default App;
