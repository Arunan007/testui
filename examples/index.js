/* Global Value Declaration Starts */
var portalUrl = "http://arun-pt3004.csez.zohocorpin.com";
var portalPortNumber = "8919";
var curentLocationJson = { lat: "", long: "" };
/* Global Value Declarartion Ends */

/* Binding Events starts*/
jQuery(document).ready(function() {
  jQuery("#productsList").click(function() {
    getProductsResponse();
  });
  jQuery("#participantsList").click(function() {
    getCustomerResponse();
  });
  jQuery("#moveProduct").click(function() {
    getMoveProductResponse();
  });
});
/* Binding Events ends */

function getProductsResponse() {
  $.get(
    portalUrl + ":" + portalPortNumber + "/api/org.example.mynetwork.Product",
    function(data, status) {
      // alert("Data: " + data + "\nStatus: " + status);
    }
  );
}
function getCustomerResponse() {
  $.get(
    portalUrl + ":" + portalPortNumber + "/api/org.example.mynetwork.Product",
    function(data, status) {
      // alert("Data: " + data + "\nStatus: " + status);
    }
  );
}
function getMoveProductResponse() {
  $.get(
    portalUrl + ":" + portalPortNumber + "/api/org.example.mynetwork.Product",
    function(data, status) {
      // alert("Data: " + data + "\nStatus: " + status);
    }
  );
}
function loadDataforDashboard() {
  $.get(
    portalUrl + ":" + portalPortNumber + "/api/org.example.mynetwork.Customer",
    function(data, status) {
      // alert("Data: " + data + "\nStatus: " + status);
      jQuery("#partcipantsCount").html(data.length);
    }
  );
  $.get(
    portalUrl + ":" + portalPortNumber + "/api/org.example.mynetwork.Product",
    function(data, status) {
      // alert("Data: " + data + "\nStatus: " + status);
      jQuery("#productCountinDashboard").html(data.length);
    }
  );
  getAllTransactions();
}
function getAllTransactions() {
  $.get(portalUrl + ":" + portalPortNumber + "/api/system/historian", function(
    data,
    status
  ) {
    for (var i = 0; i < 5 && i < data.length; i++) {
      var transactionType = data[i].transactionType.split(".")[
        data[i].transactionType.split(".")["length"] - 1
      ];
      var timeStamp = data[i].transactionTimestamp;
      var transactionId = data[i].transactionId;
      if (data[i].hasOwnProperty("participantInvoking")) {
        var particantType = data[i].participantInvoking.split(".")[
          data[i].participantInvoking.split(".")["length"] - 1
        ];
      } else {
        var particantType = "SYSTEM CREATED";
      }
      var $row =
        "<tr>\
                            <td>" +
        transactionType +
        "</td>\
                            <td>" +
        particantType +
        "</td>\
                            <td>" +
        timeStamp +
        '</td>\
                            <td><i class="fas fa-arrow-up text-success mr-3"></i>' +
        transactionId +
        "</td>\
                        </tr>";
      jQuery("#transactionsTableBody").append($row);
    }
    jQuery("#transactionCountinDashboard").html(data.length);
  });
}
function getAllTransactionsPAGE() {
  $.get(portalUrl + ":" + portalPortNumber + "/api/system/historian", function(
    data,
    status
  ) {
    for (var i = data.length - 1; i >= 0; i--) {
      var transactionType = data[i].transactionType.split(".")[
        data[i].transactionType.split(".")["length"] - 1
      ];
      var timeStamp = data[i].transactionTimestamp;
      var transactionId = data[i].transactionId;
      if (data[i].hasOwnProperty("participantInvoking")) {
        var particantType = data[i].participantInvoking.split(".")[
          data[i].participantInvoking.split(".")["length"] - 1
        ];
      } else {
        var particantType = "SYSTEM CREATED";
      }
      var $row =
        '<tr>\
                            <td><i class="fas fa-arrow-up text-success mr-3"></i>' +
        transactionType +
        "</td>\
                            <td>" +
        particantType +
        '</td>\
                            <td>\
                                <span class="badge badge-dot mr-4"><i class="bg-success"></i><span class="status">' +
        timeStamp +
        "</span></span>\
                            </td>\
                            <td>" +
        transactionId +
        "</td>\
                        </tr>";
      jQuery("#transactionsTableBody").append($row);
    }
  });
}
function getAllProducts() {
  $.get(
    portalUrl + ":" + portalPortNumber + "/api/org.example.mynetwork.Product",
    function(data, status) {
      for (var i = 0; i < data.length; i++) {
        var proId = data[i].productId;
        var proName = data[i].producttype;
        var amount = data[i].amount;
        var lati = data[i].latitude;
        var longi = data[i].longitude;
        var description = data[i].description;
        var owner = data[i].owner;
        var issuer = data[i].issuer;
        var $row =
          "<tr>\
                            <td>" +
          proId +
          "</td>\
                            <td>" +
          proName +
          "</td>\
                            <td>Rs." +
          amount +
          "</td>\
                            <td>" +
          lati +
          "</td>\
                            <td>" +
          longi +
          "</td>\
                            <td>" +
          owner +
          "</td>\
                            <td>" +
          issuer +
          "</td>\
                            <td>" +
          description +
          "</td>\
                        </tr>";
        jQuery("#productsTableBody").append($row);
      }
    }
  );
}
function getAllParticipants() {
  $.get(
    portalUrl + ":" + portalPortNumber + "/api/org.example.mynetwork.Customer",
    function(data, status) {
      for (var i = 0; i < data.length; i++) {
        var email = data[i].email;
        var firstName = data[i].firstName;
        var lastName = data[i].lastName;
        var type = data[i].type;
        var $row =
          "<tr>\
                            <td>" +
          email +
          "</td>\
                            <td>" +
          firstName +
          "</td>\
                            <td>" +
          lastName +
          "</td>\
                            <td>" +
          type +
          "</td>\
                        </tr>";
        jQuery("#participantTableBody").append($row);
      }
    }
  );
}
function tableToggleDarkOrLightMode(id) {
  if (jQuery("#tableThemeMode")[0].checked == false) {
    jQuery("#" + id).addClass("bg-default shadow");
    jQuery("#tableThemeCardHeader").addClass("bg-transparent");
    jQuery("#tableThemeCardHeader h3").addClass("text-white");
    jQuery("#thead-id")
      .removeClass("thead-light")
      .addClass("thead-dark");
    jQuery("#tableId").addClass("table-dark");
  }
  if (jQuery("#tableThemeMode")[0].checked == true) {
    jQuery("#" + id).removeClass("bg-default shadow");
    jQuery("#tableThemeCardHeader").removeClass("bg-transparent");
    jQuery("#tableThemeCardHeader h3").removeClass("text-white");
    jQuery("#thead-id")
      .addClass("thead-light")
      .removeClass("thead-dark");
    jQuery("#tableId").removeClass("table-dark");
  }
}
function showAddProductForm() {
  jQuery("#productsTableDivCard").hide();
  jQuery("#addProductForm").show();
  getLocation();
}
function showAddParticipantForm() {
  jQuery("#participantTableDivCard").hide();
  jQuery("#addParticipantForm").show();
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser. Try adding Manually!");
  }
}
function showPosition(position) {
  jQuery("#addProductLatitudeField").val(position.coords.latitude);
  jQuery("#addProductLongitudeField").val(position.coords.longitude);
  curentLocationJson["lat"] = position.coords.latitude;
  curentLocationJson["long"] = position.coords.longitude;
  map(curentLocationJson["lat"], curentLocationJson["long"]);
}
function addProductFormData() {
  var addProductDataJson = {
    $class: "org.example.mynetwork.Product"
  };
  var proId = jQuery("#addProductIdField").val();
  var proName = jQuery("#addProductNameField").val();
  var proOwner = jQuery("#addProductOwnerField").val();
  var proDesc = jQuery("#addProductDescriptionField").val();
  var proAmount = jQuery("#addProductAmountField").val();
  var proLati = jQuery("#addProductLatitudeField").val();
  var proLongi = jQuery("#addProductLongitudeField").val();
  if (
    proId != "" &&
    proName != "" &&
    proOwner != "" &&
    proAmount != "" &&
    proLati != "" &&
    proLongi != "" &&
    proId.trim() != "" &&
    proName.trim() != "" &&
    proOwner.trim() != "" &&
    proAmount.trim() != "" &&
    proLati.trim() != "" &&
    proLongi.trim() != ""
  ) {
    addProductDataJson["productId"] = proId;
    addProductDataJson["producttype"] = proName;
    addProductDataJson["amount"] = proAmount;
    addProductDataJson["latitude"] = proLati;
    addProductDataJson["longitude"] = proLongi;
    addProductDataJson["owner"] = proOwner;
    addProductDataJson["issuer"] = " ";
    addProductDataJson["description"] = proDesc;
    $.post(
      portalUrl + ":" + portalPortNumber + "/api/org.example.mynetwork.Product",
      addProductDataJson,
      function(result) {
        location.reload();
        alert("Product Added Successfully");
      }
    ).fail(function() {
      alert("Product Id already Exists!");
    });
  } else {
    alert("Please provide all the input");
  }
}
function moveProductFormData() {
  var moveProductDataJson = {
    $class: "org.example.mynetwork.MoveProduct"
  };
  var proId = jQuery("#moveProductIdField").val();
  var proIssuer = jQuery("#moveProductIssuerField").val();
  var proOwner = jQuery("#moveProductNewOwnerField").val();
  var proAmount = jQuery("#moveProductAmountField").val();
  var proLati = jQuery("#moveProductLatitudeField").val();
  var proLongi = jQuery("#moveProductLongitudeField").val();
  if (
    proId != "" &&
    proIssuer != "" &&
    proOwner != "" &&
    proAmount != "" &&
    proLati != "" &&
    proLongi != ""
  ) {
    moveProductDataJson["product"] =
      "resource:org.example.mynetwork.Product#" + proId;
    moveProductDataJson["amount"] = proAmount;
    moveProductDataJson["latitude"] = proLati;
    moveProductDataJson["longitude"] = proLongi;
    moveProductDataJson["newOwner"] =
      "resource:org.example.mynetwork.Customer#" + proOwner;
    moveProductDataJson["issuer"] =
      "resource:org.example.mynetwork.Customer#" + proIssuer;
    $.post(
      portalUrl +
        ":" +
        portalPortNumber +
        "/api/org.example.mynetwork.MoveProduct",
      moveProductDataJson,
      function(result) {
        alert("Product Transfered Successfully");
      }
    ).fail(function() {
      alert("Product Transfer Failed");
    });
  } else {
    alert("Please provide all the input");
  }
}
function addParticipantFormData() {
  var addParticipantDataJson = {
    $class: "org.example.mynetwork.Customer"
  };
  var parEmail = jQuery("#addParticipantEmailField").val();
  var parFname = jQuery("#addPaticipantFnameField").val();
  var parLname = jQuery("#addPaticipantLnameField").val();
  var parDesc = jQuery("#addParticipantDescriptionField").val();
  if (
    parEmail != "" &&
    parFname != "" &&
    parLname != "" &&
    parEmail.trim() != "" &&
    parFname.trim() != "" &&
    parLname.trim() != ""
  ) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(parEmail)) {
      alert("Enter the valid Email address");
    } else {
      addParticipantDataJson["email"] = parEmail;
      addParticipantDataJson["firstName"] = parFname;
      addParticipantDataJson["lastName"] = parLname;
      addParticipantDataJson["type"] = parDesc;
      console.log(addParticipantDataJson);
      $.post(
        portalUrl +
          ":" +
          portalPortNumber +
          "/api/org.example.mynetwork.Customer",
        addParticipantDataJson,
        function(result) {
          location.reload();
          alert("Participant Added Successfully");
        }
      ).fail(function() {
        alert("Email Id already Exists!");
      });
    }
  } else {
    alert("Please provide all the input");
  }
}
function loadProductLocation() {
  var id = jQuery("#productIdForLocation").val();
  $.get(
    portalUrl +
      ":" +
      portalPortNumber +
      "/api/org.example.mynetwork.Product/" +
      id,
    function(data, status) {
      var lat = data["latitude"];
      var long = data["longitude"];
      map(lat, long);
    }
  );
}
function map(lat, long) {
  // Where you want to render the map.
  var elem = document.getElementById("osm-map");
  if (elem != null) {
    elem.innerHTML = "<div id='mapId'></div>";
    var element = document.getElementById("mapId");
    // Height has to be set. You can do this in CSS too.
    element.style = "height:600px;";
    // Create Leaflet map on map element.
    var map = L.map(element);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      // Add OSM tile leayer to the Leaflet map.
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var points = [
          [51.49346, -0.11518,"hello1"],
          [51.49827, -0.06763,"hello2"],
          [51.48331, -0.08154,"hello3"],
          [51.52284, -0.09974,"hello4"],
          [51.51932, -0.06695,"hello5"],
          [51.50949, -0.1363,"hello6"]
      ];

      var polyline = new L.Polyline([], {

        }).addTo(map);



        var customPopup = "Mozilla Toronto Offices<br/>";


        var customOptions =
            {
            'maxWidth': '500',
            'className' : 'custom'
            }
    var target = L.latLng(lat, long);
    map.setView(target, 10);



  for (var i = 0, l = points.length; i < l; i++){

    L.marker(L.latLng(points[i][0], points[i][1]),{title: points[i][2]}).bindPopup(points[i][2],customOptions).addTo(map);
    polyline.addLatLng({lat:points[i][0],lng:points[i][1]});

  }



  }
}
function mapSetView() {
  var element = document.getElementById("osm-map");
  element.style = "height:600px;";
}
function loadCurentLocationMap() {
  getLocation();
}
















