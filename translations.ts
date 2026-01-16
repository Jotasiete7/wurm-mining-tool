export type Language = 'en' | 'pt' | 'ru';

export const translations = {
  en: {
    title: "Mining Optimizer",
    subtitle: "Tactical decision engine for Wurm Online miners.",
    inputSection: "Operational Inputs",
    skill: "Mining Skill",
    skillHelp: "Raw skill level (1-100)",
    tool: "Pickaxe QL",
    toolHelp: "Quality Level of your tool",
    toggles: {
      math: "Show Math",
      guide: "Reference Guide",
      lab: "Verification Lab"
    },
    howItWorks: {
      title: "Protocol",
      text: "Balances Skill + Tool QL against Ore Difficulty. High delta = speed but low skill. Low delta = high failure."
    },
    results: {
      title: "Analysis Results",
      basedOn: "Based on Skill",
      potential: "Action Potential",
      topRec: "Primary Recommendation",
      allOres: "Ore Viability Ledger",
      sorted: "Sorted by Efficiency"
    },
    card: {
      diff: "Diff",
      range: "Range",
      idealTool: "Ideal Tool",
      rec: "Strategy",
      upgrade: "Upgrade Tool",
      downgrade: "Downgrade Tool",
      keep: "Keep Tool",
      math: {
        action: "Action Level",
        offset: "Offset",
        score: "Delta Score"
      }
    },
    status: {
      optimal: "Optimal",
      viable: "Viable",
      inefficientHard: "Inefficient (Hard)",
      inefficientEasy: "Inefficient (Easy)"
    },
    lab: {
      title: "Verification Lab",
      step1: "Step 1: Difficulty",
      step3: "Step 3: Tool QL",
      result: "Result"
    },
    guide: {
      title: "Progression Milestones",
      colRange: "Skill Range",
      colOre: "Target Ore",
      colStart: "Start QL",
      colEnd: "End QL",
      colStrat: "Strategy",
      stratHigh: "Need High QL",
      stratIrrelevant: "Tool Irrelevant",
      stratDown: "Downgrade"
    }
  },
  pt: {
    title: "Otimizador de Mineração",
    subtitle: "Motor de decisão tática para mineradores de Wurm Online.",
    inputSection: "Dados Operacionais",
    skill: "Skill de Mineração",
    skillHelp: "Nível bruto da habilidade (1-100)",
    tool: "QL da Picareta",
    toolHelp: "Nível de qualidade da ferramenta",
    toggles: {
      math: "Mostrar Cálculos",
      guide: "Guia de Referência",
      lab: "Lab de Verificação"
    },
    howItWorks: {
      title: "Protocolo",
      text: "Equilibra Skill + Ferramenta vs Dificuldade. Delta alto = velocidade mas pouco skill. Delta baixo = falhas."
    },
    results: {
      title: "Resultados da Análise",
      basedOn: "Baseado em Skill",
      potential: "Potencial de Ação",
      topRec: "Recomendação Primária",
      allOres: "Registro de Viabilidade",
      sorted: "Ordenado por Eficiência"
    },
    card: {
      diff: "Dif",
      range: "Faixa",
      idealTool: "Ferramenta Ideal",
      rec: "Estratégia",
      upgrade: "Melhorar QL",
      downgrade: "Reduzir QL",
      keep: "Manter QL",
      math: {
        action: "Nível de Ação",
        offset: "Offset",
        score: "Pontuação Delta"
      }
    },
    status: {
      optimal: "Ótimo",
      viable: "Viável",
      inefficientHard: "Ineficiente (Difícil)",
      inefficientEasy: "Ineficiente (Fácil)"
    },
    lab: {
      title: "Laboratório de Verificação",
      step1: "Passo 1: Dificuldade",
      step3: "Passo 3: QL da Ferramenta",
      result: "Resultado"
    },
    guide: {
      title: "Marcos de Progressão",
      colRange: "Faixa de Skill",
      colOre: "Minério Alvo",
      colStart: "QL Inicial",
      colEnd: "QL Final",
      colStrat: "Estratégia",
      stratHigh: "Precisa de QL Alto",
      stratIrrelevant: "QL Irrelevante",
      stratDown: "Reduzir QL"
    }
  },
  ru: {
    title: "Оптимизатор Майнинга",
    subtitle: "Тактический движок для шахтеров Wurm Online.",
    inputSection: "Входные Данные",
    skill: "Навык Майнинга",
    skillHelp: "Уровень навыка (1-100)",
    tool: "Качество Кирки (QL)",
    toolHelp: "Качество вашего инструмента",
    toggles: {
      math: "Математика",
      guide: "Справочник",
      lab: "Лаборатория"
    },
    howItWorks: {
      title: "Протокол",
      text: "Баланс Навыка + Инструмента против Сложности Руды. Высокая дельта = скорость, но мало опыта."
    },
    results: {
      title: "Результаты Анализа",
      basedOn: "На основе навыка",
      potential: "Потенциал Действия",
      topRec: "Главная Рекомендация",
      allOres: "Реестр Руд",
      sorted: "Сортировка по эффективности"
    },
    card: {
      diff: "Слож.",
      range: "Диапазон",
      idealTool: "Идеал. Инструмент",
      rec: "Стратегия",
      upgrade: "Улучшить QL",
      downgrade: "Понизить QL",
      keep: "Оставить QL",
      math: {
        action: "Уровень Действия",
        offset: "Смещение",
        score: "Дельта"
      }
    },
    status: {
      optimal: "Оптимально",
      viable: "Допустимо",
      inefficientHard: "Неэффективно (Сложно)",
      inefficientEasy: "Неэффективно (Легко)"
    },
    lab: {
      title: "Лаборатория Проверки",
      step1: "Шаг 1: Сложность",
      step3: "Шаг 3: QL Инструмента",
      result: "Результат"
    },
    guide: {
      title: "Этапы Прогресса",
      colRange: "Диапазон Навыка",
      colOre: "Целевая Руда",
      colStart: "Старт QL",
      colEnd: "Кон. QL",
      colStrat: "Стратегия",
      stratHigh: "Нужен высокий QL",
      stratIrrelevant: "QL не важен",
      stratDown: "Понизить QL"
    }
  }
};