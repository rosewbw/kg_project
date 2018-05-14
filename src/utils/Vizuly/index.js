import React, { Component } from 'react';
import $ from 'jquery';

import * as d3 from 'd3';
import vizuly from './weightedtree/lib/vizuly_core.min';
import './weightedtree/lib/vizuly_weightedtree.min';

import './lib/styles/vizuly.css';
import './lib/styles/vizuly_weightedtree.css';

import CSVFILE from './weightedtree/data/weightedtree_federal_budget.csv';

class VizulyWeightedTree extends Component {
    constructor(props) {
        super(props);

        this.viz_container = d3.selectAll("#viz_container");
        this.viz = undefined;
        this.theme = undefined;
        this.data = {};
        // stores the currently selected value field
        this.valueField = "Federal";
        this.valueFields = ["Federal", "State", "Local"];

        // this.datatip='<div class="tooltip" style="width: 250px; background-opacity:.5">' +
        //     '<div class="header1">HEADER1</div>' +
        //     '<div class="header-rule"></div>' +
        //     '<div class="header2"> HEADER2 </div>' +
        //     '<div class="header-rule"></div>' +
        //     '<div class="header3"> HEADER3 </div>' +
        //     '</div>';

        this.formatCurrency = this.formatCurrency.bind(this);
        this.loadData = this.loadData.bind(this);
        this.prepData = this.prepData.bind(this);
        this.initialize = this.initialize.bind(this);
        this.trimLabel = this.trimLabel.bind(this);
        this.onMeasure = this.onMeasure.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onClick = this.onClick.bind(this);
        this.changeSkin = this.changeSkin.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.changeData = this.changeData.bind(this);
    }

    formatCurrency(d) { if (isNaN(d)) d = 0; return "$" + d3.format(",.2f")(d) + " Billion"; };

    loadData() {
        let { data, initialize, prepData } = this;

        d3.csv(CSVFILE, function (csv) {
            data.values=prepData(csv);
            // blob = JSON.stringify(data);
            initialize();
        });
    }

    prepData(csv) {
        let values=[];
        let { valueFields } = this;

        //Clean federal budget data and remove all rows where all values are zero or no labels
        csv.forEach(function (d,i) {
            let t = 0;
            for (let i = 0; i < valueFields.length; i++) {
                t += Number(d[valueFields[i]]);
            }
            if (t > 0) {
                values.push(d);
            }
        });

        //Make our data into a nested tree.  If you already have a nested structure you don't need to do this.
        let nest = d3.nest()
            .key(function (d) {
                return d.Level1;
            })
            .key(function (d) {
                return d.Level2;
            })
            .key(function (d) {
                return d.Level3;
            })
            .entries(values);


        //This will be a viz.data function;
        vizuly.core.util.aggregateNest(nest, valueFields, function (a, b) {
            return Number(a) + Number(b);
        });

        //Remove empty child nodes left at end of aggregation and add unqiue ids
        function removeEmptyNodes(node,parentId,childId) {
            if (!node) return;
            node.id=parentId + "_" + childId;
            if (node.values) {
                for(var i = node.values.length - 1; i >= 0; i--) {
                    node.id=parentId + "_" + i;
                    if(!node.values[i].key && !node.values[i].Level4) {
                        node.values.splice(i, 1);
                    }
                    else {
                        removeEmptyNodes(node.values[i],node.id,i)
                    }
                }
            }
        }

        var node={};
        node.values = nest;
        removeEmptyNodes(node,"0","0");


        // var blob = JSON.stringify(nest);

        return nest;
    }

    initialize() {
        let { trimLabel, onMeasure, onMouseOver, onMouseOut, onClick } = this;
        const _this = this;

        _this.viz = vizuly.viz.weighted_tree(document.getElementById("viz_container"));

        //Here we create three vizuly themes for each radial progress component.
        //A theme manages the look and feel of the component output.  You can only have
        //one component active per theme, so we bind each theme to the corresponding component.
        _this.theme = vizuly.theme.weighted_tree(_this.viz).skin(vizuly.skin.WEIGHTED_TREE_AXIIS);

        //Like D3 and jQuery, vizuly uses a function chaining syntax to set component properties
        //Here we set some bases line properties for all three components.
        _this.viz.data(_this.data)                                                      // Expects hierarchical array of objects.
            .width(1000)                                                     // Width of component
            // .height(600)                                                    // Height of component
            .children(function (d) { return d.values })                     // Denotes the property that holds child object array
            .key(function (d) { return d.id })                              // Unique key
            .value(function (d) {
                return Number(d["agg_" + _this.valueField]) })                    // The property of the datum that will be used for the branch and node size
            .fixedSpan(-1)                                                  // fixedSpan > 0 will use this pixel value for horizontal spread versus auto size based on viz width
            .branchPadding(.07)
            .label(function (d) {                                           // returns label for each node.
                return trimLabel(d.key || (d['Level' + d.depth]))})
            .on("measure",onMeasure)                                        // Make any measurement changes
            .on("mouseover",onMouseOver)                                    // mouseover callback - all viz components issue these events
            .on("mouseout",onMouseOut)                                      // mouseout callback - all viz components issue these events
            .on("click",onClick);                                           // mouseout callback - all viz components issue these events


        //We use this function to size the components based on the selected value from the RadiaLProgressTest.html page.
        // changeSize(d3.select("#currentDisplay").attr("item_value"));

        _this.viz.update();

        // Open up some of the tree branches.
        _this.viz.toggleNode(_this.data.values[2]);
        _this.viz.toggleNode(_this.data.values[2].values[0]);
        _this.viz.toggleNode(_this.data.values[3]);
    }


    trimLabel(label) {
        return (String(label).length > 20) ? String(label).substr(0, 17) + "..." : label;
    }

    onMeasure() {
        // Allows you to manually override vertical spacing
        // viz.tree().nodeSize([100,0]);
    }

    onMouseOver(e,d,i) {
        let { data, viz, valueField } = this;

        console.log("mouse over");
        if (d == data) return;
        let rect = e.getBoundingClientRect();
        if (d.target) d = d.target; //This if for link elements
    }

    onMouseOut(e,d,i) {
        d3.selectAll(".vz-weighted_tree-tip").remove();
    }

    //We can capture click events and respond to them
    onClick(g,d,i) {
        this.viz.toggleNode(d);
    }

    //This function is called when the user selects a different skin.
    changeSkin(val) {
        const { theme, viz } = this;

        if (val == "None") {
            theme.release();
        }
        else {
            theme.viz(viz);
            theme.skin(val);
        }

        viz().update();  //We could use theme.apply() here, but we want to trigger the tween.
    }

    //This changes the size of the component by adjusting the width/height;
    changeSize(val) {
        let { viz_container, viz } = this;

        var s = String(val).split(",");
        viz_container.transition().duration(300).style('width', s[0] + 'px').style('height', s[1] + 'px');
        viz.width(s[0]).height(s[1]*.8).update();
    }

    //This sets the same value for each radial progress
    changeData(val) {
        let { viz, valueFields } = this;

        this.valueField=valueFields[Number(val)];
        viz.update();
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div className="container" style={{width: "100%", height: "100%"}}>
                <div id="viz_container" className="z-depth-3" style={{height: "90%"}}>
                </div>
                <div
                    style={{marginLeft: "0px", height: "0px", width: "90%", margin:"0px auto", marginTop:"20px", fontSize: "14px"}}>
                    说明文字
                </div>
            </div>
        );

    }

}

export { VizulyWeightedTree };