$(document).ready(function(){
    //data di partenza è il 2018-01-01
    //creiamo un oggetto moment su questa data
    var dataCorrente = moment('2018-01-01');
    insertData(dataCorrente);
    insertHolidays(dataCorrente);

    $('#next').click(function(){
        var dataC = moment($('.month').data('this-date'));
            console.log(dataC);
            console.log(dataC.month());
        if(dataC.month() == 11){
            alert('Mese non disponibile');
        }else{
            var newData = dataC.add(1,'M');
        }
        insertData(newData);
        insertHolidays(newData);

    });

    $('#prev').click(function(){
        var dataC = moment($('.month').data('this-date'));
        if(dataC.month() == 0){
            alert('Mese non disponibile');
        }else{
            var newData = dataC.substract(1,'M');
        }
        insertData(newData);
        insertHolidays(newData);

    });

    

});

function insertData(data){ 
    var month = data.format('MMMM');
    var year = data.format('YYYY')

    $('h1.month').html(month + year);
    var daysMonth = data.daysInMonth();

    for (var i = 1; i <= daysMonth; i++) {
        var source = $("#day-template").html();
        var template = Handlebars.compile(source);

        var context = {
            day: addZero(i),
            month: month,
            completeDate: year + '-' + data.format('MM') + '-' + addZero(i)
        };
        var html = template(context);
        $('.month-list').append(html);
    }
}

function insertHolidays(data){
    $.ajax(
        {
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year:data.year(),
                month: data.month()
            },
            success: function(risposta){
                for(var i = 0; i < risposta.response.length; i++){
                    var listItem = $('li[data-complete-date="'+ risposta.response[i].date + '"]');
                    listItem.append(' - ' + risposta.response[i].name);
                    listItem.addClass('holiday');
                }
            },
            erro: function(){
                alert('errore');
            }
        }
    )
}

function addZero(n){
    if(n < 10){
        return '0' + n;
    }
    return n;
}