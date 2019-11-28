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
### Defining a format
	//Javascript
	$.valueFormat
	  .add({ 
	    id: 'myFormat', 
	    format: function( value, options ){
	      return (options.before || "Before ") + value + " Behinde";
	    }
	});

### Adding `data-` directly to elements
	//HTML
	<div id="test1" data-vf-value="This is the value" data-vf-format="myFormat" data-vf-options="{'before':'My before '}">This will be replaced</div>

### Using only jQuery
	//HTML
	<div id="test1">This will be replaced</div>

	//Javascript
	$.valueFormat.add(...);
	$('#test1')
	  .vfValue("This is the value")
	  .vfOptions({before:"My before "})
	  .vfFormat("myFormat");


## Methods

### Adding and updating formats
#### `jQuery.valueFormat.add( options )`
Add a new format.

	options = {
	  id: {STRING}, 
	  format: {function( value, options )},
	  convert: {function( value, options )} (optional)
	  convertBack: {function( value, options )} (optional)
	}


`format( value, options )` returns a string or a number or a jQuery-element to be inserted
`convert( value, options )` converts a input-object/value to the value stored
`convertBack( value, options )` converts the value stored to the value used for format

`convert` and `convertBack` can be used to convert `object` to e.g. `string` and convert back to `object` before formatting the object.

#### `jQuery.valueFormat.update( ids )`
Updates all elements with format-id == `ids` or part of `ids`

### Update, adding format, value and options to element 

#### `jQuery.fn.vfFormat( id, options )`
Sets the format of the selected elements and update them

#### `jQuery.fn.vfValue( value, options )`
Sets the value of the selected elements and update them

#### `jQuery.fn.vfValue()`
Return the value of the selected element

#### `jQuery.fn.vfOptions( options )`
Sets the options of the selected elements and update them

#### `jQuery.fn.vfValueFormat( value, id,  options )`
Sets the value and format of the selected elements and update them

#### `jQuery.fn.vfUpdate()`
Update the selected elements 

#### `options`
The following standard options in `jQuery.fn.vfFormat, jQuery.fn.vfValue, etc.` are supported
- `capitalize {Boolean}` - `"this is a test"` => `"THIS IS A TEST"`
- `capitalizeFirstLetter {Boolean}` - `"this is a test"` => `"This is a test"`
- `prefix {String}` - `"("` + `"this is a test"` => `"(this is a test"`
- `postfix {String}` - `")"` + `"this is a test"` => `"this is a test)"`


## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/jquery-value-format/LICENSE).

Copyright (c) 2016 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk

