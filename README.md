# jquery-value-format
>


## Description
jquery plugin that allows fomating the contents of html-elements.
A *"format"* is defined by an id and a format-function `function( value )` that returns a number, string or jQuery-element

## Installation
### bower
`bower install https://github.com/FCOO/jquery-value-format.git --save`

## Demo
http://FCOO.github.io/jquery-value-format/demo/ 

## Usage
### Adding `data-` directly to elements
	//HTML
	<div id="test1" data-vf-value="This is the value" data-vf-format="myFormat">This will be replaced</div>

	//Javascript
	$.valueFormat
	  .add({ 
	    id: 'myFormat', 
	    format: function( value ){
	      return "Before " + value + " Behinde";
	    }
	});

	//HTML
	<div id="test1" data-vf-value="This is the value" data-vf-format="myFormat">Before This is the value Behinde</div>

### Using only jQuery
	//HTML
	<div id="test1">This will be replaced</div>

	//Javascript
	$.valueFormat.add(...);
	$('#test1')
	  .vfValue("This is the value")
	  .vfFormat("myFormat");


## Methods

### Adding and updating formats
#### `jQuery.valueFormat.add( options )`
Add a new format.

	options = {
	  id: {STRING}, 
	  format: {function( value, options )},
	  convert: {function( value )} (optional)
	}


`format( value, options )` returns a string or a number or a jQuery-element to be inserted
`convert( value )` converts a input-object/value to the value stored and used to format


#### `jQuery.valueFormat.update( id )`
Updates all elements with format-id == `id`

### Update, adding format, value and options to element 
#### `jQuery.fn.vfFormat( id )`
Sets the format of the selected elements and update them

#### `jQuery.fn.vfValue( value )`
Sets the value of the selected elements and update them

#### `jQuery.fn.vfOptions( options )`
Sets the options of the selected elements and update them

#### `jQuery.fn.vfUpdate()`
Update the selected elements 


## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/jquery-value-format/LICENSE).

Copyright (c) 2016 [FCOO](https://github.com/FCOO)

## Contact information

NielsHolt nho@fcoo.dk

