import * as React from "react";


export default class Square extends React.Component {

    handleDragOver(ev){
	    ev.preventDefault();
    }
    handleDragEnter(ev){
	    ev.preventDefault();
    }

    handleDrop(ev){
        let circle = JSON.parse(ev.dataTransfer.getData('circle'));
        this.props.onCircleAdded(circle);
    }

	render() {
	    const {color, number} = this.props;
		return (
			<div className={'square'} style={{backgroundColor: color}} onDragOver={this.handleDragOver.bind(this)}
                 onDragEnter={this.handleDragEnter.bind(this)} onDrop={this.handleDrop.bind(this)}>
				<div className={'innerSquare'}>
                    {number}
				</div>
			</div>
		);
	}
}