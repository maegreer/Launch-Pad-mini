function dadAPI () {
    $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://icanhazdadjoke.com/',
    async: false,
    crossDomain: true,


    complete: function (response) {
        if(response.readyState === 4 && response.status ===  200) {
            console.log(response.responseJSON.joke);
            document.getElementById("testelm").innerHTML = response.responseJSON.joke
        }
    }


})};