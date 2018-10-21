function showLines(option) {
    /**Очистка полей и их скрытие*/
    $("[data-view]").val('').attr("required", false).hide();

    /**Отображение тех у которых data-view равен option */
    $("input[data-view=" + option + "], select[data-view=" + option + "]").attr("required", true);
    $("[data-view=" + option + "]").show();
}


function payAddit(res) {
    if (res) {
        return res;
    }
    else {
        return false;
    }
}

var status_codes = {
    '500' : 'Внутренняя ошибка сервера',
    '502' : 'Ошибочный шлюз',
    '503' : 'Сервис недоступен',
    '400' : 'Плохой, неверный запрос',
    '401' : 'Не авторизован',
    '402' : 'Необходима оплата',
    '403' : 'Запрещено',
    '404' : 'Не найдено',
    '405' : 'Метод не поддерживается',
    '406' : 'Неприемлемо',
    '407' : 'Необходима аутентификация прокси',
    '408' : 'Истекло время ожидания',
    '409' : 'Конфликт',
    '410' : 'Удалён',
    '411' : 'Необходима длина',
    '412' : 'Условие ложно',
    '413' : 'Полезная нагрузка слишком велика',
    '414' : 'URI слишком длинный',
    '415' : 'Неподдерживаемый тип данных',
    '416' : 'Диапазон не достижим',
    '417' : 'Ожидание не удалось',
    '418' : 'Я — чайник',
    '422' : 'Необрабатываемый экземпляр',
    '423' : 'Заблокировано',
    '424' : 'Невыполненная зависимость',
    '426' : 'Необходимо обновление',
    '428' : 'Необходимо предусловие',
    '429' : 'Слишком много запросов',
    '431' : 'Поля заголовка запроса слишком большие',
    '451' : 'Недоступно по юридическим причинам',
    '500' : 'Внутренняя ошибка сервера',
    '501' : 'Не реализовано',
    '502' : 'Плохой, ошибочный шлюз',
    '503' : 'Сервис недоступен',
    '504' : 'Шлюз не отвечает',
    '505' : 'Версия HTTP не поддерживается',
    '506' : 'Вариант тоже проводит согласование',
    '507' : 'Переполнение хранилища',
    '508' : 'Обнаружено бесконечное перенаправление',
    '509' : 'Исчерпана пропускная ширина канала',
    '510' : 'Не расширено',
    '511' : 'Требуется сетевая аутентификация',
    '520' : 'Неизвестная ошибка',
    '521' : 'Веб-сервер не работает',
    '522' : 'Соединение не отвечает',
    '523' : 'Источник недоступен',
    '524' : 'Время ожидания истекло',
    '525' : 'Квитирование SSL не удалось',
    '526' : 'Недействительный сертификат SSL',
};


