export default function set_layout() {
  $('#layout').w2layout({
    name: 'layout',
    panels: [
        { type: 'left', size: 350, resizable: true, style: layerspanel_styles, content: layerspanel },
        { type: 'main', resizable: true, content: '<div id="inner_layout" style="width:100%; height:100vh;"></div>'},
        { type: 'right', size: 60, resizable: false, style: buttonspanel_styles, content: buttonspanel }
    ]
  });
  $('#inner_layout').w2layout({
    name: 'inner_layout',
    panels: [
        { type: 'main', resizable: true, content: mappanel },
        { type: 'bottom', size: 300, resizable: true, hidden: true, style: infopanel_styles, content: infopanel }
    ]
  });

}
