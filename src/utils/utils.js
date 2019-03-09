import $ from 'jquery';
//创建带有jquery引用的dom元素
function createElement(table) {
  let xmlns = 'http://www.w3.org/2000/svg';
  switch (table) {
    case 'p':
      return $('<p></p>');
    case 'img':
      return $('<img alt="">');
    case 'div':
      return $('<div></div>');
    case 'span':
      return $('<span></span>');
    case 'input':
      return $('<input></input>');
    case 'svg':
      return $(document.createElementNS(xmlns, 'svg'));
    case 'path':
      return $(document.createElementNS(xmlns, 'path'));
    case 'rect':
      return $(document.createElementNS(xmlns, 'rect'));
    case 'svg-ori':
      return document.createElementNS(xmlns, 'svg');
    case 'path-ori':
      return document.createElementNS(xmlns, 'path');
    case 'rect-ori':
      return document.createElementNS(xmlns, 'rect');
    default:
      return $('<div></div>');
  }
}

function path_container_construct(_from, _path, _to) {
  this.from = _from[0];
  this.path = _path[0];
  this.to = _to[0];
}

export { createElement, path_container_construct };
