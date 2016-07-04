/*******************************************************************************
* @author panderman <panderman@163.com>
* @site http://www.xunwee.com/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('emoticons', function (K) {
    var self = this, name = 'emoticons',
		path = (self.emoticonsPath || self.pluginsPath + '../../images/'),
		allowPreview = self.allowPreviewEmoticons === undefined ? true : self.allowPreviewEmoticons;
    self.clickToolbar(name, function () {
        var elements = [],
			menu = self.createMenu({
			    name: name
			}),
            html = '<div class="ke-plugin-emoticons">\
                        <link rel="stylesheet" type="text/css" href="' + path + 'emoticon.css" />\
                        <div id="tabPanel" class="neweditor-tab">\
                            <div id="tabMenu" class="neweditor-tab-h">\
                                <div>精选</div>\
                                <div >兔斯基</div>\
                                <div >绿豆蛙</div>\
                                <div >BOBO</div>\
                                <div >baby猫</div>\
                                <div >泡泡</div>\
                                <div >有啊</div>\
                            </div>\
                            <div id="tabContent" class="neweditor-tab-b">\
                                <div id="tab0"></div>\
                                <div id="tab1"></div>\
                                <div id="tab2"></div>\
                                <div id="tab3"></div>\
                                <div id="tab4"></div>\
                                <div id="tab5"></div>\
                                <div id="tab6"></div>\
                            </div>\
                        </div>\
                    <div id="tabIconReview"><img id="faceReview" class="review" src="' + path + '0.gif" /></div></div>\
                    </div>';
        menu.div.append(K(html));
        function removeEvent() {
            K.each(elements, function () {
                this.unbind();
            });
        }

        /*******************************************表情方法开始******************************************************/
        function initImgBox(box, str, len) {
            if (box.length) return;
            var tmpStr = "", i = 1;
            for (; i <= len; i++) {
                tmpStr = str;
                if (i < 10) tmpStr = tmpStr + '0';
                tmpStr = tmpStr + i + '.gif';
                box.push(tmpStr);
            }
        }
        function $G(id) {
            return document.getElementById(id)
        }
        function InsertSmiley(url) {
            var obj = {
                src: editor.options.emotionLocalization ? editor.options.UEDITOR_HOME_URL + "dialogs/emotion/" + url : url
            };
            obj.data_ue_src = obj.src;
            editor.execCommand('insertimage', obj);
            dialog.popup.hide();
        }
        function over(td, srcPath, posFlag) {
            td.style.backgroundColor = "#ACCD3C";
            $G('faceReview').style.backgroundImage = "url(" + srcPath + ")";
            if (posFlag == 1) $G("tabIconReview").className = "show";
            $G("tabIconReview").style.display = 'block';
        }
        function bindCellEvent(td) {//表情绑定事件
            td.mouseover(function () {
                var obj = K(this);
                var sUrl = obj.attr("sUrl"),
                    posFlag = obj.attr("posflag");
                obj.css({
                    "background-color": "#ACCD3C"
                });
                $G('faceReview').style.backgroundImage = "url(" + sUrl + ")";
                if (posFlag == "1") $G("tabIconReview").className = "show";
                $G("tabIconReview").style.display = 'block';
            });
            td.mouseout(function () {
                var obj = K(this);
                obj.css({
                    "background-color": "#FFFFFF"
                });
                var tabIconRevew = $G("tabIconReview");
                tabIconRevew.className = "";
                tabIconRevew.style.display = 'none';
            });
            td.click(function (e) {
                self.insertHtml('<img src="' + K(this).attr("realUrl") + '" border="0" alt="" />').hideMenu().focus();
            });
        }
        var emotion = {};
        emotion.SmileyPath = path;
        emotion.SmileyBox = { tab0: [], tab1: [], tab2: [], tab3: [], tab4: [], tab5: [], tab6: [] };
        emotion.SmileyInfor = { tab0: [], tab1: [], tab2: [], tab3: [], tab4: [], tab5: [], tab6: [] };
        var faceBox = emotion.SmileyBox;
        var inforBox = emotion.SmileyInfor;
        var sBasePath = emotion.SmileyPath;
        initImgBox(faceBox['tab0'], 'j_00', 30);
        initImgBox(faceBox['tab1'], 't_00', 40);
        initImgBox(faceBox['tab2'], 'l_00', 52);
        initImgBox(faceBox['tab3'], 'b_00', 63);
        initImgBox(faceBox['tab4'], 'bc_00', 20);
        initImgBox(faceBox['tab5'], 'f_00', 50);
        initImgBox(faceBox['tab6'], 'y_00', 40);
        inforBox['tab0'] = [];
        inforBox['tab1'] = ['Kiss', 'Love', 'Yeah', '啊！', '背扭', '顶', '抖胸', '88', '汗', '瞌睡', '鲁拉', '拍砖', '揉脸', '生日快乐', '摊手', '睡觉', '瘫坐', '无聊', '星星闪', '旋转', '也不行', '郁闷', '正Music', '抓墙', '撞墙至死', '歪头', '戳眼', '飘过', '互相拍砖', '砍死你', '扔桌子', '少林寺', '什么？', '转头', '我爱牛奶', '我踢', '摇晃', '晕厥', '在笼子里', '震荡'];
        inforBox['tab2'] = ['大笑', '瀑布汗~', '惊讶', '臭美', '傻笑', '抛媚眼', '发怒', '我错了', 'money', '气愤', '挑逗', '吻', '怒', '胜利', '委屈', '受伤', '说啥呢？', '闭嘴', '不', '逗你玩儿', '飞吻', '眩晕', '魔法', '我来了', '睡了', '我打', '闭嘴', '打', '打晕了', '刷牙', '爆揍', '炸弹', '倒立', '刮胡子', '邪恶的笑', '不要不要', '爱恋中', '放大仔细看', '偷窥', '超高兴', '晕', '松口气', '我跑', '享受', '修养', '哭', '汗', '啊~', '热烈欢迎', '打酱油', '俯卧撑', '?'];
        inforBox['tab3'] = ['HI', 'KISS', '不说', '不要', '扯花', '大心', '顶', '大惊', '飞吻', '鬼脸', '害羞', '口水', '狂哭', '来', '泪眼', '流泪', '生气', '吐舌', '喜欢', '旋转', '再见', '抓狂', '汗', '鄙视', '拜', '吐血', '嘘', '打人', '蹦跳', '变脸', '扯肉', '吃To', '吃花', '吹泡泡糖', '大变身', '飞天舞', '回眸', '可怜', '猛抽', '泡泡', '苹果', '亲', '', '骚舞', '烧香', '睡', '套娃娃', '捅捅', '舞倒', '西红柿', '爱慕', '摇', '摇摆', '杂耍', '招财', '被殴', '被球闷', '大惊', '理想', '欧打', '呕吐', '碎', '吐痰'];
        inforBox['tab4'] = ['发财了', '吃西瓜', '套牢', '害羞', '庆祝', '我来了', '敲打', '晕了', '胜利', '臭美', '被打了', '贪吃', '迎接', '酷', '顶', '幸运', '爱心', '躲', '送花', '选择'];
        inforBox['tab5'] = ['微笑', '亲吻', '调皮', '惊讶', '耍酷', '发火', '害羞', '汗水', '大哭', '得意', '鄙视', '困', '夸奖', '晕倒', '疑问', '媒婆', '狂吐', '青蛙', '发愁', '亲吻', '', '爱心', '心碎', '玫瑰', '礼物', '哭', '奸笑', '可爱', '得意', '呲牙', '暴汗', '楚楚可怜', '困', '哭', '生气', '惊讶', '口水', '彩虹', '夜空', '太阳', '钱钱', '灯泡', '咖啡', '蛋糕', '音乐', '爱', '胜利', '赞', '鄙视', 'OK'];
        inforBox['tab6'] = ['男兜', '女兜', '开心', '乖乖', '偷笑', '大笑', '抽泣', '大哭', '无奈', '滴汗', '叹气', '狂晕', '委屈', '超赞', '??', '疑问', '飞吻', '天使', '撒花', '生气', '被砸', '口水', '泪奔', '吓傻', '吐舌头', '点头', '随意吐', '旋转', '困困', '鄙视', '狂顶', '篮球', '再见', '欢迎光临', '恭喜发财', '稍等', '我在线', '恕不议价', '库房有货', '货在路上'];
        //大对象
        FaceHandler = {
            imageFolders: { tab0: 'jx2/', tab1: 'tsj/', tab2: 'ldw/', tab3: 'bobo/', tab4: 'babycat/', tab5: 'face/', tab6: 'youa/' },
            imageWidth: { tab0: 35, tab1: 35, tab2: 35, tab3: 35, tab4: 35, tab5: 35, tab6: 35 },
            imageCols: { tab0: 11, tab1: 11, tab2: 11, tab3: 11, tab4: 11, tab5: 11, tab6: 11 },
            imageColWidth: { tab0: 3, tab1: 3, tab2: 3, tab3: 3, tab4: 3, tab5: 3, tab6: 3 },
            imageCss: { tab0: 'jd', tab1: 'tsj', tab2: 'ldw', tab3: 'bb', tab4: 'cat', tab5: 'pp', tab6: 'youa' },
            imageCssOffset: { tab0: 35, tab1: 35, tab2: 35, tab3: 35, tab4: 35, tab5: 25, tab6: 35 },
            tabExist: [0, 0, 0, 0, 0, 0, 0]
        };
        function switchTab(index) {
            if (FaceHandler.tabExist[index] == 0) {
                FaceHandler.tabExist[index] = 1;
                createTab('tab' + index);
            }
            //获取呈现元素句柄数组
            var tabMenu = $G("tabMenu").getElementsByTagName("div"),
                        tabContent = $G("tabContent").getElementsByTagName("div"),
                        i = 0,
                        L = tabMenu.length;
            //隐藏所有呈现元素
            for (; i < L; i++) {
                tabMenu[i].className = "";
                tabContent[i].style.display = "none";
            }
            //显示对应呈现元素
            tabMenu[index].className = "on";
            tabContent[index].style.display = "block";
        }
        function createTab(tabName) {
            var faceVersion = "?v=1.1", //版本号
                tab = $G(tabName), //获取将要生成的Div句柄
                imagePath = sBasePath + FaceHandler.imageFolders[tabName], //获取显示表情和预览表情的路径
                imageColsNum = FaceHandler.imageCols[tabName], //每行显示的表情个数
                positionLine = imageColsNum / 2, //中间数
                iWidth = iHeight = FaceHandler.imageWidth[tabName], //图片长宽
                iColWidth = FaceHandler.imageColWidth[tabName], //表格剩余空间的显示比例
                tableCss = FaceHandler.imageCss[tabName],
                cssOffset = FaceHandler.imageCssOffset[tabName],
                textHTML = ['<table class="smileytable" cellpadding="1" cellspacing="0" align="center" style="border-collapse:collapse;" border="1" bordercolor="#BAC498" width="100%">'],
                i = 0,
                imgNum = faceBox[tabName].length,
                imgColNum = FaceHandler.imageCols[tabName],
                faceImage,
                sUrl,
                realUrl,
                posflag,
                offset,
                infor;
            for (; i < imgNum; ) {
                textHTML.push('<tr>');
                for (var j = 0; j < imgColNum; j++, i++) {
                    faceImage = faceBox[tabName][i];
                    if (faceImage) {
                        sUrl = imagePath + faceImage + faceVersion;
                        realUrl = imagePath + faceImage;
                        posflag = j < positionLine ? 0 : 1;
                        offset = cssOffset * i * (-1) - 1;
                        infor = inforBox[tabName][i];
                        textHTML.push('<td  class="' + tableCss + '" sUrl="' + sUrl + '" posflag="' + posflag + '" realUrl="' + realUrl.replace(/'/g, "\\'") + '" border="1" width="' + iColWidth + '%" style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF">');
                        textHTML.push('<span  style="display:block;">');
                        textHTML.push('<img  style="background-position:left ' + offset + 'px;" title="' + infor + '" src="' + sBasePath + '0.gif" width="' + iWidth + '" height="' + iHeight + '"></img>');
                        textHTML.push('</span>');
                    } else {
                        textHTML.push('<td width="' + iColWidth + '%"   bgcolor="#FFFFFF">');
                    }
                    textHTML.push('</td>');
                }
                textHTML.push('</tr>');
            }
            textHTML.push('</table>');
            textHTML = textHTML.join("");
            tab.innerHTML = textHTML;
            K("td[class='" + tableCss + "']").each(function () {//表情绑定事件
                bindCellEvent(K(this));
            });
        }
        //初始显示第一个表情目录
        switchTab(0);
        K("div#tabMenu>div").each(function (index) {//标签切换绑定事件
            K(this).click(function () {
                switchTab(index);
            });
        });
        /**********************************************表情方法结束*****************************************************/
    });
});
