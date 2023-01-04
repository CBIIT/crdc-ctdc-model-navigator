import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    addEdge,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import CircularProgress from '@material-ui/core/CircularProgress';
import dagre from 'dagre';
import CanvasView from './CanvasView';
import { newCreateNodesAndEdges } from '../../../GraphUtils/utils';
import { getDistinctCategoryItems, setMatchingNodeTitle } from './util';
import { onPanelViewClick, onViewChange, setReactFlowGraphData } from '../../action';
import { getNodePosition } from './CanvasHelper';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 100;
const nodeHeight = 36;

/**
 * Handles all canvas state
 * 1. nodes
 * 2. edges
 * 3. positioning of nodes with BFS 
 * 4. tracks search mode
 * @param {*} param0 
 * @returns canvas component
 */

const CanvasController = ({
//   flowData,
  ddgraph,
  currentSearchKeyword,
  tabViewWidth,
  dictionary,
  searchResults,
  isSearchMode,
  onClearSearchResult,
  setGraphData,
  nodeTree,
  unfilteredDictionary,
  highlightedNodes,
  graphViewConfig,
  onGraphPanelClick
}) => {

    if (tabViewWidth === 0) {
      return <CircularProgress />;
    }

    /** node
    * 1. position (x, y)
    * 2. title
    * 3. highlight node based on matching search query to desc, properties and title
    */
    const getLayoutedElements = (nodes, edges, nodeInternals, direction = 'TB') => {
        // const isHorizontal = direction === 'LR';
        // dagreGraph.setGraph({ rankdir: direction });
        // nodes.forEach((node) => {
        //     if (nodeInternals && nodeInternals.size > 0) {
        //         const nodeObj = nodeInternals.get(`${node.id}`);
        //         // dagreGraph.setNode(node.id, { width: node, height });
        //     } else {
        //         dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        //     }
        // });
        // edges.forEach((edge) => {
        //     dagreGraph.setEdge(edge.source, edge.target);
        // });
        // dagre.layout(dagreGraph);
        // nodes.forEach((node) => {
        //     // const nodeWithPosition = dagreGraph.node(node.id);
        //     node.targetPosition = isHorizontal ? 'left' : 'top';
        //     node.sourcePosition = isHorizontal ? 'right' : 'bottom';
        //     // We are shifting the dagre node position (anchor=center center) to the top left
        //     // so it matches the React Flow node anchor point (top left).
        //     // node.position = {
        //         // x: nodeWithPosition.x - nodeWidth / 2,
        //         // y: nodeWithPosition.y - nodeHeight / 2,
        //     // };

        //     /**
        //      * set class for matching search query to desc, properties and title
        //      */
        //     return node;
        // });

        /**
         * highlight node based on matching search query to desc, properties and title
         * setMatchingNodeTitle return indexes to highlight node title (string)
         */
        if (isSearchMode) {
          const matchingNodeTitle = setMatchingNodeTitle(searchResults);
          nodes.forEach((node) => {
            if(matchingNodeTitle[node.id]) {
              node.data.matchedNodeNameQuery = currentSearchKeyword;
            }
          });
        }
        /**
         * assign node position
         */
        if (dictionary && nodeTree) {
          const nodePosition = getNodePosition(dictionary, nodeTree, tabViewWidth);
          nodes.forEach((node) => {
            const position = nodePosition[node.id];
            node.position = {
              x: position[0],
              y: position[1]
            }
          });
        }

        return { nodes, edges };
    };

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [categories, setCategories] = useState([]);

    /**
     * initalize category item for Legend
     */
    useEffect(() => {
        const categories = getDistinctCategoryItems(Object.values(unfilteredDictionary));
        setCategories(categories);
    }, []);

    /**
     * update states
     * 1. nodes and edges
     * 2. toggle between on/off for serach mode
     */
    useEffect(() => {
        const flowData = newCreateNodesAndEdges({dictionary}, true, []);
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            flowData.nodes,
            flowData.edges,
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [dictionary, currentSearchKeyword]);

    const onConnect = useCallback(
      (params) =>
        setEdges((eds) =>
          addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
        ),
      []
    );

    if (nodes.length === 0 && edges.length === 0) {
        return <CircularProgress />;
    }

    return (
      <CanvasView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        categories={categories}
        onClearSearchResult={onClearSearchResult}
        highlightedNodes={highlightedNodes}
        graphViewConfig={graphViewConfig}
        onGraphPanelClick={onGraphPanelClick}
      />
    )
}

const mapStateToProps = (state) => ({
    ddgraph: state.ddgraph,
    isSearchMode: state.ddgraph.isSearchMode,
    currentSearchKeyword: state.ddgraph.currentSearchKeyword,
    searchResults: state.ddgraph.searchResult,
    nodeTree : state.submission.node2Level,
    highlightedNodes: state.ddgraph.highlightedNodes,
    unfilteredDictionary: state.submission.unfilteredDictionary,
    graphViewConfig: state.submission.graphViewConfig,
});

const mapDispatchToProps = (dispatch) => ({
  setGraphData: (graphData) => {dispatch(setReactFlowGraphData(graphData))},
  onGraphPanelClick: () => {dispatch(onPanelViewClick())}
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasController);
