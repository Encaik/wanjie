import { Component, inject } from '@angular/core';
import { Graph } from '@antv/g6';
import { EnvService } from '../../services/env.service';

@Component({
  selector: 'app-universe',
  standalone: true,
  imports: [],
  templateUrl: './universe.component.html',
  styleUrl: './universe.component.less'
})
export class UniverseComponent {
  envSrv = inject(EnvService);
  graph: Graph | undefined;

  ngOnInit() {
    const graph = new Graph({
      container: 'universe-container',
      node: {
        style: {
          size: 20,
          labelText: d => d['label'] as string,
          labelBackground: true
        }
      },
      layout: {
        type: 'fruchterman',
        gravity: 5,
        speed: 5,
        animated: true
      },
      behaviors: ['drag-canvas', 'drag-element']
    });
    graph.setData({
      nodes: this.envSrv.envNodes.map(node => {
        return {
          id: node.id,
          label: node.name,
          type: 'circle'
        };
      }),
      edges: this.envSrv.envEdges.map(edge => {
        return {
          source: edge.source,
          target: edge.target
        };
      })
    });
    graph.render();
  }

  ngOnDestory() {
    this.graph?.destroy();
  }
}
