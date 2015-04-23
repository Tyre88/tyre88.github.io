angular.module('question-game', ['ng', 'ngMaterial'])
    .config(function($mdThemingProvider)
    {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('blue');
    })
	.service('gameService', ["$http", "$q", function($http, $q)
	{
		this.Score = 0;
		this.MaxLives = 3;
		this.Lives = 3;
		this.Name = "";
		this.QuestionsAnswered = 0;
		this.DefaultScore = 30;
		this.GameOver = false;

        this.GetQuestion = function(id)
        {
            var deferred = $q.defer();

            $http.get("questions.json").success(function(data)
            {
                if(data)
                {
                    for(var i = 0; i < data.length; i++)
                    {
                        if(data[i].Id == id)
                        {
                            deferred.resolve(data[i]);
                            break;
                        }
                    }
                }
                else
                    deferred.reject();
            });

            return deferred.promise;
        };
	}])
	.controller('game', ["$scope", "$interval", "gameService", function($scope, $interval, gameService)
	{
		$scope.GameService = gameService;
        $scope.Rotate = false;

		$scope.Answer = function(id)
		{
			if(id == $scope.Question.CorrectAnswerId)
			{
				gameService.Score += Math.floor((gameService.DefaultScore * $scope.Question.TimeLeftPercentage));
                gameService.QuestionsAnswered++;
                $interval.cancel($scope.Interval);
                $scope.Rotate = true;

                setTimeout(function()
                {
                    gameService.GetQuestion(gameService.QuestionsAnswered + 1).then(function(data)
                    {
                        $scope.Question = data;
                        $scope.Rotate = false;
                        setTimeout(function()
                        {
                            $scope.Interval = $interval($scope.IntervalFunction, 10, 0, true);
                        }, 500);

                    });
                }, 1500);
			}
			else
			{
				gameService.Lives--;
			}
		};

        $scope.IntervalFunction = function()
        {
            $scope.Question.TimeLeft -= 0.01;
            $scope.Question.TimeLeftPercentage = ($scope.Question.TimeLeft / $scope.Question.StartTime) * 100;

            if($scope.Question.TimeLeftPercentage <= 50)
            {
                $interval.cancel($scope.Interval);
                gameService.GameOver = true;
            }
        };

		$scope.Interval = $interval($scope.IntervalFunction, 10, 0, true);

		$scope.Question = {
			Name: "Vad heter sveriges kung?",
			CorrectAnswerId: 4,
			StartTime: 30.0,
			TimeLeft: 30.0,
			TimeLeftPercentage: 100,
			Options: [
				{
					Text: "Fredrik Reinfeldt",
					Id: 1
				},
				{
					Text: "Anders Borg",
					Id: 2
				},
				{
					Text: "Karl Fredrik",
					Id: 3
				},
				{
					Text: "Karl Gustav",
					Id: 4
				}
			]
		};

        gameService.GetQuestion(gameService.QuestionsAnswered + 1).then(function(data)
        {
            $scope.Question = data;
        });
	}]);