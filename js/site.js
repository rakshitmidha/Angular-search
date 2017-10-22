var app = angular.module('BuildingRadarSearch',[]);
 
app.controller('BuildingRadarSearchCtrl',function($scope,$http){
	$http.get('data.json').success(function(data, status, headers, config) {
		$scope.items = data.data;
	}).error(function(data, status, headers, config) {
		console.log("No data found..");
  });
});
 
app.filter('searchFor', function(){
	return function(arr, searchString){
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();
		angular.forEach(arr, function(item){
			if(item.title.toLowerCase().indexOf(searchString) !== -1){
			result.push(item);
		}
		});
		return result;
	};
});
