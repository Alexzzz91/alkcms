overlay = $('#overlay')
fab = $('.fab')
cancel = $('#cancel')
submit = $('#submit')
#fab click

openFAB = (event) ->
  if event
    event.preventDefault()
  fab.addClass 'active'
  overlay.addClass 'dark-overlay'
  return

closeFAB = (event) ->
  if event
    event.preventDefault()
    event.stopImmediatePropagation()
  fab.removeClass 'active'
  overlay.removeClass 'dark-overlay'
  return

fab.on 'click', openFAB
overlay.on 'click', closeFAB
cancel.on 'click', closeFAB
$ ->
  $('.input label').on 'click', ->
    $(this).next('input').focus()
    return
  $('.input input').focus(->
    $(this).parent('.input').each ->
      $('label', this).css
        'line-height': '18px'
        'font-size': '18px'
        'font-weight': '100'
        'top': '0px'
      $('.spin', this).css 'width': '100%'
      return
    return
  ).blur ->
    $('.spin').css 'width': '0px'
    if $(this).val() == ''
      $(this).parent('.input').each ->
        $('label', this).css
          'line-height': '60px'
          'font-size': '24px'
          'font-weight': '300'
          'top': '10px'
        return
    return
  $('.button').click (e) ->
    pX = e.pageX
    pY = e.pageY
    oX = parseInt($(this).offset().left)
    oY = parseInt($(this).offset().top)
    $(this).append '<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + pX - oX + 'px;margin-top:' + pY - oY + 'px;"></span>'
    $('.x-' + oX + '.y-' + oY + '').animate {
      'width': '500px'
      'height': '500px'
      'top': '-250px'
      'left': '-250px'
    }, 600
    #$("button", this).addClass('active');
    return
  $('.alt-2').click ->
    if !$(this).hasClass('material-button')
      $('.shape').css
        'width': '100%'
        'height': '100%'
        'transform': 'rotate(0deg)'
      setTimeout (->
        $('.overbox').css 'overflow': 'initial'
        return
      ), 600
      $(this).animate {
        'width': '140px'
        'height': '140px'
      }, 500, ->
        $('.box').removeClass 'back'
        $(this).removeClass 'active'
        return
      $('.overbox .title').fadeOut 300
      $('.overbox .input').fadeOut 300
      $('.overbox .button').fadeOut 300
      $('.alt-2').addClass 'material-buton'
    return
  $('.material-button').click ->
    if $(this).hasClass('material-button')
      setTimeout (->
        $('.overbox').css 'overflow': 'hidden'
        $('.box').addClass 'back'
        return
      ), 200
      $(this).addClass('active').animate
        'width': '700px'
        'height': '700px'
      setTimeout (->
        $('.shape').css
          'width': '50%'
          'height': '50%'
          'transform': 'rotate(45deg)'
        $('.overbox .title').fadeIn 300
        $('.overbox .input').fadeIn 300
        $('.overbox .button').fadeIn 300
        return
      ), 700
      $(this).removeClass 'material-button'
    if $('.alt-2').hasClass('material-buton')
      $('.alt-2').removeClass 'material-buton'
      $('.alt-2').addClass 'material-button'
    return
  return

$('#login-submit').on 'click', ->
  $(document.forms['login-form']).submit()
  return
$(document.forms['login-form']).on 'submit', ->
  form = $(this)
  $('.error', form).html ''
  $(':submit', form).button 'loading'
  $.ajax
    url: '/login'
    method: 'POST'
    data: form.serialize()
    complete: ->
      $(':submit', form).button 'reset'
      return
    statusCode:
      200: ->
        $('.material-button').addClass 'active'
        form.html('Вы вошли в сайт').addClass 'alert-success'
        window.location.href = '/chat'
        return
      403: (jqXHR) ->
        error = JSON.parse(jqXHR.responseText)
        $('.error', form).html error.message
        return
  false
$('#register-submit').on 'click', ->
  $(document.forms['register-form']).submit()
  return
$(document.forms['register-form']).on 'submit', ->
  form = $(this)
  $('.error', form).html ''
  $(':submit', form).button 'loading'
  $.ajax
    url: '/register'
    method: 'POST'
    data: form.serialize()
    complete: ->
      $(':submit', form).button 'reset'
      return
    statusCode:
      200: ->
        $('.material-button').addClass 'active'
        form.html('Вы вошли в сайт').addClass 'alert-success'
        window.location.href = '/chat'
        return
      403: (jqXHR) ->
        error = JSON.parse(jqXHR.responseText)
        $('.error', form).html error.message
        return
  false