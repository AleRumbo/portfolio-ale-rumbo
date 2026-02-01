import { Component } from '@angular/core';

type Project = {
  title: string;
  subtitle: string;
  problem: string[];
  solution: string[];
  tech: string[];
  impact: string[];
  // links opcionales si tenés demos/repos (aunque sean privados podés omitir)
  links?: { label: string; url: string }[];
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentYear = new Date().getFullYear();

  // Cambiá esto por tus datos
  profile = {
    name: 'Alexis L Rumbo',
    role: 'Full-Stack Developer (+3 años) — Angular + .NET + SQL Server',
    role2: 'Full-Stack Developer',
    location: 'Argentina',
    availability: 'Part-time Freelance',
    experience: '+3 años de experiencia',
    headline:
      'Desarrollo y mantenimiento de aplicaciones web: módulos nuevos, fixes, APIs, optimización SQL y tableros con filtros/paginación.',
    contact: {
      email: 'lrumboo@correo.com',
      linkedin: 'https://www.linkedin.com/in/alexis-l-rumbo/'
    },
  };

  services: string[] = [
    'Mantenimiento y mejoras en apps existentes (Angular / .NET).',
    'Front-end Angular: tablas avanzadas, filtros, paginación real, formularios reactivos y UX.',
    'APIs REST en C# .NET: endpoints, DTOs, validaciones, auth.',
    'SQL Server: stored procedures, corrección de datos, performance e índices.',
    'Integraciones con APIs internas/externas + trazabilidad (logs).',
  ];

  stack: { group: string; items: string[] }[] = [
    { group: 'Front', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'SCSS/CSS', 'Bootstrap', 'Workflows'] },
    { group: 'Back', items: ['C# .NET / .NET Core', 'APIs REST', 'Arquitectura por capas'] },
    { group: 'Base de datos', items: ['SQL Server', 'Stored Procedures', 'Jobs/Triggers'] },
    { group: 'Extras', items: ['GitHub', 'Debugging', 'Refactors', 'Soporte evolutivo', 'Inteligencia Artificial', 'Chat GPT'] },
  ];

  projects: Project[] = [
    {
      title: 'Plataforma web empresarial (módulos + mantenimiento)',
      subtitle: 'Angular + .NET + SQL Server · Proyecto confidencial (anonimizado)',
      problem: [
        'La aplicación necesitaba mejoras continuas y corrección de bugs en múltiples módulos.',
        'Se requería mantener consistencia UI/UX y evitar regresiones al iterar rápido.',
      ],
      solution: [
        'Implementación de mejoras en componentes Angular (formularios reactivos, modales, validaciones).',
        'Ajustes de servicios y endpoints .NET para soportar nuevos flujos y reglas.',
        'Refactors puntuales para mejorar mantenibilidad sin “romper” lo existente.',
      ],
      tech: ['Angular', 'TypeScript', 'C# .NET', 'SQL Server', 'GitHub'],
      impact: [
        'Entrega iterativa con foco en estabilidad.',
        'Menos errores en producción y mejoras visibles para el usuario final.',
      ],
    },
    {
      title: 'Stored Procedures + Jobs para cálculo/automatización',
      subtitle: 'SQL Server · ejecución por lotes y control de logs',
      problem: [
        'Procesos automáticos que dependen de datos variables (edge cases) y pueden fallar en ejecución.',
        'Necesidad de trazabilidad: identificar por qué falla un cálculo y en qué paso.',
      ],
      solution: [
        'Revisión y endurecimiento de SPs (manejo de nulos, conversiones, validaciones y orden lógico).',
        'Mejoras en SQL dinámico cuando corresponde (con cuidado de tipos y formato).',
        'Soporte a ejecución por lotes mediante Jobs y registro de avances/errores.',
      ],
      tech: ['SQL Server', 'Stored Procedures', 'SQL Agent Jobs', 'T-SQL'],
      impact: [
        'Ejecuciones más confiables ante datos distintos entre activos.',
        'Más visibilidad para debug (logs/steps), menos “se rompió y no sé por qué”.',
      ],
    },
    {
      title: 'Integración GIS / ArcGIS (mapa + operaciones)',
      subtitle: 'Front-end GIS · edición/visualización y operaciones geométricas (confidencial)',
      problem: [
        'Necesidad de visualizar y trabajar con geometrías (líneas/polígonos) desde una app web.',
        'Flujos con edición/segmentación y herramientas de mapa.',
      ],
      solution: [
        'Integración de mapa en Angular con componentes y overlays.',
        'Operaciones geométricas (según el flujo: segmentación, buffers, etc.).',
      ],
      tech: ['Angular', 'TypeScript', 'GIS/ArcGIS JS API (conceptual)'],
      impact: [
        'Flujo GIS dentro de la app sin depender de herramientas externas.',
      ],
    },
  ];

  // Smooth scroll a secciones
  goTo(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    const scroller = this.getScrollContainer(target);

    const headerEl = document.querySelector('.header') as HTMLElement | null;
    const headerOffset = (headerEl?.getBoundingClientRect().height ?? 0) + 12;

    const targetTop = this.getElementTopRelativeToScroller(target, scroller) - headerOffset;

    this.animateScroll(scroller, targetTop, 2000);
  }


  private getScrollContainer(el: HTMLElement): HTMLElement {
    // Si la página scrollea normal, este suele ser html (documentElement)
    // Si tenés un wrapper con overflow:auto, lo detecta y lo usa.
    let parent: HTMLElement | null = el.parentElement;

    while (parent) {
      const style = getComputedStyle(parent);
      const canScroll = /(auto|scroll)/.test(style.overflowY) && parent.scrollHeight > parent.clientHeight;
      if (canScroll) return parent;
      parent = parent.parentElement;
    }

    // fallback al scroller estándar del documento
    return (document.scrollingElement as HTMLElement) || document.documentElement;
  }

  private getElementTopRelativeToScroller(el: HTMLElement, scroller: HTMLElement): number {
    const elRect = el.getBoundingClientRect();

    // Caso “scroll normal del documento”
    if (scroller === document.documentElement || scroller === document.body) {
      return elRect.top + window.scrollY;
    }

    // Caso “contenedor con overflow”
    const scrollerRect = scroller.getBoundingClientRect();
    return (elRect.top - scrollerRect.top) + scroller.scrollTop;
  }


  private animateScroll(scroller: HTMLElement, targetTop: number, durationMs: number) {
    // 👇 Evita conflicto si tenés scroll-behavior: smooth en CSS
    const prevScrollBehavior = scroller.style.scrollBehavior;
    scroller.style.scrollBehavior = 'auto';

    const startTop = this.getScrollTop(scroller);
    const delta = targetTop - startTop;
    const startTime = performance.now();

    // easing MUY suave
    const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const next = startTop + delta * ease(t);
      this.setScrollTop(scroller, next);

      if (t < 1) requestAnimationFrame(step);
      else scroller.style.scrollBehavior = prevScrollBehavior;
    };

    requestAnimationFrame(step);
  }


  private getScrollTop(scroller: HTMLElement): number {
    return scroller === document.documentElement || scroller === document.body
      ? window.scrollY
      : scroller.scrollTop;
  }

  private setScrollTop(scroller: HTMLElement, value: number) {
    if (scroller === document.documentElement || scroller === document.body) {
      window.scrollTo({ top: value });
    } else {
      scroller.scrollTop = value;
    }
  }

}
