var url = "http://www.dignitarycard.net/dignitary/validateC.aspx";
var storage = window.localStorage;
var transactUrl = "http://www.dignitarycard.net/validateTR.aspx";

document.addEventListener("touchstart", function(){}, true);

$(function() {
    'use strict';

    var dataSplash = $('.page-content').attr('data-splash');
    var dataRedirect = $('.page-content').attr('data-redirect');
    if(dataSplash>0){
        $('.loading-mask').addClass('stop-loading');
        setTimeout(function(){
            goToPage(dataRedirect);
        },dataSplash);
    }
    $("#submit-form").submit(function(event) {
        var dataRedirect = $(this).attr('data-redirect');
        goToPage(dataRedirect);
        event.preventDefault();
        return false;
    });
    if (navigator.userAgent.match(/Mobi/)) {
        $('.mobile-wrapper').width('100%');
    }
    $('#grid-1-column').on('click', function(){
        $('.portfolio-gallery').find('.portfolio-item')
            .removeClass('grid-1-column grid-2-columns grid-3-columns')
            .addClass('grid-1-column');
        $('.options-new .small-button').removeClass('selected');
        $(this).addClass('selected');

        return false;
    });
    $('#grid-2-columns').on('click', function(){
        $('.portfolio-gallery').find('.portfolio-item')
            .removeClass('grid-1-column grid-2-columns grid-3-columns')
            .addClass('grid-2-columns');
        $('.options-new .small-button').removeClass('selected');
        $(this).addClass('selected');

        return false;
    });
    $('#grid-3-columns').on('click', function(){
        $('.portfolio-gallery').find('.portfolio-item')
            .removeClass('grid-1-column grid-2-columns grid-3-columns')
            .addClass('grid-3-columns');
        $('.options-new .small-button').removeClass('selected');
        $(this).addClass('selected');

        return false;
    });
    $('input:radio.radio-bullet', '.w-form').change( function(){
        var name = $(this).attr('name');
        $('input:radio[name="'+ name +'"]').each(function( index ) {
          $(this).prev('.radio-bullet-replacement').removeClass('checked');
        });
        if ($(this).is(':checked')) {
            $(this).prev('.radio-bullet-replacement').addClass('checked');
        }else{
            $(this).prev('.radio-bullet-replacement').removeClass('checked');
        }
    });
    $('input:checkbox.checkbox-input', '.w-form').change( function(){
        if ($(this).is(':checked')) {
            $(this).prev('.checkbox-handle').addClass('checked');
            $(this).next('.checkbox-label').addClass('checked');
        }else{
            $(this).prev('.checkbox-handle').removeClass('checked');
            $(this).next('.checkbox-label').removeClass('checked');
        }
    });
    // Loading Pages
    $('.loading-mask').addClass('stop-loading');
    $('[data-load="1"]').on('click',  function(e){
        $('.loading-mask').removeClass('stop-loading');
        //e.preventDefault();
        /*var hrefPage = $(this).attr('href');
        setTimeout(function(){
            goToPage(hrefPage);
        },10);
        return false;*/
    });
    var goToPage = function(hrefPage){
        document.location = hrefPage;
    };
    window.onpopstate = function(e){
        $('.loading-mask').addClass('stop-loading');
    };
});



$("#btnVerify").click(function() {
	//alert()
	$.get( url, { qr: "hgw35ty43t3543y", type: "cv" } )
		.done(function( data ) {
		var obj = jQuery.parseJSON(data)
		if(obj.isValid == "1")
		{
			storage.setItem("custId", obj.custId);
			storage.setItem("name", obj.name);
			storage.setItem("email", obj.email);
			window.location.replace("vendorQR.html");
		}
		else
		{
			//alert()
			//$("#msgLoginInvalid").show();
		}
	});
});


$("#btnVendorVerify").click(function() {
	$.get( url, { qr: "897yt98yt98y098y98y", type: "vv" } )
		.done(function( data ) {
		var obj = jQuery.parseJSON(data)
		if(obj.isValid == "1")
		{
			//alert(obj.vendor_name)
			storage.setItem("vendId", obj.vendId);
			storage.setItem("vendor_name", obj.vendor_name);
			storage.setItem("address", obj.address);
			window.location.replace("transaction.html");
		}
		else
		{
			
			//$("#msgLoginInvalid").show();
		}
	});
});

$("#btnConfirmTrans").click(function () {
    $.get(transactUrl, { type: "tr", vendId: storage.getItem("vendId"), custId: storage.getItem("custId"), latitude: storage.getItem("latitude"), longitude: storage.getItem("longitude"), points: $('#amountSpent').val() })
		.done(function (data) {
		    var obj = jQuery.parseJSON(data)
		    if (obj.isConfirmed == "1") {
		        $("#btnConfirmTrans").hide();
		        $(".isConfirmed").show();
		    }
		    else {

		        //$("#msgLoginInvalid").show();
		    }
		});
});

function loadTrans()
{
	$("#cust-name").val(storage.getItem("name"));
	$("#vend-name").val(storage.getItem("vendor_name"));
	$("#vend-address").val(storage.getItem("address"));
	GetLocation();
}

function GetLocation() {
    var options = { maximumAge: 0, timeout: 10000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(function (successPosition) {
        var latitude = successPosition.coords.latitude;
        var longitude = successPosition.coords.longitude;
        storage.setItem("latitude", latitude);
        storage.setItem("longitude", longitude);
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 13
        });
        var latLng = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            map: map,
            position: latLng
        });
    }, function (errorPosition) {

    }, options);
}