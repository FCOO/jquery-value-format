/****************************************************************************
	jquery-value-format.js, 

	(c) 2016, FCOO

	https://github.com/FCOO/jquery-value-format
	https://github.com/FCOO

****************************************************************************/

(function ($, window, document, undefined) {
	"use strict";
	
    var dataId_prefix  = 'vf-',
        dataId_format  = dataId_prefix + 'format',
        dataId_value   = dataId_prefix + 'value',
        dataId_options = dataId_prefix + 'options';

    function defaultConvert( value ){ return value; }

    var fallbackFormat = {
            id     : 'dummy',
            convert: defaultConvert,
            format : function( value /*, options */) { return '** UNKNOWN FORMAT FOR "' + value + '" **'; }
        };
        
    //Create valueFormat-namespace
	$.valueFormat = $.valueFormat || {};

    //*********************************************************************
    //jQuery.valueFormat.add = append a new format
	$.valueFormat.add = function( options ){ 
        this.formats = this.formats || {};

        options.convert = options.convert || defaultConvert;
        options.format = options.format || defaultConvert;

        this.formats[options.id] = options;
        this.update( options.id );
        return this;
    };

    //*********************************************************************
    //jQuery.valueFormat.update: update all elements with data-vf-format == id
	$.valueFormat.update = function( id ){
        $('*[data-'+dataId_format+'="' + id + '"]').vfUpdate();
        return this;
    };

   
    //*********************************************************************
    //jQuery.fn.vfFormat( id ): Sets the format of the selected elements and update them
	$.fn.vfFormat = function( id ) {
		return this.each(function() {
            $(this)
                .attr( 'data-'+dataId_format, id ) //Allow the element to be 'found' by $.valueFormat.update
                .data( dataId_format, id )
                ._vfUpdate();
		});
	};

    //*********************************************************************
    //jQuery.fn.vfValue( value ): Sets the value of the selected elements and update them
	$.fn.vfValue = function( value, options ) {
        if (options)
            this.vfOptions( options );
		return this.each(function() {
            var $this = $(this),
                format = $this._vfGetFormat();
            $this
                .data( dataId_value, format.convert( value ) )
                ._vfUpdate();
		});
	};

    //*********************************************************************
    //jQuery.fn.vfOptions( options ): Sets the options of the selected elements and update them
	$.fn.vfOptions = function( options ) {
		return this.each(function() {
            $(this)
                .data( dataId_options, options )
                ._vfUpdate();
		});
	};

    //*********************************************************************
    //jQuery.fn.vfUpdate(): Update the selected elements 
	$.fn.vfUpdate = function() {
		return this.each(function() {
            $( this )._vfUpdate();
		});
	};
    
    //*********************************************************************
    //Internal methods
    //jQuery.fn._vfGetFormat()
    $.fn._vfGetFormat = function() {
        var formatId = this.data( dataId_format );
        return $.valueFormat.formats && formatId ? $.valueFormat.formats[formatId] || fallbackFormat : fallbackFormat;
    };

    //jQuery.fn._vfUpdate()
    $.fn._vfUpdate = function() {
        var format = this._vfGetFormat(),
            value = this.data( dataId_value ),
            options = this.data( dataId_options );
        if (value !== undefined)
            this.html( format.format( value, options ) );
    };

	/******************************************
	Initialize/ready 
	*******************************************/
	$(function() { 

	
	}); 
	//******************************************


}(jQuery, this, document));