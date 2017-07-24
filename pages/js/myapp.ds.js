var myapp = {
    ds: {},
    dsi: {},
    dropdown: {},
    appUrl: "http://localhost:8080/EstoqueREST/webresources/",
    user: {},
    notification: null
};
//colocar no index.htm
//<span kendo-notification="myapp.notification" id="notification"></span>

myapp.btDestroy = {name: "destroy", iconClass: "k-font-icon", imageClass: "k-i-trash", text: ''};
myapp.btEdit = {name: "edit", text: {edit: '', update: '', cancel: ''}};
myapp.btSave = {name: "save", text: ''};
myapp.btCancel = {name: "cancel", text: ''};

myapp['strToDate'] = function (str) {
    var ret = kendo.parseDate(str);
    if( str.length == 13 ) { //é um int como str
        ret = kendo.parseInt(str);
        ret = kendo.parseDate(ret);
    }
    ret = kendo.toString(ret,'dd/MMM/yyyy');
    return ret;
    //dtValidade==null?'':kendo.toString( kendo.parseDate(dtValidade), 'dd/MMM/yyyy')
};

myapp.setTransport = function (tableName, idName) {
    var tableUrl = this.appUrl + tableName;
    return {
        read: {
            url: tableUrl,
            type: "GET",
            dataType: "json"
        },
        create: {
            url: tableUrl,
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        },
        destroy: {
            url: function (data) {
                return tableUrl + '/' + data[idName];
            },
            type: "DELETE",
            dataType: "json"
        },
        update: {
            url: function (data) {
                return tableUrl + '/' + data[idName];
            },
            type: "PUT",
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        },
        parameterMap: function (data, operation) {
            console.log(JSON.stringify(operation) + ' ' + tableName);
            if (operation === "create" || operation === "update") {
                //console.log(JSON.stringify(data));
                return JSON.stringify(data);
            }
            //return data;
        }
    };
};

myapp.dsi.usuario = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbusuario', 'idUsuario'),
    //sort: {field: "nomeUsuario", dir: "asc"},
    schema: {
        model: {
            id: 'idUsuario',
            fields: {
                idUsuario: {type: "number", editable: false, defaultValue: null},
                nomeUsuario: {type: "string"},
                email: {type: "string"},
                registroFuncional: {type: "number"},
                senha: {type: "string", defaultValue: "abc@123"},
                theme: {type: "string", defaultValue: "bootstrap"}
            }
        }
    }
};

myapp.dsi.fabricante = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbfabricante', 'idFabricante'),
    sort: {field: "fabricante", dir: "asc"},
    schema: {
        model: {
            id: 'idFabricante',
            fields: {
                idFabricante: {type: "number", editable: false, defaultValue: null},
                fabricante: {type: "string"}
            }
        }
    }
};

myapp.dsi.unidade = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbunidade', 'idUnidade'),
    //sort: {field: "", dir: "asc"},
    schema: {
        model: {
            id: 'idUnidade',
            fields: {
                idUnidade: {type: "number", editable: false, defaultValue: null},
                unidade: {type: "string"}
            }
        }
    }
};

myapp.dsi.consumo = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbconsumo', 'idConsumo'),
    //sort: {field: "idConsumo", dir: "asc"},
    //filter: { field: "quantidadeEmEstoque", operator: "gt", value: 0 },
    schema: {
        model: {
            id: 'idConsumo',
            fields: {
                idConsumo: {type: "number", editable: false, defaultValue: null},
                idProduto: {defaultValue: {idProdutoConsumo: 1, descricao: ''}},
                idFabricante: {defaultValue: null},
                //dtFabricacao: {type: "date", defaultValue: null},
                dtValidade: {type: "date", defaultValue: null},
                quantidadeEmEstoque: {type: "number"},
                dtQuandoRecebeu: {type: "date", defaultValue: null},
                idQuemRecebeu: {defaultValue: {idUsuario: 1, usuario: ""}}
            }
        }
    }
};

myapp.dsi.produto = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbprodutoconsumo', 'idProdutoConsumo'),
    sort: {field: "descricao", dir: "asc"},
    schema: {
        model: {
            id: 'idProdutoConsumo',
            fields: {
                idProdutoConsumo: {type: "number", editable: false, defaultValue: null},
                codigoBarra: {type: "string", defaultValue: ' '},
                descricao: {type: "string"},
                especificacao: {type: "string"},
                idUnidade: {defaultValue: {idUnidade: 1, unidade: ""}}
            }
        }
    }
};

myapp.dropdown.usuario = function (container, options) {
    $('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataTextField: "usuario",
            dataValueField: "idUsuario",
            dataSource: myapp.ds.usuario
        });
};

myapp.dropdown.unidade = function (container, options) {
    $('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataTextField: "unidade",
            dataValueField: "idUnidade",
            dataSource: myapp.ds.unidade
        });
};

myapp.dropdown.theme = function (container, options) {
    $('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataSource: myThemes.DropDownList.dataSource,
            dataTextField: "text",
            dataValueField: "value"
        });
};

$.each(myapp.dsi, function (i, item) {
    //e tem sender, action, field, itens
    //actions itemChanged, sync, add, remove - read dont has action
    item['change'] = function (e) {
        if (('action' in e)) {
            myapp.notification.show(i + ':' + JSON.stringify(e.action), 'info');
        }
    };
    //e.errorThrown, e.sender, e.status, e.xhr
    item['error'] = function (e) {
        myapp.notification.show(i + ':' + e.status + '</br>'
            + JSON.stringify(e.xhr.state), 'error');
    };
    myapp.ds[i] = new kendo.data.DataSource(item);
});