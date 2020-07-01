import React from 'react';
import "./SettingsTab.css"

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

			let newArray = []
			for (let i = 0; i < this.state.boxNum; i++) {

				if (i < this.state.sites.length) {
					newArray.push(this.state.sites[i])
				}
			}
			this.setState({sites: newArray, boxNum: this.state.boxNum + 1})
		}
	}

	async getSites(){

		const response = await axios.post("http://localhost:8080/getsites")
	
		let siteArray = []
		for (let i = 0; i < response.data.length; i++){
			siteArray.push(response.data[i]["site"])
		}

		return siteArray
	}

	async deleteSite(site){

		if (site.trim().localeCompare("") != 0){

			axios.post("http://localhost:8080/deletesite", 
				{
					site: site
				})
		}
	}

	async updateSitesDB(sites){
		axios.post("http://localhost:8080/updatesites", 
			{
				sites: sites
			})
	}

	updateSitesLocal(index, url){

		console.log("Updating row " + index + " to " + url)

		let newArray = []
		for (let i = 0; i < this.state.sites.length; i++) {
			if (i != index && this.state.sites[i].trim().localeCompare("") != 0) {
				console.log("Keeping " + this.state.sites[i])
				newArray.push(this.state.sites[i])
			}
		}

		newArray.push(url)
		this.updateSitesDB(newArray)

		this.setState({sites: newArray, boxNum: this.state.boxNum})
	}

	deleteRow(index){

		console.log("Deleting row " + index)

		let newArray = []
		for (let i = 0; i < this.state.sites.length; i++) {
			if (i != index) {
				console.log("Keeping " + this.state.sites[i])
				newArray.push(this.state.sites[i])
			}
			else {
				this.deleteSite(this.state.sites[i])
			}
		}
		this.setState({sites: newArray, boxNum: this.state.boxNum - 1})
	}

	renderRow(index, url){
		return (
			<tr id={"row" + index} class="websiteRow">
				<td id={"urlCol" + index} class="urlCol">
					<input id={index} class="urlInput" key={index} type="text" name="rows" defaultValue={url} onBlur={(e) => this.updateSitesLocal(e.target.id, e.target.value)}/>
				</td>
				<td id={"limitCol" + index} class="limitCol">
					<input id={"limitInput" + index} class="limitInput" type="number" name="rows" defaultValue="0" />
				</td>
				<td class="delBtnCol">
					<input id={index} key={index} class="delBtn" type="button" value="-" onClick={(e) => this.deleteRow(e.target.id)} />
				</td>
			</tr>)
	}
	
	renderTable() {

		let tableRows = Array(this.state.boxNum).fill(null)

		for (let i = 0; i < this.state.boxNum; i++){

			let url = ""

			if (i < this.state.sites.length) {
				url = this.state.sites[i]
			}

			tableRows[i] = this.renderRow(i, url)
		}

		return tableRows
	}
	
	render() {
		return (
			<div id="settingsBody">
				<input id="addRowBtn" class="btn" type="button" value="+" onClick={() => this.addRow()} />
				<input id="updateBtn" class="btn" type="submit" value="Update" />
				<table>
					<tbody>
						<tr>
							<th class="urlCol">Website</th>
							<th class="limitCol">Daily Limit (mins)</th>
							<th class="delBtnCol" />
						</tr>
						{this.renderTable()}
					</tbody>
				</table>
			</div>
		);
	}
}

export default SettingsTab;