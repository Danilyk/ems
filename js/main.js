$(document).ready(function() { 
    $.ajax({
        url: "http://emspost.ru/api/rest/",
        dataType : "jsonp",
        data: ({
            method:"ems.get.locations",
            type:"cities",
            plain:"true"
        }),
        success: function (data) {
            for (i=0;i<data.rsp.locations.length;i++){
                var output = "<option>" + data.rsp.locations[i].value.replace('city--','');
                $("#fromCity,#toCity").append(output);
            }
        }
    });
    $.ajax({
        url: "http://emspost.ru/api/rest/",
        dataType : "jsonp",
        data: ({
            method:"ems.get.max.weight"
        }),
        success: function (data) {
            $("#maxWeight").append(data.rsp.max_weight + " кг");
        }
    });
    $("#calc").click(function(){
        $.ajax({       
            url: "http://emspost.ru/api/rest/",
            dataType : "jsonp",
            data: ({
                method:"ems.calculate",
                from: "city--" + $("#fromCity option:selected").val(),
                to: "city--" + $("#toCity option:selected").val(),
                weight: $("#weight").val()
            }),
            success: function (data) {
                $("#reply").show();
                if (data.rsp.stat == "fail"){
                    $("#result").empty().append("Неправильный вес");
                }
                else {
                    $("#result").empty().append("Цена доставки: " + data.rsp.price + " рублей.");
                }
            }
        });
    });

})();

