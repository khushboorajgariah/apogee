$(document).ready(function(){

    var getParameterByName = function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        offerDetails = {},
        transactionId,
        encryptedUserId = getParameterByName('euid'),
        routeId = getParameterByName('rid'),
        addOnType = getParameterByName('addonType'),
        errorContainer = $('#errorContainer'),
        baseURL = "https://qa.goplus.in",

        initiate = function () {
            registerEvents();
            fetchOfferDetails();
        },

        registerEvents = function () {
            $('#paymentButton').on('click', handlePayment);
            $('.overlay').find('button').on('click', redirectToHome);
        },

        fetchOfferDetails = function () {
            var request = {
                encryptedUserId: encryptedUserId,
                routeId: routeId,
                addOnType: addOnType
            };

            $.ajax({
                url: baseURL+'/v2/addOn/getDetails',
                data: request,
                type: 'GET',
                success: function (response) {
                    offerDetails = response.data;
                    populateOfferDetails();
                },
                error : function( error ){
                    errorContainer.html('<h4>Unable to Proceed.</h4>');
                    errorContainer.css('display', 'flex');
                    setTimeout(function(){
                        redirectToHome();
                    }, 3000);
                }
            });
        },

        populateOfferDetails = function () {
                $('article .loader').hide();
                $('#articleContent').show();

                $('#noOfRides').text(offerDetails.no_of_rides + " Rides");
                $('#price').html("&#8377;" + offerDetails.price);
                $('#validity').text(offerDetails.validity.toUpperCase() + " VALIDITY");
        },

        handlePayment = function () {

            var createTransaction = function () {
                    var request = {
                        encryptedUserId: encryptedUserId,
                        packageId: offerDetails.packageId,
                        paymentGateway: offerDetails.paymentGateway,
                        amount: offerDetails.price
                    };

                    $.ajax({
                        url: baseURL+'/v2/addOn/createTransaction',
                        data: request,
                        type: 'GET',
                        success: function (response) {
                            transactionId = response.data.transactionId;
                            initiateRazorpay(transactionId);
                        },
                        error: function () {
                            errorContainer.html('<h4>Unable to Proceed. Please try again.</h4><button>OKAY</button>');
                            errorContainer.css('display', 'flex');
                        }
                    });
                },

                initiateRazorpay = function (transactionId) {
                    var options = {
                            "key": "",
                            "amount": (offerDetails.price * 100),
                            "name": "Shuttl",
                            "description": "Booster Pack Payment",
                            "handler": function (razorpayResponse){
                                var request = {
                                    encryptedUserId: encryptedUserId,
                                    transactionId: transactionId,
                                    gatewayPaymentId: razorpayResponse.razorpay_payment_id,
                                    addOnPackageId: offerDetails.packageId,
                                    amount: offerDetails.price
                                };
                                captureTransaction(request);
                            },
                            "notes": {
                                "order_id": transactionId
                            },
                            "theme": {
                                "color": "00adb7"
                            }
                        },
                        rzp = new Razorpay(options);
                    rzp.open();
                },

                captureTransaction = function (request) {
                    $.ajax({
                        url: baseURL+'/v2/addOn/capturePaymentAndBuy',
                        data: JSON.stringify(request),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (response) {
                            if(!response.success) {
                                errorContainer.css('display', 'flex');
                            }else {
                                $('#successContainer').css('display', 'flex');
                            }
                        },
                        error: function () {
                            errorContainer.css('display', 'flex');
                        }
                    });
                };

            createTransaction();
        },

        redirectToHome = function () {

            var fLat = getParameterByName("fLat"),
                fLng = getParameterByName("fLng"),
                tLat = getParameterByName("tLat"),
                tLng = getParameterByName("tLng");

            window.location.href = "com.shuttl://mid:2?"+"fLat="+fLat+'&'+"fLng="+fLng+'&'+"tLat="+tLat+'&'+"tLng="+tLng;
        };

    initiate();

});