const app = angular.module('musicApp', []);
const musicController = app.controller('musicController', ['$http', musicCtl]);

/////////////////// /////////////////// /////////////////// ////////
// THIS IS THE musicController FUNCTION THAT DOES ALL THE STUFF ////
/////////////////// /////////////////// /////////////////// ///////
function musicCtl($http){
    let self = this; // IMPORTANT...to preserve this meaning of "this" in the semantic variable, "self" 

    // This will be what is sent with $http POST
    self.newSong = {}; 
    // This will be populated by song objects by a successful $http GET from the database
    // It will be iterated through by ng-repeat in the view
    self.songsArray = []; 

    self.addSong = function(song){
        console.log(song);
        
        $http({
            method: 'POST',
            url: '/songs/add',
            data: {song: song}
        }).then(function(response) {
            self.getSongs()
        }).catch(function(error) {
            console.log('ERROR IN POST songs/add', error);
        }); // END $http
    }; // END self.addSong

    self.getSongs = function() {
        $http({
            method: 'GET',
            url: '/songs'
        }).then(function(response){
            self.songsArray = response.data;
            for(let song of self.songsArray){
                song.published = formatDate(song.published);
                song.beingEdited = false;
            }
        }).catch(function(error) {
            console.log('ERROR IN GET /songs', error);
        }); // END $http
    }; // END self.getSongs


    // ON PAGE LOAD...
    self.getSongs();


}; // END musicCtl()


function formatDate(isoDateStr) {
    let result = ''
    if (isoDateStr != null) {
        let date = new Date(isoDateStr);
        result = date.toLocaleDateString();
    }
    return result;
} // END formatDate