import React, { Component, Fragment } from 'react';
import './style.scss';

let Home = () => {
    return (
        <div className="home-content">
            <TextContentSummary />
        </div>
    )
}


let TextContentSummary = () => {
    return (


        <div className="text-content">
            <h1>WELCOME TO</h1>
            <h2>MY CHANNEL</h2>

            <article>
                <p>I'm Summer.</p>
                {/* <p>A desiner in ShenZhen.</p>
                <p>I like to do some interesting</p>
                <p>designs in my free time</p>
                <p>Oh I also like photography and</p>
                <p>diving.</p> */}
            </article>
        </div>
    )
}


class Chartz extends React.Component {
    componentDidMount() {
        let _this = this;
        var diagGraph = { //diag图数据操作
            state: [],
            edg: [],
            statePoint: '',
            g: '',
            init: function (statePoint, state, edg) {
                this.statePoint = statePoint
                this.state = state
                this.edg = edg
                this.createG();
                this.renderG();
            },
            createG: function () {
                _this.g = new dagreD3.graphlib.Graph()
                    .setGraph({})
                    .setDefaultEdgeLabel(function () { return {}; });
            },
            drawNode: function () {
                for (let i in this.state) { //画点
                    let el = this.state[i]
                    let style = ''
                    if (el.id === this.statePoint) {
                        if (el.class === 'type-suss') {
                            style = "stroke: #35b34a; stroke-width: 1px;"
                        } else if (el.class === 'type-fail') {
                            style = "stroke:#f15533; stroke-width: 1px;"
                        } else if (el.class === 'type-normal') {
                            style = "stroke:#a5e0ee; stroke-width: 1px;"
                        } else if (el.class === 'type-init') {
                            style = "stroke:#a5e0ee; stroke-width: 1px;"
                        } else if (el.class === 'type-ready') {
                            style = "stroke:#a5e0ee; stroke-width: 1px;"
                        } else if (el.class === 'type-queue') {
                            style = "stroke:#a5e0ee; stroke-width: 1px;"
                        } else if (el.class === 'type-run') {
                            style = "stroke:#a5e0ee; stroke-width: 1px;"
                        } else if (el.class === 'type-freeze') {
                            style = "stroke:grey; stroke-width: 1px;"
                        }
                    }
                    _this.g.setNode(el.id, {
                        id: el.id,
                        label: el.label,
                        class: el.class,
                        style: style,
                    });
                }
                _this.g.nodes().forEach((v) => { //画圆角
                    var node = _this.g.node(v);
                    // Round the corners of the nodes
                    node.rx = node.ry = 5;
                });
            },
            drawEdg: function () {
                for (let i in this.edg) { // 画连线
                    let el = this.edg[i]
                    // debugger;
                    if (el.start === this.statePoint || el.end === this.statePoint) {
                        _this.g.setEdge(el.start, el.end, {
                            style: "stroke: #0fb2cc; fill: none;",
                            arrowheadStyle: "fill: #0fb2cc;stroke: #0fb2cc;",
                            arrowhead: 'vee',
                            label: el.option.label || '',
                            curve: d3.curveBasis
                        });
                    } else {
                        _this.g.setEdge(el.start, el.end, {
                            arrowhead: 'vee',
                            label: el.option.label || '',
                            curve: d3.curveBasis

                        });
                    }
                }
            },
            renderG: function () {
                var render = new dagreD3.render();
                var svg = d3.select("#svgCanvas");
                svg.select("g").remove(); //删除以前的节点
                var svgGroup = svg.append("g");
                var inner = svg.select("g");

                var zoom = d3.zoom().on("zoom", function () { //放大
                    console.log(d3.event.transform);
                    inner.attr("transform", d3.event.transform);
                });
                svg.call(zoom);

                this.drawNode();
                this.drawEdg();
                render(d3.select("svg g"), _this.g); //渲染节点

                var max = svg._groups[0][0].clientWidth > svg._groups[0][0].clientHeight ? svg._groups[0][0].clientWidth : svg._groups[0][0].clientHeight;
                // debugger;
                var initialScale = max / svg._groups[0][0].clientWidth * .95;
                var tWidth = (svg._groups[0][0].clientWidth - _this.g.graph().width * initialScale) / 2;
                var tHeight = (svg._groups[0][0].clientHeight - _this.g.graph().height * initialScale) / 2;
                // inner.attr("transform", {
                //     k: 1.1428737762195416,
                //     x: -621.687156044924,
                //     y: 150.5439248696435
                // })
                svg.call(zoom.transform, d3.zoomIdentity.translate(tWidth, tHeight).scale(initialScale)); //元素居中
                this.dragThing();
            },
            reDraw: function () {
                var render = new dagreD3.render();
                var svg = d3.select("#svgCanvas");
                var inner = svg.select("g");
                let T_state = inner.attr('transform');


                svg.select("g").remove(); //删除以前的节点
                var svgGroup = svg.append("g");
                var inner = svg.select("g");

                var zoom = d3.zoom().on("zoom", function () { //放大
                    console.log(d3.event.transform);
                    inner.attr("transform", d3.event.transform);
                });
                svg.call(zoom);

                this.drawNode();
                this.drawEdg();
                render(d3.select("svg g"), _this.g); //渲染节点

                var max = svg._groups[0][0].clientWidth > svg._groups[0][0].clientHeight ? svg._groups[0][0].clientWidth : svg._groups[0][0].clientHeight;
                // debugger;
                var initialScale = max / svg._groups[0][0].clientWidth * .95;
                var tWidth = (svg._groups[0][0].clientWidth - _this.g.graph().width * initialScale) / 2;
                var tHeight = (svg._groups[0][0].clientHeight - _this.g.graph().height * initialScale) / 2;

                svg.call(zoom.transform, d3.zoomIdentity.translate(tWidth, tHeight).scale(initialScale));

                inner.attr("transform", T_state);
                this.dragThing();
            },
            changePoint: function (point) {
                this.statePoint = point * 1.0
                this.reDraw()
            },

            dragThing: function () {

                var svg = d3.select("#svgCanvas");


                svg.selectAll("g.node rect")
                    .attr("id", function (d) {
                        return "node" + d;
                    });
                svg.selectAll("g.edgePath path")
                    .attr("id", function (e) {
                        return 'edge' + (e.v + "-" + e.w);
                    })
                _this.g.nodes().forEach(function (v) {
                    var node = _this.g.node(v);
                    node.customId = "node" + v;
                })
                _this.g.edges().forEach(function (e) {
                    var edge = _this.g.edge(e.v, e.w);
                    edge.customId = e.v + "-" + e.w
                });
                var drag = d3.drag()
                    .subject(function (d) { return d; })
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
                // .call();


                svg.selectAll("g.node").call(drag);
                // svg.selectAll("g.edgePath").call(drag);

                function dragstarted(d) {
                    d3.event.sourceEvent.stopPropagation();
                    d3.select(this).classed("dragging", true);
                }

                function dragged(d) {
                    var node = d3.select(this),
                        selectedNode = _this.g.node(d);
                    var prevX = selectedNode.x,
                        prevY = selectedNode.y;

                    selectedNode.x += d3.event.dx;
                    selectedNode.y += d3.event.dy;
                    node.attr('transform', 'translate(' + selectedNode.x + ',' + selectedNode.y + ')');

                    var dx = selectedNode.x - prevX,
                        dy = selectedNode.y - prevY;

                    // _this.g.edges().forEach(function (e) {
                    //     if (e.v == d || e.w == d) {
                    //         let edge = _this.g.edge(e.v, e.w);
                    //         translateEdge(_this.g.edge(e.v, e.w), dx, dy);
                    //         d3.select('#' + edge.customId).attr('d', calcPoints(e));
                    //         label = $('#label_' + edge.customId);
                    //         var xforms = label.attr('transform');
                    //         if (xforms != "") {
                    //             var parts = /translate\(\s*([^\s,)]+)[ ,]?([^\s,)]+)?/.exec(xforms);
                    //             var X = parseInt(parts[1]) + dx, Y = parseInt(parts[2]) + dy;
                    //             console.log(X, Y);
                    //             if (isNaN(Y)) {
                    //                 Y = dy;
                    //             }
                    //             label.attr('transform', 'translate(' + X + ',' + Y + ')');
                    //         }
                    //     }
                    // })
                    _this.g.edges().forEach(function (e) {
                        if (e.v == d || e.w == d) {
                            let edge = _this.g.edge(e.v, e.w);
                            translateEdge(_this.g.edge(e.v, e.w), dx, dy);
                            d3.select('#' + 'edge' + edge.customId).attr('d', calcPoints(e));
                        }
                    })
                    function translateEdge(e, dx, dy) {
                        e.points.forEach(function (p) {
                            p.x = p.x + dx;
                            p.y = p.y + dy;
                        });
                    }

                    function calcPoints(e) {
                        var edge = _this.g.edge(e.v, e.w),
                            tail = _this.g.node(e.v),
                            head = _this.g.node(e.w);
                        var points = edge.points.slice(1, edge.points.length - 1);
                        var afterslice = edge.points.slice(1, edge.points.length - 1)
                        points.unshift(intersectRect(tail, points[0]));
                        points.push(intersectRect(head, points[points.length - 1]));
                        return d3.line()
                            .x(function (d) {
                                return d.x;
                            })
                            .y(function (d) {
                                return d.y;
                            }).curve(d3.curveBasis)(points);
                        //     .interpolate("basis")
                        // (points);
                    }

                    function intersectRect(node, point) {
                        var x = node.x;
                        var y = node.y;
                        var dx = point.x - x;
                        var dy = point.y - y;
                        var w = d3.select("#" + node.customId).attr('width') / 2;
                        var h = d3.select("#" + node.customId).attr('height') / 2;
                        var sx = 0,
                            sy = 0;
                        if (Math.abs(dy) * w > Math.abs(dx) * h) {
                            // Intersection is top or bottom of rect.
                            if (dy < 0) {
                                h = -h;
                            }
                            sx = dy === 0 ? 0 : h * dx / dy;
                            sy = h;
                        } else {
                            // Intersection is left or right of rect.
                            if (dx < 0) {
                                w = -w;
                            }
                            sx = w;
                            sy = dx === 0 ? 0 : w * dy / dx;
                        }
                        return {
                            x: x + sx,
                            y: y + sy
                        };
                    }
                    // d3.select(this)
                    //     .attr("cx", d.x = d3.event.x)
                    //     .attr("cy", d.y = d3.event.y);
                }

                function dragended(d) {
                    d3.select(this).classed("dragging", false);
                }
            }


        }

        var state = [
            { id: 0, label: '深业集团有限公司', class: 'type-suss' },
            { id: 1, label: '深业(集团)有限公司', class: 'type-suss' },
            { id: 2, label: '深业控股有限公司', class: 'type-suss' },


            //middle
            { id: 5, label: '深业置地有限公司', class: 'type-suss' },
            { id: 18, label: '深圳市龙岗区青年公寓经营管理有限公司', class: 'type-suss' },
            { id: 19, label: '深圳市科之谷投资有限公司', class: 'type-suss' },
            { id: 20, label: '喀什市深业地产有限公司', class: 'type-suss' },
            { id: 21, label: '巢湖深业诚毅地产有限公司', class: 'type-suss' },
            { id: 22, label: '深业地产（香港）有限公司', class: 'type-suss' },
            { id: 23, label: '苏州新发展投资有限公司', class: 'type-suss' },
            { id: 24, label: '深业商业管理有限公司', class: 'type-suss' },
            { id: 25, label: '深业置地（深圳）物业管理有限公司', class: 'type-suss' },
            { id: 26, label: '深圳市新通房地产开发有限公司', class: 'type-suss' },
            { id: 27, label: '深国际前海置业（深圳）有限公司', class: 'type-suss' },
            { id: 28, label: '上海深惠实业有限公司', class: 'type-suss' },
            { id: 29, label: '深圳国际消费电子展示交易中心有限公司', class: 'type-suss' },

            { id: 30, label: '深业置地投资发展（深圳有限公司）', class: 'type-suss' },
            { id: 31, label: '深圳深业酒店管理有限公司', class: 'type-suss' },
            { id: 32, label: '苏州国际会议展览中心有限公司', class: 'type-suss' },
            { id: 33, label: '深业商业管理（深圳）有限公司）', class: 'type-suss' },


            //left

            { id: 6, label: 'city capital', class: 'type-suss' },
            { id: 7, label: '港丰行（中国）发展有限公司', class: 'type-suss' },

            { id: 8, label: '深圳硅谷投资有限公司', class: 'type-suss' },
            { id: 9, label: '深圳市深业科技开发有限公司', class: 'type-suss' },

            //right

            { id: 3, label: '深业控股(深圳)有限公司', class: 'type-suss' },
            { id: 4, label: '深业泰富物流集团股份有限公司', class: 'type-suss' },
            { id: 10, label: '深圳市深业家之福家具建材有限公司', class: 'type-suss' },
            { id: 11, label: '深圳市深业车城有限公司', class: 'type-suss' },
            { id: 12, label: '深圳市深业泰富商业物业管理有限公司', class: 'type-suss' },
            { id: 13, label: '沈阳五爱深港窖货总站有限公司', class: 'type-suss' },

            { id: 14, label: '中国深业（集团）地产投资有限公司', class: 'type-suss' },
            { id: 15, label: '深圳市深业泰富广场商业有限公司', class: 'type-suss' },

            { id: 16, label: '成都深业西域实业有限公司', class: 'type-suss' },
            { id: 17, label: '成都御景商业经营管理有限公司', class: 'type-suss' },
        ]
        var edg = [
            { start: 0, end: 1, option: { label: '100%' } },
            { start: 1, end: 2, option: {} },

            { start: 2, end: 3, option: {} },
            { start: 2, end: 6, option: {} },
            { start: 2, end: 8, option: {} },
            // { start: 2, end: 8, option: {} },

            //right
            { start: 3, end: 5, option: {} },
            { start: 13, end: 3, option: {} },
            { start: 13, end: 5, option: {} },

            { start: 3, end: 4, option: {} },
            { start: 4, end: 10, option: {} },
            { start: 4, end: 11, option: {} },
            { start: 4, end: 12, option: {} },
            { start: 4, end: 13, option: {} },
            { start: 4, end: 14, option: {} },
            { start: 4, end: 15, option: {} },
            { start: 14, end: 16, option: {} },
            { start: 16, end: 17, option: {} },

            //left
            { start: 6, end: 7, option: {} },
            { start: 8, end: 9, option: {} },
            { start: 9, end: 19, option: {} },

            { start: 7, end: 5, option: {} },
            { start: 7, end: 13, option: {} },
            { start: 9, end: 5, option: {} },
            { start: 9, end: 13, option: {} },



            //middle
            { start: 5, end: 18, option: {} },
            { start: 5, end: 19, option: {} },
            { start: 5, end: 20, option: {} },
            { start: 5, end: 21, option: {} },
            { start: 5, end: 22, option: {} },
            { start: 5, end: 23, option: {} },
            { start: 5, end: 24, option: {} },
            { start: 5, end: 25, option: {} },
            { start: 5, end: 26, option: {} },
            { start: 5, end: 27, option: {} },
            { start: 5, end: 28, option: {} },
            { start: 5, end: 29, option: {} },



            { start: 19, end: 30, option: {} },
            { start: 21, end: 31, option: {} },
            { start: 23, end: 32, option: {} },
            { start: 24, end: 33, option: {} },

        ]
        var statePoint = 1; // 当前选中的点
        diagGraph.init(statePoint, state, edg); //创建关系图
        var svgCanvas = document.getElementById('svgCanvas'); //绑定事件鼠标点击
        svgCanvas.addEventListener('click', function (e) {
            e.preventDefault();
            if (e.target.tagName === 'rect') {
                diagGraph.changePoint(e.target.parentNode.id);
            }
        })
        var myMenu = document.getElementById("myMenu"); //鼠标右键
        svgCanvas.addEventListener("contextmenu", (event) => { //鼠标右击事件
            event.preventDefault();
            if (event.target.tagName === 'rect') {
                myMenu.style.top = event.clientY + "px";
                myMenu.style.left = event.clientX + "px";
                myMenu.style.display = 'block'
                // this.myMenuShow = true
            }
        });
        document.addEventListener("click", (event) => {
            myMenu.style.display = 'none'
        });





    }

