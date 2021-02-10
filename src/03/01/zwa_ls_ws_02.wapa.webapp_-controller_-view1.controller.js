sap.ui.define([                                                                                                                                                                                                                                                
	"sap/ui/core/mvc/Controller",                                                                                                                                                                                                                                 
		"sap/m/MessageBox",                                                                                                                                                                                                                                          
"sap/m/MessageToast"                                                                                                                                                                                                                                           
], function (Controller, MessageBox, MessageToast) {                                                                                                                                                                                                           
	"use strict";                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                               
	return Controller.extend("kae_test2.kae_test2.controller.View1", {                                                                                                                                                                                            
		oDummy: {                                                                                                                                                                                                                                                    
			test: '1234'                                                                                                                                                                                                                                                
		},                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                               
		onInit: function () {                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                               
			// instantiate the model                                                                                                                                                                                                                                    
			var oModel = new sap.ui.model.json.JSONModel("model/data2.json");                                                                                                                                                                                           
			this.getView().setModel(oModel, "flights");                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                               
		},                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                               
		onPressButtonLogout: function (oEvent) {                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
			MessageBox.show(                                                                                                                                                                                                                                            
				"Wollen Sie sich wirklich ausloggen?", {                                                                                                                                                                                                                   
					icon: MessageBox.Icon.QUESTION,                                                                                                                                                                                                                           
					title: "Das ist der Titel",                                                                                                                                                                                                                               
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],                                                                                                                                                                                                   
					onClose: function (sAnswer) {                                                                                                                                                                                                                             
						if (sAnswer === MessageBox.Action.YES) {                                                                                                                                                                                                                 
							MessageBox.show("Ja");                                                                                                                                                                                                                                  
						} else {                                                                                                                                                                                                                                                 
							MessageBox.show("Nein");                                                                                                                                                                                                                                
						}                                                                                                                                                                                                                                                        
					}                                                                                                                                                                                                                                                         
				}                                                                                                                                                                                                                                                          
			);                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                               
		},                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                               
		onPressButtonRefresh: function (oEvent) {                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                               
			var oModel = this.getView().getModel();                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
			function fnSuccess(oResponse) {                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                               
				var oNewData = {                                                                                                                                                                                                                                           
					"Flights": []                                                                                                                                                                                                                                             
				};                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                               
				for (var i = 0; i < oResponse.results.length; i++) {                                                                                                                                                                                                       
                                                                                                                                                                                                                                                               
					var oEntity = oResponse.results[i];                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                               
					var oEntry = {                                                                                                                                                                                                                                            
						"Carrid": oEntity.Carrid                                                                                                                                                                                                                                 
					};                                                                                                                                                                                                                                                        
					oNewData.Flights.push(oEntry);                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                               
				}                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                               
				this.getView().getModel("flights").setData(oNewData);                                                                                                                                                                                                      
                                                                                                                                                                                                                                                               
				MessageToast.show('Request erfolgreich');                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                               
			}                                                                                                                                                                                                                                                           
			                                                                                                                                                                                                                                                            
			oModel.read("/SPFLISet", {                                                                                                                                                                                                                                  
				success: fnSuccess.bind(this),                                                                                                                                                                                                                             
				error: function (oResponse) {                                                                                                                                                                                                                              
					sap.m.MessageBox.error('Request Error');                                                                                                                                                                                                                  
					sap.ui.core.BusyIndicator.hide();                                                                                                                                                                                                                         
				}                                                                                                                                                                                                                                                          
			});                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                               
			MessageToast.show("Daten wurden aktualisiert");                                                                                                                                                                                                             
                                                                                                                                                                                                                                                               
			var dToday = new Date();                                                                                                                                                                                                                                    
			var h = dToday.getHours();                                                                                                                                                                                                                                  
			var m = dToday.getMinutes();                                                                                                                                                                                                                                
			var s = dToday.getSeconds();                                                                                                                                                                                                                                
			// add a zero in front of numbers<10                                                                                                                                                                                                                        
			dToday = h + ":" + m + ":" + s;                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                               
			this.getView().byId("text6").setValue(dToday);                                                                                                                                                                                                              
                                                                                                                                                                                                                                                               
		},                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                               
		onPressPost: function (oEvent) {                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                               
			this.oItem = oEvent.getSource();                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                               
			MessageBox.show(                                                                                                                                                                                                                                            
				"Soll die HU wirlklich abgeholt werden?", {                                                                                                                                                                                                                
					icon: MessageBox.Icon.QUESTION,                                                                                                                                                                                                                           
					title: "Das ist der Titel",                                                                                                                                                                                                                               
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],                                                                                                                                                                                                   
					onClose: this.onAfterPost.bind(this)                                                                                                                                                                                                                      
				}                                                                                                                                                                                                                                                          
			);                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                               
		},                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                               
		onAfterPost: function (sAnswer) {                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                               
			if (sAnswer === MessageBox.Action.YES) {                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                               
				MessageToast.show("Buchung durchgeführt");                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                               
				//var oItem = this.oEvent.getSource();                                                                                                                                                                                                                     
				var oCell = this.oItem.getAggregation("cells")[7];                                                                                                                                                                                                         
				oCell.setProperty("src", "sap-icon://sys-enter-2");                                                                                                                                                                                                        
				oCell.setProperty("color", "green");                                                                                                                                                                                                                       
			} else {                                                                                                                                                                                                                                                    
				MessageToast.show("Buchung abgebrochen");                                                                                                                                                                                                                  
			}                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                               
		}                                                                                                                                                                                                                                                            
	});                                                                                                                                                                                                                                                           
	                                                                                                                                                                                                                                                              
});                                                                                                                                                                                                                                                            