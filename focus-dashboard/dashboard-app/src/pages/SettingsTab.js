import React from 'react';
import WebsiteRow from '../components/WebsiteRow'

const axios = require('axios').default;

class SettingsTab extends React.Component {
	
	constructor(props){
		super(props)
		this.rowInput = React.createRef()
		this.state = {
			sites: [],
			boxNum: 0
		}
	}
	
	componentDidMount() {
		this.getSites().then(res => this.setState({sites: res, boxNum: res.length}))
	}

	addRow() {
		if (this.state.boxNum < 20) {
			this.setState({boxNum: this.state.boxNum + 1})
		}
	}

	async getSites(){

		const response = await axios.post("http://localhost:8080/getsites", 
		{headers: {
			"Content-type":"application/x-www-form-urlencoded"
		}})
	
		let siteArray = []
		for (let i = 0; i < response.data.length; i++){
			siteArray.push(response.data[i]["site"])
		}

		return siteArray
	}


	handleSubmit = async event => {
		
		event.preventDefault();
		
	}
	
	renderTable() {

		let tableRows = Array(this.state.boxNum).fill(null)

		for (let i = 0; i < this.state.boxNum; i++){

			let url = ""

			if (i < this.state.sites.length){
				url = this.state.sites[i]
			}

			tableRows[i] = <WebsiteRow id={i} url={url} />
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
					<button id="addRowBtn" type="button" value="+" onClick={() => this.addRow()} />
					<input id="updateBtn" type="submit" value="Update" />
				</form>
			</div>
		);
	}
}

export default SettingsTab;