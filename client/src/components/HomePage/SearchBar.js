import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import IconSearch from 'material-ui/svg-icons/action/search';

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onClick` property, and a [FlatButton](/#/components/flat-button) on the right.
 */

class SearchBar extends React.Component {
	
  	render() {
    return (
    	<div className="header">
	  	<AppBar
		  	className="search_bar"
		    title={<TextField className="search_input" hintText="검색"/>}
		    iconElementLeft={<IconButton></IconButton>}
		    iconElementRight={
		    	<IconButton className="btn">
		    		<IconSearch/>
		    	</IconButton>}
	  		/>
  		</div>
  		
		);
	}
}
export default SearchBar;