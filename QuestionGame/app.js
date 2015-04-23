angular.module('question-game', ['ng', 'ngMaterial'])
	.service('gameService', ["$http", function($http)
	{
		this.Score = 0;
		this.MaxLives = 3;
		this.Lives = 3;
		this.Name = "";
		this.QuestionsAnswered = 0;
		this.DefaultScore = 30;
		this.GameOver = false;

        this.SaveQuestion = function(question)
        {
            $http.post("localhost:90/questiongame/question/", question)
        };
	}])
	.controller('game', ["$scope", "$interval", "gameService", function($scope, $interval, gameService)
	{
		$scope.GameService = gameService;

		$scope.Answer = function(id)
		{
			if(id == $scope.Question.CorrectAnswerId)
			{
				gameService.Score += Math.floor((gameService.DefaultScore * $scope.Question.TimeLeftPercentage));
                $interval.cancel($scope.Interval);
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
		}
	}]);