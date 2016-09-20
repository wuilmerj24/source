var url = "http://www.dignitarycard.net/validateC.aspx";
var storage = window.localStorage;
var transactUrl = "http://www.dignitarycard.net/validateTR.aspx";


function loadCustomer(customerQR) {
		$.ajax({
			url: 'http://www.dignitarycard.net/validateC.aspx',
			type: 'GET',
			data: { qr: customerQR, type: "cv" },
			success: function(data){
					var obj = jQuery.parseJSON(data)

					if (obj.isValid == "1") {
						storage.setItem("custId", obj.custId);
						storage.setItem("name", obj.name);
						storage.setItem("email", obj.email);
						app.manifestBtn();
						$("#CustomerBtn").fadeOut();
						document.getElementById('CustomerBtn').style.display="none";
						alert("done")
					}
					else {
						alert("Customer QR Code Not Valid");
					}
			},
			//app.manifestBtn();
			error: function(data) {
				alert('There was an error processing this QR code.'); //or whatever
			}
		});
},


function loadVendor(VendorQR)  {
		$.ajax({
			url: 'http://www.dignitarycard.net/validateC.aspx',
			type: 'GET',
			data: { qr: VendorQR, type: "vv" },
			success: function(data){
					var obj = jQuery.parseJSON(data)
					if (obj.isValid == "1") {
						storage.setItem("vendId", obj.vendId);
						storage.setItem("vendor_name", obj.vendor_name);
						storage.setItem("address", obj.address);
						storage.setItem("vendQR", VendorQR);
						window.location.replace("transaction.html");

					}else {
						alert("Customer QR Code Not Valid");
					}
			},
			error: function(data) {
				alert('There was an error processing this QR code.'); //or whatever
			}
			//app.manifestBtn();

		});
}
