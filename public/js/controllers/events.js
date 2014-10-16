(function(angular) {
    'use strict';

    var EventsController = [
        '$scope', '$stateParams', '$location', 'Global', 'Events', 'Tags',
        function ($scope, $stateParams, $location, Global, Events, Tags) {
            $scope.tagOptions = Tags.query();

            $scope.global = Global;
            $scope.newEvent = {};

            $scope.create = function() {
                var event = new Events({
                    title: $scope.newEvent.title,
                    content: $scope.newEvent.content,
                    startTime: $scope.newEvent.startTime,
                    endTime: $scope.newEvent.endTime,
                    address: $scope.newEvent.address,
                    author: $scope.global.user._id,
                    tags: $scope.newEvent.tags
                });

                event.$save(function(response) {
                    $location.path('events/' + response._id);
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.remove = function(event) {
                event.$remove(function () {
                    $location.path('events');
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.update = function() {
                var event = $scope.event;
                if (!event.updated) {
                    event.updated = [];
                }
                event.updated.push(new Date().getTime());

                event.$update(function() {
                    $location.path('events/' + event._id);
                }, function (response) {
                    $scope.errors = response.data.errors;
                });
            };

            $scope.find = function() {
                Events.query(function(events) {
                    $scope.events = events;
                });
            };

            $scope.findOne = function() {
                $scope.event = {};

                Events.get({
                    _id: $stateParams.eventId
                }, function(event) {
                    $scope.event = event;
                });
            };

            $scope.spam = function(event) {
                event.$spam(function () {
                    $location.path('events');
                }, function(response) {
                    $scope.errors = response.data.errors;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('EventsController', EventsController);
})(window.angular);