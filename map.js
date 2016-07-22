var $ = Studio.$;
var _ = Studio._;

var map = new Studio.core.Map("#mapworks-map", {
	apiKey: "AStBVlM5TGU4ZU5USldqckxLT0RZZi8yMjk1MnRNRVQtbWRXMUJTSmk1dVBRQ8Hs8gqDcuLKaXX/99HEcW450ZLI4ZcgnIoAo50WVo/reJqlsQ",
	map: "AVIz8Sn_NkycPmrP2gMy",
	navigationControl: false,
	scaleControl: false,
	tooltipControl: true,
	zoomControl: false
}).load(function() { 
});

// Call when the map has finished
map.once('ready', function() {
	// Set the view center of the map
	map.setViewCenter(115.90798491964057, -32.01990865425378, 2327.710035750766);
	// Get the tooltip control. See Studio.core.control.tooltip.Tooltip
	var tooltipControl = map.getControl("tooltip");

	/**
	 * Called before the tooltip is rendered
	 * @param model The tooltip model
	 * @param tplObj The object containing the template
	 */
	tooltipControl.on('before:render', function(model, tplObj) {
		// Add in options to the model attributes
		_.extend(model.attributes, {
			direction: "bottom", // Direction of the tooltip
			maxWidth: 350, // Maximum width of the tooltip
			maxHeight: 300 // Maximum height of the tooltip
		});

		// Override the default click template
		tplObj.clickTpl = function(e) {
			// Generate an underscore template
			var tpl = _.template(getTemplate());
			// Generate the JQuery element
			var $el = $(tpl(e));

			// Handle on-click events
			$el.on("click", "#tt-print", function() {
				var printWindow = window.open('');
				printWindow.document.write($el.find(".details").html());
				printWindow.focus();
				printWindow.print();
			});

			return $el;
		};
	});

});


// A helper function that returns an Underscore template.
// Variables in the template will be replaced by the actual model values.
var getTemplate = function() {
	var str = "";
	str += "<div id='studio-tooltip-click' class='studio-tooltip'>";
	str += "   <div class='popover popover-click <%=direction%>' style='max-width: <%=maxWidth%>px'>";
	str += "      <div class='arrow'><\/div>";
	str += "      <h3 class='popover-title popover-title-click'>";
	str += "         <span>";
	str += "            <button id='close' type='button' class='close' data-dismiss='modal'>";
	str += "            <span aria-hidden='true'>&times;<\/span><span class='sr-only'>Close<\/span>";
	str += "            <\/button>";
	str += "            <button id='tt-print' type='button'  class='close' data-dismiss='modal' title='Print Records'>";
	str += "               <span class='studio glyphicon glyphicon-print'><\/span>";
	str += "            <\/button>";
	str += "         <\/span>";
	str += "         <span id='display-name'><%=model.getDisplayName()%><\/span><br/>";
	str += "         <span id='layer-title' class='text-muted small'><%=model.getLayer().getTitle()%><\/span>";
	str += "      <\/h3>";
	str += "      <div class='details' style='max-height: <%=maxHeight%>px'>";
	str += "         <table class='table table-striped table-hover table-condensed'>";
	str += "            <tbody>";
	str += "               <%";
	str += "                  var names = _.keys(fields);";
	str += "                  var values = _.values(fields);";
	str += "                  ";
	str += "                  for(var i=0; i<names.length; i++){";
	str += "                  if(name === 'the_geom') {";
	str += "                  return;";
	str += "                  }";
	str += "                  %>";
	str += "               <tr>";
	str += "                  <td><%=names[i]%><\/td>";
	str += "                  <td><%=values[i]%><\/td>";
	str += "               <\/tr>";
	str += "               <% } %>";
	str += "            <\/tbody>";
	str += "         <\/table>";
	str += "      <\/div>";
	str += "      <%";
	str += "         var formattedArea = map.getModule('analysis').formatMeasurement(model.getArea(), true, 'm');";
	str += "         var formattedLength = map.getModule('analysis').formatMeasurement(model.getLength(), false, 'm');";
	str += "         ";
	str += "         %>";
	str += "      <div class='popover-footer'>";
	str += "         <%";
	str += "            var type = model.getType();";
	str += "            if(type !== 1) {";
	str += "            	var lengthText = 'Perimeter';";
	str += "            	if(type === 2) {";
	str += "            		lengthText = 'Length';";
	str += "            	}";
	str += "            %>";
	str += "         <table class='table no-margin table-condensed'>";
	str += "            <colgroup>";
	str += "               <col class='col-xs-4'>";
	str += "               <col class='col-xs-4'>";
	str += "            <\/colgroup>";
	str += "            <tbody>";
	str += "               <% if(type !== 2) { %>";
	str += "               <td>";
	str += "                  Area: <%=formattedArea%>";
	str += "               <\/td>";
	str += "               <% } %>";
	str += "               <td><%=lengthText%>: <%=formattedLength%><\/td>";
	str += "            <\/tbody>";
	str += "         <\/table>";
	str += "         <% } %>";
	str += "      <\/div>";
	str += "   <\/div>";
	str += "<\/div>";
	return str;
}

