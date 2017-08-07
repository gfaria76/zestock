var myapp = {
    ds: {},
    dsi: {},
    dropdown: {},
    appUrl: "http://localhost:8080/EstoqueRest/webresources/",
    user: {},
    notification: null,
    dateformat: "{0:dd/MMM/yyyy}",
    datetimeformat: "{0:dd/MMM/yyyy HH:mm}"
};
//colocar no index.htm
//<span kendo-notification="myapp.notification" id="notification"></span>

myapp.btDestroy = {name: "destroy", iconClass: "k-font-icon", imageClass: "k-i-trash", text: ''};
myapp.btEdit = {name: "edit", text: {edit: '', update: '', cancel: ''}};
myapp.btSave = {name: "save", text: ''};
myapp.btCancel = {name: "cancel", text: ''};

//JavaRest retorna TimeStamp (data+hora) como numero inteiro, @Temporal(TemporalType.TIMESTAMP)
//ao criar novos registros, se passar o string como (data+hora), formato ISO date, o JavaRest também retorna a data como Int
//a soluçao é criar uma função que faça o parser da data caso seja inteiro, os demais casos, o kendo.parseDate resolve automaticamente
myapp['parseIntDate'] = function(date) {
    return (date !== null)? new Date(date): date;
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
                registroFuncional: {type: "string"},
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
                dtFabricacao: {type: "date", defaultValue: null, parse: myapp.parseIntDate},
                dtValidade: {type: "date", defaultValue: null, parse: myapp.parseIntDate},
                quantidadeEmEstoque: {type: "number",validation: {required: true, min: 1}},
                dtQuandoRecebeu: {type: "date", defaultValue: null, parse: myapp.parseIntDate},
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

myapp.dropDown = function (dataSourceList, textField, valueField) {
    return {
        editor: function (container, options) {
            $('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataSource: dataSourceList,
                    dataTextField: textField,
                    dataValueField: valueField
                });
        }
    };
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