    render() {
        return (
            <article>
                <svg id="svgCanvas" style={{ width: '100%', height: '100%' }}></svg>
                <ul id="myMenu">
                    <li>xx</li>
                    <li>xx</li>
                </ul>

            </article>
        )
    }
}


class Gojs extends React.Component {

    goJSInitor() {
        let myDiagram;
        init();
        function init() {
            if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
            var $ = go.GraphObject.make;  // for conciseness in defining templates

            // Must name or refer to the DIV HTML element
            myDiagram =
                $(go.Diagram, "myDiagramDiv",
                    { // automatically scale the diagram to fit the viewport's size
                        initialAutoScale: go.Diagram.Uniform,
                        // disable user copying of parts
                        allowCopy: false,
                        // position all of the nodes and route all of the links
                        layout:
                            $(go.LayeredDigraphLayout,
                                {
                                    direction: 90,
                                    layerSpacing: 10,
                                    columnSpacing: 15,
                                    setsPortSpots: false
                                })
                    });
            function highlightLink(link, show) {
                link.isHighlighted = show;
                link.fromNode.isHighlighted = show;
                link.toNode.isHighlighted = show;
            }
            // replace the default Node template in the nodeTemplateMap



            myDiagram.nodeTemplate =

                // $(go.Node, "Auto",
                //     new go.Binding("location", "loc", go.Point.parse),
                //     $(go.Shape, "RoundedRectangle", { fill: "lightgray" }),
                //     $(go.TextBlock,
                //         { margin: 5 },
                //         new go.Binding("text", "label")),
                //     {
                //         selectionAdornmentTemplate:
                //             $(go.Adornment, "Auto",
                //                 $(go.Shape, "RoundedRectangle",
                //                     { fill: null, stroke: "dodgerblue", strokeWidth: 8 }),
                //                 $(go.Placeholder)
                //             )  // end Adornment
                //     }
                // );

                $(go.Node, "Auto",
                    new go.Binding("location", "loc", go.Point.parse),

                    $(go.Shape, "RoundedRectangle", { fill: "lightgray" }),
                    $(go.TextBlock,  // the text label
                        {
                            name: "TEXTBLOCK",
                            margin: 15,
                            font: "bold 15px sans-serif",

                        },
                        new go.Binding("text", 'label')),
                    {
                        selectionAdorned: false,
                        locationSpot: go.Spot.Center,  // Node.location is the center of the Shape
                        locationObjectName: "SHAPE",
                        mouseEnter: function (e, node) {
                            node.diagram.clearHighlighteds();
                            node.linksConnected.each(function (l) { highlightLink(l, true); });
                            node.isHighlighted = true;
                            var tb = node.findObject("TEXTBLOCK");
                            if (tb !== null) tb.stroke = 'blue';
                        },
                        mouseLeave: function (e, node) {
                            node.diagram.clearHighlighteds();
                            var tb = node.findObject("TEXTBLOCK");
                            if (tb !== null) tb.stroke = "black";
                        }
                    }, // the whole node panel


                    // $(go.Picture,  // the icon showing the logo
                    //     // You should set the desiredSize (or width and height)
                    //     // whenever you know what size the Picture should be.
                    //     { desiredSize: new go.Size(75, 50) },
                    //     new go.Binding("source", "key", convertKeyImage))
                );


            // myDiagram.commandHandler.selectAll();


            // replace the default Link template in the linkTemplateMap
            myDiagram.linkTemplate =
                $(go.Link,  // the whole link panel
                    go.Link.Orthogonal,
                    $(go.Shape,
                        new go.Binding("stroke", "isHighlighted",
                            function (h, shape) { return h ? 'blue' : 'black'; })
                            .ofObject(),

                        new go.Binding("strokeWidth", "isHighlighted",
                            function (h) { return h ? 3 : 1; })
                            .ofObject(),
                    ),
                    $(go.Shape,
                        { toArrow: "Standard" },
                        new go.Binding("stroke", "isHighlighted",
                            function (h, shape) { return h ? 'blue' : 'black'; })
                            .ofObject(),
                        new go.Binding("fill", "isHighlighted",
                            function (h, shape) { return h ? 'blue' : 'black'; })
                            .ofObject(),
                        // new go.Binding("toArrow", "isHighlighted",
                        //     function (h) { return h ? 'Standard' : 'figure'; })
                        // .ofObject()
                    ),
                    $(go.Panel, "Auto",
                        $(go.Shape,  // the label background, which becomes transparent around the edges
                            {
                                fill: $(go.Brush, "Radial",
                                    { 0: "rgb(218, 228, 228)", 0.7: "rgb(218, 228, 228)", 1: "rgba(218, 228, 228, 0)" }),
                                stroke: null
                            }),
                        $(go.TextBlock, "transition",  // the label text
                            {
                                textAlign: "center",
                                font: "9pt helvetica, arial, sans-serif",
                                margin: 4,
                                editable: true,  // enable in-place editing

                            },
                            // editing the text automatically updates the model data
                            new go.Binding("stroke", "isHighlighted",
                                function (h, shape) { return h ? 'blue' : 'black'; })
                                .ofObject(),
                            new go.Binding("font", "isHighlighted",
                                function (h, shape) { return h ? '12pt helvetica, arial, sans-serif' : '9pt helvetica, arial, sans-serif'; })
                                .ofObject(),

                            new go.Binding("text").makeTwoWay())
                    ),


                    {
                        toShortLength: 2,
                        selectionAdornmentTemplate:
                            $(go.Adornment,
                                $(go.Shape,
                                    { isPanelMain: true, stroke: "dodgerblue", strokeWidth: 8 }),
                                $(go.Shape,
                                    { toArrow: "Standard", fill: "dodgerblue", stroke: null, scale: 2.5 })
                            ),// end Adornment
                        routing: go.Link.AvoidsNodes,
                        curve: go.Link.JumpOver,
                        // routing: go.Link.Normal,
                        // // curve: go.Link.JumpOver,
                        // curve: go.Link.Bezier,
                        // curviness: 30,
                        selectionAdorned: false,
                        relinkableFrom: true,
                        relinkableTo: true,
                        mouseEnter: function (e, link) { highlightLink(link, true); },
                        mouseLeave: function (e, link) { highlightLink(link, false); }
                    },

                    // {


                    // },
                    // new go.Binding("stroke", "isHighlighted",
                    //     function(h, shape) { return h ? 'red' : shape.part.data.color; })
                    // .ofObject(),
                    // $(go.Shape, { strokeWidth: 1.5 }),
                    // $(go.Shape, { toArrow: "Standard", stroke: null }),

                );

            // the array of link data objects: the relationships between the nodes
            let nodeDataArray = [
                { key: 0, label: '深业集团有限公司' },
                { key: 1, label: '深业(集团)有限公司' },
                { key: 2, label: '深业控股有限公司' },


                //middle
                { key: 5, label: '深业置地有限公司' },
                { key: 18, label: '深圳市龙岗区青年公寓经营管理有限公司' },
                { key: 19, label: '深圳市科之谷投资有限公司' },
                { key: 20, label: '喀什市深业地产有限公司' },
                { key: 21, label: '巢湖深业诚毅地产有限公司' },
                { key: 22, label: '深业地产（香港）有限公司' },
                { key: 23, label: '苏州新发展投资有限公司' },
                { key: 24, label: '深业商业管理有限公司' },
                { key: 25, label: '深业置地（深圳）物业管理有限公司' },
                { key: 26, label: '深圳市新通房地产开发有限公司' },
                { key: 27, label: '深国际前海置业（深圳）有限公司' },
                { key: 28, label: '上海深惠实业有限公司' },
                { key: 29, label: '深圳国际消费电子展示交易中心有限公司' },

                { key: 30, label: '深业置地投资发展（深圳有限公司）' },
                { key: 31, label: '深圳深业酒店管理有限公司' },
                { key: 32, label: '苏州国际会议展览中心有限公司' },
                { key: 33, label: '深业商业管理（深圳）有限公司）' },


                //left

                { key: 6, label: 'city capital' },
                { key: 7, label: '港丰行（中国）发展有限公司' },

                { key: 8, label: '深圳硅谷投资有限公司' },
                { key: 9, label: '深圳市深业科技开发有限公司' },

                //right

                { key: 3, label: '深业控股(深圳)有限公司' },
                { key: 4, label: '深业泰富物流集团股份有限公司' },
                { key: 10, label: '深圳市深业家之福家具建材有限公司' },
                { key: 11, label: '深圳市深业车城有限公司' },
                { key: 12, label: '深圳市深业泰富商业物业管理有限公司' },
                { key: 13, label: '沈阳五爱深港窖货总站有限公司' },

                { key: 14, label: '中国深业（集团）地产投资有限公司' },
                { key: 15, label: '深圳市深业泰富广场商业有限公司' },

                { key: 16, label: '成都深业西域实业有限公司' },
                { key: 17, label: '成都御景商业经营管理有限公司' },

            ]


            var linkDataArray = [
                { text: '50%', from: 0, to: 1 },
                { text: '50%', from: 1, to: 2 },

                { text: '50%', from: 2, to: 3 },
                { text: '50%', from: 2, to: 6 },
                { text: '50%', from: 2, to: 8 },
                // { text: '50%', from: 2, to: 8 },

                //right
                { text: '50%', from: 3, to: 5 },
                { text: '50%', from: 13, to: 3 },
                { text: '50%', from: 13, to: 5 },

                { text: '50%', from: 3, to: 4 },
                { text: '50%', from: 4, to: 10 },
                { text: '50%', from: 4, to: 11 },
                { text: '50%', from: 4, to: 12 },
                { text: '50%', from: 4, to: 13 },
                { text: '50%', from: 4, to: 14 },
                { text: '50%', from: 4, to: 15 },
                { text: '50%', from: 14, to: 16 },
                { text: '50%', from: 16, to: 17 },

                //left
                { text: '50%', from: 6, to: 7 },
                { text: '50%', from: 8, to: 9 },
                { text: '50%', from: 9, to: 19 },

                { text: '50%', from: 7, to: 5 },
                { text: '50%', from: 7, to: 13 },
                { text: '50%', from: 9, to: 5 },
                { text: '50%', from: 9, to: 13 },



                //middle
                { text: '50%', from: 5, to: 18 },
                { text: '50%', from: 5, to: 19 },
                { text: '50%', from: 5, to: 20 },
                { text: '50%', from: 5, to: 21 },
                { text: '50%', from: 5, to: 22 },
                { text: '50%', from: 5, to: 23 },
                { text: '50%', from: 5, to: 24 },
                { text: '50%', from: 5, to: 25 },
                { text: '50%', from: 5, to: 26 },
                { text: '50%', from: 5, to: 27 },
                { text: '50%', from: 5, to: 28 },
                { text: '50%', from: 5, to: 29 },



                { text: '50%', from: 19, to: 30 },
                { text: '50%', from: 21, to: 31 },
                { text: '50%', from: 23, to: 32 },
                { text: '50%', from: 24, to: 33 },

                // { from: "CAR", to: "ARI" },
                // { from: "ARI", to: "CIN" },
                // { from: "ARI", to: "GB" },
                // { from: "DEN", to: "GB" },
                // { from: "DEN", to: "CIN" },
                // { from: "DEN", to: "NE" },
                // { from: "GB", to: "WAS" },
                // { from: "WAS", to: "STL" },
                // { from: "CIN", to: "STL" },
                // { from: "STL", to: "SEA" },
                // { from: "SEA", to: "SF" },
                // { from: "SEA", to: "MIN" },
                // { from: "NE", to: "NYG" },
                // { from: "NE", to: "KC" },
                // { from: "MIN", to: "DET" },
                // { from: "MIN", to: "KC" },
                // { from: "KC", to: "HOU" },
                // { from: "KC", to: "BUF" },
                // { from: "KC", to: "BAL" },
                // { from: "KC", to: "OAK" },
                // { from: "BUF", to: "NYJ" },
                // { from: "BAL", to: "PIT" },
                // { from: "DET", to: "NO" },
                // { from: "DET", to: "PHI" },
                // { from: "DET", to: "CHI" },
                // { from: "HOU", to: "JAC" },
                // { from: "HOU", to: "TEN" },
                // { from: "PIT", to: "IND" },
                // { from: "PIT", to: "SD" },
                // { from: "OAK", to: "NYJ" },
                // { from: "OAK", to: "SD" },
                // { from: "NO", to: "ATL" },
                // { from: "NO", to: "NYG" },
                // { from: "PHI", to: "NYG" },
                // { from: "CHI", to: "TB" },
                // { from: "NYJ", to: "IND" },
                // { from: "NYJ", to: "CLE" },
                // { from: "IND", to: "TB" },
                // { from: "TB", to: "ATL" },
                // { from: "SD", to: "CLE" },
                // { from: "ATL", to: "DAL" },
                // { from: "ATL", to: "JAC" },
                // { from: "CLE", to: "TEN" },
                // { from: "DAL", to: "MIA" },
                // { from: "MIA", to: "TEN" }
            ];

            // create the model and assign it to the Diagram
            myDiagram.model =
                new go.GraphLinksModel(nodeDataArray, linkDataArray);
        }

        function convertKeyImage(key = 'NE') {
            // if (!key) key = "NE";
            // debugger;
            key = "NE"
            return "https://www.nwoods.com/go/beatpaths/" + key + "_logo-75x50.png";
        }
        // Update the HTML elements for editing the properties of the currently selected node, if any
        //   function updateProperties(data) {
        //     if (data === null) {
        //       document.getElementById("propertiesPanel").style.display = "none";
        //       document.getElementById("name").value = "";
        //       document.getElementById("title").value = "";
        //       document.getElementById("comments").value = "";
        //     } else {
        //       document.getElementById("propertiesPanel").style.display = "block";
        //       document.getElementById("name").value = data.name || "";
        //       document.getElementById("title").value = data.title || "";
        //       document.getElementById("comments").value = data.comments || "";
        //     }
        //   }


        // in the model data, each node is represented by a JavaScript object:
        // myModel.nodeDataArray = [
        //     { key: '0', name: '深业集团有限公司', class: 'type-suss' },
        //     { key: '1', name: '深业(集团)有限公司', class: 'type-suss' },
        //     { key: '2', name: '深业控股有限公司', class: 'type-suss' },


        //     //middle
        //     { key: '5', name: '深业置地有限公司', class: 'type-suss' },
        //     { key: '18', name: '深圳市龙岗区青年公寓经营管理有限公司', class: 'type-suss' },
        //     { key: '19', name: '深圳市科之谷投资有限公司', class: 'type-suss' },
        //     { key: '20', name: '喀什市深业地产有限公司', class: 'type-suss' },
        //     { key: '21', name: '巢湖深业诚毅地产有限公司', class: 'type-suss' },
        //     { key: '22', name: '深业地产（香港）有限公司', class: 'type-suss' },
        //     { key: '23', name: '苏州新发展投资有限公司', class: 'type-suss' },
        //     { key: '24', name: '深业商业管理有限公司', class: 'type-suss' },
        //     { key: '25', name: '深业置地（深圳）物业管理有限公司', class: 'type-suss' },
        //     { key: '26', name: '深圳市新通房地产开发有限公司', class: 'type-suss' },
        //     { key: '27', name: '深国际前海置业（深圳）有限公司', class: 'type-suss' },
        //     { key: '28', name: '上海深惠实业有限公司', class: 'type-suss' },
        //     { key: '29', name: '深圳国际消费电子展示交易中心有限公司', class: 'type-suss' },

        //     { key: '30', name: '深业置地投资发展（深圳有限公司）', class: 'type-suss' },
        //     { key: '31', name: '深圳深业酒店管理有限公司', class: 'type-suss' },
        //     { key: '32', name: '苏州国际会议展览中心有限公司', class: 'type-suss' },
        //     { key: '33', name: '深业商业管理（深圳）有限公司）', class: 'type-suss' },


        //     //left

        //     { key: '6', name: 'city capital', class: 'type-suss' },
        //     { key: '7', name: '港丰行（中国）发展有限公司', class: 'type-suss' },

        //     { key: '8', name: '深圳硅谷投资有限公司', class: 'type-suss' },
        //     { key: '9', name: '深圳市深业科技开发有限公司', class: 'type-suss' },

        //     //right

        //     { key: '3', name: '深业控股(深圳)有限公司', class: 'type-suss' },
        //     { key: '4', name: '深业泰富物流集团股份有限公司', class: 'type-suss' },
        //     { key: '10', name: '深圳市深业家之福家具建材有限公司', class: 'type-suss' },
        //     { key: '11', name: '深圳市深业车城有限公司', class: 'type-suss' },
        //     { key: '12', name: '深圳市深业泰富商业物业管理有限公司', class: 'type-suss' },
        //     { key: '13', name: '沈阳五爱深港窖货总站有限公司', class: 'type-suss' },

        //     { key: '14', name: '中国深业（集团）地产投资有限公司', class: 'type-suss' },
        //     { key: '15', name: '深圳市深业泰富广场商业有限公司', class: 'type-suss' },

        //     { key: '16', name: '成都深业西域实业有限公司', class: 'type-suss' },
        //     { key: '17', name: '成都御景商业经营管理有限公司', class: 'type-suss' },
        //     // { key: "1", name: "Don Meow", source: "cat1.png" },
        //     // { key: "2", parent: '1', name: "Copricat", source: "cat2.png" },
        //     // { key: "3", parent: '2', name: "Demeter", source: "cat3.png" },
        // ];

        // // myModel.linkDataArray = [
        // //     { from: "1", to: "2"},
        // //     { from: "2", to: "3"}
        // // ]

        // myDiagram.model = myModel;

    }


