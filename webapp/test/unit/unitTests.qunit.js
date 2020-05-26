/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"wvega/com/EditableTable/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});