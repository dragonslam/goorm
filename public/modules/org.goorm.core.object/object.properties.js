/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.goorm.org/License
 **/org.goorm.core.object.properties=function(){this.target=null,this.manager=null,this.table=null,this.object=null},org.goorm.core.object.properties.prototype={init:function(target){var self=this;this.target=target;var textbox_cell_editor=new YAHOO.widget.TextboxCellEditor({disableBtns:!0}),table_column_definition=[{key:"attribute",label:"Attribute",sortable:!1},{key:"value",label:"Value",sortable:!1,editor:textbox_cell_editor}],data_properties=new YAHOO.util.DataSource;data_properties.responseSchema={resultNode:"property",fields:["id","value"]};var highlight_editable_cell=function(e){var t=e.target;YAHOO.util.Dom.hasClass(t,"yui-dt-editable")&&this.highlightCell(t)},edit_complete=function(object){var attribute=$(object.editor.getTdEl()).parent().find(".yui-dt-col-attribute").find(".yui-dt-liner").html(),value=object.newData;console.log(object),eval("self.object.properties."+attribute)&&eval("self.object.properties."+attribute+"='"+value+"';"),self.object.shape!=null&&(eval("self.object.shape.properties."+attribute+"='"+value+"';"),self.object.properties.status="modified"),self.refresh()};return this.table=new YAHOO.widget.DataTable(target,table_column_definition,data_properties),this.table.set("MSG_EMPTY","No object selected."),this.table.render(),this.table.subscribe("cellClickEvent",this.table.onEventShowCellEditor),this.table.subscribe("cellMouseoutEvent",this.table.onEventUnhighlightCell),this.table.subscribe("cellMouseoverEvent",highlight_editable_cell),this.table.subscribe("editorSaveEvent",edit_complete),this},connect_manager:function(e){this.manager=e},set:function(e){this.object=e,this.refresh()},unset:function(){this.object=null,this.refresh()},refresh:function(){var self=this,index=0;this.table.deleteRows(0,$("#"+this.target).find("table").find("tbody").find("tr").size()),this.object&&($(this.object.properties.attribute_list).each(function(i){var value=eval("self.object.properties."+this);self.table.addRow({attribute:this,value:value},i),index=i}),this.object.shape!=null&&this.object.shape.properties!=null&&$.each(this.object.shape.properties,function(e,t){index++,self.table.addRow({attribute:e,value:t},index)})),this.redraw()},redraw:function(){this.manager.canvas.draw(),this.object&&(this.object.shape!=null&&this.object.shape.set_shape(),this.object.type=="square")},apply:function(){}};