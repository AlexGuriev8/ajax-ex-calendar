$(document).ready(function(){
    /* moment.locale('it'); */
    //data di partenza è il 2018-01-01
    //creiamo un oggetto moment su questa data
    var dataCorrente = moment('2018-01-01');
    insertData(dataCorrente);
    insertHolidays(dataCorrente);
  //click
    $('#next').click(function(){
        next(dataCorrente);
        giorniInOrdine(dataCorrente);
    });

    $('#prev').click(function(){
        prev(dataCorrente); 
        giorniInOrdine(dataCorrente);    
    });

   //tastiera
    $(document).keyup(function (event) {
        if (event.which == 37 || event.keyCode == 37) {
            prev(dataCorrente); 
            giorniInOrdine(dataCorrente);
        }
        else if (event.which == 39 || event.keyCode == 39) {
            next(dataCorrente);
            giorniInOrdine(dataCorrente);
        }
    });
    
});


//funzioni
function insertData(data){ 
    var month = data.format('MMMM');
    var year = data.format('YYYY')

    $('h1.month').html(month +' '+ year);
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
            error: function(){
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


function next(data) {
    if (data.month() == 11) {
        alert('mese non disponibile');
    } else {
        data.add(1, 'M');
        $('.month-list').children().remove();
        insertData(data);
        insertHolidays(data);
    }
}


function prev(data) {
    if (data.month() == 0) {
        alert('mese non disponibile');
    } else {
        data.subtract(1, 'M');
        $('.month-list').children().remove();
        insertData(data);
        insertHolidays(data);
    }
}


function giorniInOrdine(data) {
    var firstDay = data.format('dddd');
    var firstOfList = $('.month-list li:first-child');
    console.log(firstOfList);
    switch (firstDay) {
        case 'Tuesday':
            firstOfList.addClass('tuesday-margin');
            break;
        case 'Wednesday':
            firstOfList.addClass('wednesday-margin');
            break;
        case 'Thursday':
            firstOfList.addClass('thursday-margin');
            break;
        case 'Friday':
            firstOfList.addClass('friday-margin');
            break;
        case 'Saturday':
            firstOfList.addClass('saturday-margin');
            break;
        case 'Sunday':
            firstOfList.addClass('sunday-margin');
            break;
    }
};
