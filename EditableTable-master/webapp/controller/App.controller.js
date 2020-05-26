sap.ui.define([
	'jquery.sap.global',
// 	'./Formatter',
    "../model/formatter",
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/ColumnListItem',
	'sap/m/Input',
	'sap/m/MessageToast',
	'sap/m/ComboBox'
], function (jQuery, formatter, Controller, JSONModel, ColumnListItem, Input, MessageToast,ComboBox) {
	"use strict";
	

	return Controller.extend("wvega.com.EditableTable.controller.App", {
	    formatter: formatter,
		onInit: function(evt) {
// 			this.oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));
            this.oModel = this.getView().getModel("mMaterial");
			this.oTable = this.byId("idProductsTable");
// 			this.getView().setModel(this.oModel);
			this.oReadOnlyTemplate = this.byId("idProductsTable").removeItem(0);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
			
			var oItemTemplate = new sap.ui.core.ListItem({key:"{mMaterial>Um}", text:"{mMaterial>Des}" });
			
			this.oEditableTemplate = new ColumnListItem({
				cells: [
					new Input({
						value: "{mMaterial>Name}"
					}), new Input({
						value: "{mMaterial>Quantity}",
						description: "{mMaterial>UoM}"
					}), new Input({
						value: "{mMaterial>WeightMeasure}",
						description: "{mMaterial>WeightUnit}"
					}), 
				// 	new Input({
				// 		value: "{mMaterial>Price}",
				// 		description: "{mMaterial>CurrencyCode}"
				// 	}),
			         new sap.m.Select("",
					         {	
					             items: {
                                        path: "mMaterial>/Unidades",
                                        template: oItemTemplate,
                                        templateShareable: true
                                        },
                                selectedKey: "{mMaterial>UoM}"
                            }
		                                )
					
				]
			});
		},

		rebindTable: function(oTemplate, sKeyboardMode) {
			this.oTable.bindItems({
				path: "mMaterial>/ProductCollection",
				template: oTemplate,
				templateShareable: true,
				key: "ProductId"
			}).setKeyboardMode(sKeyboardMode);
		},

		onEdit: function() {
			this.aProductCollection = jQuery.extend(true, [], this.oModel.getProperty("mMaterial>/ProductCollection"));
			this.byId("editButton").setVisible(false);
			this.byId("saveButton").setVisible(true);
			this.byId("cancelButton").setVisible(true);
			this.rebindTable(this.oEditableTemplate, "Edit");
		},

		onSave: function() {
			this.byId("saveButton").setVisible(false);
			this.byId("cancelButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		},

		onCancel: function() {
			this.byId("cancelButton").setVisible(false);
			this.byId("saveButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.oModel.setProperty("mMaterial>/ProductCollection", this.aProductCollection);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		},

		onOrder: function() {
			MessageToast.show("Order button pressed");
		},

		onExit: function() {
			this.aProductCollection = [];
			this.oEditableTemplate.destroy();
			this.oModel.destroy();
		},

		onPaste: function(oEvent) {
			var aData = oEvent.getParameter("data");
			MessageToast.show("Pasted Data: " + aData);
		}
	});
});