    d3BubbleInitor() {
        // Set paths and options
        const guides = {
            General: {
                'Legend Rhony': {
                    data: 'https://raw.githubusercontent.com/sho-87/rok-data/master/commander_pairings/data/legend_rhony.csv',
                    url: 'https://www.youtube.com/watch?v=gSY6CfG2vg4',
                    strength: -3000,
                    distance: 500,
                    radius: 1.5
                },
                detectiveG: {
                    data: 'https://raw.githubusercontent.com/sho-87/rok-data/master/commander_pairings/data/detectiveG.csv',
                    url:
                        'https://docs.google.com/spreadsheets/d/1YqsYjNAxzHHODfzJoPhN3kzyG9xwGvK7NmoK1e3ADdk',
                    strength: -1500,
                    distance: 500,
                    radius: 2
                }
            },
            Garrison: {
                'Legend Rhony': {
                    data: 'https://raw.githubusercontent.com/sho-87/rok-data/master/commander_pairings/data/legend_rhony_garrison.csv',
                    url: 'https://www.youtube.com/watch?v=YhxwVI6j1mI',
                    strength: -3000,
                    distance: 500,
                    radius: 3
                }
            }
        };

        const commanders = 'https://raw.githubusercontent.com/sho-87/rok-data/master/commander_pairings/commanders.json';

        // Set initial options
        const options_type = Object.keys(guides);
        const select_type = document.getElementById('dropdown_type');
        const select_guide = document.getElementById('dropdown_guide');

        // for (let i = 0; i < options_type.length; i++) {
        //     let opt = document.createElement('option');
        //     opt.textContent = options_type[i];
        //     select_type.appendChild(opt);
        // }

        changeType();

        // // Functions for guide selection
        function changeType() {
            select_guide.length = 0;

            let guide_list = Object.keys(guides[select_type.value]);

            // for (let i = 0; i < guide_list.length; i++) {
            //     let opt = document.createElement('option');
            //     opt.textContent = guide_list[i];
            //     select_guide.appendChild(opt);
            // }

            changeGuide();
        }

        function changeGuide() {
            let guide_type = select_type.value;
            let guide = select_guide.value;

            let a = document.getElementById('link');
            a.href = guides[guide_type][guide].url;

            loadGraph(
                guides[guide_type][guide].data,
                guides[guide_type][guide].strength,
                guides[guide_type][guide].distance,
                guides[guide_type][guide].radius
            );
        }

        // Functions for graph generation
        function loadGraph(data, strength, distance, radius) {
            const svg = d3.select('svg'),
                width = +svg.attr('width'),
                height = +svg.attr('height');

            svg.selectAll('*').remove();

            const zoom = d3
                .zoom()
                .scaleExtent([-8 / 2, 4])
                .on('zoom', zoomed);

            svg.call(zoom);

            const g = svg.append('g');

            const color = d3
                .scaleOrdinal()
                .domain(['Legendary', 'Epic', 'Elite', 'Advanced'])
                .range(['#ff9b00', '#ac41c2', '#058cc3', '#2d9830']);

            const tooltip = d3.select('#info').attr('class', 'tooltip');

            const simulation = d3
                .forceSimulation()
                .force('link', d3.forceLink().id(d => d.id))
                .force(
                    'charge',
                    d3
                        .forceManyBody()
                        .strength(strength)
                        .distanceMax([distance])
                )
                .force('center', d3.forceCenter(width / 2, height / 2));

            // Read data from files
            d3.queue()
                .defer(d3.json, commanders)
                .defer(d3.csv, data)
                .await(function (error, commanders, links) {
                    if (error) {
                        console.error(error);
                    } else {
                        links = links.map(d => ({
                            source: d.primary,
                            target: d.secondary,
                            rank: d.rank
                        }));

                        // calculate node weights (number of links)
                        commanders.nodes.forEach(n => {
                            n.weight = (function () {
                                let weight = 0;
                                links.forEach(l => {
                                    if ((n.id === l.source) | (n.id === l.target)) {
                                        weight++;
                                    }
                                });
                                return weight;
                            })();
                        });

                        // links
                        const link = g
                            .attr('class', 'links')
                            .selectAll('line')
                            .data(links)
                            .enter()
                            .append('line')
                            .attr('stroke-width', d => (1 / d.rank) * 2.3);

                        // nodes
                        const node = g
                            .selectAll('.node')
                            .data(commanders.nodes)
                            .enter()
                            .append('g')
                            .attr('class', 'nodes')
                            .filter(d => {
                                if (d.weight != 0) {
                                    return this;
                                }
                            })
                            .call(
                                d3
                                    .drag()
                                    .on('start', dragstarted)
                                    .on('drag', dragged)
                                    .on('end', dragended)
                            );

                        node
                            .append('circle')
                            .attr('r', d => d.weight * radius)
                            .attr('fill', d => color(d.group))
            //                 .on('mouseover.tooltip', function (d) {
            //                     // Generate tooltip text
            //                     info = `<strong>${d.id}</strong><br/><span class=${d.group}>${
            //                         d.group
            //                         }</span><br>Versatility (# of pairs): ${d.weight}`;

            //                     table_primary = `<p><table id='tooltipTablePrimary' border=1>`;
            //                     table_secondary = `<p><table id='tooltipTableSecondary' border=1>`;

            //                     header = `<tr style="font-weight:bold">
            //   <td class='primary' width='45%'>Primary</td>
            //   <td class='secondary' width='45%'>Secondary</td>
            //   <td>Rank</td></tr>`;

            //                     rank_sum = 0;
            //                     rows_primary = '';
            //                     rows_secondary = '';

            //                     links.forEach(pair => {
            //                         if (d.id === pair.source.id) {
            //                             rank_sum += Number(pair.rank);
            //                             rows_primary += `<tr><td style='font-weight:bold'>${
            //                                 pair.source.id
            //                                 }</td><td>${pair.target.id}</td><td>${pair.rank}</td></tr>`;
            //                         } else if (d.id === pair.target.id) {
            //                             rank_sum += Number(pair.rank);
            //                             rows_secondary += `<tr><td>${
            //                                 pair.source.id
            //                                 }</td><td style='font-weight:bold'>${pair.target.id}</td><td>${
            //                                 pair.rank
            //                                 }</td></tr>`;
            //                         }
            //                     });

            //                     table_primary += header + rows_primary + '</table>';
            //                     table_secondary += header + rows_secondary + '</table>';

            //                     tables_combined = '';
            //                     if (rows_primary !== '') {
            //                         tables_combined += table_primary;
            //                     }

            //                     if (rows_secondary !== '') {
            //                         tables_combined += table_secondary;
            //                     }

            //                     tooltip
            //                         .transition()
            //                         .duration(300)
            //                         .style('opacity', 1);
            //                     tooltip.html(info + tables_combined);

            //                     sortTable('tooltipTablePrimary');
            //                     sortTable('tooltipTableSecondary');
            //                 })
            //                 .on('mouseout.tooltip', function () {
            //                     tooltip
            //                         .transition()
            //                         .duration(100)
            //                         .style('opacity', 0);
            //                 })
            //                 .on('mouseover.fade', fade(0.05))
            //                 .on('mouseout.fade', fade(1));

            //             // node labels
                        node
                            .append('text')
                            .text(d => d.id)
                            .attr('class', 'labels')
                            .attr('x', 0)
                            .attr('y', 0);

                        simulation.nodes(commanders.nodes).on('tick', ticked);
                        simulation.force('link').links(links);

                        function ticked() {
                            // zoom to bounding box of nodes
                            if (this.alpha() > 0.04) {
                                // set up zoom transform
                                var xExtent = d3.extent(node.data(), function (d) {
                                    return d.x + 100;
                                });
                                var yExtent = d3.extent(node.data(), function (d) {
                                    return d.y;
                                });

                                // get scales
                                var xScale = (width / (xExtent[1] - xExtent[0])) * 0.75;
                                var yScale = (height / (yExtent[1] - yExtent[0])) * 0.75;

                                // get most restrictive scale
                                var minScale = Math.min(xScale, yScale);

                                if (minScale < 1) {
                                    var transform = d3.zoomIdentity
                                        .translate(width / 2, height / 2)
                                        .scale(minScale)
                                        .translate(
                                            -(xExtent[0] + xExtent[1]) / 2,
                                            -(yExtent[0] + yExtent[1]) / 2
                                        );
                                    svg.call(zoom.transform, transform);
                                }
                            } else {
                                svg.attr('cursor', 'pointer');
                                var check = false;
                            }

                            link
                                .attr('x1', d => d.source.x)
                                .attr('y1', d => d.source.y)
                                .attr('x2', d => d.target.x)
                                .attr('y2', d => d.target.y);

                            node.attr('transform', d => `translate(${d.x},${d.y})`);
                        }

                        const linkedByIndex = {};
                        links.forEach(d => {
                            linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
                        });

                        function isConnected(a, b) {
                            return (
                                linkedByIndex[`${a.index},${b.index}`] ||
                                linkedByIndex[`${b.index},${a.index}`] ||
                                a.index === b.index
                            );
                        }

                        function fade(opacity) {
                            return d => {
                                node.style('stroke-opacity', function (o) {
                                    const thisOpacity = isConnected(d, o) ? 1 : opacity;
                                    this.setAttribute('fill-opacity', thisOpacity);
                                    return thisOpacity;
                                });

                                link.style('stroke-opacity', o =>
                                    o.source === d || o.target === d ? 1 : opacity
                                );
                            };
                        }

                        function sortTable(id) {
                            var table, rows, switching, i, x, y, shouldSwitch;
                            table = document.getElementById(id);
                            switching = true;

                            while (switching) {
                                try {
                                    rows = table.rows;
                                } catch (err) {
                                    return;
                                }

                                switching = false;

                                for (i = 1; i < rows.length - 1; i++) {
                                    shouldSwitch = false;

                                    x = rows[i].getElementsByTagName('TD')[2];
                                    y = rows[i + 1].getElementsByTagName('TD')[2];

                                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                                        shouldSwitch = true;
                                        break;
                                    }
                                }
                                if (shouldSwitch) {
                                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                                    switching = true;
                                }
                            }
                        }
                    }
                });

            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            function zoomed() {
                g.attr('transform', d3.event.transform);
            }
        }

    }

    componentDidMount() {

        // this.goJSInitor();
        this.d3BubbleInitor();
    }
    tabSwitchor = (evt) => {

    }
    render() {
        return (
            <Fragment>
                <ul className="position-tab" style={styleFuc()} onClick={this.tabSwitchor}>
                    <li>LINE</li>
                    <li>BUBBLE</li>
                </ul>
                <div id="myDiagramDiv"
                    style={{ width: '100%', height: '100%', backgroundColor: '#DAE4E4' }}>
                </div>



                <div className="row">
                    <div className="column">
                        {/* <table>
                            <tbody>

                            <tr>
                                <td>Type:</td>
                                <td>Guide:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><select id="dropdown_type" onChange={changeType()"></select></td>
                                <td><select id="dropdown_guide" onChange="changeGuide()"></select></td>
                                <td><a id="link" href="#" target="_blank">Link</a></td>
                            </tr>
                            </tbody>

                        </table> */}

                        <div id="info"></div>
                    </div>
                    <div className="column"><svg width="800" height="600"></svg></div>
                </div>
            </Fragment>

        )
    }
}

let styleFuc = () => ({
    position: 'fixed',
    width: '400px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    top: '20px',
    right: '20px',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontSize: '45px',
    zIndex: 10,
})


// export default Chartz;
export default Gojs;