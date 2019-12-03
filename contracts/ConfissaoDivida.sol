pragma solidity 0.5.13;

contract ConfissaoDeDivida {
    
    string public credor;
    string public devedor;
    string public objeto;
    uint private vencimentoParcela;
    uint private valor;
    uint private valorMulta;
    uint private indiceReajuste;
    uint private valorParcela;
    uint private parcelamento; 
    uint private totalpago;
    uint private dataContrato;
    uint private dataProximaParcela;
    bool[] public confirmacaoPagamento;
    bool public retirado;
    bool public pago;
    bool public parcelaPaga;
    bool public parcelamentoCompleto;
    address payable public contaCredor;
    address payable public advogado;
    address public contaDevedor;

    event parcelaQuitada (uint valorParcela);
    
    modifier somenteCredor () {
        require (msg.sender == contaCredor || msg.sender == advogado, "Operação exclusiva da parte Credora");
        _;    
    }
    
    modifier somenteDevedor () {
        require (msg.sender == contaDevedor, "Operação exclusiva da parte Devedora");
        _;
    }    

    constructor (
        address payable _contaCredor,
        address _contaDevedor,
        string memory nomeCredor, 
        string memory nomeDevedor, 
        string memory objetoDivida, 
        uint valorDivida, 
        uint numeroParcelas,
        uint _vencimentoParcela,
        uint dataInicioContrato,
        uint dataPrimeiraParcela
    ) public{
        require (valorDivida > 0, "Valor incorreto");
        require (numeroParcelas < 36, "Parcelamento Inválido");
        credor = nomeCredor;
        contaCredor = _contaCredor;
        devedor = nomeDevedor;
        contaDevedor = _contaDevedor;
        advogado = msg.sender;
        valor = valorDivida;
        objeto = objetoDivida;
        parcelamento = numeroParcelas;
        vencimentoParcela = _vencimentoParcela;
        valorParcela =valor/parcelamento;
        dataContrato = dataInicioContrato;
        dataProximaParcela = dataPrimeiraParcela;
        }
    
    function ValorDoDebito() public view returns (uint) {
        return valor;
    }
     
    function ValorDaParcela() public view returns (uint) {
        return valorParcela;
    }
    
    function ValorDaMulta () public view returns (uint) {
        return valorMulta;
    }
    
        function VencimentoProximaParcela () public view returns (uint) {
        return dataProximaParcela;
    }

    //REAJUSTE UTILIZA ÍNDICE ANUAL IGP-M/FGV - VALOR DEVE SER INSERIDO SEM A VÍRGULA - EX 1,2345 DEVE SER INSERIDO COMO 12345    
    function InserirReajusteAnual (uint indiceIGPM) public returns (uint) {
        if (indiceIGPM < 10000) {
            indiceIGPM = 10000;
        }
        else if (indiceIGPM > 100000) {
            indiceIGPM = 100000;
        }
        uint reajuste = 1;
        reajuste = (valorParcela+((valorParcela*indiceIGPM)/1000000));
        indiceReajuste = reajuste;
        valorParcela = reajuste;
        return valorParcela;
    }

    //CÁLCULO DA MULTA PELO ATRASO DE PARCELAS - em segundos - antes de 24 horas não será considerado atraso
    function simulacaoMulta (uint periodoAtraso) public {
        require(periodoAtraso >= 86400, "Cálculo inválido");
        for (uint i=1; i<periodoAtraso; i++) {
            valorMulta = ((valor/10)*periodoAtraso)/100;
        }
    }

    //FUNÇÃO PARA PAGAMENTO DE PARCELAS NA DATA
    function pagamentoNoPrazo () public payable somenteDevedor {
        require (now <= (vencimentoParcela+86399), "Atraso - deve ser feito pagamento com encargos de mora.");
        require (msg.value == valorParcela, "Valor incorreto");
        totalpago ++;
        parcelaPaga = true;
        dataProximaParcela = dataProximaParcela + 2629746;
        emit parcelaQuitada(msg.value);
    }

    //FUNÇÃO PARA PAGAMENTO DE PARCELAS APÓS A DATA DO VENCIMENTO    
    function pagamentoEmMora () public payable somenteDevedor {
        require (now > vencimentoParcela, "Pagamento dentro do prazo");
        require (!pago, "Parcela quitada");
        require (msg.value == (valorMulta + valorParcela), "Valor incorreto");
        totalpago ++;
        parcelaPaga = true;
        dataProximaParcela = dataProximaParcela + 2629746;
        emit parcelaQuitada(msg.value);
    }

    // FUNÇÃO PARA ENVIO DOS VALORES PAGOS AO CREDOR
     function depositoParaCredor() public somenteCredor {
        require(pago, "Pagamento não realizado");
        require(retirado == false, "Distribuição já realizada.");
        contaCredor.transfer((valor*9)/10);
        advogado.transfer(address(this).balance);
        retirado = true;
    }
    
}
