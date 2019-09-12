
var getPokeCollectionInfo = function(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(obj) {
            return obj.results.map(serializePokeInfo)
        }).then(function(arr) {
            return arr;
        })
};

var getBaseUrl = function(baseUrl) {
    return function(endpoint) {
        return baseUrl + endpoint + "/";
    };
};

var makeRequest = getBaseUrl("https://pokeapi.co/api/v2/pokemon/");

function serializePokeInfo(obj) {
    var first_part = obj.url.slice(pokeUrl.length).replace('/', '');
    var second_part = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);
    var elem = [];
    elem.push(first_part);
    elem.push(second_part);
    return elem;
}

function createOrderedListFromArray(arr) {
    var list = "";
    for (var i = 0; i < arr.length; i++) {
        list += '<li id="' + arr[i][0] + '"><span>' + arr[i][0] + '. </span><span>' + arr[i][1] + '</span></li>';
    }
    return '<ul style="list-style: none;">' + list + '</ul>';
}
var pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
var arrayWithPokeInfo = [];
getPokeCollectionInfo(pokeUrl)
    .then(function(result) {
        return result;
    }).then(function(result) {
        return createOrderedListFromArray(result);
    }).then(function(result) {
        $('#left').append(result);
        $("li").css({
            "cursor": "pointer",
            "margin-top": "5px",
            "margin-bottom": "5px",
        });
        // $("li").forEach(clickElement);
});

function clickElement(item) {
    document.getElementById(item.id).onclick = makeRequest(item.id);
}

var pokeMonUrl = "https://pokeapi.co/api/v2/pokemon/1/";

var getPokeInfo = function(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(obj) {
            return obj;
        })
};


var createDivAboutPoke = function(obj) {
    var elements = "";
    elements += '<img src="' + obj.imageUrl + '">';
    elements += '<p>Имя: ' + obj.name + '</p>';
    elements += '<p>Тип: ' + obj.types.join(", ") + '</p>';
    elements += '<p>Рост: ' + obj.height + '</p>';
    elements += '<p>Вес: ' + obj.weight + '</p>';
    return elements;
};

$(document).on("click", "li", function() {
    var id = $(this).attr("id");
    var url = makeRequest(id);
    getPokeInfo(url)
        .then(function(result) {
            var obj = {};
            obj.imageUrl = result.sprites.front_default;
            obj.name = result.name.charAt(0).toUpperCase() + result.name.slice(1);
            obj.height = result.height;
            obj.weight = result.weight;
            obj.types = [];
            for (var i = 0; i < result.types.length; i++) {
                obj.types.push(result.types[i].type.name);
            }
            return obj;
        }).then(function(obj) {
        return createDivAboutPoke(obj);
    }).then(function(result) {
        $('#right').empty();
        $('#right').append(result);
    });
});

