'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, UploadCloud, Activity, Layout, GitMerge, Download, ShieldAlert, Code, Terminal, Database, ArrowRight } from 'lucide-react';

export default function LearnWikiPage() {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'upload', 'diagnostics', 'pipeline', 'merge', 'export'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const navItemStyle = (id: string) => ({
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: activeSection === id ? 600 : 400,
    color: activeSection === id ? 'var(--primary)' : 'var(--foreground)',
    background: activeSection === id ? 'rgba(99,102,241,0.1)' : 'transparent',
    transition: 'all 0.2s ease',
    marginBottom: '0.25rem'
  });

  return (
    <div className="container" style={{ display: 'flex', gap: '3rem', padding: '2rem 0', maxWidth: '1200px', alignItems: 'flex-start' }}>
      
      {/* Sidebar Navigation */}
      <aside className="glass" style={{ width: '280px', position: 'sticky', top: '100px', padding: '1.5rem', borderRadius: 'var(--radius-lg)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
          <BookOpen className="text-primary" />
          <h3 className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>DataQ Wiki</h3>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={navItemStyle('intro')} onClick={() => scrollTo('intro')}>Visão Geral</div>
          <div style={navItemStyle('upload')} onClick={() => scrollTo('upload')}>1. Upload & Armazenamento</div>
          <div style={navItemStyle('diagnostics')} onClick={() => scrollTo('diagnostics')}>2. Motor de Diagnóstico</div>
          <div style={navItemStyle('pipeline')} onClick={() => scrollTo('pipeline')}>3. Pipeline Visual (ETL)</div>
          <div style={navItemStyle('merge')} onClick={() => scrollTo('merge')}>4. Mesclagem (Merge)</div>
          <div style={navItemStyle('export')} onClick={() => scrollTo('export')}>5. Exportação</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, paddingBottom: '10rem' }}>
        
        {/* Intro */}
        <section id="intro" style={{ marginBottom: '5rem', paddingTop: '1rem' }}>
          <h1 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>DataQ Documentation</h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem' }}>
            O DataQ é uma plataforma revolucionária de diagnóstico e transformação de datasets (ETL) que roda inteiramente no lado do cliente. 
            Sem servidores, sem uploads demorados e sem risco de vazamento de dados. Tudo é processado localmente na memória do seu navegador através de IndexedDB.
          </p>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--success)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--success)' }}>
              <ShieldAlert size={20} />
              <h4 style={{ fontWeight: 600, margin: 0 }}>Privacidade Zero-Backend</h4>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', margin: 0 }}>
              Seus dados nunca são enviados para um servidor externo. Arquivos pesados CSV e Excel são lidos via APIs nativas do navegador e armazenados em seu banco de dados local.
            </p>
          </div>
        </section>

        {/* Upload */}
        <section id="upload" style={{ marginBottom: '5rem', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <UploadCloud size={28} className="text-primary" />
            <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>1. Upload & Armazenamento</h2>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            A interface de upload suporta a importação de planilhas estruturadas. O motor de extração converte instantaneamente o formato binário para instâncias JSON mapeadas.
          </p>
          <ul style={{ color: '#94a3b8', lineHeight: 1.7, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Arquivos Suportados:</strong> <code style={{ background: 'var(--surface-sunken)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>.csv</code>, <code style={{ background: 'var(--surface-sunken)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>.xlsx</code>, <code style={{ background: 'var(--surface-sunken)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>.xls</code>.</li>
            <li><strong>Indexação:</strong> Cada arquivo recebe um UUID único e é versionado no Histórico de Datasets.</li>
          </ul>
        </section>

        {/* Diagnostics */}
        <section id="diagnostics" style={{ marginBottom: '5rem', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Activity size={28} style={{ color: 'var(--success)' }} />
            <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>2. Motor de Diagnóstico</h2>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Após o upload, o Analyzer varre cada coluna da sua tabela buscando por anomalias estatísticas, tipos de dados inconsistentes e degradação de informações.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--foreground)', marginBottom: '0.5rem', fontWeight: 600 }}>Score de Qualidade (0-100)</h4>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>Um algoritmo ponderado que penaliza valores nulos, duplicatas inteiras e colunas com mais de 30% de tipagem mista (ex: texto no meio de uma coluna de números).</p>
            </div>
            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--foreground)', marginBottom: '0.5rem', fontWeight: 600 }}>Estatísticas Individuais</h4>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>Para cada coluna numéricas, calculamos a Média (Mean) e Desvio Padrão. Para textos, analisamos a Moda (Modo) e Cardinalidade.</p>
            </div>
          </div>
        </section>

        {/* Pipeline */}
        <section id="pipeline" style={{ marginBottom: '5rem', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Layout size={28} style={{ color: '#8b5cf6' }} />
            <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>3. Pipeline Visual (ETL)</h2>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem' }}>
            O coração do DataQ. Em vez de escrever scripts Python ou SQL, você empilha "Blocos de Transformação" que alteram o dataset original em cascata (Pipeline).
          </p>
          
          <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Blocos de Transformação Disponíveis:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid #8b5cf6' }}>
              <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Drop Nulls</h5>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Exclui completamente qualquer linha (registro) que possua um valor em branco na coluna selecionada.</p>
            </div>
            <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid #8b5cf6' }}>
              <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Fill Nulls</h5>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Preenche os espaços vazios de uma coluna com um valor padrão estático (ex: "0" ou "Desconhecido").</p>
            </div>
            <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid #8b5cf6' }}>
              <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Drop Duplicates</h5>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Mantém apenas a primeira ocorrência de linhas repetidas. Pode ser aplicado para a tabela inteira ou baseado em colunas específicas.</p>
            </div>
            <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid #8b5cf6' }}>
              <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Uppercase / Lowercase</h5>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Padronização de caixa de texto (todas maiúsculas ou todas minúsculas), vital para cruzar dados futuramente.</p>
            </div>
            <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid #8b5cf6' }}>
              <h5 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Trim</h5>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Remove espaços acidentais no começo e no fim das strings. Extremamente comum em extrações sujas de sistemas legados.</p>
            </div>
            
          </div>
        </section>

        {/* Merge */}
        <section id="merge" style={{ marginBottom: '5rem', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <GitMerge size={28} style={{ color: '#ec4899' }} />
            <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>4. Mesclagem (Merge)</h2>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Combine múltiplos datasets de diferentes origens utilizando chaves em comum (Primary Keys / Foreign Keys), imitando os famosos Joins do SQL.
          </p>
          <ul style={{ color: '#94a3b8', lineHeight: 1.7, paddingLeft: '1.5rem' }}>
            <li><strong>Left Join:</strong> Mantém todas as linhas do dataset primário, trazendo colunas correspondentes do secundário.</li>
            <li><strong>Inner Join:</strong> Mantém apenas as linhas onde a chave existe obrigatoriamente em ambos os datasets.</li>
            <li><strong>Merge Key:</strong> A coluna que deve ter nomes ou valores idênticos (ex: <code style={{ background: 'var(--surface-sunken)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>id_cliente</code>) para realizar o "match".</li>
          </ul>
        </section>

        {/* Export */}
        <section id="export" style={{ marginBottom: '5rem', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Download size={28} className="text-primary" />
            <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>5. Exportação de Receitas</h2>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Após criar um pipeline robusto, seu dataset limpo pode ser exportado para o formato original. 
            Você também pode salvar o Pipeline como uma <strong>Receita (Recipe)</strong>, que automatiza exatamente os mesmos passos para os arquivos do próximo mês.
          </p>
        </section>

      </main>
    </div>
  );
}
