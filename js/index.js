var app = angular.module('BuildingRadarSearch',[]);
 
app.controller( 'BuildingRadarSearchCtrl', function($scope, $http) {
	$http.get('data.json')
		.success(function(data, status, headers, config) {
		$scope.data = data;
		})
		.error(function(data, status, headers, config) {
		console.log("No data found..");
  });
});
 
app.filter("searchFor", function () {
    return function (input, searchText, AND_OR) {
    	if(!searchText) return null;
        var returnArray = [],
            // Split on single or multi space
            splitext = searchText.toString().toLowerCase().split(/\s+/),
            // Build Regexp with Logical AND using "look ahead assertions"
            regexp_and = "(?=.*" + splitext.join(")(?=.*") + ")",
            // Build Regexp with logicial OR
            regexp_or = searchText.toString().toLowerCase().replace(/\s+/g, "|"),
            // Compile the regular expression
            re = new RegExp((AND_OR == "AND") ? regexp_and : regexp_or, "i");

        for (var x = 0; x < input.length; x++) {
            if (re.test(input[x])) returnArray.push(input[x]);
        }
        // View what the 2 regular expression look like
        console.log(regexp_or);
        console.log(regexp_and);
        return returnArray;
    }
});

function lookup() {
	if (document.getElementById("search").value.length > 0) {
    	document.getElementById("results").style.visibility = "visible";
  		} 
  	else {
    	document.getElementById("results").style.visibility = "hidden";
  	}
}

