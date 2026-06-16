'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, UploadCloud, Activity, Layout, GitMerge, Download, ShieldAlert, Zap, Database, Save, ChevronRight } from 'lucide-react';

const sections = [
  { id: 'intro', label: 'O que é o DataQ?' },
  { id: 'upload', label: 'Upload & Armazenamento' },
  { id: 'diagnostics', label: 'Motor de Diagnóstico' },
  { id: 'pipeline', label: 'Pipeline Visual (ETL)' },
  { id: 'transforms', label: 'Transformações Disponíveis' },
  { id: 'merge', label: 'Mesclagem de Datasets' },
  { id: 'history', label: 'Histórico & Receitas' },
  { id: 'export', label: 'Exportação' },
];

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{
    background: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.2)',
    padding: '0.15rem 0.45rem',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    color: 'var(--primary)'
  }}>{children}</code>
);

const Tag = ({ children, color = 'var(--primary)' }: { children: React.ReactNode, color?: string }) => (
  <span style={{
    background: `color-mix(in srgb, ${color} 15%, transparent)`,
    border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
    color,
    padding: '0.2rem 0.6rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
  }}>{children}</span>
);

const Heading2 = ({ icon, children, color = 'var(--primary)' }: { icon: React.ReactNode, children: React.ReactNode, color?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
    <div style={{ padding: '0.6rem', borderRadius: '10px', background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}>{icon}</div>
    <h2 className="font-serif" style={{ fontSize: '1.9rem', fontWeight: 700, margin: 0 }}>{children}</h2>
  </div>
);

const InfoBox = ({ title, children, color = 'var(--primary)' }: { title?: string, children: React.ReactNode, color?: string }) => (
  <div className="glass" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${color}`, marginBottom: '1.25rem' }}>
    {title && <h5 style={{ margin: '0 0 0.4rem 0', fontWeight: 600, color }}>{title}</h5>}
    <div style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>{children}</div>
  </div>
);

const ParamRow = ({ name, type, desc }: { name: string, type: string, desc: string }) => (
  <div style={{ display: 'flex', gap: '1rem', padding: '0.85rem 0', borderBottom: '1px solid var(--surface-border)', alignItems: 'flex-start' }}>
    <Code>{name}</Code>
    <span style={{ fontSize: '0.75rem', color: 'var(--warning)', fontFamily: 'monospace', marginTop: '2px', whiteSpace: 'nowrap' as const }}>{type}</span>
    <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>{desc}</p>
  </div>
);

export default function LearnWikiPage() {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 110, behavior: 'smooth' });
  };

  return (
    <div className="container" style={{ display: 'flex', gap: '3rem', padding: '2.5rem 0 10rem', maxWidth: '1200px', alignItems: 'flex-start' }}>

      {/* Sidebar */}
      <aside className="glass" style={{ width: '260px', position: 'sticky', top: '90px', padding: '1.5rem', borderRadius: 'var(--radius-lg)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
          <BookOpen size={18} style={{ color: 'var(--primary)' }} />
          <span className="font-serif" style={{ fontWeight: 700, fontSize: '1.05rem' }}>DataQ Docs</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{
              textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.875rem',
              fontWeight: activeSection === s.id ? 600 : 400,
              color: activeSection === s.id ? 'var(--primary)' : '#94a3b8',
              background: activeSection === s.id ? 'rgba(99,102,241,0.12)' : 'transparent',
              transition: 'all 0.18s',
            }}>{s.label}</button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, minWidth: 0 }}>

        {/* INTRO */}
        <section id="intro" style={{ marginBottom: '5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <Tag>Visão Geral</Tag>
            <h1 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0.75rem 0 1rem', lineHeight: 1.2 }}>O que é o DataQ?</h1>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.75 }}>
              DataQ é uma ferramenta de diagnóstico e limpeza de dados que roda direto no navegador — sem backend, sem servidor, sem instalação. 
              Você carrega um CSV, o sistema analisa, você corrige o que precisar e exporta o arquivo limpo. Ponto.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.75, marginTop: '0.75rem' }}>
              A ideia veio de uma dor real: você recebe uma planilha, ela está cheia de nulos, texto onde deveria ter número, duplicatas. 
              Antes de conseguir usar esses dados em qualquer análise, passa horas ajustando manualmente. O DataQ automatiza boa parte desse processo sem exigir que você saiba programar.
            </p>
          </div>

          <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--success)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <ShieldAlert size={20} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontWeight: 700, margin: '0 0 0.4rem', color: 'var(--success)' }}>Seus dados não saem do computador</h4>
                <p style={{ fontSize: '0.92rem', color: '#94a3b8', margin: 0, lineHeight: 1.65 }}>
                  Tudo é processado localmente via IndexedDB e APIs nativas do browser. O DataQ não tem servidor. Não há nenhum endereço para onde seus dados sejam enviados — nem mesmo para telemetria.
                </p>
              </div>
            </div>
          </div>

          <InfoBox title="Quando usar o DataQ?">
            Quando você tem arquivos CSV ou Excel com problemas conhecidos (nulos, duplicatas, formatação inconsistente) e quer resolver isso antes de importar em outra ferramenta, banco de dados ou análise. Não é um substituto para Python/R em pipelines complexos de produção, mas serve muito bem para limpezas rápidas e recorrentes.
          </InfoBox>
        </section>

        {/* UPLOAD */}
        <section id="upload" style={{ marginBottom: '5rem', scrollMarginTop: '110px' }}>
          <Heading2 icon={<UploadCloud size={22} />}>Upload & Armazenamento</Heading2>

          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            O primeiro passo é sempre trazer seu arquivo para dentro do sistema. A tela de Upload aceita dois formatos e tem uma barra de progresso que mostra em tempo real o parsing do arquivo.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--foreground)' }}>Formatos suportados</h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' as const }}>
            <InfoBox title=".csv — Comma-Separated Values">
              O padrão mais comum. O parser detecta automaticamente o delimitador (vírgula, ponto e vírgula, tab). 
              Arquivos gerados por bancos de dados, ERPs e ferramentas de BI geralmente estão nesse formato.
            </InfoBox>
            <InfoBox title=".xlsx / .xls — Excel">
              Lê a primeira aba (sheet) do arquivo. Células mescladas são achatadas. Formatações visuais (cores, bordas) são ignoradas — só o conteúdo importa.
            </InfoBox>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--foreground)' }}>O que acontece depois do upload?</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1rem' }}>
            O arquivo é convertido para JSON e salvo no IndexedDB do seu navegador com um ID único (UUID). A partir daí ele aparece na sua lista de datasets em "Seus Datasets" e você pode abrir, analisar ou transformar quando quiser — mesmo sem reenviar o arquivo.
          </p>

          <InfoBox title="Boas práticas ao enviar" color="var(--warning)">
            Dê um nome descritivo ao arquivo antes de enviar. Depois que está no sistema, o nome é o único identificador visual. 
            <strong> Evite espaços e caracteres especiais</strong> no nome do arquivo (ex: prefira <Code>vendas_2024.csv</Code> ao invés de <Code>Vendas (2024) final FINAL.csv</Code>).
          </InfoBox>
        </section>

        {/* DIAGNOSTICS */}
        <section id="diagnostics" style={{ marginBottom: '5rem', scrollMarginTop: '110px' }}>
          <Heading2 icon={<Activity size={22} />} color="var(--success)">Motor de Diagnóstico</Heading2>

          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Quando você abre um dataset, o DataQ roda um scan automático em todas as colunas. O resultado aparece na tela do Analisador com um painel lateral de métricas e um score geral de 0 a 100.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--foreground)' }}>Score de Qualidade</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1rem' }}>
            O score é um número único que resume a saúde do dataset. Ele começa em 100 e perde pontos baseado em três fatores:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.75rem', marginBottom: '2rem' }}>
            <ParamRow name="Nulos" type="penalidade alta" desc="Células vazias numa coluna que deveria ter dados. Uma coluna com 40% de nulos indica problema sério na fonte dos dados ou na exportação." />
            <ParamRow name="Duplicatas" type="penalidade média" desc="Linhas idênticas em todo o dataset. Geralmente causa dupla contagem em análises." />
            <ParamRow name="Tipagem Mista" type="penalidade variável" desc="Colunas que misturam texto e número (ex: '42', 'N/A', '37.5'). Inviabiliza qualquer cálculo matemático direto." />
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--foreground)' }}>Estatísticas por coluna</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1rem' }}>
            Para cada coluna, o sistema calcula métricas diferentes dependendo do tipo:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const }}>
            <ParamRow name="Colunas numéricas" type="number" desc="Mínimo, máximo, média (mean) e desvio padrão. O desvio padrão alto indica outliers ou grande variação nos dados." />
            <ParamRow name="Colunas de texto" type="string" desc="Cardinalidade (quantos valores únicos existem) e moda (valor mais frequente). Cardinalidade 1 significa que todos os valores são iguais — provavelmente a coluna é constante." />
            <ParamRow name="% de nulos" type="all" desc="Percentual de células vazias na coluna. Aparece em vermelho quando passa de 10%." />
          </div>

          <InfoBox title="O botão 'Corrigir no Pipeline'" color="var(--warning)">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Zap size={14} style={{ color: 'var(--warning)', flexShrink: 0 }} />
              <strong>Botões verdes na tela de análise</strong>
            </div>
            Quando o diagnóstico detecta um problema em uma coluna específica, ele oferece um botão verde "Corrigir no Pipeline". 
            Clicar nele cria automaticamente o bloco de transformação adequado no Pipeline — você não precisa configurar nada manualmente.
          </InfoBox>
        </section>

        {/* PIPELINE */}
        <section id="pipeline" style={{ marginBottom: '3rem', scrollMarginTop: '110px' }}>
          <Heading2 icon={<Layout size={22} />} color="#8b5cf6">Pipeline Visual (ETL)</Heading2>

          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            O Pipeline é onde as transformações acontecem de fato. Funciona como uma lista ordenada de passos — cada passo modifica o dataset e passa o resultado para o próximo. 
            Você pode reordenar os blocos arrastando, deletar, ou adicionar novos a qualquer momento.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '2rem' }}>
            A execução é não-destrutiva: o arquivo original salvo no IndexedDB nunca é alterado. 
            O Pipeline gera uma cópia transformada apenas quando você clica em "Executar" ou exportar.
          </p>

          <InfoBox title="Como o Pipeline funciona por dentro" color="#8b5cf6">
            Cada bloco de transformação recebe o array de linhas do passo anterior, aplica a operação configurada e retorna um novo array. 
            O custo de performance é O(n) por bloco — para arquivos abaixo de 100k linhas, a execução é instantânea na maioria dos navegadores modernos.
          </InfoBox>
        </section>

        {/* TRANSFORMS */}
        <section id="transforms" style={{ marginBottom: '5rem', scrollMarginTop: '110px' }}>
          <h3 className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Transformações disponíveis</h3>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
            {[
              {
                name: 'Drop Nulls',
                param: 'coluna: string',
                desc: 'Remove todas as linhas onde a coluna especificada está vazia, null ou undefined. Use quando o dado nulo não tem como ser imputado e a linha sem ele é inútil.',
                use: 'Eliminar registros sem ID, sem data ou sem valor de medição.',
              },
              {
                name: 'Fill Nulls',
                param: 'coluna: string, valor: any',
                desc: 'Preenche os espaços vazios de uma coluna com um valor fixo. Não remove linhas — só preenche o campo vazio.',
                use: 'Preencher "Desconhecido" em colunas de categoria, ou "0" em colunas numéricas onde nulo significa ausência de ocorrência.',
              },
              {
                name: 'Drop Duplicates',
                param: 'colunas?: string[]',
                desc: 'Mantém só a primeira ocorrência de linhas repetidas. Se você não especificar colunas, compara a linha inteira. Se especificar, a duplicata é detectada apenas naquelas colunas.',
                use: 'Remover registros gerados duas vezes por falha no sistema de origem.',
              },
              {
                name: 'Uppercase / Lowercase',
                param: 'coluna: string, modo: "upper" | "lower"',
                desc: 'Padroniza o case de texto em uma coluna. Indispensável antes de qualquer Join ou agrupamento — "São Paulo", "SÃO PAULO" e "são paulo" são strings diferentes para o computador.',
                use: 'Padronizar nomes de cidades, estados, categorias ou qualquer campo que venha de entrada manual.',
              },
              {
                name: 'Trim',
                param: 'coluna: string',
                desc: 'Remove espaços em branco no começo e no fim de cada valor da coluna. Não altera o conteúdo do meio da string.',
                use: 'Corrigir copiar-e-colar descuidado ou exportações de sistemas legados que preenchem campos com espaços.',
              },
              {
                name: 'Rename Column',
                param: 'coluna: string, novo_nome: string',
                desc: 'Renomeia uma coluna sem alterar seus valores. Útil quando o header original vem com nome técnico ou em outro idioma.',
                use: 'Padronizar nomes antes de um Merge com outro dataset.',
              },
              {
                name: 'Filter Rows',
                param: 'coluna: string, operador: string, valor: any',
                desc: 'Filtra linhas com base em uma condição. Operadores disponíveis: igual, diferente, maior que, menor que, contém (para texto).',
                use: 'Manter só registros de um período específico, de uma categoria, ou excluir outliers extremos.',
              },
            ].map(t => (
              <div key={t.name} className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #8b5cf6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' as const }}>
                  <h4 style={{ fontWeight: 700, margin: 0, fontSize: '1rem' }}>{t.name}</h4>
                  <Code>{t.param}</Code>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '0 0 0.6rem', lineHeight: 1.6 }}>{t.desc}</p>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  <strong style={{ color: '#94a3b8' }}>Quando usar:</strong> {t.use}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* MERGE */}
        <section id="merge" style={{ marginBottom: '5rem', scrollMarginTop: '110px' }}>
          <Heading2 icon={<GitMerge size={22} />} color="#ec4899">Mesclagem de Datasets</Heading2>

          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            A tela de Merge combina dois datasets usando uma coluna em comum — o equivalente a um JOIN do SQL. 
            É útil quando suas informações estão divididas em arquivos separados e precisam ser consolidadas.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--foreground)' }}>Configuração</h3>
          <div style={{ display: 'flex', flexDirection: 'column' as const }}>
            <ParamRow name="Dataset Principal" type="obrigatório" desc="O dataset 'base' da operação. As linhas deste dataset definem o que aparece no resultado." />
            <ParamRow name="Dataset Secundário" type="obrigatório" desc="O dataset de onde vêm as colunas extras. Pode ter mais linhas que o principal — as que não encontrarem par são descartadas (no Inner Join) ou ficam nulas (no Left Join)." />
            <ParamRow name="Chave de Merge (Merge Key)" type="string" desc="O nome da coluna que deve existir nos dois datasets com valores correspondentes. Ex: 'cpf', 'id_produto', 'codigo_municipio'. Os valores precisam ser idênticos (case-sensitive)." />
            <ParamRow name="Tipo de Join" type='"left" | "inner"' desc="Left Join: preserva todas as linhas do dataset principal, mesmo que não haja correspondência. Inner Join: mantém somente as linhas que têm correspondência nos dois lados." />
          </div>

          <InfoBox title="Prepare as colunas antes de mesclar" color="#ec4899">
            Se a chave de merge for texto, certifique-se de que os dois datasets usam o mesmo formato. 
            Um dataset com <Code>SP</Code> e outro com <Code>São Paulo</Code> não vão casar. Use o Pipeline com Uppercase e Trim em ambos antes de mesclar.
          </InfoBox>
        </section>

        {/* HISTORY */}
        <section id="history" style={{ marginBottom: '5rem', scrollMarginTop: '110px' }}>
          <Heading2 icon={<Save size={22} />} color="var(--warning)">Histórico & Receitas</Heading2>

          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Todo dataset que você sobe fica salvo no Histórico. Você pode abrir qualquer um a qualquer momento sem precisar reenviar o arquivo — desde que não tenha limpado o cache do navegador.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--foreground)' }}>Receitas (Recipes)</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            Uma Receita é um Pipeline salvo desvinculado de um dataset específico. Quando você exporta uma receita e depois aplica ela num novo arquivo, 
            todos os passos de transformação rodam automaticamente — sem você precisar reconfigurar bloco por bloco.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            O caso de uso principal é o processamento recorrente: você recebe a planilha de vendas toda semana no mesmo formato. 
            Cria a receita uma vez, salva, e nas semanas seguintes aplica em segundos.
          </p>

          <InfoBox title="Receitas são arquivos JSON" color="var(--warning)">
            Internamente, uma Receita é um array JSON descrevendo cada bloco de transformação na ordem correta. 
            Você pode abri-la em qualquer editor de texto para conferir ou editar manualmente se precisar de algo que a UI ainda não oferece.
          </InfoBox>
        </section>

        {/* EXPORT */}
        <section id="export" style={{ scrollMarginTop: '110px' }}>
          <Heading2 icon={<Download size={22} />}>Exportação</Heading2>

          <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Depois de limpar e transformar o dataset no Pipeline, você pode exportar o resultado. O download é gerado localmente — o navegador monta o arquivo na memória e dispara o download diretamente para a sua pasta de Downloads.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' as const }}>
            <ParamRow name="CSV (UTF-8)" type="padrão" desc="Exporta com vírgula como delimitador e BOM UTF-8 no início, garantindo que caracteres especiais (ç, ã, é) apareçam corretamente ao abrir no Excel." />
            <ParamRow name="XLSX" type="disponível" desc="Exporta uma planilha Excel formatada, com a primeira linha contendo os headers em negrito." />
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' as const }}>
            <a href="/upload" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2.5rem', fontSize: '1rem', borderRadius: 'var(--radius-full)' }}>
              Começar agora <ChevronRight size={18} />
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
