const app = angular.module('musicApp', ['ngMaterial']);

function formatDate(isoDateStr) {
    let result = ''
    if (isoDateStr != null) {
        let date = new Date(isoDateStr);
        result = date.toLocaleDateString();
    }
    return result;
} // END formatDate