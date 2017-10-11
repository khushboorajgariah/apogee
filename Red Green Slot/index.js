$(document).ready(function(){

    var offerDetails = {},
        transactionId,
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
                encryptedUserId: "abcd",
                routeId: "abcd",
                addOnType: "abcd"
            };
            $.ajax({
                url: 'res/data/fetchDetails.json',
                data: request,
                type: 'GET',
                success: function (response) {
                    offerDetails = response.data;
                    populateOfferDetails(offerDetails);
                }
            });
        },

        populateOfferDetails = function (offerDetails) {
                $('article .loader').hide();
                $('#articleContent').show();

                var noOfRides = offerDetails.no_of_rides + " Rides",
                    price = "&#8377;" + offerDetails.price,
                    validity = offerDetails.validity.toUpperCase() + " VALIDITY";

                $('#noOfRides').text(noOfRides);
                $('#price').html(price);
                $('#validity').text(validity);
        },

        handlePayment = function () {
            var createTransaction = function () {
                    var request = {
                        encryptedUserId: "abcd",
                        packageId: offerDetails.packageId,
                        paymentGateway: offerDetails.paymentGateway,
                        amount: offerDetails.price
                    };

                    $.ajax({
                        url: 'res/data/createTransaction.json',
                        data: request,
                        type: 'GET',
                        success: function (response) {
                            transactionId = response.data.transactionId;
                            initiateRazorpay(transactionId);
                        }
                    });
                },

                initiateRazorpay = function (transactionId) {
                    var options = {
                            "key": "rzp_test_Rm7c2W5cB1ZxqA",
                            "amount": offerDetails.price,
                            "name": "Shuttl",
                            "handler": function (razorpayResponse){
                                var request = {
                                    encryptedUserId: "abcd",
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
                        url: 'res/data/captureTransaction.json',
                        data: request,
                        type: "GET",
                        success: function (response) {
                           $('#successContainer').css('display', 'flex');
                        },
                        error: function () {
                            $('#errorContainer').css('display', 'flex');
                        }
                    });
                };

            createTransaction();
        },

        redirectToHome = function (event) {
            $(event.target).parent('.overlay').css('display', 'none');
        };

    initiate();

});