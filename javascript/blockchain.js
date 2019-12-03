var enderecoContrato = "0xc368e37F16ebFEB46f69DD12140ce5537B210f2b";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner();
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);

function registrarMudancaStatus() {
    var textoCampo = document.frmStatus.txtStatusPagamentoAluguel.value;
    var caixaStatusTx = document.getElementById("caixaStatusTx");
    if (textoCampo.length === 8) {
        caixaStatusTx.innerHTML = "Enviando transação...";
        contrato.mudaStatusPagamento(textoCampo)
        .then( (transacao) => {
            console.log("registrarMudancaStatus - Transacao ", transacao);   
            caixaStatusTx.innerHTML = "Transação enviada. Aguardando processamento...";
            transacao.wait()
            .then( (resultado) => {
                buscaStatusContrato();
                caixaStatusTx.innerHTML = "Transação realizada.";
            })        
            .catch( (err) => {
                console.error("registrarMudancaStatus - Aguardando tx ser minerada");
                console.error(err);
                caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
            })
        })
        .catch( (err) => {
            console.error("registrarMudancaStatus");
            console.error(err);
            caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
        })
    }
}

function buscaStatusContrato() {
    var status;
    var campoStatus = document.getElementById("campoStatus");     
    contrato.parcelaPaga()
    .then( (resultado) => {
        campoStatus.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoStatus.innerHTML = err;
    });
}

function buscaValorTotal() {
    var valor;
    var campoValor = document.getElementById("campoValor");     
    contrato.valor()
    .then( (resultado) => {
        campoValor.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoValor.innerHTML = err;
    });
}

function buscaNumeroParcelas() {
    var parcelamento;
    var campoParcelamento = document.getElementById("campoParcelamento");     
    contrato.parcelamento()
    .then( (resultado) => {
        campoParcelamento.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoParcelamento.innerHTML = err;
    });
}

function buscaValorParcelas() {
    var valorParcela;
    var campoValorParcela = document.getElementById("campoValorParcela");     
    contrato.valorParcela()
    .then( (resultado) => {
        campoValorParcela.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoValorParcela.innerHTML = err;
    });
}

function finalizarContrato () {
    contrato.fimDoContrato()
    caixaStatusTx.innerHTML = "Enviando solicitação...";
    .then( (transacao) => {
        console.log("registrarFimContrato - Transacao ", transacao);   
        caixaStatusTx.innerHTML = "Transação enviada. Aguardando processamento...";
        transacao.wait()
            .then( (resultado) => {
                caixaStatusTx.innerHTML = "Transação realizada.";
            })        
            .catch( (err) => {
                console.error("registrarFimContrato - Aguardando tx ser minerada");
                console.error(err);
                caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
            })
        })
    .catch( (err) => {
        console.error("registrarFimContrato");
        console.error(err);
        caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
    })
    }
}
