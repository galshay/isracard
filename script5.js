angular.module('ui.bootstrap.demo', ['ui.bootstrap','ngCookies']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope,$http,$uibModal, $log, $document,$cookies) {
    var $ctrl = this;
    $ctrl.items = [];
    $ctrl.animationsEnabled = true;
    $scope.readItems = function () {
        
        $scope.items = [];
        var url = "";
        url = "https://api.github.com/search/repositories?q=" + $scope.data+" in description";
        $scope.url = url;
        $http.get(url).then(function (res) {
            $scope.items = res.data.items;
            $scope.filteredItems = $scope.items;

        });
        

    };
    
    $ctrl.addBookmark = function(index,id)
    {
         var favoriteCookie = $cookies.get('bookmarid');
         $cookies.put('bookmarid', id);

    };
    $ctrl.open = function (index,type) {
      
        var currentRecord = $scope.items[index];
        
        $ctrl.items = [];
        if (type == "owner") {
            for (var key in currentRecord.owner) {
                var p = {};
                p.value = currentRecord.owner[key];
                p.name = key;
                $ctrl.items.push(p);

            }
        }
        if (type == "license") {
            for (var key in currentRecord.license) {
                var p = {};
                p.value = currentRecord.license[key];
                p.name = key;
                $ctrl.items.push(p);

            }
        }
        if (type == "detail") {
            for (var key in currentRecord) {
                if (key != "owner" && key != "license") {

                    var p = {};
                    p.value = currentRecord[key];
                    p.name = key;
                    $ctrl.items.push(p);
                }

            }
        }
        var modalInstance = $uibModal.open({
            
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size:'lg',
            controllerAs: '$ctrl',
            resolve: {
                
                items: function () {
                    return $ctrl.items;
                }
            }
        });
        
        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
    
    $ctrl.toggleAnimation = function () {
        $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
    };
});
// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };
    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
// Please note that the close and dismiss bindings are from $uibModalInstance.
