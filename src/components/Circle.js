import * as React from "react";


export default class Circle extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {};
		this.handleDragStart = this.handleDragStart.bind(this);
	}

	handleDragStart(ev){
        ev.dataTransfer.setData("circle", JSON.stringify({
            color: this.props.color,
            number: this.props.number
        }));
    }

	render() {
		return (
			<div className={'circle'} draggable={'true'} onDragStart={this.handleDragStart} style={{backgroundColor: this.props.color}}>
				<div className={'innerCircle'}>
                    {this.props.number}
				</div>
			</div>
		);
	}
}