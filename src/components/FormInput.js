import React, { Component } from "react";

class FormInput extends Component {
	handleInputChange = evt => {
		let selectedBarbellWeight = evt.target.value;
		this.props.onToggleBarbellWeight(selectedBarbellWeight);
	};

	render() {
		return (
			<form onSubmit={this.props.onCalculateWeight}>
				{/* <div className="form-group">
						<h5>Select starting barbell weight:</h5>
						<div
							className="form-check form-check-inline"
							style={{ alignItems: "center" }}
						>
							<input
								type="radio"
								className="form-check-input"
								id={this.props.barbellWeightOptions[0]}
								value={this.props.barbellWeightOptions[0]}
								name="barbell-weight-input"
								onChange={this.handleInputChange}
							/>
							<label className="form-check-label">30lbs</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								type="radio"
								className="form-check-input"
								id={this.props.barbellWeightOptions[1]}
								value={this.props.barbellWeightOptions[1]}
								name="barbell-weight-input"
								onChange={this.handleInputChange}
								defaultChecked
							/>
							<label className="form-check-label">45lbs</label>
						</div>
					</div> */}
				
				<div className="form-group">
					<h5>Enter target weight:</h5>
					<p><em>Note: This calculator assumes the barbell weight is {this.props.barbellWeight} lbs.</em></p>
					<input
						className="form-control"
						type="number"
						pattern=".*\d"
						value={this.props.targetWeight}
						onChange={this.props.setWeight}
					/>
				</div>
				<button className="btn btn-info">Calculate!</button>
				
			</form>
		);
	}
}

export default FormInput;
