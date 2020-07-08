import React from 'react';
import "./SettingsTab.css"

const axios = require('axios').default;

class SettingsTab extends React.Component {
	
	constructor(props){
		super(props)
		this.rowInput = React.createRef()
		this.state = {
			sites: [],
			limits: [],
			boxNum: 0
		}
	}
	
	componentDidMount() {
		this.getSites().then(res => {
			console.log(res)
			let siteArray = [], limitArray = [];
			for (let i = 0; i < res.length; i++) {
				siteArray.push(res[i]["site"])
				limitArray.push(res[i]["limit"])
			}
			this.setState({sites: siteArray, limits: limitArray, boxNum: res.length})
		})
	}

	addRow() {
		if (this.state.boxNum < 20) {

			let newSites = [], newLimits = []
			for (let i = 0; i < this.state.boxNum; i++) {

				if (i < this.state.sites.length) {
					newSites.push(this.state.sites[i])
					newLimits.push(this.state.limits[i])
				}
			}
			this.setState({sites: newSites, limits: newLimits, boxNum: this.state.boxNum + 1})
		}
	}

	async getSites(){
		const response = await axios.post("http://localhost:8080/getsites")
		return response.data
	}

	async deleteSite(site){

		if (site.trim().localeCompare("") != 0){

			axios.post("http://localhost:8080/deletesite", 
				{
					site: site
				})
		}
	}

	async updateSitesDB(sites, limits){
		axios.post("http://localhost:8080/updatesites", 
			{
				sites: sites,
				limits: limits
			})
	}

	updateSitesLocal(index, url){

		console.log("Updating row " + index + " to " + url)

		let newSites = []
		if (index < this.state.sites.length) {
			for (let i = 0; i < this.state.sites.length; i++) {

				if (i != index) {
					newSites.push(this.state.sites[i])
				}
				else if (url.trim().localeCompare("") != 0) {
					this.deleteSite(this.state.sites[i])
					newSites.push(url.trim())
				}
			}

			this.updateSitesDB(newSites, this.state.limits)
			this.setState({sites: newSites})
		}
		else {
			for (let i = 0; i < this.state.sites.length; i++) {
				newSites.push(this.state.sites[i])
			}

			let newLimits = []
			for (let i = 0; i < this.state.limits.length; i++) {
				if (i < this.state.limits.length) {
					newLimits.push(this.state.limits[i])
				}
			}

			if (url.trim().localeCompare("") != 0) {
				newSites.push(url.trim())
				newLimits.push(0)
			}

			this.updateSitesDB(newSites, newLimits)
			this.setState({sites: newSites, limits: newLimits})
		}
	}

	updateLimitsLocal(index, limit){

		console.log("Updating row " + index + " to " + limit + "mins")

		let newLimits = []
		for (let i = 0; i < this.state.limits.length; i++) {
			if (i != index) {
				newLimits.push(this.state.limits[i])
			}
			else {
				newLimits.push(Math.max(limit, 0))
			}
		}

		this.updateSitesDB(this.state.sites, newLimits)

		this.setState({limits: newLimits})
	}

	deleteRow(index){

		console.log("Deleting row " + index)

		let newSites = [], newLimits = []
		for (let i = 0; i < this.state.sites.length; i++) {
			if (i != index) {
				newSites.push(this.state.sites[i])
				newLimits.push(this.state.limits[i])
			}
			else {
				this.deleteSite(this.state.sites[i])
			}
		}
		console.log(newSites)
		this.setState({sites: newSites, limits: newLimits, boxNum: this.state.boxNum - 1})
	}

	renderRow(index){
		return (
			<tr id={"row" + index} class="websiteRow">
				<td id={"urlCol" + index} class="urlCol">
					<input id={index} class="urlInput" key={index} type="text" name="rows" value={this.state.sites[index]} onChange={(e) => this.updateSitesLocal(e.target.id, e.target.value)}/>
				</td>
				<td id={"limitCol" + index} class="limitCol">
					<input id={index} class="limitInput" type="number" name="rows" value={this.state.limits[index]} onChange={(e) => this.updateLimitsLocal(e.target.id, e.target.value)} />
				</td>
				<td class="delBtnCol">
					<input id={index} key={index} class="delBtn" type="button" value="-" onClick={(e) => this.deleteRow(e.target.id)} />
				</td>
			</tr>)
	}

	renderEmptyRow(index){
		return (
			<tr id={"row" + index} class="websiteRow">
				<td id={"urlCol" + index} class="urlCol">
					<input id={index} class="urlInput" key={index} type="text" name="rows" onChange={(e) => this.updateSitesLocal(e.target.id, e.target.value)}/>
				</td>
				<td id={"limitCol" + index} class="limitCol">
					<input id={index} class="limitInput" type="number" name="rows" value="0" onChange={(e) => this.updateLimitsLocal(e.target.id, e.target.value)} />
				</td>
				<td class="delBtnCol">
					<input id={index} key={index} class="delBtn" type="button" value="-" onClick={(e) => this.deleteRow(e.target.id)} />
				</td>
			</tr>)
	}
	
	renderTable() {

		let tableRows = Array(this.state.boxNum).fill(null)

		for (let i = 0; i < this.state.boxNum; i++){

			if (i < this.state.sites.length) {
				tableRows[i] = this.renderRow(i)
			}
			else {
				tableRows[i] = this.renderEmptyRow(i)
			}
		}

		return tableRows
	}
	
	render() {
		return (
			<div id="settingsBody">
				<input id="addRowBtn" class="btn" type="button" value="+" onClick={() => this.addRow()} />
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