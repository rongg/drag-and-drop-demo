import * as React from "react";

// COMPONENTS //
import Circle from './components/Circle';
import Square from './components/Square';
import ResetButton from './components/ResetButton';

// CSS //
import "./assets/css/styles.css";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showResetButton: false,
            square: this.getDefaultSquare(),
            hide: {}
        };
    }

    getDefaultSquare(){
        return {
            number: 0,
            color: 'transparent',
            circles: []
        };
    }

    //  Hide the circle that was dropped and update the square's state. Show the reset button.
    onCircleAdded(circle) {
        const hide = this.state.hide;
        hide[circle.color] = true;
        this.setState({
            showResetButton: true,
            square: this.getResultingSquare.call(this, circle),
            hide
        });
    }

    //  Determine the number and color after a circle is dropped
    getResultingSquare(circle){
        const square = this.state.square;

        square.circles.push(circle);
        const {circles} = square;

        function getColorMix(c1, c2) {
            if(c1 === 'yellow' && c2 === 'red' || c1 === 'red' && c2 === 'yellow') return 'orange';
            if(c1 === 'yellow' && c2 === 'blue' || c1 === 'blue' && c2 === 'yellow') return 'green';
            if(c1 === 'red' && c2 === 'blue' || c1 === 'blue' && c2 === 'red') return 'purple';
        }

        if(circles.length === 1) {
            square.color = circle.color;
            square.number = circle.number;
        }else if(circles.length === 2) {
            square.color = getColorMix(circles[0].color, circles[1].color);
            square.number = circles[0].number + circles[1].number;
        }else if(circles.length === 3){
            square.color = 'black';
            square.number = 6;
        }


        return square;
    }

    //  Make all circles visible, hide the reset button, and set the square back to it's initial state
    resetSquare() {
        this.setState({
            showResetButton: false,
            square: this.getDefaultSquare(),
            hide: {}
        })
    }

    render() {
        const {color, number} = this.state.square;
        const hide = this.state.hide;

        return (
            <div className={'appContainer'}>
                {!hide.blue && <Circle color={'blue'} number={1}/>}
                {!hide.red && <Circle color={'red'} number={2}/>}
                {!hide.yellow && <Circle color={'yellow'} number={3}/>}
                <Square color={color} number={number} reset={this.state.reset} onCircleAdded={this.onCircleAdded.bind(this)}/>
                {this.state.showResetButton && <ResetButton handleClick={this.resetSquare.bind(this)}/>}
            </div>
        );
    }
}