import React, {Component} from 'react';
import $ from 'jquery';
import './editor.css'
import {ElementOptions, ButtonConstructor, ButtonOptions} from './componentConstructor'
import animation from './animation'
import {createElement} from '../utils/utils'

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.canvasConstructor = this.canvasConstructor.bind(this);
    }

    canvasConstructor(canvas, dragBox, options, callback) {
        let control = {};
        let basicOptions = {
            imgClassOnList: 'canvas-api-img-main',
            imgClassOnCanvas: 'canvas-api-img-main',
            imgBoxClass: 'canvas-api-imgbox',
            imgBoxClassOnCanvas: 'canvas-api-imgbox',
            startClass: 'canvas-api-start',
            pathCollect: 'canvas-api-path-collect',
            butnEditorId: 'start-butn-editor',
            removeButtonClass: 'canvas-api-remove-butn',
            removeButtonPosition: null,
            removeButnColor: '#23df67',
            circle: 'canvas-api-circle',
            circleSize: [20, 20],
            floatImgOpacity: 0.7,
            hightLightColor: '#34a3cf',
            pathAboveColor: '#000',
            pathBottomColor: '#fff',
            pathAboveWidth: 2,
            pathHighLight: '#fff',
            pathBottomWidth: 3,
            arrowBottom: 4,
            arrowHeight: 6
        };

        let targetUrl = null;
        let img_ori_position = {};
        let scale = 1;
        let path_container = [];
        let path_from = null;
        let elements = [];

        function updateBasicOptions(options) {
            for (let item in options) {
                basicOptions[item] = options[item];
            }
        }

        function createCanvas(canvas, dragBox) {
            if (typeof (canvas) === 'string' && typeof (dragBox) === 'string' && canvas !== null && dragBox !== null) {
                initCanvas(canvas, dragBox);
            } else {
                console.log('error,canvas/dragBox undefined');
            }
        }

        function initCanvas(canvas, dragBox) {
            let transform = createElement('div').addClass('canvasTransform').attr('id', 'canvasTransform');
            let start = createElement('div').addClass(basicOptions.startClass).attr('id', 'transStart').text('Start');
            let imgContainer = createElement('div').addClass('canvasTransform').attr('id', 'trans-img-cont');
            let svgContainer = createElement('div').addClass('canvasTransform').attr('id', 'trans-svg-cont');
            let remove = createElement('div').addClass(basicOptions.removeButtonClass).attr('id', 'canvas-remove-butn').text('Delete');
            $(canvas).append(transform.append(start, imgContainer, svgContainer)).css('overflow', 'hidden');
            basicOptions.removeButtonPosition ? $('#' + basicOptions.removeButtonPosition).append(remove) : $(canvas).append(remove);
            getElementsCtrl(canvas, transform, svgContainer, imgContainer, start, dragBox, remove);
        }

        function getElementsCtrl(canvas, trans, svgCont, imgCont, start, dragBox, remove) {
            control.canvas = $(canvas);
            control.dragBox = $(dragBox);
            control.trans = trans;
            control.svgCont = svgCont;
            control.imgCont = imgCont;
            control.start = start;
            control.remove = remove;
            control.butnEditor = $('#' + basicOptions.butnEditorId);
        }

        function setEvent(canvas, dragBox, canv, info, callback) {

            let css_trans_origin = $(control.trans).css('transform-origin').match(/\d+/g);
            let css_trans_offset = $(control.trans).offset();
            let fn = new func(control, basicOptions);

            fn.init(info);

            fn.hover(control.svgCont);

            fn.dragBox.bind({
                'mousedown': function (e) {
                    if (e.button !== 0) return;
                    let ele = fn.getTarget(e);
                    if (ele.attr('id') === "dragBox") {
                        let dragBoxGhost = addDragBoxGhost(e, ele);
                        $(document).bind({
                            'mousemove': function (e) {
                                let dragBoxSize = getELemSize(control.dragBox);
                                dragBoxGhost.offset({
                                    left: e.clientX - dragBoxSize[0] * scale,
                                    top: e.clientY - dragBoxSize[1] * scale
                                });
                            },
                            'mouseup': function (e) {
                                let newElementInfo = fn.createBoxOnCanvas(e, dragBoxGhost);
                                //发送新建box数据至服务器
                                //callback && newElementInfo ? callback('pushNewElm', newElementInfo) : '';
                                $(document).unbind();
                            }
                        });
                    }
                }
            });

            fn.canvas.bind({
                'mousedown': function (e) {
                    if (e.button !== 0) return;
                    let ele = fn.getTarget(e);
                    let trans_position = fn.trans.offset();
                    let click_position = fn.get_click_position(e);
                    let click_position_on_img = fn.get_click_position_on_img(e, ele);
                    if (ele.hasClass(basicOptions.imgBoxClass) || ele.attr('id') === control.start.attr('id')) {
                        //开始按钮绑定的事件
                        fn.canvas_input_disabled($(this), ele);
                        $(document).bind({
                            'mousemove': function (e) {
                                fn.move_canvas_ele(e, ele, click_position_on_img);
                            },
                            'mouseup': function (e) {
//No.2 发送元素移动信息，发送元素移动后的新位置信息 position{x: , y: }
                                console.log(control);
                                let newPositionInfo = fn.canvas_input_abled(control.imgCont, ele);
                                if (ele.attr('id') === control.start.attr('id')) {
                                    callback ? callback('pushStartPosition', newPositionInfo) : '';
                                } else {
                                    callback ? callback('pushNewPosition', newPositionInfo) : '';
                                }
                                $(document).unbind();
                            }
                        });
                    } else if (ele.attr('id') === control.canvas.attr('id')) {
                        //画布绑定的事件
                        fn.canvas_input_disabled($(this));
                        $(document).bind({
                            'mousemove': function (e) {
                                fn.move_canvas(e, click_position, trans_position, css_trans_origin, css_trans_offset);
                            },
                            'mouseup': function (e) {
                                fn.canvas_input_abled(control.imgCont);
                                $(document).unbind();
                            }
                        });
                    }

                },
                'click': function (e) {
                    let ele = fn.getTarget(e);
                    if (ele.attr('class') === basicOptions.imgBoxClass) {
                        fn.ele_highLight(ele, this);
                        removeButnHighLight(true);
                        editorButnHighLight(true);
                        path_highLight_ended();
                    } else if (ele.hasClass(basicOptions.circle) || ele.parents('.' + basicOptions.circle)[0]) {
                        let svgobj;
                        ele = fn.search_ele(ele.parents('.' + basicOptions.circle));
                        svgobj = fn.ready_for_path(ele);
                        removeButnHighLight(false);
                        editorButnHighLight(false);
                        path_highLight_ended();
                        $(document).bind({
                            'mousemove': function (e) {
                                fn.path_moving(e, svgobj, ele);
                            }
                        });
                    } else if (ele.attr('class') === basicOptions.pathCollect) {
                        //No.3 发送添加新路径请求，发送新路径的 fromId 和 targetId
                        console.log("newpath")
                        let newPathInfo = fn.staticed_path(ele.parent());
                        //callback ? callback('pushNewPath', newPathInfo) : '';
                        $(document).unbind();
                    } else if (ele[0].tagName === 'path') {
                        cancle_img_highLight(fn);
                        fn.path_highLight(ele.parent());
                        removeButnHighLight(true);
                        editorButnHighLight(false);
                    } else {
                        fn.recover_canvas();
                        removeButnHighLight(false);
                        editorButnHighLight(false);
                        path_highLight_ended();
                    }
                },
                'mousewheel': function (e, delta) {
                    fn.zoom(delta);
                }
            });

            fn.removeButn.bind('click', function (e) {
                let type = '';
                let elmId = '';
                let butnId = '';
                let butnArray = [];
                e.stopPropagation();
                if ($(this).hasClass('remove-active')) {
                    let ele = fn.canvas.find('.chosen');
                    if (ele.hasClass(fn.imgBox)) {
                        type = 'delElement';
                    } else if (ele[0].tagName === 'svg') {
                        type = 'delPath';
                    }
                    path_container.map(function (c) {
                        if (c.from == ele[0]) {
                            remove_ele(c, fn);
                        } else if (c.to == ele[0]) {
                            if (c.from.id === fn.start.attr('id')) {
                                butnArray.push({elmId: 'isStart', butnId: c.to.id});
                            } else {
                                butnArray.push({elmId: c.from.id, butnId: c.to.id});
                            }
                            remove_ele(c, fn);
                        } else if (c.path == ele[0]) {
                            butnId = c.to.id;
                            if (c.from.id === fn.start.attr('id')) {
                                elmId = 'isStart';
                            } else {
                                elmId = c.from.id;
                            }
                            remove_ele(c, fn);
                        }
                    });
//No.4 发送删除元素或路径的信息，发送要删除元素的id，或要删除路径的目标id，type='delElement'为删除元素，type='delPath'为删除路径
                    if (type === 'delElement') {
                        ele.remove();
                        $(ele[0].circle).remove();
                        callback ? callback(type, {elmId: ele.attr('id'), butn: butnArray}) : '';
                    } else if (type === 'delPath') {
                        callback ? callback(type, {butn: [{elmId: elmId, butnId: butnId}]}) : '';
                    } else {
                        console.log('error! no such element!');
                    }
                    removeButnHighLight(false);
                    editorButnHighLight(false);
                }
            });

        }

        function func(ctrl, basicOptions) {
            this.trans = ctrl.trans;
            this.canvas = ctrl.canvas;
            this.svgContainer = ctrl.svgCont;
            this.imgContainer = ctrl.imgCont;
            this.dragBox = ctrl.dragBox;
            this.removeButn = ctrl.remove;

            this.circleCover = basicOptions.circle;
            this.start = ctrl.start;
            this.imgBox = basicOptions.imgBoxClass;
            this.pathCollect = basicOptions.pathCollect;
        }

        func.prototype.getTarget = function (e) {
            e = e || window.event;
            return $(e.srcElement || e.target);
        }

        func.prototype.stop_broswer = function (e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
        }

        func.prototype.get_click_position = function (e) {
            e = e || window.event;
            return {
                left: e.clientX,
                top: e.clientY
            };
        }

        func.prototype.init = function (info) {
            var fun = this;
            fun.start[0].circle = create_circle(fun.start, fun);
            if (info) {
                fun.start.css({
                    'left': info.startPosition.x,
                    'top': info.startPosition.y
                });
                circle_comewith_ele(fun.start);
                info.elements.map(function (elm) {
                    var div = createNewElement(fun, elm.id, elm.imgUrl, elm.videoUrl);
                    div.css({
                        'left': elm.position.x,
                        'top': elm.position.y
                    });
                    div[0].circle = create_circle(div, fun);
                    div.children('input').attr('value', elm.name);
                });
                info.elements.map(function (elm) {
                    elm.buttons.map(function (butn) {
                        var svg = add_path($('#' + elm.id), fun);
                        static_path($('#' + butn.targetId), $('#' + elm.id), fun);
                    });
                    if (elm.isStart) {
                        var svg = add_path(fun.start, fun);
                        static_path($('#' + elm.id), fun.start, fun);
                    }
                });
            }
        }

        func.prototype.get_click_position_on_img = function (e, ele) {
            var click_position = this.get_click_position(e);
            var ele_position = get_ele_position_of_window(ele);
            return {
                left: click_position.left - ele_position.left,
                top: click_position.top - ele_position.top
            };
        }

        /*
        func.prototype.add_float_img = function (e, _this) {
            var float_img = createElement('div');
            this.dragBox.append(float_img);
            targetUrl = set_floatImg_css(e, float_img, this, _this);
            return float_img;
        }
        */

        func.prototype.move_floatImg = function (e, floatImg) {
            var imgSize = get_img_size();
            floatImg.offset({
                left: e.clientX - imgSize[0] * scale,
                top: e.clientY - imgSize[1] * scale
            });
        }

        func.prototype.createBoxOnCanvas = function (e, dragBoxGhost) {
            if (this.getTarget(e).attr('id') === this.canvas.attr('id')) {
                dragBoxGhost.remove();
                return addImgOnCanvas(dragBoxGhost, e, this);
            } else if (typeof(animation) === 'object') {
                animation.displacementAnimation(dragBoxGhost.offset().left, dragBoxGhost.offset().top, img_ori_position.left, img_ori_position.top, dragBoxGhost, 0.8, true, scale);
                dragBoxGhost.remove();
                return null;
            } else {
                dragBoxGhost.remove();
                return null;
            }
        }

        func.prototype.move_canvas_ele = function (e, ele, click_position_on_img) {
            var mouse_position = this.get_click_position(e);
            var trans_position = get_ele_position_of_window(this.trans);
            ele.css({
                'left': (mouse_position.left - trans_position.left - click_position_on_img.left) / scale,
                'top': (mouse_position.top - trans_position.top - click_position_on_img.top) / scale
            });
            for (var i in path_container) {
                if (ele[0] == path_container[i].from || ele[0] == path_container[i].to) {
                    path_move_with_img($(path_container[i].from), $(path_container[i].to), $(path_container[i].path));
                }
            }
            circle_comewith_ele(ele);
        }

        func.prototype.release_canvas_ele = function (e, _this) {
            unBind($(_this));
        }

        func.prototype.move_canvas = function (e, old_client_position, trans_position, css_trans_origin, css_trans_offset) {
            var originX, originY, trans_offset;
            var mouse_position = this.get_click_position(e);
            this.trans.offset(function (index, oldoffset) {
                return {
                    left: trans_position.left + mouse_position.left - old_client_position.left,
                    top: trans_position.top + mouse_position.top - old_client_position.top
                };
            });
            trans_offset = get_ele_position_of_window(this.trans);
            originX = (parseInt(css_trans_origin[0]) + css_trans_offset.left - trans_offset.left) / scale;
            originY = (parseInt(css_trans_origin[1]) + css_trans_offset.top - trans_offset.top) / scale;
            this.trans.css('transform-origin', originX + 'px ' + originY + 'px 0');
        }

        func.prototype.release_canvas = function (_this) {
            unBind($(_this));
        }

        func.prototype.ele_highLight = function (ele, _this) {
            $(_this).find('.' + this.imgBox).css({
                'box-shadow': '0 0 3px #000',
                'z-index': '10'
            }).removeClass('chosen');
            ele.css({
                'box-shadow': '0 0 0 5px #34a3cf',
                'z-index': '1000'
            }).addClass('chosen');
        }

        func.prototype.recover_canvas = function () {
            cancle_img_highLight(this);
            clear_path(this);
            recover_pointer_path_ended(this);
            path_from = null;
        }

        func.prototype.ready_for_path = function (ele) {
            var svg_ori_position = get_path_from_position(ele);
            var svg = add_path(ele, this);
            path_from = ele;
            add_mask(this);
            ele_block($('.' + this.pathCollect));
            ignore_pointer_during_path(this);
            return {
                svg: svg,
                svg_ori_position: svg_ori_position
            };
        }

        func.prototype.search_ele = function (ele) {
            if (this.start[0].circle == ele[0]) {
                return this.start;
            } else {
                var allImg = this.imgContainer.children(this.imgBoxClass);
                for (var i in allImg) {
                    if (allImg[i].circle == ele[0]) {
                        return $(allImg[i]);
                    }
                }
            }
        }

        func.prototype.path_moving = function (e, svgobj, ele) {
            var start_point = {
                left: ele.offset().left + ele.width() * scale,
                top: ele.offset().top + ele.height() / 2 * scale
            };
            var deltaX = (e.clientX - parseInt(start_point.left)) / scale;
            var deltaY = (e.clientY - parseInt(start_point.top)) / scale;
            makeSvg(deltaX, deltaY, svgobj.svg, svgobj.svg_ori_position.left, svgobj.svg_ori_position.top);
            makePath(deltaX, deltaY, svgobj.svg.children('.path'), svgobj.svg.children('.arrow'));
        }

        func.prototype.staticed_path = function (ele) {
            var pathInfo = static_path(ele, path_from, this);
            recover_pointer_path_ended(this);
            cancle_img_highLight(this);
            ele_none($('.' + this.pathCollect));
            path_from = null;
            return pathInfo;
        }

        func.prototype.path_highLight = function (svg) {
            path_highLight_ended();
            svg.children('path').map(function (index) {
                svg.children('path')[index].setAttribute('stroke', basicOptions.pathHighLight);
            });
            svg.children('.arrow')[0].setAttribute('fill', basicOptions.pathHighLight);
            svg[0].setAttribute('class', 'chosen');
        }

        func.prototype.canvas_input_disabled = function (_this, ele) {
            input_disabled(_this);
        }

        func.prototype.canvas_input_abled = function (_this, ele) {
            input_abled(_this);
            if (ele) {
                return {
                    id: ele.attr('id'),
                    position: {
                        x: parseInt(ele.css('left').match(/[^px]+/)),
                        y: parseInt(ele.css('top').match(/[^px]+/))
                    }
                }
            }
        }

        func.prototype.zoom = function (delta) {
            scale = delta > 0 ? zoomIn(this) : zoomOut(this);
        }

        func.prototype.hover = function (eventobj) {
            var _this = this;
            eventobj.hover(
                function (e) {
                    if (_this.getTarget(e).hasClass(_this.circleCover)) {
                        _this.getTarget(e).children('svg')[0].setAttribute('display', 'block');
                        _this.svgContainer.find('.path').css('pointer-events', 'none');
                    }
                }, function (e) {
                    if (_this.getTarget(e).parents('.' + _this.circleCover)[0]) {
                        _this.getTarget(e).parents('.' + _this.circleCover).children('svg')[0].setAttribute('display', 'none');
                        !path_from ? _this.svgContainer.find('.path').css('pointer-events', 'auto') : '';
                    }
                });
        }


        function unBind(_this, ev, f) {
            _this.unbind(ev, f);
        }

        function ele_block(ele) {
            ele.css('display', 'block');
        }

        function ele_none(ele) {
            ele.css('display', 'none');
        }

        function get_ele_position_of_window(ele) {
            return {
                left: ele.offset().left,
                top: ele.offset().top
            };
        }

        function removeButnHighLight(bool) {
            if (bool) {
                control.remove.css('background', basicOptions.removeButnColor).addClass('remove-active');
            } else {
                control.remove.css('background', '#ccc').removeClass('remove-active');
            }
        }

        function editorButnHighLight(bool) {
            if (bool) {
                control.butnEditor.css({'background': 'rgba(240,240,30,0.7)', 'pointer-events': 'auto'});
            } else {
                control.butnEditor.css({'background': 'rgba(204,204,204,0.7)', 'pointer-events': 'none'});
            }
        }

        function path_highLight_ended() {

            path_container.map(function (c) {
                if (c.path) {
                    $(c.path).children('path')[0].setAttribute('stroke', basicOptions.pathBottomColor);
                    $(c.path).children('path')[1].setAttribute('stroke', basicOptions.pathAboveColor);
                    $(c.path).children('.arrow')[0].setAttribute('stroke', basicOptions.pathAboveColor);
                    $(c.path).children('.arrow')[0].setAttribute('fill', basicOptions.pathAboveColor);
                    c.path.setAttribute('class', 'path-static');
                }
            });
        }

        function start_active(from, fun) {
            if (from.id === fun.start.attr('id')) {
                $(fun.start[0].circle).css('display', 'block');
            }
        }

        function remove_ele(c, fun) {
            $(c.path).remove();
            start_active(c.from, fun);
            c.from = c.to = c.path = null;
        }

        function input_disabled(_this) {
            _this.find('input').attr('disabled', 'disabled');
        }

        function input_abled(_this) {
            _this.find('input').attr('disabled', false);
        }

        function get_img_size() {
            return [control.dragBox.children('.' + basicOptions.imgBoxClass).innerWidth() / 2,
                control.dragBox.children('.' + basicOptions.imgBoxClass).innerHeight() / 2];
        }

        function getELemSize(elem) {
            return [elem.innerWidth() / 2, elem.innerHeight() / 2];
        }

        function addDragBoxGhost(e, ele) {
            let dragBoxGhost = createElement('div');
            control.dragBox.append(dragBoxGhost);
            dragBoxGhost.addClass('canvas-api-floatImg')
                .css({
                    'width': ele.innerWidth(),
                    'height': ele.innerHeight(),
                    'background-color': 'white',
                    'transform': 'scale(' + scale + ')',
                    'border-radius': '4px',
                    //'transform-origin': e.innerWidth()/2 + 'px ' + e.innerHeight()/2 + 'px 0'
                })
            dragBoxGhost.offset({
                left: e.clientX - ele.innerWidth() / 2,
                top: e.clientY - ele.innerHeight() / 2
            });
            return dragBoxGhost;
        }

        function uuid() {
            let s = [];
            let hexDigits = "0123456789abcdef";
            for (let i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = "-";
            let uuid = s.join("");
            return uuid;
        }


        function newElement(element, videoUrl, imgUrl) {
            let name = element.children('input').attr('value');
            let id = element.attr('id');
            let x = element.css('left').match(/\d+/)[0];
            let y = element.css('top').match(/\d+/)[0];
            return new ElementOptions(videoUrl, imgUrl, name, id, x, y, 0);
        }

        /*
        function set_floatImg_css(e, floatImg, fun, _this) {
            let img = _this.children('img');
            let video = _this.children('span');
            let imgSize = get_img_size();
            floatImg.addClass('canvas-api-floatImg')
                .css({
                    'width': imgSize[0] * 2,
                    'height': imgSize[1] * 2,
                    'background-image': 'url(' + img.attr('src') + ')',
                    'transform': 'scale(' + scale + ')',
                    'transform-origin': imgSize[0] + 'px ' + imgSize[1] + 'px 0'
                })
                .offset({
                    left: e.clientX - imgSize[0],
                    top: e.clientY - imgSize[1]
                });
            if (basicOptions.floatImgOpacity) {
                floatImg.css('opacity', basicOptions.floatImgOpacity)
            }
            img_ori_position = {
                left: _this.offset().left,
                top: _this.offset().top
            };
            return {
                imgUrl: img.attr('src'),
                videoUrl: video.text()
            };
        }
        */
        function createNewElement(fun, id, imgUrl, videoUrl) {
            let img, collect, newBox, title;
            newBox = createElement('div').addClass(basicOptions.imgBoxClass).css({
                'position': 'absolute',
                'margin': '0'
            }).attr('id', id);
            if (imgUrl) {
                img = createElement('img').attr('src', imgUrl);
                newBox.append(img);
            }
            if (videoUrl) {
                newBox[0].videoUrl = videoUrl;
            }
            collect = layout_path_collect();
            title = layout_title(fun);
            fun.imgContainer.append(newBox.append(title, collect));
            newBox.bind('dragstart', function (e) {
                fun.stop_broswer(e)
            });

            return newBox;
        }

        function addImgOnCanvas(floatImg, e, fun) {
            let id = uuid();
            targetUrl = {
                videoUrl: "",
                imgUrl: ""
            }
            let div = createNewElement(fun, id, targetUrl.imgUrl, targetUrl.videoUrl);
            let imgSize = getELemSize(control.dragBox);
            let left = (e.clientX - fun.trans.offset().left) / scale - imgSize[0];
            let top = (e.clientY - fun.trans.offset().top) / scale - imgSize[1];
            div.css({
                'left': left,
                'top': top
            });
            div[0].circle = create_circle(div, fun);
            return newElement(div, targetUrl.videoUrl, targetUrl.imgUrl);
        }

        function create_circle(ele, fun) {
            let cover = createElement('div').addClass('img-box-circle-cover ' + fun.circleCover);
            let svg = layout_circle();
            fun.svgContainer.append(cover.append(svg));
            circle_comewith_ele(ele, cover);
            return cover[0];
        }

        function layout_circle() {
            let svg = createElement('svg');
            let path = createElement('path');
            let rect = createElement('rect');
            svg[0].setAttribute('display', 'none');
            svg.attr({
                'height': '20',
                'width': '20'
            });
            rect.attr({
                'width': '18',
                'height': '18',
                'y': '1',
                'x': '1',
                'ry': '9',
                'rx': '9',
                'fill': '#fff',
                'stroke': '#000',
                'stroke-width': '1px'
            });
            path.attr({
                'fill': '#000',
                'd': 'M 1 9 L 10 9 L 10 1 L 19 10 L 10 19 L 10 11 L 1 11 Z'
            });
            svg.append(rect, path);
            return svg;
        }

        function layout_title(fun) {
            let input = createElement('input');
            let imgSize = get_img_size();
            let node = fun.imgContainer.children('.' + basicOptions.imgBoxClass).length;
            input.attr({
                'type': 'text',
                'value': 'Node ' + node
            })
                .addClass('canvas-api-img-title no-border-input')
                .css('width', imgSize[0] * 2);
            return input;
        }

        function layout_path_collect() {
            let collect = createElement('div');
            collect.addClass(basicOptions.pathCollect);
            return collect;
        }

        function circle_comewith_ele(ele, circl) {
            let circle = circl ? circl : $(ele[0].circle);
            circle.css({
                'left': parseInt(ele.css('left')) + ele.innerWidth() - circle.width() / 2,
                'top': parseInt(ele.css('top')) + ele.innerHeight() / 2 - circle.height() / 2
            });
        }

        function clear_path(_this) {
            _this.svgContainer.find('.path-active') ? _this.svgContainer.find('.path-active').remove() : '';
            recover_pointer_path_ended(_this);
        }

        function cancle_img_highLight(_this) {
            _this.imgContainer.find('.' + _this.imgBox).css({
                'box-shadow': '0 0 3px #000',
                'z-index': '10',
                'cursor': 'pointer'
            }).removeClass('chosen');
            _this.imgContainer.find('img').css('-webkit-mask-image', 'none');
        }

        function recover_pointer_path_ended(fun) {
            input_abled(fun.imgContainer);
            $('body').css('pointer-events', 'auto');
            $('.' + fun.circleCover).css('pointer-events', 'auto');
            $('.' + fun.imgBox).css({
                'pointer-events': 'auto',
                'cursor': 'pointer'
            });
            $('path').css('pointer-events', 'auto');
            $('.' + fun.pathCollect).css('display', 'none');
        }

        function ignore_pointer_during_path(fun) {
            input_disabled(fun.imgContainer);
            fun.canvas.css('pointer-events', 'auto');
            $('body').css('pointer-events', 'none');
            $('.' + fun.circleCover).css('pointer-events', 'none');
            $('.' + fun.imgBox).css({
                'pointer-events': 'none'
            });
            $('.' + fun.pathCollect).css('pointer-events', 'auto');
            $('path').css('pointer-events', 'none');
        }

        function add_path(ele, fun) {
            let svg = createElement('svg');
            let path = createElement('path');
            let path_back = createElement('path');
            let arrow = createElement('path');
            fun.svgContainer.prepend(svg.append(path_back, path, arrow));
            set_path_cssAndAttr(svg, path, path_back, arrow);
            set_path_position(ele, svg);
            return svg;
        }

        function set_path_cssAndAttr(svg, path, path_back, arrow) {
            svg[0].style.cssText = 'pointer-events:none;position:absolute;overflow:visible;';
            arrow[0].style.cssText = path_back[0].style.cssText = path[0].style.cssText = 'pointer-events:auto;cursor:pointer';
            path[0].setAttribute('class', 'path');
            path_back[0].setAttribute('class', 'path');
            arrow[0].setAttribute('class', 'arrow');
            svg[0].setAttribute('class', 'path-active');
            svg.attr({
                'width': '90',
                'height': '90'
            });
            path_back.attr({
                'stroke-width': basicOptions.pathBottomWidth,
                'fill': 'none',
                'stroke': basicOptions.pathBottomColor
            });
            path.attr({
                'stroke-width': basicOptions.pathAboveWidth,
                'fill': 'none',
                'stroke': basicOptions.pathAboveColor
            });
            arrow.attr({
                'stroke-width': '2px',
                'fill': basicOptions.pathAboveColor,
                'stroke': basicOptions.pathAboveColor
            });
        }

        function set_path_position(ele, svg) {
            let svgPosition = get_path_from_position(ele);
            svg.offset({
                left: svgPosition.left,
                top: svgPosition.top
            });
        }

        function get_path_from_position(ele) {
            return {
                left: parseInt(ele.css('left')) + ele.innerWidth(),
                top: parseInt(ele.css('top')) - (90 - ele.innerHeight()) / 2
            };
        }

        function add_mask(_this) {
            _this.imgContainer.find('.' + _this.imgBox).css({
                'box-shadow': '0 0 0',
                'z-index': '10'
            });
            //改
            _this.imgContainer.find('.imgbox').css({
                '-webkit-mask-image':'url(./mask.png)',
                'background-color':'white'
            });
        }

        function static_path(ele, path_from, _this) {
            let isStart = false;
            let tagSvg = $('.path-active');
            tagSvg[0].moving = path_move_with_img;
            tagSvg[0].setAttribute('class', 'path-static');
            path_move_with_img(path_from, ele, tagSvg);
            path_container.push(new path_container_construct(path_from, tagSvg, ele));
            if (path_from.attr('id') === _this.start.attr('id')) {
                $(_this.start[0].circle).css('display', 'none');
                isStart = true;
            }
            return {
                isStart: isStart,
                newPathInfo: new ButtonConstructor(ele.attr('id'), ele.children('input').attr('value')),
                fromId: path_from.attr('id')
            };
        }

        function path_move_with_img(from, to, path) {
            let path_from_position = get_path_from_position(from);
            let delta = get_deltaXY(from, to);
            makeSvg(delta.deltaX, delta.deltaY, path, path_from_position.left, path_from_position.top);
            makePath(delta.deltaX, delta.deltaY, path.children('.path'), path.children('.arrow'));
        }

        function get_deltaXY(from, to) {
            let deltaX = parseInt(to.css('left')) - parseInt(from.css('left')) - from.width();
            let deltaY = parseInt(to.css('top')) + to.height() / 2 - parseInt(from.css('top')) - from.height() / 2;
            return {
                deltaX: deltaX,
                deltaY: deltaY
            };
        }

        function zoomIn(fun) {
            scale < 1.95 ? scale += 0.05 : '';
            fun.trans.css('transform', 'scale(' + scale + ')');
            return scale;
        }

        function zoomOut(fun) {
            scale > 0.6 ? scale -= 0.05 : '';
            fun.trans.css('transform', 'scale(' + scale + ')');
            return scale;
        }

        function path_container_construct(_from, _path, _to) {
            this.from = _from[0];
            this.path = _path[0];
            this.to = _to[0];
        }

        function makeSvg(deltaX, deltaY, tagSvg, X, Y) {
            if (deltaY <= 45 && deltaY >= -45) {
                tagSvg.css('top', Y);
            }
            if (deltaY < -45) {
                tagSvg.css('top', Y + deltaY + 45);
                if (deltaY < -90) {
                    tagSvg.height((-deltaY));
                }
            }
            else if (deltaY > 45) {
                tagSvg.css('top', Y + deltaY - 45);
                if (deltaY > 90) {
                    tagSvg.css('top', Y + 45);
                    tagSvg.height(deltaY);
                }
            }
            if (deltaX > 21) {
                tagSvg.css('left', X);
                if (deltaX > 90) {
                    tagSvg.width(deltaX);
                }
            }
            else if (deltaX >= 0 && deltaX <= 21) {
                tagSvg.css('left', X - 21 + deltaX);
            }
            else if (deltaX < 0) {
                tagSvg.css('left', X + deltaX - 21);
                if (deltaX < -48) {
                    tagSvg.width((-deltaX) + 42);
                }
            }
        }

        function makePath(deltaX, deltaY, path, arrow) {
            let ax = basicOptions.arrowHeight, ay = basicOptions.arrowBottom;
            if (deltaX > 42) {
                if (deltaY < -12 && deltaY >= -45) {
                    path.attr('d', 'M 0 45 L ' + (deltaX - 12) / 2 + ' 45 A 6 6,0 0 0,' + deltaX / 2 + ' 39 L ' + deltaX / 2 + ' ' + (51 + deltaY) + ' A 6 6,0 0 1,' + (deltaX / 2 + 6) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                    arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                }
                else if (deltaY < -45) {
                    path.attr('d', 'M 0 ' + (-deltaY) + ' L ' + (deltaX - 12) / 2 + ' ' + (-deltaY) + ' A 6 6,0 0 0,' + deltaX / 2 + ' ' + -(deltaY + 6) + ' L ' + deltaX / 2 + ' 6 A 6 6,0 0 1,' + (deltaX / 2 + 6) + ' ' + 0 + ' L ' + deltaX + ' ' + 0);
                    arrow.attr('d', 'M ' + deltaX + ' 0 L ' + (deltaX - ax) + ' ' + ay + ' L ' + (deltaX - ax) + ' ' + (-ay) + ' Z');
                }
                else if (deltaY <= 0 && deltaY > -12) {
                    path.attr('d', 'M 0 45 L ' + (deltaX + deltaY) / 2 + ' 45 A ' + (-deltaY / 2) + ' ' + (-deltaY / 2) + ',0 0 0,' + deltaX / 2 + ' ' + (45 + deltaY / 2) + ' A ' + (-deltaY / 2) + ' ' + (-deltaY / 2) + ',0 0 1,' + (deltaX / 2 - deltaY / 2) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                    arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                }
                else if (deltaY > 0 && deltaY < 12) {
                    path.attr('d', 'M 0 45 L ' + (deltaX - deltaY) / 2 + ' 45 A ' + deltaY / 2 + ' ' + deltaY / 2 + ',0 0 1,' + deltaX / 2 + ' ' + (45 + deltaY / 2) + ' A ' + deltaY / 2 + ' ' + deltaY / 2 + ',0 0 0,' + (deltaX / 2 + deltaY / 2) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                    arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + ((deltaX - ax)) + ' ' + (45 + deltaY - ay) + ' Z');
                }
                else if (deltaY > 12 && deltaY < 45) {
                    path.attr('d', 'M 0 45 L ' + (deltaX - 12) / 2 + ' 45 A 6 6,0 0 1,' + deltaX / 2 + ' 51 L ' + deltaX / 2 + ' ' + (39 + deltaY) + ' A 6 6,0 0 0,' + (deltaX / 2 + 6) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                    arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                }
                else if (deltaY > 45 && deltaY < 90) {
                    path.attr('d', 'M 0 ' + (90 - deltaY) + ' L ' + (deltaX - 12) / 2 + ' ' + (90 - deltaY) + ' A 6 6,0 0 1,' + deltaX / 2 + ' ' + (96 - deltaY) + ' L ' + deltaX / 2 + ' 84 A 6 6,0 0 0,' + (deltaX / 2 + 6) + ' ' + 90 + ' L ' + deltaX + ' ' + 90);
                    arrow.attr('d', 'M ' + deltaX + ' 90 L ' + (deltaX - ax) + ' ' + (90 + ay) + ' L ' + (deltaX - ax) + ' ' + (90 - ay) + ' Z');
                }
                else if (deltaY >= 90) {
                    path.attr('d', 'M 0 0 L ' + (deltaX - 12) / 2 + ' 0 A 6 6,0 0 1,' + deltaX / 2 + ' 6 L ' + deltaX / 2 + ' ' + (deltaY - 6) + ' A 6 6,0 0 0,' + (deltaX / 2 + 6) + ' ' + deltaY + ' L ' + deltaX + ' ' + deltaY);
                    arrow.attr('d', 'M ' + deltaX + ' ' + deltaY + ' L ' + (deltaX - ax) + ' ' + (deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (deltaY - ay) + ' Z');
                }
            }
            else if (deltaX <= 42) {
                if (deltaX > 29) {
                    if (deltaY < -24 && deltaY > -45) {
                        path.attr('d', 'M 0 45 L 15 45 A 6 6,0 0 0,21 39 L 21 ' + (66 - deltaX / 2 + deltaY / 2) + ' A ' + (42 - deltaX) / 2 + ' ' + (42 - deltaX) / 2 + ',0 0 0,' + deltaX / 2 + ' ' + (45 + deltaY / 2) + 'A ' + (42 - deltaX) / 2 + ' ' + (42 - deltaX) / 2 + ',0 0 1,' + (deltaX - 21) + ' ' + (24 + deltaY / 2 + deltaX / 2) + ' L ' + (deltaX - 21) + ' ' + (51 + deltaY) + 'A 6 6,0 0 1,' + (deltaX - 15) + ' ' + (45 + deltaY) + 'L ' + deltaX + ' ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY <= -45) {
                        path.attr('d', 'M 0 ' + (-deltaY) + ' L 15 ' + (-deltaY) + ' A 6 6,0 0 0,21 ' + (-deltaY - 6) + ' L 21 ' + (21 - deltaY / 2 - deltaX / 2) + ' A ' + (42 - deltaX) / 2 + ' ' + (42 - deltaX) / 2 + ',0 0 0,' + deltaX / 2 + ' ' + (-deltaY / 2) + ' A ' + (42 - deltaX) / 2 + ' ' + (42 - deltaX) / 2 + ',0 0 1,' + (deltaX - 21) + ' ' + (deltaX / 2 - deltaY / 2 - 21) + ' L ' + (deltaX - 21) + ' 6 A 6 6,0 0 1' + (deltaX - 15) + ' 0 L ' + deltaX + ' 0');
                        arrow.attr('d', 'M ' + deltaX + ' 0 L ' + (deltaX - ax) + ' ' + ay + ' L ' + (deltaX - ax) + ' ' + (-ay) + ' Z');
                    }
                    else if (deltaY <= 0 && deltaY > -24) {
                        path.attr('d', 'M 0 45 L 15 45 A ' + (-deltaY / 4) + ' ' + (-deltaY / 4) + ',0 0 0,' + 15 + ' ' + (45 + deltaY / 2) + ' A ' + (-deltaY / 4) + ' ' + (-deltaY / 4) + ',0 0 1,' + (15 - deltaY / 4) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY > 0 && deltaY < 24) {
                        path.attr('d', 'M 0 45 L 15 45 A ' + deltaY / 4 + ' ' + deltaY / 4 + ',0 0 1,15 ' + (45 + deltaY / 2) + ' A ' + deltaY / 4 + ' ' + deltaY / 4 + ',0 0 0,' + (15 + deltaY / 4) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY > 24 && deltaY < 45) {
                        path.attr('d', 'M 0 45 L 15 45 A 6 6,0 0 1,21 51 L 21 ' + (24 + deltaY / 2 + deltaX / 2) + ' A ' + (42 - deltaX) / 2 + ' ' + (42 - deltaX) / 2 + ',0 0 1,' + deltaX / 2 + ' ' + (45 + deltaY / 2) + ' A ' + (21 - deltaX / 2) + ' ' + (21 - deltaX / 2) + ',0 0 0,' + (deltaX - 21) + ' ' + (66 + deltaY / 2 - deltaX / 2) + ' L ' + (deltaX - 21) + ' ' + (39 + deltaY) + ' A 6 6 ,0 0 0,' + (deltaX - 15) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY > 45 && deltaY < 90) {
                        path.attr('d', 'M 0 ' + (90 - deltaY) + ' L 15 ' + (90 - deltaY) + ' A 6 6,0 0 1,21 ' + (96 - deltaY) + ' L 21 ' + (69 - deltaY / 2 + deltaX / 2) + ' A ' + (21 - deltaX / 2) + ' ' + (21 - deltaX / 2) + ',0 0 1,' + deltaX / 2 + ' ' + (90 - deltaY / 2) + ' A ' + (21 - deltaX / 2) + ' ' + (21 - deltaX / 2) + ',0 0 0,' + (deltaX - 21) + ' ' + (111 - deltaY / 2 - deltaX / 2) + ' L ' + (deltaX - 21) + ' 86 A 6 6,0 0 0,' + (deltaX - 15) + ' 90 L ' + deltaX + ' 90');
                        arrow.attr('d', 'M ' + deltaX + ' 90 L ' + (deltaX - ax) + ' ' + (90 + ay) + ' L ' + (deltaX - ax) + ' ' + (90 - ay) + ' Z');
                    }
                    else if (deltaY >= 90) {
                        path.attr('d', 'M 0 0 L 15 0 A 6 6,0 0 1,21 6 L 21 ' + (deltaY / 2 + deltaX / 2 - 21) + ' A ' + (21 - deltaX / 2) + ' ' + (21 - deltaX / 2) + ',0 0 1,' + deltaX / 2 + ' ' + deltaY / 2 + ' A ' + (21 - deltaX / 2) + ' ' + (21 - deltaX / 2) + ',0 0 0,' + (deltaX - 21) + ' ' + (deltaY / 2 - deltaX / 2 + 21) + ' L ' + (deltaX - 21) + ' ' + (deltaY - 6) + ' A 6 6,0 0 0,' + (deltaX - 15) + ' ' + deltaY + ' L ' + deltaX + ' ' + deltaY);
                        arrow.attr('d', 'M ' + deltaX + ' ' + deltaY + ' L ' + (deltaX - ax) + ' ' + (deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (deltaY - ay) + ' Z');
                    }
                }
                else if (deltaX > 20) {
                    if (deltaY < -24 && deltaY > -45) {
                        path.attr('d', 'M 0 45 L 15 45 A 6 6,0 0 0,21 39 L 21 ' + (51 + deltaY / 2) + ' A 6 6,0 0 0,15 ' + (45 + deltaY / 2) + ' L ' + (deltaX - 15) + ' ' + (45 + deltaY / 2) + ' A 6 6,0 0 1,' + (deltaX - 21) + ' ' + (39 + deltaY / 2) + ' L ' + (deltaX - 21) + ' ' + (51 + deltaY) + 'A 6 6,0 0 1,' + (deltaX - 15) + ' ' + (45 + deltaY) + 'L ' + deltaX + ' ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY <= -45) {
                        path.attr('d', 'M 0 ' + (-deltaY) + ' L 15 ' + (-deltaY) + ' A 6 6,0 0 0,21 ' + (-deltaY - 6) + ' L 21 ' + (6 - deltaY / 2) + ' A 6 6,0 0 0,15 ' + (-deltaY / 2) + ' L ' + (deltaX - 15) + ' ' + (-deltaY / 2) + ' A 6 6,0 0 1,' + (deltaX - 21) + ' ' + (-deltaY / 2 - 6) + ' L ' + (deltaX - 21) + ' 6 A 6 6,0 0 1,' + (deltaX - 15) + ' 0 L ' + deltaX + ' 0');
                        arrow.attr('d', 'M ' + deltaX + ' 0 L ' + (deltaX - ax) + ' ' + ay + ' L ' + (deltaX - ax) + ' ' + (-ay) + ' Z');
                    }
                    else if (deltaY <= 0 && deltaY > -24) {
                        path.attr('d', 'M 0 45 L 15 45 A ' + (-deltaY / 4) + ' ' + (-deltaY / 4) + ',0 0 0,15 ' + (45 + deltaY / 2) + ' L ' + (deltaX - deltaY / 2 - 27) + ' ' + (45 + deltaY / 2) + ' A ' + (-deltaY / 4) + ' ' + (-deltaY / 4) + ',0 0 1,' + (deltaX - deltaY / 2 - 27) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY > 0 && deltaY < 24) {
                        path.attr('d', 'M 0 45 L 15 45 A ' + deltaY / 4 + ' ' + deltaY / 4 + ',0 0 1,15 ' + (45 + deltaY / 2) + ' L ' + (deltaX + deltaY / 2 - 27) + ' ' + (45 + deltaY / 2) + ' A ' + deltaY / 4 + ' ' + deltaY / 4 + ',0 0 0,' + (deltaX + deltaY / 2 - 27) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY > 24 && deltaY < 45) {
                        path.attr('d', 'M 0 45 L 15 45 A 6 6,0 0 1,21 51 L 21 ' + (39 + deltaY / 2) + ' A 6 6,0 0 1,15 ' + (45 + deltaY / 2) + ' L ' + (deltaX - 15) + ' ' + (45 + deltaY / 2) + ' A 6 6,0 0 0,' + (deltaX - 21) + ' ' + (51 + deltaY / 2) + ' L ' + (deltaX - 21) + ' ' + (39 + deltaY) + ' A 6 6 ,0 0 0,' + (deltaX - 15) + ' ' + (45 + deltaY) + ' L ' + deltaX + ' ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + deltaX + ' ' + (45 + deltaY) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY > 45 && deltaY < 90) {
                        path.attr('d', 'M 0 ' + (90 - deltaY) + ' L 15 ' + (90 - deltaY) + ' A 6 6,0 0 1,21 ' + (96 - deltaY) + ' L 21 ' + (84 - deltaY / 2) + ' A 6 6,0 0 1,15 ' + (90 - deltaY / 2) + ' L ' + (deltaX - 15) + ' ' + (90 - deltaY / 2) + ' A 6 6,0 0 0,' + (deltaX - 21) + ' ' + (96 - deltaY / 2) + ' L ' + (deltaX - 21) + ' 86 A 6 6,0 0 0,' + (deltaX - 15) + ' 90 L ' + deltaX + ' 90');
                        arrow.attr('d', 'M ' + deltaX + ' 90 L ' + (deltaX - ax) + ' ' + (90 + ay) + ' L ' + (deltaX - ax) + ' ' + (90 - ay) + ' Z');
                    }
                    else if (deltaY >= 90) {
                        path.attr('d', 'M 0 0 L 15 0 A 6 6,0 0 1,21 6 L 21 ' + (deltaY / 2 - 6) + ' A 6 6,0 0 1,15 ' + deltaY / 2 + ' L ' + (deltaX - 15) + ' ' + (deltaY / 2) + ' A 6 6,0 0 0,' + (deltaX - 21) + ' ' + (deltaY / 2 + 6) + ' L ' + (deltaX - 21) + ' ' + (deltaY - 6) + ' A 6 6,0 0 0,' + (deltaX - 15) + ' ' + deltaY + ' L ' + deltaX + ' ' + deltaY);
                        arrow.attr('d', 'M ' + deltaX + ' ' + deltaY + ' L ' + (deltaX - ax) + ' ' + (deltaY + ay) + ' L ' + (deltaX - ax) + ' ' + (deltaY - ay) + ' Z');
                    }
                }
                else {
                    if (deltaY < -24 && deltaY > -45) {
                        path.attr('d', 'M ' + (21 - deltaX) + ' 45 L ' + (36 - deltaX) + ' 45 A 6 6,0 0 0,' + (42 - deltaX) + ' 39 L ' + (42 - deltaX) + ' ' + (51 + deltaY / 2) + ' A 6 6,0 0 0,' + (36 - deltaX) + ' ' + (45 + deltaY / 2) + ' L 6 ' + (45 + deltaY / 2) + ' A 6 6,0 0 1,0 ' + (39 + deltaY / 2) + ' L 0 ' + (51 + deltaY) + ' A 6 6,0 0 1,6 ' + (45 + deltaY) + 'L 21 ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + ' 21 ' + (45 + deltaY) + ' L ' + (21 - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (21 - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY <= -45) {
                        path.attr('d', 'M ' + (21 - deltaX) + ' ' + (-deltaY) + ' L ' + (36 - deltaX) + ' ' + (-deltaY) + ' A 6 6,0 0 0,' + (42 - deltaX) + ' ' + (-deltaY - 6) + ' L ' + (42 - deltaX) + ' ' + (6 - deltaY / 2) + ' A 6 6,0 0 0,' + (36 - deltaX) + ' ' + (-deltaY / 2) + ' L 6 ' + (-deltaY / 2) + ' A 6 6,0 0 1,0 ' + (-deltaY / 2 - 6) + ' L 0 6 A 6 6,0 0 1,6 0 L 21 0');
                        arrow.attr('d', 'M ' + ' 21 0 L ' + (21 - ax) + ' ' + ay + ' L ' + (21 - ax) + ' ' + (-ay) + ' Z');
                    }
                    else if (deltaY <= 0 && deltaY > -24) {
                        path.attr('d', 'M ' + (21 - deltaX) + ' 45 L ' + (36 - deltaX) + ' 45 A ' + (-deltaY / 4) + ' ' + (-deltaY / 4) + ',0 0 0,' + (36 - deltaX) + ' ' + (45 + deltaY / 2) + ' L ' + (-deltaY / 4) + ' ' + (45 + deltaY / 2) + ' A ' + (-deltaY / 4) + ' ' + (-deltaY / 4) + ',0 0 1,' + (-deltaY / 4) + ' ' + (45 + deltaY) + ' L 21 ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + ' 21 ' + (45 + deltaY) + ' L ' + (21 - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (21 - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY > 0 && deltaY < 24) {
                        path.attr('d', 'M ' + (21 - deltaX) + ' 45 L ' + (36 - deltaX) + ' 45 A ' + deltaY / 4 + ' ' + deltaY / 4 + ',0 0 1,' + (36 - deltaX) + ' ' + (45 + deltaY / 2) + ' L ' + (deltaY / 4) + ' ' + (45 + deltaY / 2) + ' A ' + deltaY / 4 + ' ' + deltaY / 4 + ',0 0 0,' + (deltaY / 4) + ' ' + (45 + deltaY) + ' L 21 ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + ' 21 ' + (45 + deltaY) + ' L ' + (21 - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (21 - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY > 24 && deltaY < 45) {
                        path.attr('d', 'M ' + (21 - deltaX) + ' 45 L ' + (36 - deltaX) + ' 45 A 6 6,0 0 1,' + (42 - deltaX) + ' 51 L ' + (42 - deltaX) + ' ' + (39 + deltaY / 2) + ' A 6 6,0 0 1,' + (36 - deltaX) + ' ' + (45 + deltaY / 2) + ' L 6 ' + (45 + deltaY / 2) + ' A 6 6,0 0 0,0 ' + (51 + deltaY / 2) + ' L 0 ' + (39 + deltaY) + ' A 6 6 ,0 0 0,6 ' + (45 + deltaY) + ' L 21 ' + (45 + deltaY));
                        arrow.attr('d', 'M ' + ' 21 ' + (45 + deltaY) + ' L ' + (21 - ax) + ' ' + (45 + deltaY + ay) + ' L ' + (21 - ax) + ' ' + (45 + deltaY - ay) + ' Z');
                    }
                    else if (deltaY > 45 && deltaY < 90) {
                        path.attr('d', 'M ' + (21 - deltaX) + ' ' + (90 - deltaY) + ' L ' + (36 - deltaX) + ' ' + (90 - deltaY) + ' A 6 6,0 0 1,' + (42 - deltaX) + ' ' + (96 - deltaY) + ' L ' + (42 - deltaX) + ' ' + (84 - deltaY / 2) + ' A 6 6,0 0 1,' + (36 - deltaX) + ' ' + (90 - deltaY / 2) + ' L 6 ' + (90 - deltaY / 2) + ' A 6 6,0 0 0,0 ' + (96 - deltaY / 2) + ' L 0 86 A 6 6,0 0 0,6 90 L 21 90');
                        arrow.attr('d', 'M ' + ' 21 90 L ' + (21 - ax) + ' ' + (90 - ay) + ' L ' + (21 - ax) + ' ' + (90 + ay) + ' Z');
                    }
                    else if (deltaY >= 90) {
                        path.attr('d', 'M ' + (21 - deltaX) + ' 0 L ' + (36 - deltaX) + ' 0 A 6 6,0 0 1,' + (42 - deltaX) + ' 6 L ' + (42 - deltaX) + ' ' + (deltaY / 2 - 6) + ' A 6 6,0 0 1,' + (36 - deltaX) + ' ' + deltaY / 2 + ' L 6 ' + (deltaY / 2) + ' A 6 6,0 0 0,0 ' + (deltaY / 2 + 6) + ' L 0 ' + (deltaY - 6) + ' A 6 6,0 0 0,6 ' + deltaY + ' L 21 ' + deltaY);
                        arrow.attr('d', 'M ' + ' 21 ' + deltaY + ' L ' + (21 - ax) + ' ' + (deltaY + ay) + ' L ' + (21 - ax) + ' ' + (deltaY - ay) + ' Z');
                    }
                }
            }
        }

        if (arguments.length === 4) {
            updateBasicOptions(options);
            createCanvas(canvas, dragBox);
            setEvent(canvas, dragBox, this, options.info, callback);
        } else if (typeof (options) === 'function') {
            callback = options;
            updateBasicOptions({});
            createCanvas(canvas, dragBox);
            setEvent(canvas, dragBox, this, null, callback);
        } else if (typeof (options) === 'object') {
            updateBasicOptions(options);
            createCanvas(canvas, dragBox);
            setEvent(canvas, dragBox, this, options.info);
        }
    }

    componentDidMount() {
        let options = {
            'info': '',
            'imgBoxClass': 'imgbox',
            'arrowBottom': 3,
            'arrowHeight': 6,
            'pathBottomWidth': 0,
            'pathAboveWidth': 1,
            'pathAboveColor': '#ca910a'
        };
        this.canvasConstructor('#mainCanvas', '#dragBox', options, null);
    }

    render() {
        return (
            <div id="editorArea">
                <div id="toolBar">
                    <div id="dragBox" className="dragBox">dragbox</div>
                </div>
                <div id="mainCanvas">
                </div>
            </div>
        )
    }
}

export default Editor;