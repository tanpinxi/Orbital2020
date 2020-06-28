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
            <tr id={"row" + this.state.id}>
                <td id={"urlCol" + this.state.id}>
					<input id={"urlInput" + this.state.id} type="text" name="rows" ref={this.urlInput} defaultValue={this.state.url} />
				</td>
                <td id={"limitCol" + this.state.id}>
					<input id={"limitInput" + this.state.id} type="number" name="rows" defaultValue={this.state.limit} />
				</td>
            </tr>
		);
	}
}

export default WebsiteRow;