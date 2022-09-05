var calApp = angular.module("calApp", []);

calApp.controller("StepsController", [
  "$scope",
  function ($scope) {
    $scope.calculate = (x, n) => {
      if (!$scope.inputForm.$valid) {
        return false;
      }
      $scope.steps = [];
      $scope.steps2 = [];
      $scope.answer = undefined;
      $scope.N = n;
      $scope.X = x;

      let a = parseInt(n),
        b = parseInt(a / x),
        c = parseInt(x),
        d = parseInt(a) % x;
      //   console.log(a, b, c, d);

      $scope.steps.push({ a, b, c, d });
      while (d !== 1) {
        if (d < 1) return false;
        a = c;
        b = parseInt(a / d);
        c = d;
        d = a % c;
        $scope.steps.push({ a, b, c, d });
      }
      // console.log($scope.steps);
      if ($scope.steps.length > 1) {
        a = -$scope.steps[$scope.steps.length - 1].b;
        b = $scope.steps[$scope.steps.length - 2].a;
        c =
          1 +
          -$scope.steps[$scope.steps.length - 1].b *
            -$scope.steps[$scope.steps.length - 2].b;
        d = $scope.steps[$scope.steps.length - 1].a;
        $scope.steps2.push({ a, b, c, d });
        // console.log(a, b, c, d);
        for (i = $scope.steps.length - 2; i >= 1; i--) {
          // console.log(a, b, c, d);
          let tmp_a = c;
          d = b;
          b = $scope.steps[i - 1].a;
          c = a + c * -$scope.steps[i - 1].b;
          a = tmp_a;
          $scope.steps2.push({ a, b, c, d });
        }
        const lastStep = $scope.steps2[$scope.steps2.length - 1];
        console.assert(lastStep.a * lastStep.b + lastStep.c * lastStep.d === 1);

        $scope.answer = lastStep.c;
      } else {
        const lastStep = $scope.steps[0];
        console.assert(lastStep.a - lastStep.b * lastStep.c === 1);
        $scope.answer = -lastStep.b;
      }

      return true;
    };
  },
]);