$(document).ready(function () {
  if (window.location.href == 'https://lk.kp-donskoy.ru/home'){
    function GetBalance (){
      $.ajax({
        url: '/users/balance',
        method: 'GET',
        success: function(res){
          var result = JSON.parse(res);
          if (result['IdAccount'] != 0){
            for (var item in result){
              var color = '';
              if (item == "StartBalance" || item == "EndBalance"){
                if (result[item] > 0){
                  color = "color-red";
                  result[item] = '- ' + result[item];
                }
                else {
                  color = "color-green";
                }
              }
              $("." + item).addClass(color).html("<span class='font-medium'>"+ result[item] +"<span> руб.</span></span>");
            }
            $(".IdAccount").html(result['IdAccount']);
          }
          else {
            for (var item in result){
              ("." + item).html("<span class='font-medium'>Нет данных<span>");
            }
          }
        },
        error: function(e){
          GetBalance();
        }
      });
    }

    GetBalance();
  }

    UIkit.update(event = 'update');
    /*$("main").click(function(){
        $(".user-menu").removeClass("active-menu");
        $(".user-menu_dropdown").removeClass("show open-menu");
    });*/

    // For testing payment system
    $('body').on('click', '.pay-go', function (e) {
        e.preventDefault();

        $.ajax({
            url: 'https://lk.kp-donskoy.ru/invoices/pay',
            method: 'POST',
            success: function (res) {
            }
        });
        // console.log(1);
    });

    var Mask = {
        date: $("[data-mask=date]").pickadate({
            min: true,
            format: 'dd.mm.yyyy',
            formatSubmit: 'yyyy-mm-dd',
            hiddenName: true,
        }),
        money: $("input[data-mask=money]").inputmask({
            alias: 'decimal',
            groupSeparator: ' ',
            autoGroup: true,
            digits: 1,
            rightAlign: false,
            showMaskOnHover: false,
            showMaskOnFocus: false,
            autoUnmask: true,
            removeMaskOnSubmit: true,
        }),
        numeric: $("input[data-mask=numeric]").inputmask("9{1,20}",
            {
                showMaskOnHover: false,
                showMaskOnFocus: false,
            }),
        phone: $("input[data-mask=phone]").inputmask("+7(999)999-99-99", {
            "onincomplete":
                function () {
                    if (this.value != '') {
                        alert('Пожалуйста, заполните поле до конца');
                    }
                }
        }),
        email: $("input[data-mask=email]").inputmask("email", {
            "onincomplete":
                function () {
                    if (this.value != '') {
                        alert('Пожалуйста, заполните поле до конца');
                    }
                }
        }),
        birthday: function () {
            $("[data-mask=birthday]").pickadate({
                max: true,
                format: 'dd.mm.yyyy',
                //formatSubmit: 'yyyy-mm-dd',
                hiddenName: true,
                selectYears: 100,
                selectMonth: true,
            })
        },
    }

    var Payment = {
        sendPay: function (url, data) {
            data['redirect_url'] = window.location.href;
            $.ajax({
                url: url,
                data: data,
                type: 'POST',
                success: function (res) {
                    // Тестовые платежи
                    // var form = '<form class="payment-redirect" method="POST" action="https://test.3ds.payment.ru/cgi-bin/cgi_link">';

                    var form = '<form class="payment-redirect" method="POST" action="https://3ds.payment.ru/cgi-bin/cgi_link">';
                    for (item in res) {
                        var name = item;
                        if (item == 'hmac') {
                            name = 'p_sign';
                        }
                        form += '<input type="hidden" name=' + name.toUpperCase() + ' value=' + res[item] + '>';
                    };
                    form += '</form>';
                    $(form).appendTo("body");
                    $(".payment-redirect").submit();
                },
                error: function (e) {
                    Alert.show(status_codes[e.status],'danger');
                }
            });
        }
    }

    var UserForm = {
        showOverlay: function () {
            $("<overlay></overlay>").appendTo("body");
            setTimeout(function () {
                $("overlay").addClass("active");
            }, 100);
        },
        hideOverlay: function () {
            $("overlay").removeClass("active");
            setTimeout(function () {
                $("overlay").remove();
            }, 300);
        },
        clone: function (selector, clear) {
            $(".tmp").remove();
            $("." + selector).clone().addClass("tmp").appendTo("body");
            if ($(".tmp .close_date").length) {
                $(".tmp .close_date").pickadate({
                    min: true,
                    max: 15,
                    format: 'dd.mm.yyyy',
                    formatSubmit: 'yyyy-mm-dd',
                    hiddenName: true
                });
            }
            if (!clear) {
                $(".body-overlay").addClass("load");
                setTimeout(function () {
                    $(".body-overlay").addClass("active-overlay");
                    $(".tmp").show();
                }, 100);
            }
            //return "." + selector_tmp;
        },
        close: function () {
            //$(".body-overlay").removeClass("active-overlay");
            $(".tmp").fadeOut(100);
            $(".tmp").remove();
            setTimeout(function () {
                UserForm.hideOverlay();
            }, 200);

        },
        hide: function (form) {
            $(form).removeClass("active");
            $(".translate-out").removeClass("active");
            $("body").removeClass("uk-overflow-hidden");
            $(".tmp").remove();
        },
        material: function () {
            var inputs = document.querySelectorAll('input.material-input_text,select.material-input_text');

            inputs.forEach(function (input) {
                input.addEventListener('focus', function () {
                    this.parentNode.classList.add('is-focused');
                    this.parentNode.classList.add('has-label');
                });
                if (input.value != ''){
                    input.parentNode.classList.add('is-focused');
                    input.parentNode.classList.add('has-label');
                }
                input.addEventListener('blur', function () {
                    this.parentNode.classList.remove('is-focused');
                    if (this.value == '') {
                        this.parentNode.classList.remove('has-label');
                    }
                });
            });
        }
    }

    var Slide = {
        show: function (item) {
            $("body").attr(item, true);
        },
        hide: function () {
            for (var i = 0; i < arguments.length; i++) {
                $("body").removeAttr(arguments[i]);
            }
        },
    }

    var Alert = {
        shure: function () {
            UserForm.showOverlay();
            UserForm.clone("shure-popup");
            $("body").attr("shure-popup", true);

        },
        code: function () {
            UserForm.showOverlay();
            UserForm.clone("code");
            $("body").attr("code", true);

        },
        no: $("body").on("click", ".shure-popup .no", function () {
            UserForm.hideOverlay();
            UserForm.close(".tmp");
            $("body").removeAttr("shure-popup");
        }),
        yes: function (func) {
            $("body").on("click", ".shure-popup .yes", func);

        },
        show: function (message, type, callback, place) {
            UserForm.clone("alert");
            $(".tmp").addClass("alert-" + type).text(message);
            if (place) {
                $(".tmp").prependTo(place);
            }
            setTimeout(function () {
                $(".tmp").hide();
                $(".tmp").remove();
                callback;
            }, 5000);
        },
        inputMark: function (selector) {
            $(selector).addClass("required");
            setTimeout(function () {
                $(selector).removeClass("required");
            }, 5000);
        },
    }// end Alert;

    var Aside = {
        pushContent: function (title, content) {
            this.clear();
            //$(".aside-container").html("");
            $(".aside-title-text").text(title);
            $(".aside-container").append(content);
            UserForm.material();
            Slide.show("aside");
            UserForm.showOverlay();
        },
        clear: function () {
            $("aside :input").val("");
            $(".aside-title-text").text("");
            $(".aside-container").html("");
        }
    };

    var Item = {
        del: function (current) {
            var parent = current.parent().parent().parent();
            var id = parent.attr("id");
            //основу action берем в активном элементе навигации (у админа) или у нажатой кнопки (она же current)
            var action = ($(".nav_item.active a").attr('href') || current.attr('action')) + '/remove';
            $.ajax({
                url: action,
                headers: {
                    'X-CSRF-TOKEN': _token
                },
                data: {
                    id: id,
                },
                type: 'POST',
                success: function (res) {
                    if (res) {
                        parent.remove();
                    }
                },
                error: function (e) {
                    var response = JSON.parse(e.responseText);
                    Alert.show(response.message, 'danger');
                    return false;
                }
            });

        },
        errorShow: function(e){
            var response = JSON.parse(e.responseText);
            var errors = response.errors;
            for (var i in errors){
                var current = $(".aside-container").find("[name="+i+"]").parent();;
                Alert.inputMark(current);
                var item = errors[i];
                current.find(".alert").remove();
                current.append("<span class='alert alert-include alert-include__danger'>"+ item[0] + "</span>");
            }
        },
        create: function (current) {
            var street_id = $(".street-list_item.active").attr("id");
            if (street_id) {
                var href = $(".nav_item.active a").attr('href');
                var form = "." + href + '-edit_form';
                if (href == 'users'){
                    form = ".users-create_form";
                }
                var title = $(form).attr("title");
                //var tmp_form = UserForm.clone(form);
                /**Добвление id улицы, при создании пользователя*/
                $(form).append("<input type='hidden' name='street_id' value=" + street_id + " />");
                Aside.pushContent(title, $(form).clone().removeClass("hidden-form"));
            } else {
                var form = "." + current.attr("form") + '-edit_form';
                var title = $(form).attr("title");
                Aside.pushContent(title, $(form).clone().removeClass("hidden-form"));
                Mask.birthday();
            }
        },
        line_disable: function () {
            $(".item__edit").attr("disabled", true);
            $("[data-mode=life_update]").children("img").attr("src", "img/icon/edit.svg");
            $("[data-mode=life_update]").attr("data-mode","life_edit");
        },
        life_edit: $("body").on("click", "[data-mode=life_edit]", function () {
            Item.line_disable();

            $(this).attr("data-mode", "life_update").children("img").attr("src", "img/icon/admin/table/done.svg");
            var name = $(this).attr("id");
            $(".item__edit[name=" + name + "]").removeAttr("disabled");
        }),
        edit: function (current) {
            var id = current.parent().parent().parent().attr("id");
            if (id) {
                var href = $(".nav_item.active a").attr('href');
                var action = href + "/" + id;
                $.ajax({
                    url: action + "/edit",
                    data: {
                        id: id
                    },
                    success: function (res) {
                        var result = JSON.parse(res);
                        var result = result[0];
                        var cur_form = $("." + href + "-edit_form").clone();
                        $(cur_form).attr({
                            'action': action,
                            'method': 'POST'
                        }).append('<input name="_method" type="hidden" value="PUT">').removeClass("hidden-form");//'<input name="street_id" type="hidden" value="' + $(".street-list_item.active").attr("id") + '"/>'+
                        for (var key in result) {
                            //$(cur_form).find("#" + key).val(result[key]);
                            $(cur_form).find("[name=" + key + "]").val(result[key]);
                        }
                        Aside.pushContent("Редактирование",cur_form);
                        if (result['type']) showLines(result['type']);
                        Mask.numeric;
                    }
                });
            } else
                Alert.show("Не могу идентифицировать запись!","danger");
        },
        send: function(current){
            var form = current.parent();
            var url = form.attr("action");
            var data = form.serialize();
            $.ajax({
                url: url,
                data: data,
                type: 'post',
                success: function(res){
                    //location.reload();
                },
                error: function(e){
                    Item.errorShow(e);
                }
            });
        },
        empty: function (message) {
            if (message.length > 0 && message.length < 255) {
                var message = true;
            }
            else {
                var message = {
                    fail: 'message',
                    message: "РџРѕР»Рµ РЅРµ РјРѕР¶РµС‚ Р±С‹С‚СЊ РїСѓСЃС‚С‹Рј",
                }
                return message;
            }
        }
    }

    //Активация input в стиле material
    UserForm.material();

    $("body").on("click", "[data-mode=login]", function (e) {
        e.preventDefault();
        var form = $(this).parent();
        Auth.login(form);

    });

    $("body").on("click", ".button_close", function (e) {
        e.preventDefault();
        UserForm.close();
    });

    $("body").on("click", ".button_slide-close", function () {
        $(".new-additionals_list_item").removeClass("active").css("background-color", "white");
        Slide.hide($(this).data("type"));
        //UserForm.hideOverlay();
    });

    $("body").on("click","overlay",function(){
        $(".tmp").remove();
        $("body").removeAttr("aside aside-child shure-popup code");
        Aside.clear();
        UserForm.hideOverlay();
    });

    $("body").on("click", "[data-type=aside]", function () {
        Slide.hide($(this).data("type"), 'aside-child');
        Aside.clear();
        UserForm.hideOverlay();
    });

    $("body").on("click", ".button_hide", function () {
        UserForm.hide($(this).parent().parent());
    });

    $("body").on("click", "[data-mode=open]", function () {
        Item.open($(this));
    });

    $("body").on("change",".filter__item",function(){
        var month = $('.filter__item#month').val();
        var year = $('.filter__item#year').val();
        if (month && year){
            var date = new Date();

            var period = new Date(year + '-' + month + '-' + '01');
            var timestamp = period.getTime()/1000;
            //$(".invoices-filter [name=start]").remove();
            $(".invoices-filter [name='start']").val(timestamp);
        }

    });


    $("body").on("click", "[data-mode=send]", function () {
        Item.send($(this));
    });

    $("body").on("click", "[data-mode=create]", function () {
        Item.create($(this));
    });

    $("body").on("click", "[data-mode=create-street]", function () {
        Aside.pushContent("Новая улица", $(".form_street").clone().removeClass("hidden-form"));
    });

    $("body").on("click", "[data-mode=edit]", function () {
        Item.edit($(this));
    });

    $("body").on("click", "[data-mode=update]", function () {
        Item.update($(this));
    });

    $("body").on("click","[data-action=pdf]",function(){
        $.ajax({
            url: "/lib/mpdf/pdf.php",
            data: {
                //test: 'test',
            },
            success: function(res){
                console.info(res);
            },
            error: function(e){
                console.info(e);
            }
        });
    });



    $("body").on("click", "[data-mode=delete]", function () {
        var current = $(this);
        current.addClass("delete");
        Alert.shure();

        $("body").on("click", ".shure-popup .yes", function () {
            Item.del($(".delete"));
            UserForm.close();
            $("body").removeAttr("shure-popup");
        });
    });

    $("body").on("click", "[data-action=order]", function () {
        var order = $(".new-additionals_list_item.active");
        var id = order.data("id");
        var price = parseFloat(order.data("price")*1.00);
        var img = order.children("img").attr("src");
        var color = order.data("color");

        var name = order.find("[name=name]").text();
        var close_date = $(".new-additionals_create [name=close_date]").val();

        var comment = $(".new-additionals_create [name=comment]").val();
        if (close_date != '') {
            var current = $(".additionals-create_item.active");
            if (current.next().hasClass("additionals-create_item")) {
                console.info(close_date.get('highlight', 'yyyy-mm-dd'));
            }
            else {
                var empty = current.html();
                $(".additionals-create").append("<div><div class='additionals-create_item uk-position-relative uk-position-z-index uk-padding-large uk-padding-remove-right uk-padding-remove-left active'>" +
                                                        empty +
                                                "</div></div>");
            }

            var html = '<img src="' + img + '"><div>' + name + '</div>';

            current.html(html)
                .css("background-color", color)
                .attr({
                    "id": id,
                    "price": price,
                    "close_date": close_date,
                    "comment": comment,
                })
                .append("<div class='uk-flex-top uk-flex-right additionals-create_item-delete icon' icon=close></div>")
                .addClass("done").removeClass("active");

            current.parent().append("<div class='font-medium price' data-price=" + price + ">" + price + "<span> руб </span></div>");

            /**Формирование новой "К оплате" при выборе ещё одной доп.услуги*/
            var total_price = $(".additionals-pay [total-price]");
            new_price = parseFloat(total_price.attr("total-price")) + price;

            total_price.attr("total-price", new_price).text(new_price + " руб");
            $(".additionals-pay").attr("hiden", false);

            setTimeout(function () {
                current.parent().find(".price").addClass("active")
            }, 300);

            /***Скрытие панели и очистка всех следов*/
            order.removeClass("active").css("background-color", "white");
            Slide.hide("aside", "aside-child");
            Aside.clear();
            UserForm.hideOverlay();
        }
        else {
            Alert.show("Заполните поле", "danger");
            Alert.inputMark(".new-additionals_create [data-mask=date]");
        }
    });

    $("body").on("click", "[data-action=pay_online]", function () {
        var ids = [];
        var additionals_arr = [];
        $(".additionals-create div").find(".done").each(function () {
            ids.push($(this).attr("id"));

            var additional = {};
            additional['additional_id'] = $(this).attr("id");
            additional['close_date'] = $(this).attr("close_date");
            additional['comment'] = $(this).attr("comment");
            //additional['price'] = $(this).attr("price");

            additionals_arr.push(additional);
        });
        var total_price = $(".additionals-pay [total-price]").attr("total-price");
        var data = {
            "additionals_id": ids,
            "total_price": total_price,
            "additionals": additionals_arr,
        }
        Payment.sendPay("additionals/pay", data);
    });

    $("body").on("click", "[data-type=pay]", function () {
        var sum = $(".balance-pay [name=sum]").val();
        if (sum == ''){
            Alert.show("Введите сумму оплаты!", 'danger');
        }
        else{
            if ( sum < 1){
                Alert.show("Сумма оплаты должна быть не менее 1 рубля!", 'danger');
            }
            else {
                Payment.sendPay("payments", {"sum": $(".balance-pay [name=sum]").val()});
            }
        }
    });

    $("body").on("click","[data-type=pay_unpaid]",function(){
        var ids = [];
        var additionals_arr = [];
        var total_price = 0;

        $(".additionals_list tbody").find("tr[status=0]").each(function () {
            ids.push($(this).attr("additional_id"));

            var additional = {};
            additional['additional_id'] = $(this).attr("id");
            additional['close_date'] = $(this).find(".table-close_date").text();
            additional['comment'] = $(this).find(".table-comment").text();
            additional['status'] = $(this).attr("status");

            additionals_arr.push(additional);
            total_price = total_price + parseFloat($(this).find(".table-price").text());
        });
        var data = {
            "additionals_id": ids,
            "total_price": total_price,
            "additionals": additionals_arr,
        }
        //console.info(data);
        Payment.sendPay("additionals/pay-unpaid", data);
    });

    $("body").on("click", "[data-action=permition-create]", function () {
        var form = $(this).parent();
        var url = form.attr("action");
        var data = form.find("input").serialize();
        var permition = form.attr("table");
        console.info(permition);
        $.ajax({
            url: url,
            data: data,
            type: 'POST',
            success: function (res) {
                $(".table-permition[table=" + permition + "] tbody").append(res);
                Slide.hide("aside");
                UserForm.hideOverlay();
                Aside.clear();
            },
            error: function (e) {
                Item.errorShow(e);
            }
        });
    });


    $("[data-type=balance]").click(function () {
        $("[data-view=balance]").addClass("active");
        $(".translate-out").addClass("active");
        $("body").addClass("uk-overflow-hidden");

        /*
        //Версия для получения invoice контейнера без ajax
        var invoice_id = $("[data-type=invoice_num]").text();
        $.ajax({
            url: '/invoice/' + invoice_id,
            success: function (res) {
                $("[data-view=invoice]").html(res).addClass("active");
                $(".translate-out").addClass("active");
            },
            error: function (e) {
                e.parse(response.text);
            }
        });*/
    });

    $("[data-type=information]").click(function () {
        var id = $(this).attr('id');
        $.ajax({
            url: '/informations/' + id,
            headers: {
                'X-CSRF-TOKEN': _token
            },
            data: {
                sys_id: id,
            },
            success: function (res) {
                $(".modal_slider").html(res);
                Slide.show("modal-slider");
            }
        });
    });

    $("body").on("click", ".additionals-create_item-delete", function () {
        var item = $(this).parent();

        item.parent().remove();
        UserForm.close();

        var this_price = parseFloat(item.attr("price"));
        var total_price = $(".additionals-pay [total-price]");
        new_price = parseFloat(parseFloat(total_price.attr("total-price")) - this_price);
        total_price.attr("total-price", new_price).text(new_price + " руб");

        if ($(".additionals-create").children().length <= 1) {
            $(".additionals-pay").attr("hiden", true);
            total_price.attr("total-price", 0).text(0 + " руб");
        }
        ;
    });


    function makeActive(selector, item) {
        $(selector).removeClass("active");
        item.addClass("active");
    }

    var _token = $('input[name="_token"]').val();

    $("body").on("click", ".addit_date", function () {
        $(".date_panel").toggle();
    });

    //$(".street-list_item:first").addClass("active");

    //Пометка изменённых полей
    /*$("body").on("change", "input, select", function () {
        $(this).attr("changed", "1");
    });*/

    $("body").on("click", ".table_item", function () {
        $(".user_item").removeClass("active");
        $(this).addClass("active");
    });

    /**Выделено отдельной функцией, так как на создание нового пользователя совсем другая форма*/
    $("body").on("click", "[data-mode=users-create]", function () {
        UserForm.clone("users-create_form");
    });
    /***/

    /*$(".user-menu").on("click", function () {

        if ($(this).hasClass("active-menu")) {
            $(this).removeClass("active-menu");
            $(".user-menu_dropdown").removeClass("show");
            setTimeout(function () {
                $(".user-menu_dropdown").removeClass("open-menu");
            }, 200);
        } else {
            $(this).addClass("active-menu");
            $(".user-menu_dropdown").addClass("open-menu");
            setTimeout(function () {
                $(".user-menu_dropdown").addClass("show");
            }, 200);
        }

    });*/


    $("body").on("click", ".addit_pay", function () {
        var arr = [];
        $(".addit_selected").find(".addit_item").each(function () {
            arr.push($(this).attr("id"));
        });

        if (payAddit(true)) {
            $.ajax({
                url: "additionals/pay",
                data: {
                    arr: arr,
                },
                headers: {
                    'X-CSRF-TOKEN': _token
                },
                type: "post",
                success: function (res) {
                    if (res != '') {
                        alert("Оплачено!");
                        //$(".addit_form").fadeOut(200);
                        //$(".addit_form input, .addit_form select").val('');
                        UserForm.close('addit_form');
                        $("body").removeClass("body-fix");
                        $(".body-overlay").removeClass("active-overlay");

                        setTimeout(function () {
                            $(".body-overlay").removeClass("load");
                        }, 200);
                        location.reload();
                    } else {
                        alert("Ошибка при попытке записать данные!");
                    }

                }
            });
        }
        else if (payAddit()) {
            alert("Оплата не удалась!");
        }
        //
    });

    $(".password-change-form_open").click(function () {
        //$(".aside-title-text").text("Смена пароля");
        var content = '<div class="password-change input-form">' +
            '<div class="material-content"><div class="material-input">' +
            '<label class="material-input_label" for="old_password">Старый пароль</label>' +
            '<input class="material-input_text" type="password" name="old_password" value="" >' +
            '</div>' +
            '<div class="material-input">' +
            '<label class="material-input_label" for="new_password">Новый пароль</label>' +
            '<input class="material-input_text" type="password" name="new_password" value="" >' +
            '</div>' +
            '<div class="material-input">' +
            '<label class="material-input_label" for="new_password_confirmation">Подтверждение пароля</label>' +
            '<input class="material-input_text" type="password" name="new_password_confirmation" value="" >' +
            '</div>' +
            '<div class="button-transparent" data-action="password_show"><img class="icon" src="/img/icon/view.svg"/></div></div>' +
            '<button class="button" data-action="password_change">Сменить</button></div>';
        Aside.pushContent("Смена пароля", content);
    });

    $("body").on("click", "[data-action=password_change]", function () {
        $.ajax({
            url: "/password/change",
            data: $(".password-change input").serialize(),
            type: 'POST',
            success: function (res) {
                Slide.hide("aside");
                Aside.clear();
                UserForm.hideOverlay();
                Alert.show(res, "success");
            },
            error: function (e) {
                Item.errorShow(e);
            }
        });
    });

    $("body").on("click","[data-action=password_show]",function(){
        $(this).parent().find("input").each(function(){
            if ($(this).attr("type") == 'password'){
                $(this).attr("type","text");
            }
            else if ($(this).attr("type") == 'text') {
                $(this).attr("type","password");
            }
        });
    });

    $("body").on("click", ".addit_add", function () {
        var arr = {};
        $(".tmp").find("input, select").each(function () {
            if ($(this).attr("required") && $(this).val() === '') {
                throw alert("Пожалуйста, заполните все необходимые поля!");
            }
            else {
                arr[$(this).attr("id")] = $(this).val();  //затем добавляются все остальные данные
            }
        });

        date = arr['close_date'];
        date_arr = date.split('-');

        arr['close_date'] = date_arr[2] + '-' + date_arr[1] + '-' + date_arr[0];
        console.info(_token);
        $.ajax({
            url: "additionals/store",
            headers: {
                'X-CSRF-TOKEN': _token
            },
            data: {
                user_id: arr['user_id'],
                additional_id: arr['additional_id'],
                close_date: arr['close_date'],
                comment: arr['comment'],
                status: 0,
            },
            type: "post",
            success: function (res) {
                var result = JSON.parse(res);
                result = result[0];
                var str = "<div class='addit_item' id=" + result['id'] + " addit_id =" + result['additional_id'] + ">";
                str += "<span>" + result['name'] + "</span>";
                str += "<span>" + result['close_date'] + "</span>";
                //str += "<span>" + result['status'] + "</span>";
                str += "<span>" + result['updated_date'] + "</span>";
                str += "<span>" + result['comment'] + "</span>";
                str += "<span>" + result['price'] + "</span>";
                str += "</div>";
                $(".tmp .addit_selected").append(str);


                var global_price = parseInt($(".tmp .global_price").attr('price')) + parseInt(result['price']);
                $(".tmp .global_price").text(global_price);
                $(".tmp .global_price").attr('price', global_price);
                $(".tmp .global_price").attr('price', global_price);
            }
        });

    });

    $("body").on("click", "#phone[data-mode=life_update]", function () {
        var item = $(this).attr('id');
        if ($("input[name=" + item + "]").val() != $("input[name=" + item + "]").attr('data-old')) {
            $.ajax({
                url: 'users/confirm',

                headers: {
                    'X-CSRF-TOKEN': _token
                },
                data: {
                    phone: $("input[name=" + item + "]").val(),
                },
                type: "POST",
                success: function (res) {
                    if (res != 0) {
                        Alert.code();
                    }
                },
                error: {}
            });
        }
        else {
            Item.line_disable();
        }

        $("body").on("click", ".code_popup_close", function () {
            if ($('.code').hasClass('active')) {
                $('.code').removeClass('active');
            }
        });
    });

    $("body").on("click","[data-action=register]",function(e){
        e.preventDefault();
        var arr = $(".aside-container .users-create_form").serialize();
        $.ajax({
            url: '/register',
            type: 'post',
            data: arr,
            success: function(res){
                //console.info(res);
                location.reload();
            },
            error: function(e){
                Item.errorShow(e);
            }
        })
    });

    $("body").on("focus",".material-input_text",function(){
        $(this).next("span.alert").remove();
    });


    $("body").on("click", "#email[data-mode=life_update]", function () {

        if ($("input[name='email']").val() == $("input[name='email']").attr('data-old')) {
          Item.line_disable();
          return;
        }
        var item = $(this).attr('id');
        var button = $(this);
        var button_html = button.html();
        button.html("<div uk-spinner></div>");
        if (!$("input[name=" + item + "]").val()) {
            $.ajax({
                url: 'users/selfupdate',

                headers: {
                    'X-CSRF-TOKEN': _token
                },
                data: {
                    email: $("input[name=" + item + "]").val()
                },
                type: "POST",
                success: function (res) {
                    console.info(res);
                    if (res != 0) {
                        location.reload();
                    }
                },
                error: {}
            });
        }
        else {
            $.ajax({
                url: 'users/confirm',

                headers: {
                    'X-CSRF-TOKEN': _token
                },
                data: {
                    email: $("input[name=" + item + "]").val(),
                    name: $(".status").text(),
                    url: window.location.href,
                    token: _token
                },
                type: "POST",
                success: function () {
                    Alert.show("Мы отправили Вам на почту письмо подтверждения.", "success");
                    button.html(button_html);
                    Item.line_disable();
                },
                error: function () {
                    Alert.show("Что-то пошло не так. Попробуйте ещё раз.", "danger");
                }
            })
        }
    });

    $("body").on("click", ".confirm_phone", function () {
        $.ajax({
            url: 'users/selfupdate',

            headers: {
                'X-CSRF-TOKEN': _token
            },
            data: {
                phone_request: $(".code.tmp input[name=phone_request]").val(),
                phone: $("input[name=phone]").val(),
            },
            type: "POST",
            success: function (res) {
                if (res != 0) {
                    Alert.show("Данные успешно обновлены","success",location.reload());
                }
                else {
                    alert("Возможно, вы ввели неверный код подтверждения.");
                }
            },
            error: {}
        });
    });

    $("body").on("change", ".change_status", function () {

        var status = $(this).val();
        var id = $(this).parent().parent().attr("id");
        $(this).attr("status",null);
        //console.info($(this).val());
        $.ajax({
            url: "additionals/" + id,
            headers: {
                'X-CSRF-TOKEN': _token
            },
            data: {
                status: status,
                additional: id
            },
            type: "PUT",
            success: function (res) {
                if (res) {
                    /*Alert.show("Статус изменён","success");
                    setTimeout(function(){
                        location.reload()
                    }, 2000)*/
                    location.reload();
                }
                else {
                    Alert.show("Обновление не удалось!", "danger");
                }
            },
            error: function () {
                Alert.show("Ошибка доступа к базе!", "danger");
            }
        });
    });

    $("body").on("click", ".additionals-create_item.active", function () {
        $.ajax({
            url: 'additionals/list',
            success: function (res) {
                var response = JSON.parse(res);

                var content = '<div class="new-additionals_list uk-child-width-1-1 uk-padding uk-padding-remove-top" uk-grid>';
                for (i in response) {
                    var item = response[i];

                    content += '<div>' +
                        '<div class="new-additionals_list_item uk-flex uk-padding-small" data-color=' + item.color + ' data-id=' + item.id + ' data-price=' + item.price + '>' +
                        '<img src="/img/icon/additionals/' + item.icon + '.svg" class="new-additionals_item_icon">' +
                        '<div><div name="name">' + item.title + '</div>' +
                        '<small>' + item.description + '</small></div>' +
                        '</div>' +
                        '</div>';
                }
                content += '</div>';

                Aside.pushContent("Дополнительные услуги", content);
                $(".aside-container").addClass("new-additionals")
                //$(".aside").addClass("wide");
            },
            error: function (e) {
                var response = JSON.parse(e);
                Alert.show(response);
            }
        })
    });

    $("body").on("click", ".new-additionals_list_item", function (e) {
        var price = $(this).data("price");
        var name = $(this).find("[name=name]").text();
        var id = $(this).data("id");

        var same_additionals = undefined;
        same_additionals = $(".additionals-create").find(".additionals-create_item#"+id).attr("id");
        if (same_additionals != undefined){
          Alert.show("Услуга уже выбрана!","danger");
          return;
        }


        $(".new-additionals_list_item").removeClass("active");
        $(".new-additionals_list_item").css("background-color", "white");
        $(this).addClass("active");
        $(this).css("background-color", $(this).data("color"));

        $(".new-additionals_create").attr("id", id);
        $(".new-additionals_create input").val("");
        $(".aside-child [name=title]").text(name);
        $(".new-additionals_create [name=price]").text(price);
        $("body").attr("aside-child", true);
    });


});//document.ready
