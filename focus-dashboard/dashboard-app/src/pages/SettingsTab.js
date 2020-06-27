import React from 'react';
import WebsiteRow from '../components/WebsiteRow'

const axios = require('axios').default;
	
async function getSites(){

	const response = await axios.post("http://localhost:8080/getsites", 
	{headers: {
		"Content-type":"application/x-www-form-urlencoded"
	}})
	console.log(response.data)
}

class SettingsTab extends React.Component {
	
	constructor(props){
		super(props);
		this.rowInput = React.createRef();
		this.columnInput = React.createRef();
		this.thresholdInput = React.createRef();
		this.state = {
			rows: 10,
			columns: 10,
			threshold: 4
		}
	}

	handleSubmit = async event => {
		
		event.preventDefault();
		
		if (this.newRow < 2 || this.newColumn < 2 || this.newThreshold > Math.min(this.newRow,this.newColumn)) {
			alert("Please enter valid input!");
		}
		else {
			
			await this.setState({rows: this.rowInput.current.value, columns: this.columnInput.current.value, threshold: this.thresholdInput.current.value});
		}
	}
	
	renderTable() {
		let sites = ["facebook.com", "google.com", "youtube.com"]
		let tableRows = Array(sites.length).fill(null)

		for (let i = 0; i < sites.length; i++){
			tableRows[i] = <WebsiteRow url={sites[i]} />
		}

		return tableRows
	}
	
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<table>
						<tbody>
							<tr>
								<th>Website</th>
								<th>Daily Limit (mins)</th>
							</tr>
							{this.renderTable()}
						</tbody>
					</table>
					<input type="submit" value="Submit"/>
				</form>
			</div>
		);
	}
}

export default SettingsTab;