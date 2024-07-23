var rqstquote_pageurl = window.location.href;
var rqstquoteJson = '';
var rqstquote = {
	'applybtn': function(json) {
		$('.rqstquote_btn_dual, .rqstquote_btn_prod_dual').remove();
		var product = json['product'].split(',');
		var zeroprcprod = json['product_zeroprc'].split(',');
		var outstockprod = json['product_outstock'].split(',');
		var btntype = json['btntype'];
		var btntext = json['langdata']['btntext'];
		btntext = $.parseHTML(btntext)[0]['wholeText'];
		/*console.log(btntext);*/
		
		$("[onclick*='cart.add']").each(function() {
			var product_id = $(this).attr('onclick').match(/[0-9]+/);
			var btntype = json['btntype'];
			if(zeroprcprod.indexOf(product_id.toString()) >= 0 || outstockprod.indexOf(product_id.toString()) >= 0) {
				btntype = 1;
			}
			if (product.indexOf(product_id.toString()) >= 0 || json['all'] == 1 || zeroprcprod.indexOf(product_id.toString()) >= 0 ) {	
				if(btntype == 1) {
					$(this).attr('onclick', 'rqstquote.add('+product_id+');').addClass('rqstquote_btn').removeAttr('id').html(btntext);
				} else {
					$(this).parent().after('<button class="btn btn-success button rqstquote_btn_dual" onclick="rqstquote.add('+product_id+');">'+btntext+'</button>');
				}
				/*hide price*/
				if(zeroprcprod.indexOf(product_id.toString()) >= 0 && json['hideprc'] == 1) {
					$(this).closest('.product-thumb').find('.price').remove(); 
				}
				if((zeroprcprod.indexOf(product_id.toString()) >= 0 || outstockprod.indexOf(product_id.toString()) >= 0) && json['hideprc'] == 2) {
					$(this).closest('.product-thumb').find('.price').remove(); 
				}
				if(json['hideprc'] == 3) {
					$(this).closest('.product-thumb').find('.price').remove(); 
				}
			}
		});
	},
	'prodpage': function(json) {
		$('.rqstquote_btn_dual, .rqstquote_btn_prod_dual').remove();
		var product = json['product'].split(',');
		var zeroprcprod = json['product_zeroprc'].split(',');
		var outstockprod = json['product_outstock'].split(',');
		var btntype = json['btntype'];
		var btntext = json['langdata']['btntext'];
		btntext = $.parseHTML(btntext)[0]['wholeText'];
		/*console.log(btntext);*/
		
		var product_id_page = $("input[name='product_id']").val();
		if (typeof product_id_page !== 'undefined') {
			if(zeroprcprod.indexOf(product_id_page.toString()) >= 0 ) {
				btntype = 1;
			}
			if (product.indexOf(product_id_page.toString()) >= 0 || json['all'] == 1 || zeroprcprod.indexOf(product_id_page.toString()) >= 0 ) {
				if(btntype == 1) {
					$('#button-cart').unbind('click');
					$('#button-cart').attr('onclick', 'rqstquote.addfromprodpage('+product_id_page+');').addClass('rqstquote_btn_prod').removeAttr('id').html(btntext);
				} else {
					$('#button-cart').parent().after('<button class="btn btn-success button btn-lg btn-block rqstquote_btn_prod_dual" onclick="rqstquote.addfromprodpage('+product_id_page+');">'+btntext+'</button>');
				}
				/*hide price*/
				if(zeroprcprod.indexOf(product_id_page.toString()) >= 0 && json['hideprc'] == 1) {
					$('#product').parent().find('ul').eq(0).remove();
				}
				if((zeroprcprod.indexOf(product_id_page.toString()) >= 0 || outstockprod.indexOf(product_id_page.toString()) >= 0) && json['hideprc'] == 2) {
					$('#product').parent().find('ul').eq(0).remove();
				}
				if(json['hideprc'] == 3) {
					$('#product').parent().find('ul').eq(0).remove();
				}
			} 
		}
	},
	'setpophtml': function(json) {
		// var pop_head_title = json['langdata']['pop_head_title'];
		// pop_head_title = $.parseHTML(pop_head_title)[0]['wholeText'];
		
		$( 'nav#top' ).find('ul.list-inline').eq(0).append('<li><a href="index.php?route=extension/rqstquotecart"><i class="fa fa-file-text" aria-hidden="true"></i> Quote Cart</a></li>');
		
		// var pophtml = '<div id="rqstquotepop" class="modal fade" role="dialog"> <div class="modal-dialog modal-lg"> <div class="modal-content">';
		// pophtml += '<div class="modal-header modal-header-success"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h3>'+pop_head_title+'</h3> </div>';
		// pophtml += '<div class="modal-body"></div>';
		// pophtml += '</div>';
		// $('body').append(pophtml);
	},
	'initjson': function() {
		rqstquote.setpophtml();
		// $.ajax({ 
			// url: 'index.php?route=extension/rqstquote/getcache',
			// dataType: 'json',
			// cache: true,
			// success: function(json) {
				// if(json) {
					// rqstquoteJson = json;
					// rqstquote.setpophtml(json);
					// rqstquote.applybtn(json);
					// rqstquote.prodpage(json);
					// $(document).ajaxStop(function(){ rqstquote.applybtn(json); });
				// }
			// }
 		// });
	},
	'setdatepicker': function() {
		$('.date').datetimepicker({
			language: '{{ datepicker }}',
			pickTime: false
		});
		
		$('.datetime').datetimepicker({
			language: '{{ datepicker }}',
			pickDate: true,
			pickTime: true
		});
		
		$('.time').datetimepicker({
			language: '{{ datepicker }}',
			pickDate: false
		});
	},
	'refreshpop': function() {
		$.ajax({
			url: 'index.php?route=extension/rqstquote/refreshpop',
			dataType: 'html',
			cache: false,
			beforeSend: function() {
				if(rqstquote_pageurl.indexOf('rqstquotecart') != -1) {
					$('#content').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
				} else {
					$('#rqstquotepop').modal('show');
					$('#rqstquotepop .modal-body').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
				}
			},
			success: function(html) {
				if(rqstquote_pageurl.indexOf('rqstquotecart') != -1) {
					$('#content').html(html);	
				} else {
					$('#rqstquotepop .modal-body').html(html);
				}
				rqstquote.setdatepicker();
 			}
		});
	},
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=extension/rqstquotecart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			cache: false,
 			success: function(json) {
				if (json['redirect']) {
					location = json['redirect'];
				}
 				if (json['success']) {
					if(json['btnact'] == 1) { 
						 location = 'index.php?route=extension/rqstquotecart';
  					}
					if(json['btnact'] == 2) { 
						rqstquote.refreshpop();
					}
					if(json['btnact'] == 3) { 
					 	$('.alert').remove();
						$('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
						$('html, body').animate({ scrollTop: 0 }, 'slow'); 
					}
				} 
			} 
		});
	},
	'addfromprodpage': function() {
		$.ajax({
			url: 'index.php?route=extension/rqstquotecart/add',
			type: 'post',
			data: $('#product input[type=\'text\'], #product input[type=\'hidden\'], #product input[type=\'radio\']:checked, #product input[type=\'checkbox\']:checked, #product select, #product textarea'),
			dataType: 'json',
			cache: false,
			success: function(json) { 
				$('.alert, .text-danger').remove();
				$('.form-group').removeClass('has-error');
				
				if (json['error']) {
					if (json['error']['option']) {
						for (i in json['error']['option']) {
							var element = $('#input-option' + i.replace('_', '-'));
							if (element.parent().hasClass('input-group')) {
								element.parent().after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
							} else {
								element.after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
							}
						}
					}	
					$('.text-danger').parent().addClass('has-error');
				}
				
				if (json['success']) {
					if(json['btnact'] == 1) { 
						 location = 'index.php?route=extension/rqstquotecart';
					}
					if(json['btnact'] == 2) { 
						rqstquote.refreshpop();
					}
					if(json['btnact'] == 3) { 
						$('.alert').remove();
						$('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
						$('html, body').animate({ scrollTop: 0 }, 'slow'); 
					}
				}
			} 
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=extension/rqstquotecart/updatequote',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			cache: false,
 			success: function(json) {
				rqstquote.refreshpop();
			} 
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=extension/rqstquotecart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			cache: false,
 			success: function(json) {
 				rqstquote.refreshpop();		
			} 
		});
	},	
	'submitform': function() {
		$('.alert, .text-danger').remove();
		$('.form-group').removeClass('has-error');
	 
		$.ajax({
			url: 'index.php?route=extension/rqstquotecart/save',
			type: 'post',
			data: $('#rqstquoteformpop input[type=\'text\'], #rqstquoteformpop input[type=\'date\'], #rqstquoteformpop input[type=\'datetime-local\'], #rqstquoteformpop input[type=\'time\'], #rqstquoteformpop input[type=\'password\'], #rqstquoteformpop input[type=\'hidden\'], #rqstquoteformpop input[type=\'checkbox\']:checked, #rqstquoteformpop input[type=\'radio\']:checked, #rqstquoteformpop textarea, #rqstquoteformpop select'),
			dataType: 'json',
			beforeSend: function() {
				$('#button-rqstquotesubmit').button('loading');
				$('.alert, .text-danger').remove();
				$('.form-group').removeClass('has-error');
			},
			complete: function() {
				$('#button-rqstquotesubmit').button('reset');
			},
			success: function(json) {
				if (json['redirect']) {
					location = json['redirect'];
				} else if (json['error']) {
					for (i in json['error']) {
						var element = $('#rqstquoteformpop').find('#input-' + i.replace('_', '-'));
						
						if ($(element).parent().hasClass('input-group')) {
							$(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
						} else {
							$(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
						}
						
						if(i == 'captcha'){
							$('div.rqstquotecaptcha div.rqstquotecaptchaerr').append('<div class="text-danger">' + json['error'][i] + '</div>');
						}
					}
					$('.text-danger').parent().parent().addClass('has-error');
				} 
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		}); 
	}	
}
$(document).delegate('button[id*=\'button-rqstquotefield\']', 'click', function() {
	var node = this;
	$('#form-upload').remove();
	$('body').prepend('<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="file" /></form>');
	$('#form-upload input[name=\'file\']').trigger('click');
	if (typeof timer != 'undefined') {
    	clearInterval(timer);
	}
	timer = setInterval(function() {
		if ($('#form-upload input[name=\'file\']').val() != '') {
			clearInterval(timer);
			$.ajax({
				url: 'index.php?route=tool/upload',
				type: 'post',
				dataType: 'json',
				data: new FormData($('#form-upload')[0]),
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function() {
					$(node).button('loading');
				},
				complete: function() {
					$(node).button('reset');
				},
				success: function(json) {
					$(node).parent().find('.text-danger').remove();
					if (json['error']) {
						$(node).parent().find('input').after('<div class="text-danger">' + json['error'] + '</div>');
					}
					if (json['success']) {
						alert(json['success']);
						$(node).parent().find('input').val(json['code']);
					}
				},
				error: function(xhr, ajaxOptions, thrownError) {
					alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
				}
			});
		}
	}, 500);
});
$(window).load(function() {
rqstquote.initjson();
});
/*setTimeout(function(){ console.log(rqstquoteJson); }, 500);*/
if(rqstquote_pageurl.indexOf('rqstquotecart') != -1) {
	rqstquote.refreshpop();
}