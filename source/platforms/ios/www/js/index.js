var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        //events click button
        var CustomerBtn=document.getElementById('CustomerBtn');
        CustomerBtn.addEventListener('click',app.scannCustomer,false);

        var VendorBtn=document.getElementById('VendorBtn');
        VendorBtn.addEventListener('click',app.scannVendor,false);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    //function to scann
    scannCustomer:function(){
      cordova.plugins.barcodeScanner.scan(
          function (result) {
              loadCustomer(result.text);
                   //   loadVendor(result.text);
          },
          function (error) {
              alert("Scanning failed: " + error);
          },
          {
              "preferFrontCamera" : false, // iOS and Android
              "showFlipCameraButton" : true, // iOS and Android
              "prompt" : "Place a barcode inside the scan area", // supported on Android only
              "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
          }
       );
    },
	 scannVendor:function(){
      cordova.plugins.barcodeScanner.scan(
          function (result) {
                 //     loadCustomer(result.text);
                 loadVendor(result.text);
          },
          function (error) {
              alert("Scanning failed: " + error);
          },
          {
              "preferFrontCamera" : false, // iOS and Android
              "showFlipCameraButton" : true, // iOS and Android
              "prompt" : "Place a barcode inside the scan area", // supported on Android only
              "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
          }
       );
    },

    manifestBtn:function(){
      if ((storage.getItem("custId") === null)){
        $("#CustomerBtn").show();
      }else{
        $("#CustomerBtn").hide();
        document.getElementById('CustomerBtn').style.display="none";
      }
    }
};

app.initialize();
