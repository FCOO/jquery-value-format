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
            id         : 'dummy',
            convert    : defaultConvert,
            convertBack: defaultConvert,
            format     : function( value /*, options */) { return '** UNKNOWN FORMAT FOR "' + value + '" **'; }
        };
        
    //Create valueFormat-namespace
	$.valueFormat = $.valueFormat || {};

    //*********************************************************************
    //jQuery.valueFormat.add = append a new format
	$.valueFormat.add = function( options ){ 
        this.formats = this.formats || {};

        options.convert = options.convert || defaultConvert;
        options.convertBack = options.convertBack || defaultConvert;
        options.format = options.format || defaultConvert;

        this.formats[options.id] = options;
        this.update( options.id );
        return this;
    };

    //*********************************************************************
    //jQuery.valueFormat.update: update all elements with data-vf-format == ids or part of ids
	$.valueFormat.update = function( ids ){
        ids = ids.split(' ');
        for (var i=0; i<ids.length; i++ ){
            var id = ids[i];
            if (id)
                $('*[data-'+dataId_format+'="' + id + '"]').vfUpdate();
        }
        return this;
    };

   
    //*********************************************************************
    //jQuery.fn.vfFormat( id, options ): Sets the format of the selected elements and update them
	$.fn.vfFormat = function( id, options, dontUpdate ) {
        if (options)
            this.vfOptions( options, true );
		return this.each(function() {
            var $this = $(this);
            $this
                .attr( 'data-'+dataId_format, id ) //Allow the element to be 'found' by $.valueFormat.update
                .data( dataId_format, id );
            if (!dontUpdate)
                $this._vfUpdate();
		});
	};

    //*********************************************************************
    //jQuery.fn.vfValue( value ): Sets the value of the selected elements and update them
	$.fn.vfValue = function( value, options ) {
        if (options)
            this.vfOptions( options, true );
		return this.each(function() {
            var $this = $(this),
                format = $this._vfGetFormat(),
                options = $this._vfGetOptions();
            $this
                .data( dataId_value, format.convert( value, options ) )
                ._vfUpdate();
		});
	};

    //*********************************************************************
    //jQuery.fn.vfOptions( options ): Sets the options of the selected elements and update them
	$.fn.vfOptions = function( options, dontUpdate ) {
		return this.each(function() {
            var $this = $(this);
            $this.data( dataId_options, options );
            if (!dontUpdate)
                $this._vfUpdate();
		});
	};

    //*********************************************************************
    //jQuery.fn.vfValueFormat( value, id,  options ): Sets the value and format of the selected elements and update them
	$.fn.vfValueFormat = function( value, id,  options ) {
        return this
                 .vfFormat( id, options, true )
                 .vfValue( value );
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

    //jQuery.fn._vfGetOptions()
    $.fn._vfGetOptions = function() {
        var options = this.data( dataId_options ) || {};

        //Convert options (if any) from string to json-object 
        if (options && ($.type(options) == 'string') ){
            options = options.split("'").join('"');
            try {
                var newOptions = JSON.parse( options );
                if ($.type( newOptions ) == 'object')
                    options = newOptions;
            }
            catch (e) { 
                options = null;
            }
        }
        return options;
    };

    //jQuery.fn._vfUpdate()
    $.fn._vfUpdate = function() {
        var format = this._vfGetFormat(),
            options = this._vfGetOptions(),
            value = format.convertBack( this.data( dataId_value ), options );

        if (value !== undefined){
            value = format.format( value, options );

            //Adjust value according to options
            if (options.capitalize)
                value = value.toUpperCase();

            if (options.capitalizeFirstLetter)
                value = value.charAt(0).toUpperCase() + value.slice(1);
            
            //prefix, postfix
            value = (options.prefix ? options.prefix : '') + value + (options.postfix ? options.postfix : '');


            this.html( value  );
        }
    };


	/******************************************
	Initialize/ready 
	*******************************************/
	$(function() { 

	
	}); 
	//******************************************


}(jQuery, this, document));