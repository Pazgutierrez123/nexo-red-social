# Nexo — Red social basada en grafos

Prototipo web (React + Vite) de **Nexo**, una red social para estudiantes universitarios, egresados y profesionales jóvenes, centrada en la mentoría y los círculos de interés. El modelo de datos se diseñó sobre una base de datos de grafos (Neo4j / Cypher).

Proyecto de Herramientas de Diseño 2026 — Hypatia García, Milagros Iglesias, Paz Gutierrez, Tobias Franco.

## Secciones

- **Inicio:** feed interactivo (publicar, reaccionar, comentarios anidados, compartir, guardar), ruta de mentoría sugerida, sugerencias de conexión y eventos.
- **Comunidades:** círculos de interés con cupo limitado.
- **Mentoría:** ruta más corta en el grafo de amistades hasta una empresa objetivo (BFS, equivalente a `shortestPath`).
- **Cómo funciona:** investigación previa, grafos vs. relacional, nodos, relaciones, diagrama del grafo, recomendación, arquitectura y conclusiones.

## Ejecutar

```bash
npm install
npm run dev
```
