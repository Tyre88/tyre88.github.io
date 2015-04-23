angular.module('question-game', ['ng', 'ngMaterial'])
	.service('gameService', function()
	{
		this.Score = 0;
		this.MaxLives = 3;
		this.Lives = 3;
		this.Name = "";
		this.QuestionsAnswered = 0;
		this.DefaultScore = 30;
		this.GameOver = false;
	})
	.controller('game', ["$scope", "$interval", "gameService", function($scope, $interval, gameService)
	{
		$scope.GameService = gameService;

		$scope.Answer = function(id)
		{
			if(id == $scope.Question.CorrectAnswerId)
			{
				gameService.Score += Math.floor((gameService.DefaultScore * $scope.Question.TimeLeftPercentage));
			}
			else
			{
				gameService.Lives--;
			}
		};

		$scope.Interval = $interval(function() {
			$scope.Question.TimeLeft -= 0.01;
			$scope.Question.TimeLeftPercentage = ($scope.Question.TimeLeft / $scope.Question.StartTime) * 100;

			if($scope.Question.TimeLeftPercentage <= 50)
			{
				$interval.cancel($scope.Interval);
				gameService.GameOver = true;
			}
		}, 10, 0, true);

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