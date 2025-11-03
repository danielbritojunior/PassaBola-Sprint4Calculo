# ⚽ Projeto "Passa a Bola" - Painel Interativo de Cálculo

[cite_start]Este repositório contém o código-fonte de um painel interativo (dashboard) desenvolvido para o Challenge "Passa a Bola" da disciplina de *Differentiated Problem Solving* (FIAP)[cite: 126].

O objetivo deste painel é demonstrar visualmente como conceitos fundamentais do Cálculo (Funções, Limites, Derivadas e Integrais) podem ser aplicados para analisar fenômenos do futebol feminino, tanto dentro de campo (performance atlética) quanto fora dele (engajamento digital).

---

## ✨ Funcionalidades Principais

O painel é uma página única totalmente interativa:

* **Simulação em Tempo Real:** Altere os valores dos parâmetros (como velocidade inicial, taxa de crescimento, etc.) e veja os gráficos e tabelas sendo atualizados instantaneamente.
* **Visualização Gráfica:** Utiliza **Chart.js** para gerar gráficos dinâmicos que facilitam a compreensão visual dos modelos matemáticos.
* **Tabelas de Dados:** Cada simulação gera automaticamente uma tabela com os principais pontos de dados, assim como no relatório acadêmico.
* **Design Responsivo:** Construído com **TailwindCSS**, o painel se adapta a diferentes tamanhos de tela.

## 📚 Conceitos de Cálculo Aplicados

O painel é dividido em quatro seções principais, cada uma explorando um conceito de cálculo:

1.  **Funções (Crescimento de Seguidores):**
    * **Modelo:** Função Exponencial $f(t) = S_0 \cdot b^t$.
    * **Análise:** Simula como o número de seguidores de uma atleta pode "viralizar" e crescer exponencialmente após um evento de destaque.

2.  **Limites (Saturação de Engajamento):**
    * **Modelo:** Função Logística (modificada) $f(t) = L \cdot (1 - e^{-kt})$.
    * **Análise:** Demonstra como o engajamento de uma postagem cresce rapidamente no início, mas desacelera até atingir um "limite" máximo (a saturação do público).

3.  **Derivadas (Taxas de Variação):**
    * **Cenário 1 (Velocidade):** $v(t) = v_0 + at$. Analisa a velocidade instantânea de uma atleta com base em sua aceleração.
    * **Cenário 2 (Máximos e Mínimos):** $f(t) = at^2 + bt + c$. Encontra o "pico de desempenho" (vértice da parábola) de uma atleta durante um esforço.

4.  **Integrais (Distância Percorrida):**
    * **Modelo:** $D = \int_{t_1}^{t_2} (v_0 + at) dt$.
    * **Análise:** Calcula a distância total percorrida por uma atleta durante uma arrancada, representando visualmente a "área sob a curva" do gráfico de velocidade.

## 🚀 Tecnologias Utilizadas

* **HTML5:** Estrutura semântica do painel.
* **TailwindCSS:** Para estilização rápida e responsiva (utility-first).
* **JavaScript (ES6+):** Lógica principal, manipulação do DOM e todos os cálculos matemáticos.
* **Chart.js:** Para a criação dos gráficos dinâmicos e interativos.

## 🏃‍♂️ Como Executar

Este projeto é uma página estática e não requer instalação.

1.  Clone ou baixe este repositório.
2.  Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, etc.).

Todas as dependências (Tailwind e Chart.js) são carregadas via CDN, então não é necessário nenhum passo de *build* ou instalação de pacotes.

## 👨‍💻 Autores

Este projeto foi desenvolvido por:

* [cite_start]Daniel Brito dos Santos Junior (RM: 566236) [cite: 129]
* [cite_start]Vitor Rampazzi Franco (RM: 562270) [cite: 130]
* [cite_start]Gustavo Palomares Borsato (RM: 564621) [cite: 131]
