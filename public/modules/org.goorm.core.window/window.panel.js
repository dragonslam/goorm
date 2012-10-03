/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.goorm.org/License
 **/org.goorm.core.window.panel=function(){this.panel=null,this.resize=null,this.context_menu=null,this.container=null,this.workspace_container=null,this.tab=null,this.editor=null,this.designer=null,this.terminal=null,this.title=null,this.type=null,this.status=null,this.filepath=null,this.filename=null,this.filetype=null,this.left=null,this.top=null,this.width=null,this.height=null,this.alive=null,this.is_first_maximize=null,this.is_saved=null,this.project=null,this.index=0},org.goorm.core.window.panel.prototype={init:function(e,t,n,r,i,s,o){var u=this;this.is_saved=!0,this.container=e,this.workspace_container=n,this.filepath=r,this.filename=i,this.filetype=s,this.project=core.status.current_project_path,this.alive=!0,this.is_first_maximize=!0,s=="url"&&(this.type="codemirror_editor",this.filename=r);var a=core.module.layout.workspace.window_manager.window.length;this.panel=new YAHOO.widget.Panel(e,{x:$(".yui-layout-unit-center").position().left+5+a*24,y:$(".yui-layout-unit-center").position().top+30+a*24,width:parseInt($("#"+u.workspace_container).width()/2),height:parseInt($("#"+u.workspace_container).height()/2),visible:!0,underlay:"none",close:!1,autofillheight:"body",draggable:!0,constraintoviewport:!0,context:["showbtn","tl","bl"]}),this.title=t,this.panel.setHeader("<div style='overflow:auto' class='titlebar'><div class='windowTitle' style='float:left'>"+this.title+"</div><div class='window_buttons'><div class='minimize window_button'></div> <div class='maximize window_button'></div> <div class='close window_button'></div></div></div>"),this.panel.setBody("<div class='window_container'></div>"),this.panel.setFooter("<div class='.footer'>footer</div>"),this.panel.render(),this.status="unmaximized",this.left=$("#"+e).css("left"),this.top=$("#"+e).css("top"),this.width=parseInt($("#"+u.workspace_container).width()/1.3),this.height=parseInt($("#"+u.workspace_container).height()/1.5),$("#"+this.container).width(this.width),$("#"+this.container).height(this.height);if(o=="Editor"){this.type="Editor";var f=core.filetypes[this.inArray(this.filetype)].mode;this.editor=new org.goorm.core.edit,this.editor.init($("#"+e).find(".window_container")),this.editor.load(this.filepath,this.filename,this.filetype),this.editor.set_mode(f)}else if(o=="Designer")this.type="Designer",this.designer=new org.goorm.core.design,this.designer.init($("#"+e).find(".window_container")[0],this.title),this.designer.load(this.filepath,this.filename,this.filetype);else if(o=="Terminal")this.type="Terminal",this.title="Terminal",this.terminal=new org.goorm.core.terminal,this.terminal.init($("#"+e).find(".window_container")[0],this.filename,!0),$("#"+e).find(".window_container").css("overflow","auto"),this.panel.setFooter("");else if(this.inArray(this.filetype)>-1){this.type=core.filetypes[this.inArray(this.filetype)].editor;if(this.type=="Editor"){var f=core.filetypes[this.inArray(this.filetype)].mode;this.editor=new org.goorm.core.edit,this.editor.init($("#"+e).find(".window_container")),this.editor.load(this.filepath,this.filename,this.filetype),this.editor.set_mode(f)}else this.type=="Designer"?(this.designer=new org.goorm.core.design,this.designer.init($("#"+e).find(".window_container")[0],this.title),this.designer.load(this.filepath,this.filename,this.filetype)):this.type=="Rule_Editor"&&(this.rule_editor=new org.goorm.core.rule.edit,this.rule_editor.init($("#"+e).find(".window_container")[0],this.title),this.rule_editor.load(this.filepath,this.filename,this.filetype))}this.set_footer(),this.resize_all(),this.context_menu=new org.goorm.core.menu.context,this.context_menu.init("configs/menu/org.goorm.core.window/window.panel.titlebar.html","window.panel.titlebar",$("#"+e).find(".titlebar"),this.title),this.resize=new YAHOO.util.Resize(e+"_c",{handles:"all",minWidth:100,minHeight:100,status:!1,proxy:!1}),this.resize.on("startResize",function(e){if(this.cfg.get_property("constraintoviewport")){var t=YAHOO.util.Dom,n=t.getClientRegion(),r=t.getRegion(this.element);u.resize.set("maxWidth",n.right-r.left-YAHOO.widget.Overlay.VIEWPORT_OFFSET),u.resize.set("maxHeight",n.bottom-r.top-YAHOO.widget.Overlay.VIEWPORT_OFFSET)}else u.resize.set("maxWidth",null),u.resize.set("maxHeight",null);u.activate()},this.panel,!0),this.resize.on("resize",function(e){var t=e.width,n=e.height;t!=0&&this.cfg.setProperty("width",t+"px"),n!=0&&this.cfg.setProperty("height",n+"px"),u.resize_all()},this.panel,!0),this.resize.on("endResize",function(e){u.width=$("#"+u.container+"_c").width(),u.height=$("#"+u.container+"_c").height(),u.resize_all()},this.panel,!0),$("#"+e).click(function(){return u.window_body_click(),!1}),$("#"+e).find("#"+e+"_h").find(".titlebar").click(function(){return!1}),$("#"+e).find("#"+e+"_h").find(".titlebar").mousedown(function(){u.activate()}),$("#"+e).find("#"+e+"_h").find(".titlebar").mouseup(function(){u.left=$("#"+u.container+"_c").offset().left,u.top=$("#"+u.container+"_c").offset().top}),$("#"+e).find("#"+e+"_h").find(".titlebar").dblclick(function(){return core.module.layout.workspace.window_manager.maximize_all(),!1}),$("#"+e).find(".minimize").click(function(){return u.minimize(),!1}),$("#"+e).find(".maximize").click(function(){return core.module.layout.workspace.window_manager.maximize_all(),!1}),$("#"+e).find(".close").click(function(){return u.close(),!1}),this.plug(),core.dialog.project_property.refresh_toolbox()},connect:function(e){this.tab=e},window_body_click:function(){this.activate()},titlebar_click:function(){this.activate()},set_modified:function(){var e=$("#"+this.container).find(".titlebar").find("div:first").html();e=e.replace(" *",""),$("#"+this.container).find(".titlebar").find("div:first").html(e+" *"),this.is_saved=!1},set_saved:function(){var e=$("#"+this.container).find(".titlebar").find("div:first").html();$("#"+this.container).find(".titlebar").find("div:first").html(e.replace(" *","")),this.is_saved=!0},maximize:function(){if(this.left==0||this.left==null)this.left=$("#"+this.container+"_c").offset().left;if(this.top==0||this.top==null)this.top=$("#"+this.container+"_c").offset().top;if(this.width==0||this.width==null)this.width=$("#"+this.container+"_c").width();if(this.height==0||this.height==null)this.height=$("#"+this.container+"_c").height();$("#"+this.container+"_c").offset({left:$("#"+this.workspace_container).offset().left-1,top:$("#"+this.workspace_container).offset().top}),$("#"+this.container+"_c").width($("#"+this.workspace_container).width()),$("#"+this.container+"_c").height($("#"+this.workspace_container).height()),$("#"+this.container).width($("#"+this.workspace_container).width()),$("#"+this.container).height($("#"+this.workspace_container).height()),$("#"+this.container).find(".ft").addClass("maximized_ft"),this.panel.cfg.setProperty("width",$("#"+this.workspace_container).width()+"px"),this.panel.cfg.setProperty("height",$("#"+this.workspace_container).height()+"px"),this.status="maximized",$(".tab_max_buttons").show(),this.resize.lock(),this.resize_all()},unmaximize:function(){$("#"+this.container+"_c").offset({left:this.left,top:this.top}),$("#"+this.container+"_c").width(this.width),$("#"+this.container+"_c").height(this.height),$("#"+this.container).width(this.width),$("#"+this.container).height(this.height),$("#"+this.container).find(".ft").removeClass("maximized_ft"),this.panel.cfg.setProperty("width",this.width+"px"),this.panel.cfg.setProperty("height",this.height-3+"px"),this.status=null,$(".tab_max_buttons").hide(),this.resize.unlock(),this.resize_all(),this.left=0,this.top=0,this.width=0,this.height=0},minimize:function(){var e=this;this.status!="minimized"?($("#"+e.container+"_c").hide("fast"),this.status="minimized"):($("#"+e.container+"_c").show("slow"),this.status=null),this.resize_all(),this.activate()},close:function(){var e=this,t=core.module.layout.workspace.window_manager;this.is_saved?(this.alive=!1,this.filename=null,this.filetype=null,$("#"+this.container).parent().remove(),this.context_menu.remove(),this.tab&&(this.tab.window=null,this.tab.close()),t.window.remove(this.index,this.index),t.index--,t.active_window=t.window.length-1,t.active_window!=-1?t.window[t.active_window].activate():$(".tab_max_buttons").hide(),delete this):(confirmation_save.init({title:core.module.localization.msg.confirmationSaveTitle.value,message:'"'+this.filename+'" '+core.module.localization.msg.confirmationSaveMessage.value,yes_text:core.module.localization.msg.confirmationYes.value,cancel_text:core.module.localization.msg.confirmationCancel.value,no_text:core.module.localization.msg.confirmationNo.value,yes:function(){e.editor.save("close")},cancel:function(){},no:function(){e.is_saved=!0,e.tab.is_saved=!0,e.close()}}),confirmation_save.panel.show())},show:function(){$("#"+this.container+"_c").show()},hide:function(){$("#"+this.container+"_c").hide()},activate:function(){core.module.layout.workspace.window_manager.active_window=this.index,$("#"+this.workspace_container).find(".activated").each(function(e){$(this).removeClass("activated")}),$("#"+this.workspace_container).find(".yui-panel-container").each(function(e){$(this).css("z-index","2")}),$("#"+this.container).find(".hd").addClass("activated"),$("#"+this.container).parent().css("z-index","3"),this.tab.activate()},set_header:function(e){},set_body:function(e){},set_footer:function(e){this.type=="Editor"?this.panel.setFooter("<div class='editor_message'>Line: 0 | Col: 0</div>"):this.type=="Designer"?this.panel.setFooter("<div class='designer_message'></div><div class='mouse_position_view'>(0, 0)</div>"):this.filetype=="url"&&this.panel.setFooter("<div class='editor_message'>Line: 0 | Col: 0</div>")},on_resize:function(){},resize_all:function(){var e=$("#"+this.container).find(".bd").height();$("#"+this.container).find(".window_container").height(e),this.type=="Editor"?($("#"+this.container).find(".window_container").find(".CodeMirror").height(e),$("#"+this.container).find(".window_container").find(".CodeMirror").find(".CodeMirror-scroll").css("height","100%"),$("#"+this.container).find(".window_container").find(".CodeMirror").find(".CodeMirror-scroll").children("div").height("100%"),$("#"+this.container).find(".window_container").find(".CodeMirror-gutter").height(e)):this.type=="Terminal"?($("#"+this.container).find(".window_container").height(e-10),this.terminal.resize_all()):this.type=="Designer"&&this.designer.resize_all()},inArray:function(e){for(var t=0;t<core.filetypes.length;t++)if(core.filetypes[t].file_extension==e)return t;return-1},plug:function(){$(core).trigger("window_panel_plug")}};