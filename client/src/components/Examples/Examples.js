import React, { Component } from 'react';
import './Examples.css'

class Examples extends Component {
	constructor(props) {
	  super();
	  this.state = {
	  	examples:[]
	  };
	}

	componentDidMount() {
		fetch('/api/examples')
			.then(res => res.json())
			.then(examples => this.setState({examples}, () => console.log('Examples fetched..', examples)));
	}
  render() {
    return (
      <div>
        <h1>WelCome!</h1>
        <p>Start Your WebApp Project More Easier</p>
        <ul>
        	{this.state.examples.map(example => 
        		<li key={example.id}>
                <img className="image" src={example.img}/>
        		</li>
        	)}
        </ul>

      </div>
    );
  }
}

export default Examples;
