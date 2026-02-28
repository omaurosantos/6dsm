import pandas as pd
import os
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

# Caminho do arquivo CSV (pasta dentro do projeto)
caminho_arquivo = os.path.join("data", "dados.csv")

# Lendo o CSV
df = pd.read_csv(caminho_arquivo)

# ==========================
# 1. Frequência
# ==========================
plano_mais_frequente = df["Plano"].mode()[0]
sexo_mais_frequente = df["Sexo"].mode()[0]
satisfacao_mais_comum = df["Satisfacao"].mode()[0]

# ==========================
# 2. Medidas de Tendência Central
# ==========================
media_idade = df["Idade"].mean()
media_peso = df["Peso"].mean()
moda_peso = df["Peso"].mode()[0]
mediana_altura = df["Altura"].median()

# ==========================
# 3. Dispersão
# ==========================
desvio_padrao_peso = df["Peso"].std()
limite_inferior = media_peso - desvio_padrao_peso
limite_superior = media_peso + desvio_padrao_peso

# ==========================
# Monta as linhas do relatório
# ==========================
linhas = [
    "RELATÓRIO - ANÁLISE DO CSV",
    "",
    "1. Frequência",
    f"Plano mais frequente: {plano_mais_frequente}",
    f"Sexo mais frequente: {sexo_mais_frequente}",
    f"Satisfação mais comum: {satisfacao_mais_comum}",
    "",
    "2. Medidas de Tendência Central",
    f"Média da Idade: {media_idade:.2f}",
    f"Média do Peso: {media_peso:.2f}",
    f"Moda do Peso: {moda_peso}",
    f"Mediana da Altura: {mediana_altura}",
    "",
    "3. Dispersão",
    f"Média do Peso: {media_peso:.2f}",
    f"Desvio padrão do Peso: {desvio_padrao_peso:.2f}",
    f"1 desvio padrão abaixo da média: {limite_inferior:.2f}",
    f"1 desvio padrão acima da média: {limite_superior:.2f}",
    "",
    "4. Interpretação dos Resultados",
    "A dispersão dos dados do peso indica o quanto os valores variam em relação à média.",
    "(Paulo, Felipe, Lucas, Nicolas, Henrique).",
]

# ==========================
# Gera o PDF
# ==========================
pasta_saida = "output"
os.makedirs(pasta_saida, exist_ok=True)
caminho_pdf = os.path.join(pasta_saida, "relatorio.pdf")

c = canvas.Canvas(caminho_pdf, pagesize=A4)
largura, altura = A4

# Configurações de texto
x = 50
y = altura - 50
linha_altura = 16

c.setFont("Helvetica", 12)

for texto in linhas:
    # Se chegar no fim da página, cria nova página
    if y < 50:
        c.showPage()
        c.setFont("Helvetica", 12)
        y = altura - 50

    # Título em negrito (opcional)
    if texto == "RELATÓRIO - ANÁLISE DO CSV":
        c.setFont("Helvetica-Bold", 14)
        c.drawString(x, y, texto)
        c.setFont("Helvetica", 12)
    else:
        c.drawString(x, y, texto)

    y -= linha_altura

c.save()

print(f"✅ PDF gerado em: {caminho_pdf}")