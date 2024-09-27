import { Component, inject, OnInit } from '@angular/core';
import { Graph } from '@antv/g6';

import { EnvService } from '@services';

@Component({
  selector: 'app-universe',
  standalone: true,
  imports: [],
  templateUrl: './universe.component.html',
  styleUrl: './universe.component.less'
})
export class UniverseComponent implements OnInit {
  envSrv = inject(EnvService);
  graph: Graph | undefined;

  ngOnInit() {
    const graph = new Graph({
      container: 'universe-container',
      theme: 'dark',
      node: {
        style: {
          size: d => d['size'] as number,
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
      combo: {
        type: 'circle'
      },
      behaviors: ['drag-canvas', 'drag-element'],
      plugins: [{ type: 'background', background: '#000' }]
    });
    graph.setData({
      nodes: this.envSrv.envNodes.map(node => {
        return {
          id: node.id,
          label: node.name,
          size: node.weight * 10,
          type: 'circle',
          combo: node.galaxiesId
        };
      }),
      // edges: this.envSrv.envEdges.map(edge => {
      //   return {
      //     source: edge.source,
      //     target: edge.target
      //   };
      // })
      combos: this.envSrv.galaxiesCombos
    });
    graph.render();
  }

  ngOnDestory() {
    this.graph?.destroy();
  }
}
