import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

class DisplayResult extends Component {
	render() {
		let weightObj = this.props.calculatedWeights;

		return (
			<div>
				{this.props.remainingWeight ? <Alert variant="warning">Unable to load {this.props.remainingWeight} lb to barbell. Add the weights below to get {this.props.closestWeight} lb.</Alert> : null}
				<table className="table">
					<tbody>
						<tr>
							<th>Plate Weight</th>
							<th>Count</th>
						</tr>
						{weightObj.map(item => {
							return (
								<tr key={item.weight}>
									<td>{item.weight}</td>
									<td>{item.count}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default DisplayResult;
