var url = "http://www.dignitarycard.net/validateC.aspx";
var storage = window.localStorage;
var transactUrl = "http://www.dignitarycard.net/validateTR.aspx";


function loadCustomer(customerQR) {
        $.get(url, { qr: customerQR, type: "cv" })
		.done(function (data) {
		    var obj = jQuery.parseJSON(data)
		    if (obj.isValid == "1") {
		        storage.setItem("custId", obj.custId);
		        storage.setItem("name", obj.name);
		        storage.setItem("email", obj.email);
		    }
		    else {
		        alert("Customer QR Code Not Valid");
		      
		    }
		});
    
}

function loadVendor(VendorQR) {
  $.get(url, { qr: VendorQR, type: "vv" })
		.done(function (data) {
		    var obj = jQuery.parseJSON(data)
		    if (obj.isValid == "1") {
		        storage.setItem("vendId", obj.vendId);
		        storage.setItem("vendor_name", obj.vendor_name);
		        storage.setItem("address", obj.address);
		        storage.setItem("vendQR", VendorQR);
		        window.location.replace("transaction.html");
		    }
		    else {
		        alert("Vendor QR Code Not Valid");
		      
		    }
		});
}
