({ // Created from summer '17
    doInit : function(component) {
    	// Hardcoding images in this demo component
    	component.set("v.slides", [
            'https://s3-us-west-1.amazonaws.com/sfdc-demo/houses/living_room.jpg',
            'https://s3-us-west-1.amazonaws.com/sfdc-demo/houses/eatinkitchen.jpg',
			'https://s3-us-west-1.amazonaws.com/sfdc-demo/houses/kitchen.jpg'
        ]);
        
        console.log('get record v01');
        
        console.log(component.get("v.fields"));
        var sFields = component.get("v.fields");
        console.log(component.get("v.recordId"));
        if (sFields != undefined && sFields != null && sFields != 'undefined' && sFields.length > 0) {
            var aFields = component.get("v.arrayFields");
            aFields = aFields.concat(sFields.split(","));
            console.log('About to get/reloadRecord sObject with array of fields: ' + aFields);
            component.set("v.arrayFields", aFields);
			component.set("v.dataRecordId", component.get("v.recordId"));
			console.log(component.get("v.recordId"));
            console.log(component.get("v.dataRecordId"));
            //component.set("v.dsRecordId", recordId);
            var service = component.find("service");
            service.set("v.recordId", component.get("v.dataRecordId"));
            service.set("v.fields", aFields);
            service.reloadRecord();
        }
/*
        console.log('dump init');
        console.log(component.get("v.record"));
        console.log(component.get("v.simpleRecord"));
        console.log(component.get("v.currentRecord"));        

        console.log(component.get("v.fields"));
        console.log('END dump init');
        */
    },

	fullScreen : function(component) {
        component.set("v.fullScreen", true);
	},

	closeDialog : function(component) {
        console.log('PictureGalleryCardController - closeDialog - START');
        component.set("v.fullScreen", false);
	},

  	onRecordUpdated : function(component, event) {
        console.log('onRecordUpdated');
        console.log(component.get("v.currentRecord"));
        
        

        var eventParams = event.getParams();
        console.log(eventParams.changeType);
        if(eventParams.changeType === "LOADED") {
            
           // record is loaded (render other component which needs record data value)
            console.log("Record is loaded successfully.");
        } else if(eventParams.changeType === "CHANGED") {
            // record is changed
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
        }

        
        
        var sObject = component.get("v.currentRecord");
        var aValues = [];
        /*if (sObject) {
	        component.set("v.title", sObject[component.get("v.titleField")]);
            component.find("map").setLocation(sObject[component.get("v.latField")], sObject[component.get("v.longField")]);
        }*/
        var sFields = component.get("v.fields");
        console.log('Dumping sobject + sfields');
        console.log(sObject);
        console.log(sFields);
        if (sFields != undefined && sFields != null && sFields != 'undefined' && sFields.length > 0) {

            var aFields = sFields.split(",");
            var text='';
            for (var i = 0; i < aFields.length; i++) { 
                text += aFields[i] + "<br>";
                console.log('Getting value for field: ') + aFields[i];
                console.log(sObject[aFields[i]]);
                aValues.push(sObject[aFields[i]]);
            }
        }
		console.log(text);
        console.log(aValues);
        /*
        component.set("v.slides", [
            'https://cosy.bmwgroup.com/cdp/cosySec?COSY-EU-100-8074HMrjSho5OZZ%2598zhpn%25m53qojyxsm%25OJtZf04cTummYdMG%25lj1IwIFckuCHnLw5zZFSyJYvPOrh0QnxHwhIggQPKfy3sPUKzQLgyN9jqt4ZNJyjKd%25xOBG1C%25Mjv2fbsdkRi6bFODAcctLul8gcVdI1LEGehYrQEHL6iewRAKv7ywPeJAJUlSNapjU4AL6NZYo%25T5OZ1S0PYCvWbDXdCiofkk6a0cImL68Ws0cgTfEz2egr0PRfQD9wJnAQ7fSwByIxUM3Syp9osTjzsZFqoj5xGksOJtCVBWOXsSAYdMG6Hk0dmtfqmLFRgPufL2GWEteVlQ4h9enR0cwAHYy1KxA3llEGSPvjiNsSqY9JVo4aO8%25toBvvClW1TdrbGWkaaJI0iDL7cR0uTTDZf8IepElfhDDmZ9rzA5wY9KIq%25yx7JSXUvxNzzQ1spMomZas%25JVnpt5FW2CTtbMu0OGXV0n6DGcFkqpRmHf3gIREV4Ucl2P9qQzlwH88pYn4xByJYUPISSv31skjMvZ441UaqituOFaC1P8fTB8GhdVT6iHNHDkrRKLHDg88WiIu7lNePIQrElWzhpY%25A4zy7H38JK5vbS1JjpiH5MNXacoiMO53UyF%25mTEW8FdXgDrVb2Dw0rVLmQ95HcnIUf7He2gCePE3zZ9pPAnnu34wqJCx54S3p8G1UBM6sX1oquoRiZkFgtmiWBNvT8CuVQG280k%25DKr6hHyRnrfumTZ7gKPjl379h2KSpQN4OYqpxKKEZ5y%251dvB5sNW%25xXjbiLakXt%250wImOc8eTumGbBrf2dErADh2Rc9C4nLw7SIKnlEbch3eUpozN3YwgHjqAZ5WJ%25qvUx8vBSCX0MbBaZcSrko6mfFckTCj1ZuWg29VEuD66VOh0QnxHwhIggGEKfy3sPUKzQOD4N9jqt4ZNJyac6%25xOBG1C%25MjUAfbsdkRi6bFOeJCctLul8gcVdAhQEGehYrQE9rzqK0J44ZNFrSTl2Prm51C%25V6VBrl7yFiiZmRCFLDctLAlVi9lqoj6S1yNOJt800GTTumP6vrJaH9aNwUlSLao9nAQWfenKbtN5y%25TjEUIVHwhWkIvGXVvVt0OFaMdE',
            'https://cosy.bmwgroup.com/cdp/cosySec?COSY-EU-100-8074HMrjSho5OZZ%2598zhpn%25m53qojyxsm%25OJtvzDRnrM3G06KzSkkocHWmRrLFRbYOizUzVEuh6P3eUXJCVojMva4d7Kfy3sPUKzQQy4N9jqt4ZNJyeQj%25xOBG1C%25MjONLbsdkRi6bFOan9ctLul8gcVdISEEGehYrQEHLziewRAKv7ywPeg8AUlSNapjU4AMSMZYo%25T5OZ1Seg%25CvWbDXdCiof4v6a0cImL68W9uugTfEz2egr0tfEQD9wJnAQ7f4l9yIxUM3Syp9oUkjzsZFqoj5xWtDOJtCVBWOXsRutdMG6Hk0dmtoSvLFRgPufL2G9B2eVlQ4h9enR0wGAHYy1KxA3lfEUSPvjiNsSqYYwRo4aO8%25toBvxMHW1TdrbGWkaa6Y0iDL7cR0uTTMzf8IepElfhDDIC9rzA5wY9KII2Cx7JSXUvxNzBbjspMomZas%25JJyit5FW2CTtbMH35GXV0n6DGcFhfdRmHf3gIREVuB5l2P9qQzlwH1ZEYn4xByJYUPrr5v31skjMvZ4zooaqituOFaC11iZTB8GhdVT6i4r9DkrRKLHDg8P%25PIu7lNePIQrr08zhpY%25A4zy7wY0JK5vbS1JjpPqrMNXacoiMO58PXF%25mTEW8FdXqZjVb2Dw0rVLmQI7HcnIUf7He2yxXPE3zZ9pPAnQ6A4wqJCx54S33hq1UBM6sX1oq5rRiZkFgtmiWBhWl8CuVQG280k%25aDr6hHyRnrfubIN7gKPjl379h2DCpQN4OYqpxKnNo5y%251dvB5sNNwCXjbiLakXt%250bsmOc8eTumGbfUz2dErADh2Rck79nLw7SIKnlEx613eUpozN3YwcEKqAZ5WJ%25qvUQPOBSCX0MbBaZsrako6mfFckTCEo7uWg29VEuD6OiCh0QnxHwhIggHdKfy3sPUKzQQRwN9jqt4ZNJydI1%25xOBG1C%25MjTEgbsdkRi6bFOZS9ctLul8gcVdAM6EGehYrQEHLSKywRAKv7ywx7JBNfM11C%25V7oDYn4iBUQXB0rVz8gFGHcnypp3KKxAk6a0SIftBWO9soBbwlc2dEzLZ6M41C%259KMDYn4D4lxePIHAZ'
        ]);*/
        component.set("v.slides", aValues);
        
    }

})