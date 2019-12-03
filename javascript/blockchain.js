var enderecoContrato = "0x01f116b6e7bA12BE65D20820fb96010ae6222265";
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

var infoDataParcela;

function buscaProximaParcela() {
    var proximaParcela;
    var campoDataParcela = document.getElementById("campoDataParcela");     
    contrato.dataProximaParcela()
    .then( (resultado) => {
        campoDataParcela.innerHTML = resultado;
        infoDataParcela = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoDataParcela.innerHTML = err;
    });
}

function calculaPrazo()
{   var dia = 86400;
    var campoValorDias = document.getElementById("campoValorDias"); 
    var campoValorDias = infoDataParcela/dia;
    divResultado.innerHTML = campoValorDias;
}
