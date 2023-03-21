'use strict';

/* ==========================================================================
* jQuery Scripts
* ========================================================================== */
(function ($, undefined, window) {
    $(document).ready(function () {

        /* Side menu */
        $('.side-menu__list > .side-menu__list-item').on('click', function () {
            if ($(this).find('.side-menu__sub-menu').length > 0) {
                if ($(this).hasClass('show-sub-menu')) {
                    $(this).removeClass('show-sub-menu');
                    $('.site-wrapper').removeClass("sub-menu-opened");
                } else {
                    $('.site-wrapper').addClass("sub-menu-opened");
                    $(this).addClass('show-sub-menu');
                    $(this).siblings().removeClass('show-sub-menu');
                }
            }
        })
        $('#burger-menu').on('click', function () {
            $('.site-wrapper').toggleClass("menu-closed")
            $('.site-wrapper').removeClass("sub-menu-opened")
            $('.side-menu').toggleClass("close")
            $('.side-menu__list-item').removeClass('show-sub-menu');
        })


        /* Phone Handlers */
        const phoneButtons = document.querySelectorAll('.phone-panel__number');
        const phoneInput = document.querySelector('.phone-panel__input input');
        const siteWrapper = document.querySelector('.site-wrapper');
        const rightMenuBtn = document.querySelector('.sidebar__close');
        const sideBarRight = document.querySelector('.sidebar--right');

        phoneButtons.forEach(function (item, index) {
            item.addEventListener('click', function (evt) {
                const buttonValue = item.dataset.number;
                const phoneInputValue = phoneInput.value + buttonValue;
                phoneInput.value = phoneInputValue;
                let value = phoneInputValue.replace('(', '');
                value = value.replaceAll(')', '');
                value = value.replaceAll('+', '');
                value = value.replaceAll(' ', '');
                value = value.replaceAll('_', '');
                value = value.replaceAll('-', '');
                $('.phone-panel__input-hidden').val(value);
                $('.phone-panel__input-active').trigger('input')
            });
        });

        /* Right Sidebar Handlers */
        rightMenuBtn.addEventListener("click", () => {
            sideBarRight.classList.toggle("close");
            siteWrapper.classList.toggle("sidebar-right-closed");
        });

        /* Pagination Input Number */
        (function quantityProducts() {
            const $quantityArrowMinus = $(".t-pager__actions-input .minus");
            const $quantityArrowPlus = $(".t-pager__actions-input .plus");
            const $quantityNum = $(".t-pager__actions-input > input[type='number']");

            $quantityArrowMinus.click(quantityMinus);
            $quantityArrowPlus.click(quantityPlus);

            function quantityMinus() {
                if ($quantityNum.val() > 1) {
                    $quantityNum.val(+$quantityNum.val() - 1);
                }
            }

            function quantityPlus() {
                $quantityNum.val(+$quantityNum.val() + 1);
            }
        })();

        /* Date repange picker */
        $('.filter__calendar .filter__date').daterangepicker({
                startDate: moment().startOf('day'),
                endDate: moment().endOf('day'),
                ranges: {
                    'За сегодня': [moment(), moment()],
                    'За вчера': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Последние 7 дней': [moment().subtract(6, 'days'), moment()],
                    'Последние 30 дней': [moment().subtract(29, 'days'), moment()],
                    'За этот месяц': [moment().startOf('month'), moment().endOf('month')],
                    'За прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                locale: {
                    direction: 'ltr',
                    format: moment.localeData().longDateFormat('L'),
                    separator: ' -',
                    applyLabel: 'Применить',
                    cancelLabel: 'Отмена',
                    weekLabel: 'W',
                    customRangeLabel: 'Выбрать дату',
                    daysOfWeek: [
                        "Вс",
                        "Пн",
                        "Вт",
                        "Ср",
                        "Чт",
                        "Пт",
                        "Сб"
                    ],
                    monthNames:[
                        "Январь", 
                        "Февраль", 
                        "Март",
                        "Апрель",
                        "Май",
                        "Июнь",
                        "Июль",
                        "Август",
                        "Сентябрь",
                        "Октябрь",
                        "Ноябрь",
                        "Декабрь"
                    ],
                    firstDay: 1
                }
            },
            function (start, end, label) {
                $('.filter__calendar .filter__date').removeClass('open');
            });

        $('.filter__calendar .filter__date').on('click', function () {
            $(this).addClass('open');
        });

        $('.filter__calendar .filter__date').on('apply.daterangepicker', function (ev, picker) {
            $('.filter-tags').css('display', 'flex');

            if (picker.chosenLabel == 'Выбрать дату') {

                $('.filter__calendar .filter__date-txt').text('c ' + picker.startDate.format('DD-MM-YYYY') + ' по ' + picker.endDate.format('DD-MM-YYYY'));
                $('.filter-tags .filter-tags__date').html(function () {
                    const html = `
            <div class="filter-tags__item filter__tag">
              <svg class="remove-date-tag" width="12.5" height="12.5" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
                <path d="M1.71553 0.777496L0.767579 1.72544L6.04901 7.00687L0.736328 12.33L1.67386 13.2675L6.99696 7.95482L12.3096 13.2675L13.2576 12.3195L7.94491 7.00687L13.2263 1.72544L12.2784 0.777496L6.99696 6.05892L1.71553 0.777496Z"/>
              </svg>
              <span class="filter-tag__text  filter__tag-text"> c ` + picker.startDate.format('DD-MM-YYYY') + ' по ' + picker.endDate.format('DD-MM-YYYY') + `</span>
            </div>
          `;
                    return html;
                });
                $('.calls-table__meta-text').html( function() {
                    const html = 'c ' + picker.startDate.format('DD-MM-YYYY') + ' по ' + picker.endDate.format('DD-MM-YYYY') + '';
                    return html;
                });

            } else {

                $('.filter__calendar .filter__date-txt').text(picker.chosenLabel);
                $('.filter-tags .filter-tags__date').html(function () {
                    const html = `
                        <div class="filter-tags__item filter__tag">
                          <svg class="remove-date-tag"  width="12.5" height="12.5" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.71553 0.777496L0.767579 1.72544L6.04901 7.00687L0.736328 12.33L1.67386 13.2675L6.99696 7.95482L12.3096 13.2675L13.2576 12.3195L7.94491 7.00687L13.2263 1.72544L12.2784 0.777496L6.99696 6.05892L1.71553 0.777496Z"/>
                          </svg>
                          <span class="filter-tag__text  filter__tag-text">` + picker.chosenLabel + `</span>
                        </div>
                      `;
                    return html;
                });
                $('.calls-table__meta-text').html( function() {
                    const html = picker.chosenLabel
                    return html;
                });
            }
        });

        $('.filter__calendar .filter__date').on('hide.daterangepicker', function () {
            $(this).removeClass('open')
        });
        /* Date repange picker END*/

        /* Employee select */
        $("#filter-employee").select2();

        $("#filter-employee").on('select2:close, change', function () {
            $('.filter__select').removeClass('open')

            $('.filter-tags').css('display', 'flex');
            let select = $(this);
            $(this).next('span.select2').find('ul').html(function () {
                let count = select.select2('data').length;
                if (count == 0) {
                    return '';
                }
                return "<li>" + count + " сотрудника</li>";
            })
            $('.filter-tags .filter-tags__employees').html(function () {
                let html = '';
                $(select).val().forEach(function (item, index) {
                    html += `
                      <div class="filter-tags__item filter__tag" data-value="` + item + `">
                        <svg class="remove-employee-tag" data-value="` + item + `" width="12.5" height="12.5" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.71553 0.777496L0.767579 1.72544L6.04901 7.00687L0.736328 12.33L1.67386 13.2675L6.99696 7.95482L12.3096 13.2675L13.2576 12.3195L7.94491 7.00687L13.2263 1.72544L12.2784 0.777496L6.99696 6.05892L1.71553 0.777496Z"/>
                        </svg>
                        <span class="filter-tag__text  filter__tag-text">` + item + `</span>
                      </div>
                  `;
                });
                return html;
            });
            var $searchfield = $(this).parent().find('.select2-search__field');
            $searchfield.prop('disabled', true)
        })
        /* Employee select  END*/

        /* Phone select */
        $('#filter-phone').select2();
        $('#filter-phone').on('select2:close, change', function () {
            $('.filter__input').removeClass('open');
            $('.filter-tags').css('display', 'flex');
            let select = $(this);
            $(this).next('span.select2').find('ul').html(function () {
                let count = select.select2('data').length
                if (count == 0) {
                    return '';
                }
                return "<li>Выбрано " + count + "</li>";
            })
            $('.filter-tags .filter-tags__phone').html(function () {
                let html = '';
                $(select).val().forEach(function (item, index) {
                    html += `
                      <div class="filter-tags__item  filter__tag" data-value="` + item + `" >
                        <svg class="remove-phone-tag " data-value="` + item + `"  width="12.5" height="12.5" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.71553 0.777496L0.767579 1.72544L6.04901 7.00687L0.736328 12.33L1.67386 13.2675L6.99696 7.95482L12.3096 13.2675L13.2576 12.3195L7.94491 7.00687L13.2263 1.72544L12.2784 0.777496L6.99696 6.05892L1.71553 0.777496Z"/>
                        </svg>
                        <span class="filter-tag__text  filter__tag-text">` + item + `</span>
                      </div>
                  `;
                        });
                        return html;
                    });

            var $searchfield = $(this).parent().find('.select2-search__field');
            $searchfield.prop('disabled', true)
        })
        /* Phone select END*/

        $(".t-pager__actions-value").select2({
            minimumResultsForSearch: -1
        });
        $('.t-pager__actions-value').on('select2:close, change', function () {
            $('.t-pager__actions-input').removeClass('open');
        });
        /* Phone panel handlers */
        $("#phone-acount").select2();
        $("#phone-acount").on('change', function () {
            $('.phone-panel__account-select').removeClass('open');
        })
        $('.phone-panel__input input').on('input', function () {
            let value = $(this).val().replace('(', '');
            value = value.replaceAll(')', '');
            value = value.replaceAll('+', '');
            value = value.replaceAll(' ', '');
            value = value.replaceAll('_', '');
            value = value.replaceAll('-', '');
            $('.phone-panel__input-hidden').val(value)
        });

        // $(".phone-panel__input input").inputmask({"mask": "+99(999) 999-99-99"});

        $('.phone-panel__input-clear').on('click', function () {
            let val = $('.phone-panel__input-hidden').val();
            val = val.substring(0, val.length - 1);
            $('.phone-panel__input input').val(val).trigger('change');
        });

        /* Filter & Filter tags handlers */
        $('.toggle-filters').on('click', function () {
            $('.filter').toggleClass('active');
        });

        $(document).on('click', function () {
            if ($('.filter__input').find('.select2-selection').attr('aria-expanded') == 'true') {
                $('.filter__input').addClass('open');
            } else {
                $('.filter__input').removeClass('open');
            }

            if ($('.filter__select').find('.select2-selection').attr('aria-expanded') == 'true') {
                $('.filter__select').addClass('open');
            } else {
                $('.filter__select').removeClass('open');
            }

            if ($('.phone-panel__account-select').find('.select2-selection').attr('aria-expanded') == 'true') {
                $('.phone-panel__account-select').addClass('open');
            } else {
                $('.phone-panel__account-select').removeClass('open');
            }

            if ($('#all .t-pager__actions-input').find('.select2-selection').attr('aria-expanded') == 'true') {
                $('#all .t-pager__actions-input').addClass('open');
            } else {
                $('#all .t-pager__actions-input').removeClass('open');
            }

            if ($('#missing-call .t-pager__actions-input').find('.select2-selection').attr('aria-expanded') == 'true') {
                $('#missing-call .t-pager__actions-input').addClass('open');
            } else {
                $('#missing-call .t-pager__actions-input').removeClass('open');
            }
        });
        $('.btn--clear').on('click', function () {
            $('.filter-tags').css('display', 'none');
            $("#filter-employee").val('');
            $("#filter-phone").val('');
            $(".calls-table__meta-text").html('');
            $('#daterange').daterangepicker({startDate: moment().startOf('day'), endDate: moment().endOf('day')});
            $("#filter-employee").next('span.select2').find('ul').html('');
            $("#filter-phone").next('span.select2').find('ul').html('');
            $(document).find('.filter__date-txt').text('');
            $('.filter-tags .filter-tags__phone, .filter-tags .filter-tags__employees, .filter-tags .filter-tags__date').html('');
        })

        /* Clear filters tags*/
        $(document).on('click', '.remove-employee-tag', function () {
            $(this).parent().remove();
            let items = [];
            $('.filter-tags__employees').find('.filter__tag').each(function (item) {
                items.push($(this).data('value'));
            });

            $("#filter-employee").val(items).trigger('change');
            toggleTagsFilters();
        });

        $(document).on('click', '.remove-phone-tag', function () {
            $(this).parent().remove();
            let items = [];
            $('.filter-tags__phone').find('.filter__tag').each(function (item) {
                items.push($(this).data('value'));
            });

            if (items.length == 0) {
                $("#filter-phone").val('').trigger('change');
            } else {
                $("#filter-phone").val(items).trigger('change');
            }
            toggleTagsFilters();
        });

        $(document).on('click', '.remove-date-tag', function () {
            $(this).parent().remove();
            $(document).find('.filter__date-txt').text('');
            $(".calls-table__meta-text").html('');
            toggleTagsFilters();
        });

        function toggleTagsFilters() {
            if ($('.filter-tags__employees').find('div').length == 0 &&
                $('.filter-tags__date').find('div').length == 0 &&
                $('.filter-tags__phone').find('div').length == 0) {
                $('.filter-tags').css('display', 'none');
            }
        };

        $(".side-menu__list").scroll(function (e) {
            const scrollBottom = $(".side-menu__list").scrollTop() + $(".side-menu__list").height();

            if (e.currentTarget.scrollTop > 20) {
                $('.main-menu__gradient').removeClass('hidden');
            }

            if (e.currentTarget.scrollTop < 5) {
                $('.main-menu__gradient').addClass('hidden');
            }

            let scrollHeight = e.currentTarget.scrollHeight - 20;

            if (scrollHeight < scrollBottom) {
                $('.side-menu__footer').addClass('overlay-hidden');
            } else {
                $('.side-menu__footer').removeClass('overlay-hidden');
            }
        });

        var phoneNumbers = [
            {
                value: "+17866018512",
                label: "<div>sss</div> <div>+17866018512</div>"
            },
            {
                value: "+17866018512",
                label: "<div>sss</div> <div>+17866018512</div>"
            },
            {
                value: "+17866018512",
                label: "<div>sss</div> <div>+17866018512</div>"
            }
        ];



        $(".phone-panel__input-active").autocomplete({
            source: phoneNumbers,
            autofocus: true,
            minLength: 3,
            appendTo: '#autocomplete-serch',
            focus: function( event, ui ) {
               $( ".phone-panel__input-active" ).val( ui.item.value );
                return false;
            },
            select: function( event, ui ) {
                $( ".phone-panel__input-active" ).val( ui.item.value );
                return false;
            }
        })
            .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
                .append( "<div>" + item.label + "</div>" )
                .appendTo( ul );
        };

        $(document).on('click','.alert-close', function() {
            $(this).closest('.alerts').slideToggle();
        });

        $('.t-pager__more').on('click', function(e) {
            if(e.target.localName == 'input' ) {
                return false;
            }
                $('.t-pager__choose-page').toggleClass('visible');

        });

        $('.t-pager__go-icon').on('click', function() {
          //  Do something
        })

        $(document).on('click', function(e) {
            if (e.target.className != "t-pager__more") {
                $('.t-pager__choose-page').removeClass('visible');
            }
        })

    });
})(jQuery, window);

/* Tabs */
document.getElementById("defaultOpen").click();

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/* Volume range */
$(".phone-panel__volume").slider({
    min: 0,
    max: 100,
    value: 0,
      range: "min",
    slide: function(event, ui) {
      setVolume(ui.value / 100);
    }
  });
  
  var myMedia = document.createElement('audio');
  $('.phone-panel__volume-wrap').append(myMedia);
  myMedia.id = "myMedia";

  function playAudio(fileName, myVolume) {
          myMedia.src = fileName;
          myMedia.setAttribute('loop', 'loop');
      setVolume(myVolume);
      myMedia.play();
  }
  
  function setVolume(myVolume) {
  var myMedia = document.getElementById('myMedia');
  myMedia.volume = myVolume;
  }

// show and hide .phone-table__add-to-call-wrap 

  $('.phone-table__add-to-call-wrap').hide()
  jQuery('.phone-panel__control-btn.phone-panel__control-btn--add-to-call').on('click',function(){
    jQuery('.phone-table__add-to-call-wrap').toggle();
  })


