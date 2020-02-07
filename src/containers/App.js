import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
// Hardcoded robots,
// import { robots } from './robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions';


const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         // so we don't need here now robots: robots, but will need it 
    //         // when they come from different origin (empty array filled with collected users).
    //         robots: []
    //         // searchfield: '' => no longer needed with Redux
    //     }
    // }

    componentDidMount() {
        // console.log(this.props.store.getState())
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => {
        //         return response.json();
        // })
        // .then(users => {
        //     this.setState( {robots: users} )
        // })
        this.props.onRequestRobots()
    }

    // => no longer needed with Redux:
    // onSearchChange = (event) => {
    //     this.setState({ searchfield: event.target.value })
        
    // }

    render() {
        // const { robots, searchfield, isPending } = this.state; to remove from all the places where used
        // const { robots } = this.state;
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
        });
        // if (!this.state.robots.length)
        // if (this.state.robots.length === 0) {
        // } else {
        return isPending ?
        <h1>Loading...</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>Robofriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
        }  
    }


export default connect(mapStateToProps, mapDispatchToProps)(App);

// We have our App component that has 2 states (robots & searchfield).
// And because App owns the state, any component that has state uses the class syntax,
// so they can use the constructor() function to create this.state. And this.state is
// what changes in an an app, it is what describes the app. The virtual DOM is just a
// JS object that collects this entire state and React uses this.state to render and
// pass them down as props to these components, so that these components (that are
// just pure function) can just render. The app will look the same because they are
// just pure function. We pass down the searchChange to the searchbox, and the searchbox
// every time there is a change on the input, it lets the app know there is a change to run
// the function onSearchChange. It runs the function with the (event) and updates the state
// on the searchfield:'...' to whatever we type. With the information that we have from the
// searchbox we can now communicate to the CardList and tell it to filter the robots state
// to now have only what it includes in the searchfield. And instead of passing 
// {this.state.robots}, we just pass the {filteredRobots}.
