import printBtnHtml from './printBtn.html?raw';

export const customTooltip = async function(map){
	await new Promise((resolve) => map.on('navigation:stabilised', resolve));
	// Set the view center of the map
	map.setViewCenter(115.90798491964057, -32.01990865425378, 2327.710035750766);

	// Get the tooltip control. See Studio.core.control.tooltip.Tooltip
	const tooltipControl = map.getControl("tooltip");

	/**
	 * Called before the tooltip is rendered
	 * @param model The tooltip model
	 * @param tplObj The object containing the template
	 */
	tooltipControl.on('before:render', function(model, tplObj) {
		// Add in options to the model attributes
		Studio._.extend(model.attributes, {
			direction: "bottom", // Direction of the tooltip
			maxWidth: 350, // Maximum width of the tooltip
			maxHeight: 300 // Maximum height of the tooltip
		});

		const originalTpl = tplObj.clickTpl;

		// Override the default click template
		tplObj.clickTpl = function(e) {
			const $el = Studio.$(originalTpl(e));
			// Generate the JQuery element
			const $btn = Studio.$(printBtnHtml);

			$el.find('.popover-title > span').append($btn);

			// Handle on-click events
			$btn.on("click", () => {
				var printWindow = window.open('');
				printWindow.document.body.innerHTML = $el.find(".details").html();
				printWindow.focus();
				printWindow.print();
			});

			return $el;
		};
	});
};
