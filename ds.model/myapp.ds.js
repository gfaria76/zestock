var myapp = {
    ds: {},
    dsi: {},
    model:{},
    dropdown: {},
    appUrl: "http://172.23.64.51:8080/EstoqueREST/webresources/",
    //appUrl: "http://localhost:8080/EstoqueREST/webresources/",
    user: {
        idUsuario: 1,
        nomeUsuario: "Gedson Faria",
        registroFuncional: null,
        email: "gedson.faria@ufms.br	",
        senha: "123",
        theme: null
    },
    notification: null,
    dtpickerformat: "dd/MMM/yyyy",
    dtimepickerformat: "dd/MMM/yyyy HH:mm",
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
myapp['parseIntDate'] = function (date) {
    return (date !== null) ? new Date(date) : date;
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

myapp.dsi.historicoConsumo = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbhistoricoconsumo', 'idHistoricoConsumo'),
    //sort: {field:"idHistoricoConsumo", dir: "asc"},
    schema: {
        model: {
            id: "idHistoricoConsumo",
            fields: {
                idHistoricoConsumo: {type: "number", editable: false, defaultValue: null},
                idMaterialRetirado: {defaultValue: null},
                quantidadeRetirada: {type: "number"},
                motivoRetirada: {type: "string"},
                idQuemRetirou: {defaultValue: null},
                dtRetirada: {type: "date", parse: myapp.parseIntDate}
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
                unidade: {type: "string", defaultValue: "1"}
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
                idProduto: {defaultValue: null},
                prodCBar: {type: "string", from: "idProduto.codigoBarra"},
                prodDesc: {from: "idProduto.descricao"},
                prodEspe: {from: "idProduto.especificacao"},
                prodUnid: {from: "idProduto.idUnidade.unidade"},
                idFabricante: {defaultValue: null},
                dtFabricacao: {type: "date", defaultValue: null, parse: myapp.parseIntDate},
                dtValidade: {type: "date", defaultValue: null, parse: myapp.parseIntDate},
                quantidadeEmEstoque: {type: "number", validation: {required: true, min: 1}},
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

myapp.dsi.bemPermanente = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbbempermanente', 'idBemPermanente'),
    // sort: {field: "descricao", dir: "asc"},
    schema: {
        model: {
            id: 'idBemPermanente',
            fields: {
                idBemPermanente: {type: "serial", editable: false, defaultValue: null},
                descricaoBem: {type: "string", defaultValue: ' '},
                dtEntrada: {type: "date", defaultValue: null, parse: myapp.parseIntDate},
                salaAlocacao: {defaultValue: null},
                observacao: {type: "string"},
                numPatrimonio: {type: "string", defaultValue: null},
                idEstadoConservacao: {defaultValue: {idEstadoBemPermanente: 1}},
                idCoResponsavel: {defaultValue: {idUsuario: 1}}
            }
        }
    }
};

myapp.dsi.estadoBemPermanente = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbestadobempermanente', 'idEstadoBemPermanente'),
    // sort: {field: "fabricante", dir: "asc"},
    schema: {
        model: {
            id: 'idEstadoBemPermanente',
            fields: {
                idEstadoBemPermanente: {type: "number", editable: false, defaultValue: null},
                descricaoEstadoFisico: {type: "string", defaultValue: null}
            }
        }
    }
};

myapp.dsi.locaisLocacao = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tblocaislotacaobempermanente', 'idLocaLotacao'),
    // sort: {field: "descricao", dir: "asc"},
    schema: {
        model: {
            id: 'idLocaLotacao',
            fields: {
                idLocaLotacao: {type: "number", editable: false, defaultValue: null},
                unidadeSetorial: {defaultValue: null},
                setor: {type: "string"},
                sala: {type: "string", defaultValue: null}
            }
        }
    }
};

myapp.dsi.emprestimoBemPermanente = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbemprestimobempermanente', 'idPedidoEmprestimo'),
    // sort: {field: "descricao", dir: "asc"},
    schema: {
        model: {
            id: 'idPedidoEmprestimo',
            fields: {
                idPedidoEmprestimo: {type: "number", editable: false, defaultValue: null},
                justificativa: {type: "string", defaultValue: ' '},
                dtPrevistaRetirada: {type: "date", defaultValue: null, parse: myapp.parseIntDate},
                dtPrevistaDevolucao: {type: "date", defaultValue: null, parse: myapp.parseIntDate},
                idSolicitante: {defaultValue: {idUsuario: 1, nomeUsuario: ""}},
                idNumPatrimonio: {defaultValue: {idBemPermanente: 1, numPatrimonio: ""}},
                idStatusEmprestimo: {defaultValue: {idStatus: 1, descricao: ""}}
            }
        }
    }
};

myapp.dsi.fasesEmprestimoBemPermanente = {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbfasesemprestimobempermanente', 'idFasesEmprestimo'),
    // sort: {field: "descricao", dir: "asc"},
    schema: {
        model: {
            id: 'idFasesEmprestimo',
            fields: {
                idFasesEmprestimo: {type: "number", editable: false, defaultValue: null},
                idPedidoEmprestimo: {defaultValue: {idPedidoEmprestimo: 1}},
                dtStatus: {type: "date", defaultValue: null, parse: myapp.parseIntDate},
                idStatus: {defaultValue: {idStatus: 1, descricao: ""}},
                idResponsavel: {defaultValue: {idUsuario: 1, nomeUsuario: ""}}
            }
        }
    }
};

myapp.dsi.statusEmprestimoBemPermanente= {
    pageSize: 10,
    transport: myapp.setTransport('jpa.tbstatusemprestimobempermanente', 'idStatus'),
    // sort: {field: "descricao", dir: "asc"},
    schema: {
        model: {
            id: 'idStatus',
            fields: {
                idStatus: {type: "number", editable: false, defaultValue: null},
                descricao: {type: "string", defaultValue:1}
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
    item['requestEnd'] = function (e) {
        if (e.type != 'read')
            myapp.notification.show(i + ':' + JSON.stringify(e.type), 'info');

    };
    //e.errorThrown, e.sender, e.status, e.xhr
    item['error'] = function (e) {
        myapp.notification.show(i + ':' + e.status + '</br>'
            + JSON.stringify(e.xhr.state), 'error');
    };
    myapp.ds[i] = new kendo.data.DataSource(item);
    myapp.model[i] = new kendo.data.Model.define(item.schema.model);
});