# Atividade prática
## Resultados do pipeline:
1. Texto original:</br>
Não gostei... o produto veio com defeito 😡 http://exemplo.com </br>
2. Após limpeza: </br>
Não gostei o produto veio com defeito</br>
3. Após normalização: </br>
nao gostei o produto veio com defeito</br>
4. Pós tokenização: </br>
['nao', 'gostei', 'o', 'produto', 'veio', 'com', 'defeito']
</br>
5. Após remoção dos stopwords:</br>
['nao', 'gostei', 'produto', 'veio', 'defeito']
</br>
6. Após redução morfológica: </br>
['nao', 'gostar', 'produto', 'vir', 'defeito']
</br>

## Questionário:
1. Qual etapa mais alterou o texto?</br>
A etapa de limpeza, tendo em vista que removeu as reticencias, o emoji e o link</br>

2. O texto ficou mais fácil ou mais difícil para um computador?</br>
Mais fácil</br>

3. Por que a palavra “não” foi mantida?</br>
Porque se removermos o não:</br>
- Ele altera o verbo.
- Ele muda a polaridade (positivo ↔ negativo).
- Ele é essencial para análise de sentimento.

4. O que aconteceria se pulássemos a limpeza?</br>
Se não fizermos a limpeza, o que pode acontecer é:</br>
- O vocabulário explode (muitos tokens inúteis).
- O modelo aprende padrões irrelevantes (como partes de URL).
- A performance pode piorar.
- O treinamento fica mais pesado.