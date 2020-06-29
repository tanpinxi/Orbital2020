import React from 'react';


class WebsiteRow extends React.Component {
	
	constructor(props){
		super(props);
		this.urlInput = React.createRef();
		this.state = {
			id: this.props.id,
            url: this.props.url,
            limit: 0
		}
	}
	
	render() {
		return (
            <tr id={"row" + this.state.id} class="websiteRow">
                <td id={"urlCol" + this.state.id} class="urlCol">
					<input id={"urlInput" + this.state.id} class="textInput" type="text" name="rows" ref={this.urlInput} defaultValue={this.state.url} />
				</td>
                <td id={"limitCol" + this.state.id} class="limitCol">
					<input id={"limitInput" + this.state.id} class="textInput" type="number" name="rows" defaultValue={this.state.limit} />
				</td>
            </tr>
		);
	}
}

export default WebsiteRow;