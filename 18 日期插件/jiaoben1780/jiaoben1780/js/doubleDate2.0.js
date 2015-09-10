 var jqObj = []; //保存对象，便于点击时做操作
 $.fn.kuiDate = function(k_date){
	//重写k_date的参数，把所有的值初始化
	k_date = {
		isDisabled : k_date.isDisabled || '0',
		maxDate : k_date.maxDate || '',
		minDate : k_date.minDate || '',
		className : k_date.className
	};
	var kDate;
	$(this).live('click',function(e){
		$('#popup_frame,#popup_pane,#a_tips_frame,#air_down_tips').hide();
		kDate = $(this);
		kui_date();
	}).live('focus',function(e){
		$('#popup_frame,#popup_pane,#a_tips_frame,#air_down_tips').hide();
		kDate = $(this);
		kui_date();
	});
	
	//清空按钮
	$('.kui_date_reset span.off').click(function(){
		//清空文本框内容
		jqObj[0].val('');
		$('#kui_d_pane').hide();
	})	
	
	//关闭按钮
	$('.kui_date_reset span.close').click(function(){
		//清空文本框内容
		$('#kui_d_pane').hide();
	})	
	// Download by http://www.jb51.net
	function kui_date(){ //var d = new Date().getTime();
		// 给日期插件定位 
		var txt_left = kDate.offset().left;
		var txt_top = kDate.offset().top + kDate.outerHeight();
		var txt_wid = kDate.outerWidth();
		var scrollWidth = $(window).width();
		if(txt_left + 370 < scrollWidth){
			// 判断文本框的下方是否够显示弹出框的高度
			if($(document).clientHeight - txt_top < 217 && $(document).clientHeight > 217){
				$('#kui_d_pane').attr('style','left:'+ txt_left +'px; top:'+ (kDate.offset().top - 197) +'px;');
			}
			else{
				$('#kui_d_pane').attr('style','left:'+ txt_left +'px; top:'+ txt_top +'px;');
			}
		}
		else{
			$('#kui_d_pane').attr('style','left:'+(txt_left+txt_wid-370)+'px; top:'+ txt_top +'px;');
		}
		$('#kui_d_pane').show();
		// 获取当前系统时间
		var kui_dd = new Date();
		var kui_year = kui_dd.getFullYear();
		var kui_month = kui_dd.getMonth()+1;
		var kui_date = kui_dd.getDate();
		var kui_day = kui_dd.getDay();
		var kui_hours = kui_dd.getHours();
		var kui_minutes = kui_dd.getMinutes();
		var kui_seconds = kui_dd.getSeconds();
		var n_time = kui_dd.getTime();
		var vals = kDate.val();
		var now_year = $.trim(vals) == '' ? kui_year : $.trim(vals).substring(0,4);
		var now_month = $.trim(vals) == '' ? kui_month : $.trim(vals).substring(5,7);
		var now_d =  $.trim(vals) == '' ? kui_date : $.trim(vals).substring(8,10);
		$('.kui_today').text(now_year+'年'+now_month+'月');
		
		// 上月下月
		$('a.kui_prev_m').click(function(){
			var kui_y = now_year;
			var kui_m = now_month;
			if(kui_m==1){
				now_year = kui_y-1;
				now_month = '12';
			}
			if(kui_m>1 && kui_m <11){
				now_month = '0'+(kui_m-1);
			}
			if(kui_m>10 && kui_m <13){
				now_month = kui_m-1;
			}
			$('.kui_today').text(now_year+'年'+now_month+'月');
			change_date('left');
			change_date('right');
		});
		$('a.kui_next_m').click(function(){
			var kui_y = now_year;
			var kui_m = now_month;
			if(kui_m>0 && kui_m <9){
				now_month = '0'+(parseInt(kui_m,10)+1);
			}
			if(kui_m>8 && kui_m <12){
				now_month = parseInt(kui_m,10)+1;
			}
			if(kui_m==12){
				now_year ++;
				now_month = '01';
			}
			$('.kui_today').text(now_year+'年'+now_month+'月');
			change_date('left');
			change_date('right');
		});
		change_date('left');
		change_date('right');
		// 日期变化函数 
		function change_date(dir){ 
			jqObj.pop(); jqObj.push(kDate);
			// 日期 -- 根据年和月计算出来 
			var kui_y = now_year;
			var kui_m = now_month;
			if(dir == 'right'){
				if(kui_m == 12){
					kui_y ++;
					kui_m = '01';
				}
				else{
					kui_m++;
					if(kui_m<10){
						kui_m = '0'+kui_m;
					}
				}
				$('.kui_tomorrow').text(kui_y+'年'+kui_m+'月');
			}
			else{
				kui_m = (kui_m < 10) ? '0'+parseInt(kui_m,10) : kui_m;
			}
			var kui_d = now_d;
			var now_date = '';
			
			if(vals == ''){
				now_date = kui_y+'-'+kui_m+'-'+kui_d;
			}
			else{
				now_date = $.trim(vals);
			}
			var kui_max_date = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
			if (((kui_y % 4 == 0) && (kui_y % 100 != 0)) || (kui_y % 400 == 0)){
				kui_max_date[1] = 29;
			}
			var this_max_date = kui_max_date[kui_m-1];
			// 计算星期数 
			var C = 1;  // C是从这一年的元旦算起到这一天为止（包括这一天是内）的天数
			for(var i=0;i < kui_m - 1;i++){
				C += kui_max_date[i];
			}
			var kui_si = ((kui_y - 1)%4) == 0 ? ((kui_y - 1)/4) : ((kui_y - 1 - (kui_y - 1)%4)/4);
			var kui_yibai = ((kui_y - 1)%100) == 0 ? ((kui_y - 1)/100) : ((kui_y - 1 - (kui_y - 1)%100)/100);
			var kui_sibai = ((kui_y - 1)%400) == 0 ? ((kui_y - 1)/400) : ((kui_y - 1 - (kui_y - 1)%400)/400);
			var S= kui_y - 1 + kui_si - kui_yibai + kui_sibai + C; //求出S的值之后，除以7，余几就是星期几；除尽了就是星期日 
			var aa = (kui_date - 1)%7;
			var bb = S%7; // 每月1号的星期数
			// TD表格的行数
			var kui_td_lines = (bb + this_max_date)%7 == 0 ? (bb + this_max_date)/7 : (bb + this_max_date - (bb + this_max_date)%7)/7 +1;
			
			//动态添加表格数据
			var kui_tbody;
			if(dir == 'left'){
				kui_tbody = $('#kui_left_t');
			}
			else{
				kui_tbody = $('#kui_right_t');
			}
			kui_tbody.html('');
			var arr_tr = [];
			for(var i=0;i<kui_td_lines;i++){
				var m_ = kui_month < 10 ? '0'+kui_month : kui_month;
				var k_d_ = kui_date < 10 ? '0'+kui_date : kui_date;
				var dd1 = kui_year+'-'+m_+'-'+k_d_; //拼接当前系统时间的年月日
					
				if(i == 0){
					// 第一行中有空白的单元格
					for(var j = 1;j < bb+1;j ++){
						arr_tr.push('<dt class="kui_td_kong">&nbsp;</dt>');
					}
					// 第一行中有值单元格
					var kui_i = 1;
					for(var j=bb+1;j<=7;j++){
						var d_ = (7*i+kui_i) < 10 ? '0'+(7*i+kui_i) : (7*i+kui_i);
						var mm_ = kui_m < 10 ? '0'+parseInt(kui_m,10) : kui_m;
						var dd2 = kui_y+'-'+mm_+'-'+d_;
						var cla = '';
						if(dd2 >= dd1){
							if(vals == ''){
								cla = 'kui_not_kong';
								if(kui_d == d_ && dir == 'left'){
									cla = 'kui_not_kong td_select';
								}
							}
							else if(vals == dd2){
								cla = 'kui_not_kong td_select';
							}
							else{
								cla = 'kui_not_kong';
							}
						}
						else{
							if(k_date.isDisabled == '1'){
								if(vals == ''){
									cla = 'kui_not_kong';
									if(kui_d == d_ && dir == 'left'){
										cla = 'kui_not_kong td_select';
									}
								}
								else if(vals == dd2){
									cla = 'kui_not_kong td_select';
								}
								else{
									cla = 'kui_not_kong';
								}
							}
							else{
								cla = 'kui_td_hui';
							}
						}
						arr_tr.push('<dt class="'+cla+'" onmouseover="kui_mouseover_(this)" onmouseout="kui_mouseout_(this)" onclick="kui_click_(this,'+now_date+','+kui_y+','+kui_m+','+kui_d+');">'+(7*i+kui_i)+'</dt>');
						kui_i++;
					}
					$('.kui_top_tr').removeClass('kui_top_tr');
				}
				else if(i==kui_td_lines-1){
					var kui_i = 8-bb;
					for(var j=1;j<=7;j++){
						var dd2 = kui_y+'-'+kui_m+'-'+(7*(i-1)+kui_i);
						var cla = '';
						if((7*(i-1)+kui_i) > this_max_date){
							arr_tr.push('<dt class="kui_td_kong">&nbsp;</dt>');
						}
						else{
							if(dd2 >= dd1){
								if(vals == ''){
									cla = 'kui_not_kong';
									if(kui_d == (7*(i-1)+kui_i) && dir == 'left'){
										cla = 'kui_not_kong td_select';
									}
								}
								else if(vals == dd2){
									cla = 'kui_not_kong td_select';
								}
								else{
									cla = 'kui_not_kong';
								}
							}
							else{
								if(k_date.isDisabled == '1'){
									if(vals == ''){
										cla = 'kui_not_kong';
										if(kui_d == (7*(i-1)+kui_i) && dir == 'left'){
											cla = 'kui_not_kong td_select';
										}
									}
									else if(vals == dd2){
										cla = 'kui_not_kong td_select';
									}
									else{
										cla = 'kui_not_kong';
									}
								}
								else{
									cla = 'kui_td_hui';
								}
							}
							arr_tr.push('<dt class="'+cla+'" onmouseover="kui_mouseover_(this)" onmouseout="kui_mouseout_(this)" onclick="kui_click_(this,'+now_date+','+kui_y+','+kui_m+','+kui_d+');">'+(7*(i-1)+kui_i)+'</dt>');
						}
						kui_i++;
					}
				}
				else{
					var kui_i = 8 - bb;
					for(var j=1;j<=7;j++){
						var d_ = (7*(i-1)+kui_i) < 10 ? '0'+(7*(i-1)+kui_i) : (7*(i-1)+kui_i);
						var mm_ = kui_m < 10 ? '0'+parseInt(kui_m,10) : kui_m;
						var dd2 = kui_y+'-'+mm_+'-'+d_;
						var cla = '';
						if(dd2 >= dd1){
							if(vals == ''){
								cla = 'kui_not_kong';
								if(kui_d == d_ && dir == 'left'){
									cla = 'kui_not_kong td_select';
								}
							}
							else if(vals == dd2){
								cla = 'kui_not_kong td_select';
							}
							else{
								cla = 'kui_not_kong';
							}
						}
						else{
							if(k_date.isDisabled == '1'){
								if(vals == ''){
									cla = 'kui_not_kong';
									if(kui_d == d_ && dir == 'left'){
										cla = 'kui_not_kong td_select';
									}
								}
								else if(vals == dd2){
									cla = 'kui_not_kong td_select';
								}
								else{
									cla = 'kui_not_kong';
								}
							}
							else{
								cla = 'kui_td_hui';
							}
						}
						arr_tr.push('<dt class="'+cla+'" onmouseover="kui_mouseover_(this)" onmouseout="kui_mouseout_(this)" onclick="kui_click_(this,'+now_date+','+kui_y+','+kui_m+','+kui_d+',1);">'+(7*(i-1)+kui_i)+'</dt>');
						kui_i++;
					}
				}
			}
			kui_tbody.html(arr_tr.join(''));
		}
		// 清除日期按钮
		$('.kui_clean_btn').click(function(){
			kDate.val('');
		});
		// 关闭日期插件
		$('.kui_close_btn').click(function(){
			$('#kui_d_pane').hide();
		});
		//var t = new Date().getTime();
		//alert(t-d);
	}
}
// 点击文档的其它地方让日期插件关闭
$(function(){
	$(document).click(function(e){
		var data_pane = $(e.target).closest('.kui_data_content_pane'); 
		var t_id = $(e.target).attr('t_id');
		if(t_id == 'kui_date'){
			
		}
		else if(typeof(data_pane[0]) == 'undefined'){
			$('#kui_d_pane').hide();
		}
	});
});
$(function(){
	/* 日期插件的HTML元素 */
	var kui_div_date = '<div class="kui_d_pane" id="kui_d_pane" style="display:none;"><iframe id="kui_frame_d" width="370" height="203" frameborder="0"></iframe></iframe><div class="kui_data_content_pane"><div class="kui_prev_next_month"><a href="javascript:;" class="kui_prev_m"></a><span class="kui_today"></span><a href="javascript:;" class="kui_next_m"></a><span class="kui_tomorrow"></span></div><div id="left_table"><dl class="kui_data_tab"><dt class="d_th_bg">日</dt><dt>一</dt><dt>二</dt><dt>三</dt><dt>四</dt><dt>五</dt><dt class="d_th_bg">六</dt></dl><dl class="kui_date_info" id="kui_left_t"></dl></div><div id="right_table"><dl class="kui_data_tab"><dt class="d_th_bg">日</dt><dt>一</dt><dt>二</dt><dt>三</dt><dt>四</dt><dt>五</dt><dt class="d_th_bg">六</dt></dl><dl class="kui_date_info" id="kui_right_t"></dl></div><div class="kui_date_reset"><span class="off">清空</span><span class="close">关闭</span></div></div></div>';
	$('body').append(kui_div_date);
})
//鼠标移上
function kui_mouseover_(obj){
	if(!$(obj).hasClass("kui_td_kong")){
		$(obj).addClass('td_hover');
	}
}
//鼠标移走
function kui_mouseout_(obj){
	$(obj).removeClass('td_hover');
}
//点击事件
function kui_click_(obj,now_date,kui_y,kui_m,kui_d){
	var cla = obj.className;
	if(cla.indexOf('kui_td_hui') < 0){
		var now_month;
		if(kui_m < 10){
			now_month = '0'+parseInt(kui_m,10);
		}
		else{
			now_month = kui_m;
		}
		kui_d = $(obj).html() == null ? now_date.substring(8,10) : ($(obj).html() < 10 ? 0 + $(obj).html() : $(obj).html());
		jqObj[0].val(kui_y +'-'+ now_month +'-'+ kui_d);
		$('#kui_d_pane').hide();
	}
}