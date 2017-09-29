/**
 *
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-08 09:52:54
 * @version $Id$
 */

$(function () {
    $('#all-check').click(function () {
        var $checked = $(this).prop('checked');
        $('.cart-list_check').prop('checked', $checked);
    });

    $('.cart-list_delete').on('click', function () {
        var cartId = $(this).attr('data-id');
        $.ajax({
            url: '/carts/' + cartId,
            type: 'delete',
            success: function (res) {
                location.reload();
            },
            error: function (err) {
                alert(err);
            },
            complete: function () {
                console.log('complete');
            }
        });
    });

    $('.cart-list_quantity').keyup(function () {
        var $value = $(this).val();
        if (!$value || $value < 1) {
            $(this).val(1);
        }
        if ($value > 9) {
            $(this).val(9);
        }
    });

    $('.cart-list_quantity').blur(function () {
        var $priceCount = 0;
        $('.cart-list-tr').each(function (index, list) {
            $priceCount = $priceCount + $(list).find('.cart-list_price').text() * $(list).find('.cart-list_quantity').val();
        });
        $('.cart-list-price_count span').text($priceCount.toFixed(2));
    });

    $('.cart-list_account').on('click', function () {
        var params = [];
        $('.cart-list_check').each(function (index, list) {
            var json = {};
            if ($(list).prop('checked')) {
                var $value = $(list).parents('.cart-list-tr').find('.cart-list_quantity').val();
                var $cId = $(list).attr('data-id');
                json.cId = $cId;
                json.cQuantity = $value;
                params.push(json);
            }
        });
        if (params.length === 0) {
            alert('请选择要结算得商品！');
        } else {
            $.ajax({
                url: '/carts',
                data: JSON.stringify({
                    params: params
                }),
                type: 'post',
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    location.reload();
                },
                error: function (err) {
                    alert(err);
                },
                complete: function () {
                    console.log('complete');
                }
            });
        }
    });

    $('.commodity-delete').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: location.pathname,
            type: 'delete',
            success: function (res) {
                location.replace('/');
            },
            error: function (err) {
                alert(err);
            },
            complete: function () {
                console.log('complete');
            }
        });
    });
});