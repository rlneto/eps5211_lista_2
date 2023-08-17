import "./styles.css";

import Cartao from "./components/Cartao";

export default function App() {
  const formulario = {
    f_a_simples: (p, n, i) => Math.round(p * (1 + i) ** n * 100) / 100,
    p_a_simples: (f, n, i) => Math.round((f / (1 + i) ** n) * 100) / 100,
    f_a_postecipado: (a, n, i) =>
      Math.round(((a * ((1 + i) ** n - 1)) / i) * 100) / 100,
    p_a_postecipado: (a, n, i) =>
      Math.round(((a * (1 + i) ** n - 1) / (i * (1 + i) ** n)) * 100) / 100,
    a_f_postecipado: (f, n, i) =>
      Math.round(f * (i / (-1 + (1 + i) ** n)) * 100) / 100,
    a_p_postecipado: (p, n, i) =>
      Math.round(p * ((i * (1 + i) ** n) / (-1 + (1 + i) ** n)) * 100) / 100,
    f_a_antecipado: (a, n, i) =>
      Math.round(((a * (1 + i) * (-1 + (1 + i) ** n)) / i) * 100) / 100,
    p_a_antecipado: (a, n, i) =>
      Math.round(((a * (-1 + (1 + i) ** n)) / (i * (1 + i) ** (n - 1))) * 100) /
      100,
    a_f_antecipado: (f, n, i) =>
      Math.round(((f * i) / ((1 + i) * (-1 + (1 + i) ** n))) * 100) / 100,
    a_p_antecipado: (p, n, i) =>
      Math.round(((p * (i * (1 + i) ** (n - 1))) / (-1 + (1 + i) ** n)) * 100) /
      100
  };
  const achar_i_dado_p_a_n = (p, a, n) => {
    let i = 0.0001;
    while (formulario.a_p_antecipado(p, n, i) < a) {
      i += 0.0001;
    }
    return i;
  };

  const achar_i_dado_p_a_n_pos = (p, a, n) => {
    let i = 0.0001;
    while (formulario.a_p_postecipado(p, n, i) < a) {
      i += 0.0001;
    }
    return Math.round(i * 1000) / 100;
  };

  const acha_p_dado_n_i_saque = (n, i, saque) => {
    let p = 44000;
    let futuro = p;
    let meses = n;
    while (meses > 0) {
      futuro *= 1 + i;
      futuro -= saque;
      meses--;
      if (meses === 0 && futuro <= 0) {
        p += 0.01;
        futuro = p;
        meses = n;
      }
    }
    return Math.round(p * 100) / 100;
  };

  const acha_p_dado_i_saque = (i, saque) => {
    let p = 44000;
    let futuro = p;
    while (true) {
      futuro *= 1 + i;
      futuro -= saque;
      if (futuro < p) {
        p += 0.01;
        futuro = p;
      } else {
        break;
      }
    }
    return Math.round(p * 100) / 100;
  };
  return (
    <div className="App">
      <h4>Discente: Rudolfo Lange Neto</h4>
      <h1>Exercícios equivalência</h1>
      <div className="centralizar">
        <Cartao>
          <p className="enunciado">
            4 - Qual é o valor atual de uma série uniforme de R$ 400,00 durante
            12 meses, a juros de 2,5% ao mês?
          </p>
          <p className="resposta">
            Resposta: {formulario.p_a_postecipado(400, 12, 0.025)} R$
          </p>
        </Cartao>
      </div>
      <div className="centralizar">
        <Cartao>
          <p className="enunciado">
            6 - Uma dívida de R$ 1.000,00 deve ser paga em 12 parcelas mensais,
            a juros de 3% ao mês. Qual o valor da mensalidade?
          </p>
          <p className="resposta">
            Resposta: {formulario.a_p_postecipado(1000, 12, 0.03)} R$
          </p>
        </Cartao>
      </div>
      <div className="centralizar">
        <Cartao>
          <p className="enunciado">
            7 - Um artigo custa R$ 220,00 à vista. O pagamento a prazo implica
            num sinal de R$ 50,00 e quatro mensalidades de R$ 50,00. Qual é a
            taxa de juros cobrada?
          </p>
          <p>
            <em>
              Aqui eu criei uma função que descobre a taxa de juros em uma
              iteração com a fórmula que calcula A, dado P, antecipado.
            </em>
          </p>
          <p className="resposta">
            Resposta: {Math.round(achar_i_dado_p_a_n(220, 50, 5) * 10000) / 100}{" "}
            % a.m.
          </p>
        </Cartao>
      </div>
      <div className="centralizar">
        <Cartao>
          <p className="enunciado">
            8 - A moto custa R$ 4.000. A proposta é de R$ 500 de entrada e o
            restante em 24 prestações mensais, a 5% a.m. De quanto será a
            prestação?
          </p>
          <p>
            <em>
              Cálculo de A, dado P, postecipado, com P descontando o valor da
              entrada
            </em>
          </p>
          <p className="resposta">
            Resposta: {formulario.a_p_postecipado(3500, 24, 0.05)} R$
          </p>
        </Cartao>
      </div>
      <div className="centralizar">
        <Cartao>
          <p className="enunciado">
            9 - Quanto devo depositar hoje para retirar R$ 1.000 por mês durante
            5 anos? A taxa é de 1% a.m. E para retirar indefinidamente?
          </p>
          <p className="resposta">
            Resposta a: Valor presente para sacar 1000 R$ por 60 meses:{" "}
            {acha_p_dado_n_i_saque(60, 0.01, 1000)} R$.
          </p>
          <p className="resposta">
            Resposta b: Para viver de renda, o valor é de{" "}
            {acha_p_dado_i_saque(0.01, 1000)} R$.
          </p>
        </Cartao>
      </div>
      <div className="centralizar">
        <Cartao>
          <p className="enunciado">
            12 - Pretendo, ao final deste mês, iniciar uma série de depósitos
            mensais por 5 anos para criar meu fundo de aposentadoria, numa
            aplicação que rende 1% ao mês. Ao final desses 5 anos, pretendo
            iniciar as retiradas de R$ 1.000,00 por mês por 20 anos. Quanto devo
            depositar mensalmente? E se eu pretender re- tirar R$ 1.000,00
            mensais, indefinidamente, de quanto devem ser os depósitos?
          </p>
          <p className="resposta">
            Resposta a: Para sacar 1000 R$ por 20 anos:{" "}
            <ol>
              <li>
                Capital inicial: {acha_p_dado_n_i_saque(240, 0.01, 1000)} R$.
              </li>
              <li>
                Depósitos: {formulario.a_f_postecipado(90819.42, 60, 0.01)} R$.
              </li>
            </ol>
          </p>
          <p className="resposta">
            Resposta b: Para sacar indefinidamente, descobrir os payments para
            acumular 100.000 R$ em 5 anos. Payments:
            {formulario.a_f_antecipado(100000, 60, 0.01)} R$.
          </p>
        </Cartao>
      </div>
      <div className="centralizar">
        <Cartao>
          <p className="enunciado">
            13 - Estamos em 20 de Abril, em uma loja. O preço de uma mercadoria
            é de R$ 1000, podendo ser pago em 4 vezes, sem acréscimo, todo dia
            20, pelo cartão de crédito da loja, a partir de 20 de Maio. O
            cliente propõe pagar à vista. Que desconto poderia ser dado pela
            loja, se ela trabalha com juros de 8% a.m.? Qual é o valor atual de
            uma série uniforme de R$ 400,00 durante 12 meses, a juros de 2,5% ao
            mês?
          </p>
          <p className="resposta">
            Resposta: Ele poderia propôr pagar{" "}
            {formulario.p_a_postecipado(250, 4, 0.08)} R$
          </p>
        </Cartao>
      </div>
      <div className="centralizar">
        <Cartao>
          <p className="enunciado">14 - Achar o valor nos fluxos de caixa.</p>
          <p className="resposta">
            Resposta: a) {formulario.p_a_antecipado(30, 20, 0.1)} R$
          </p>
          <p className="resposta">
            Resposta: b) {achar_i_dado_p_a_n_pos(500, 100, 7)} %
          </p>
          <p className="resposta">
            Resposta: c){formulario.f_a_antecipado(100, 16, 0.1)} R$
          </p>
          <p className="resposta">
            Resposta: d){formulario.p_a_antecipado(90, 17, 0.08)} R${" "}
          </p>
        </Cartao>
      </div>
    </div>
  );
}
