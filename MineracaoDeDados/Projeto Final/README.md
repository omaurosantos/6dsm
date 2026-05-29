# Projeto Final - Mineração de Dados

Entrega organizada em duas partes:

- `parte1/`: regras de associação com a base `BaseStreamingNominalApenasTrue.arff`.
- `parte2/`: pré-processamento, regressão, classificação e agrupamento com a base `Housing.csv`.

O relatório final está na raiz:

- `ProjetoFinal - Relatório.pdf`

## Como executar

Parte 1:

```bash
python parte1/analise_regras_streaming.py
```

Parte 2:

```bash
python parte2/analise_housing_parte2.py
```

## Dependências

Os scripts usam Python 3 e as bibliotecas:

- `numpy`
- `pandas`
- `Pillow`
- `python-docx`

O script da Parte 2 implementa os algoritmos necessários diretamente em Python/Numpy, sem depender de `scikit-learn`.
