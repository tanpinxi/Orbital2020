import React from 'react';


class WebsiteRow extends React.Component {
	
	constructor(props){
		super(props);
		this.urlInput = React.createRef();
		this.state = {
            url: this.props.url,
            limit: 0
		}
	}
	
	render() {
		return (
            <tr>
                <td><input type="text" name="rows" ref={this.urlInput} defaultValue={this.state.url} /></td>
                <td><input type="number" name="rows" defaultValue={this.state.limit} /></td>
            </tr>
		);
	}
}

export default WebsiteRow;