//     // Init map
//     var map = L.map(element).setView([11.031246, 77.272339], 13);
//   L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
//       maxZoom: 18,
//       attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
//   }).addTo(map);
//
//   // get all 6 points
//   var points = [
//       [51.49346, -0.11518],
//       [51.49827, -0.06763],
//       [51.48331, -0.08154],
//       [51.52284, -0.09974],
//       [51.51932, -0.06695],
//       [51.50949, -0.1363]
//   ];
//
//   // polyline
//   var selection = [];
//   var polyline = new L.Polyline([], {
//       color: 'red',
//       weight: 5,
//       smoothFactor: 1
//   }).addTo(map);
//
//   var changeMarkerState = function (marker, select) {
//       if (marker instanceof L.CircleMarker) {
//           if (select) {
//               marker.setRadius(25);
//           } else {
//               marker.setRadius(10);
//           }
//       }
//       if (marker instanceof L.Marker) {
//           if (select) {
//               marker.options.title = 'selected';
//           } else {
//               marker.options.title = 'unselected';
//           }
//           marker.setIcon(new L.Icon.Default());
//       }
//   };
//
//   var onClick = function () {
//       var index = selection.indexOf(this);
//       if (index !== -1) {
//           changeMarkerState(this, false);
//           selection.splice(index, 1);
//           polyline.spliceLatLngs(index, 1);
//       } else {
//           changeMarkerState(this, true);
//           selection.push(this);
//           polyline.addLatLng(this.getLatLng())
//       }
//   };
//
// for (var i = 0, l = points.length; i < l; i++){
//   L.marker(points[i],
//           {title: i}).on('click', onClick).addTo(map);
// }
//
//
//
