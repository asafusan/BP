/**
 * Created by Asaf on 13/02/2016.
 */

var app = angular.module('BPFeed', ['angular-md5']);

app.controller('feedController', ['$scope', 'md5', function ($scope, md5) {
    /************************
     *      PUBLIC          *
     ************************/

    $scope.feedList = [];
    $scope.userFilterInput = '';
    $scope.email = '';
    $scope.content = '';

    $scope.handleFormSubmitted = function (email, content) {
        // get path to relevant gravatar
        var gravatarHash = md5.createHash(generateModifiedEmail(email));
        // arrange data for new message
        var newMessage = {email: email, content: content, gravatarHash: gravatarHash};

        addMessage(newMessage);
        clearForm();
    };

    /************************
     *      PRIVATE         *
     ************************/

    /**
     * generates a link for the gravatar image
     * @param {string} email
     * @returns {string}
     */
    var generateModifiedEmail = function (email) {
        return email.trim().toLowerCase();
    };

    /**
     * adds a new message to the beginning of the feed
     * @param newMessage
     */
    var addMessage = function (newMessage) {
        $scope.feedList.unshift(newMessage);
    };

    /**
     * clears the input fields of the form
     */
    var clearForm = function () {
        $scope.email = '';
        $scope.content = '';

    };
}]);

// filters by user's input.
// returns all messages that either email or content contains the user's input
app.filter('messageFilter', function() {
    return function(input, filterBy) {
        return input.filter(function(message) {
            return (message.email.indexOf(filterBy) > -1 || message.content.indexOf(filterBy) > -1);
        });
    }
});
