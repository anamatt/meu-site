var enderecoContrato = "0xc368e37F16ebFEB46f69DD12140ce5537B210f2b";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner();
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);

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

function buscaProximaParcela() {
    var proximaParcela;
    var campoDataParcela = document.getElementById("campoDataParcela");     
    contrato.dataProximaParcela()
    .then( (resultado) => {
        campoDataParcela.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoDataParcela.innerHTML = err;
    });
}
