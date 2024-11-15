/* eslint-disable no-undef */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withStyles from '@mui/styles/withStyles';
import ReactFlow, {
  Background,
  ReactFlowProvider,
  useReactFlow,
  useViewport,
} from 'reactflow';
import NodeView from '../Node';
import EdgeView from '../Edge';
import Styles from './CanvasStyle';
import { getMinZoom } from './util';
import LegendView from '../Legend';
import './Canvas.css';
import './assets/style.css';
import ActionLayer from './ActionLayer';
import resetIcon from './assets/graph_icon/Reset.svg';
import ZoomInIcon from './assets/graph_icon/ZoomIn.svg';
import ZoomOutIcon from './assets/graph_icon/ZoomOut.svg';
import OverlayPropertyTable from '../OverlayPropertyTable';
import {
  reactFlowPanelClicked,
  selectCategories,
  selectHighlightedNodes,
  selectOverlayTableHidden,
  selectExpandedNodeID,
  selectGraphViewConfig,
} from '../../../../../features/graph/graphSlice';

const nodeTypes = {
  custom: NodeView,
};

const edgeTypes = {
  custom: EdgeView,
};

const CanvasView = ({
  classes,
  nodes,
  edges,
  onConnect,
  onNodesChange,
  onEdgesChange,
}) => {
  const categories = useSelector( selectCategories );
  return (
    <>
      <div className={classes.mainWindow}>
        <LegendView
          categoryItems={categories}
        />
        <ActionLayer  />
        <ReactFlowProvider>
          <CustomFlowView
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            classes={classes}
          />
        </ReactFlowProvider>
      </div>
    </>
);
}

const CustomFlowView = ({
  classes,
  nodes,
  edges,
  onConnect,
  onNodesChange,
  onEdgesChange,
}) => {

  const dispatch = useDispatch();
  const categories = useSelector( selectCategories );
  const graphViewConfig = useSelector( selectGraphViewConfig );
  const overlayTableHidden = useSelector( selectOverlayTableHidden );
  const expandedNodeID = useSelector( selectExpandedNodeID );
  const highlightedNodes = useSelector( selectHighlightedNodes );
  const { fitView } = useReactFlow();
  const { zoomIn, zoomOut } = useReactFlow();

  const { fit, width } = graphViewConfig.canvas;

  const [minZoom, setMinZoom] = useState(fit?.minZoom);

  function calcGraphBox(nodes) {
    let graphBox = { ulx: 0, uly:0, lrx: 0, lry: 0 };
    nodes.forEach( (n) => {
      graphBox.ulx = graphBox.ulx < n.position.x ? graphBox.ulx : n.position.x;
      graphBox.uly = graphBox.uly > n.position.y ? graphBox.uly : n.position.y;
      graphBox.lrx = graphBox.lrx > n.position.x ? graphBox.lrx : n.position.x;
      graphBox.lry = graphBox.lry < n.position.y ? graphBox.lry : n.position.y;
    });
    graphBox.cx = (graphBox.lrx + graphBox.ulx)/2;
    graphBox.cy = (graphBox.lry + graphBox.uly)/2;
    graphBox.wd = (graphBox.lrx - graphBox.ulx);
    graphBox.ht = (graphBox.uly - graphBox.lry);
    return graphBox;
  }

  useViewport(); // I think this is called just to ensure re-render on viewport change.
  useEffect(() => {
    const zoom = getMinZoom({ width, ...fit });
    setMinZoom(zoom);
    fitView(width);
  }, [fit, width, fitView]);

  const handleTransform = useCallback(() => {
    fitView();
    // fitView(width)
    // const graphBox = calcGraphBox(nodes);
    // const vp = getViewport();
    //setViewport({x: graphBox.cx, y: graphBox.cy, zoom: 1}, {duration: 200});
    // setViewport({x: 0, y: 0, zoom: 1}, {duration: 200});
    // setViewport({ x: fit?.x, y: fit?.y, zoom: getMinZoom({ width, ...fit }) }, { duration: 200 });
  },[fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      minZoom={minZoom}
      maxZoom={fit?.maxZoom ? fit.maxZoom : 3}
      onPaneClick={(e) => dispatch(reactFlowPanelClicked())}
      fitView
      className={classes.reactFlowView}
    >
      <OverlayPropertyTable
        nodeID={expandedNodeID}
        matchedResult={""}
        hidden={overlayTableHidden}
      />
      {/* <MiniMap nodeColor={nodeColor} style={minimapStyle} pannable position='bottom-left' /> */}
      {/* <Controls position='top-left' /> */}
      <div className={classes.controls}>
        <div onClick={handleTransform} title="reset" className={classes.controlBtn}>
          <img src={resetIcon} alt="reset_icon" />
        </div>
        <div title="zoom in" onClick={() => zoomIn({ duration: 200 })} className={classes.controlBtn}>
          <img src={ZoomInIcon} alt="ZoomInIcon" />
        </div>
        <div title="zoom out" onClick={() => zoomOut({ duration: 200 })} className={classes.controlBtn}>
          <img src={ZoomOutIcon} alt="ZoomOutIcon" />
        </div>
      </div>
      <Background
        style={{
          backgroundColor: highlightedNodes
            && !!highlightedNodes.length
            ? '#C5DEEA'
            : '#E7F3F7',
        }}
        color="#aaa"
        gap={12}
      />
    </ReactFlow>
  );
};

export default withStyles(Styles)(CanvasView);
