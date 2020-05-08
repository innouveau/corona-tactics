<script>
    import * as d3 from 'd3';
    import $ from 'jquery';
    import dateTools from '@/tools/date';
    import { eventBus } from '@/event-bus';

    window.d3 = d3;

    export default {
        name: 'line-chart',
        components: {},
        props: {

        },
        data() {
            let margin = {top: 80, right: 120, bottom: 90, left: 50};
            return {
                settings: {
                    margin,
                    width: 0,
                    height: 500 - margin.top - margin.bottom
                },
                svg: null,
                container: null,
                monthsLayer: null,
                tacticLayer: null,
                tacticLayers: [],
                coverLayer: null,
                coverG: null,
                cover: null,
                xScale: null,
                yScale: null,
                tooltip: null,
                eventInfo: null,
                visorX: null,
                visorY: null,
                max: 0,
                currentDay: 0,
                timer: null
            }
        },
        methods: {
            play(start, end, time, callback) {
                let interval = time / (end - start);
                this.stop();
                this.currentDay = start;
                this.timer = setInterval(()=> {
                    this.tick();
                    if (this.currentDay >= end) {
                        this.stop();
                        setTimeout(() => {
                            callback();
                        }, 1000)
                    }
                }, interval)
            },
            tick() {
                let x, width, l;
                l = this.tactics[0].days.length;
                this.currentDay++;
                x = this.xScale(this.currentDay);
                width = Math.max(0, this.xScale(l) - x);
                this.coverG.attr('transform', 'translate(' + x + ',-100)');
                this.cover.attr('width', width);

            },
            stop() {
                clearInterval(this.timer);
            },
            rewind() {
                this.currentDay = 0;
                this.stop();
            },
            update() {
                setTimeout(() => {
                    this.clear();
                    this.setWidth();
                    this.draw();
                }, );
            },
            clear() {
                if (this.svg) {
                    this.svg.selectAll('*').remove();
                }
            },
            setWidth() {
                this.settings.width = this.$refs.chart.offsetWidth - this.settings.margin.left - this.settings.margin.right;
            },
            draw() {
                let n, min, max;
                n = 0;
                min = null;
                max = 0;


                for (let tactic of this.tactics) {
                    // ignore tactic 1 (do nothing)
                    if (tactic.id !== 1) {
                        let thisMax = d3.max(tactic.days.map(d => d.cases));
                        if (thisMax > max) {
                            max = thisMax;
                        }
                    }
                }
                max = 70000;

                this.xScale = d3.scaleLinear()
                    .domain([0, this.tactics[0].days.length - 1])
                    .range([0, this.settings.width]);

                this.yScale = d3.scaleLinear()
                    .domain([0, max])
                    .range([this.settings.height, 0]);

                this.drawAxes();
                this.drawMonths();
                this.drawTactics();
                this.drawCover();
            },
            drawCover() {
                this.coverG = this.coverLayer.append('g')
                    .attr('transform', 'translate(0,-100)');

                this.cover = this.coverG.append('rect')
                    .attr('width', 0)
                    .attr('height', this.settings.height + 200)
            },
            drawTactics() {
                for (let tactic of this.tactics) {
                    this.drawTactic(tactic);
                }
            },
            drawMonths() {
                let months, currentMonth, index;
                months = [];
                currentMonth = null;
                index = 0;

                const addMonth = function(month, index) {
                    let name = dateTools.getMonthName(month);
                    currentMonth = month;
                    if (months.length > 0) {
                        months[months.length - 1].end = index;
                    }
                    months.push({
                        name: name,
                        month: month,
                        start: index
                    })
                };


                for (let day of this.tactics[0].days) {
                    let month = new Date(day.date).getMonth();

                    if (!currentMonth || month !==currentMonth) {
                        addMonth(month, index);
                    }
                    index++;
                }
                months[months.length - 1].end = this.tactics[0].days.length;

                for (let month of months) {
                    let x, width, fill;
                    x = this.xScale(month.start);
                    width = this.xScale(month.end) - this.xScale(month.start);
                    fill = month.month % 2 === 0 ? 'rgba(0,0,0,0.05)': 'rgba(0,0,0,0.025)';
                    let monthGroup = this.monthsLayer.append('g')
                        .attr('class', 'month month--' + month.name)
                        .attr('transform', 'translate(' + x + ', 0)');

                    monthGroup.append('rect')
                        .attr('width', width)
                        .attr('height', this.settings.height)
                        .attr('fill', fill);
                    if (width > 100) {
                        monthGroup
                            .append('g')
                            .attr('transform', 'translate(' + (width / 2) + ', 40)')
                            .append('text')
                            .text(month.name)
                    }
                }
            },
            drawTactic(tactic) {

                let g = this.tacticLayer.append('g')
                    .attr('class', 'g-tactic--' + tactic.id);
                this.tacticLayers.push(g);
                this.drawTacticLine(tactic);
                this.drawTacticDots(tactic);
                this.drawEvents(tactic);
            },
            drawEvents(tactic) {
                for (let period of tactic.periods) {
                    this.drawEvent(tactic, period, period.event);
                }
            },
            drawEvent(tactic, period, event) {
                let x, index, y, eventGroup, circle, layer;
                layer = this.tacticLayers[tactic.id - 1];
                index = dateTools.getOffsetByDateString(period.start);
                x = this.xScale(index);
                y = this.yScale(tactic.days[index].cases);

                eventGroup = layer.append('g')
                    .attr('class', 'event-group tactic--' + tactic.id)
                    .attr('transform', 'translate(' + x + ',' + y + ')');

                circle = eventGroup.append('circle')
                    .attr('class', 'event')
                    .attr('r', 7)
                    .attr('fill', function(d){
                        return tactic.color;
                    })
                    .style('opacity',0.2);

                eventGroup.append('text')
                    .text(event.title)
                    .attr('y', -16)
                    .attr('fill', tactic.color);
            },
            drawTacticLine(tactic) {
                let line, layer;
                layer = this.tacticLayers[tactic.id - 1];

                line = d3.line()
                    .x((d, i) => { return this.xScale(i); })
                    .y((d) => { return this.yScale(d.cases); })
                    .curve(d3.curveMonotoneX);

                layer.append("path")
                    .datum(tactic.days)
                    .attr("class", "tactic-line tactic--" + tactic.id)
                    .attr("stroke", () => {
                        return tactic.color;
                    })
                    .style('fill', 'transparent')
                    .attr("d", line)
                    .attr('stroke-width', '1.5');
            },
            drawTacticDots(tactic) {
                let dots, layer;
                layer = this.tacticLayers[tactic.id - 1];

                dots = layer.selectAll(".dot.dot--" + tactic.id)
                    .data(tactic.days)
                    .enter().append("g")
                    .attr("class", "dot dot--" + tactic.id);

                dots.append("circle")
                    .attr("fill", "transparent")
                    .attr("cx", (d, i) => { return this.xScale(i) })
                    .attr("cy", (d) => { return this.yScale(d.cases) })
                    .attr("r", 7)
                    .attr("class", "dot__active-area tactic--" + tactic.id);

                dots.append("circle")
                    .attr("fill", () => {
                        return tactic.color;
                    })
                    .attr("cx", (d, i) => { return this.xScale(i) })
                    .attr("cy", (d) => { return this.yScale(d.cases) })
                    .attr("r", 2)
                    .attr("class", "dot__visibile-area tactic--" + tactic.id)
                    .style('stroke', '#fff');
            },



            drawAxes() {
                this.container = this.svg
                    .attr("width", this.settings.width + this.settings.margin.left + this.settings.margin.right)
                    .attr("height", this.settings.height + this.settings.margin.top + this.settings.margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + this.settings.margin.left + "," + this.settings.margin.top + ")");

                this.container.append("g")
                    .attr("class", "x-axis")
                    .attr("transform", "translate(0," + this.settings.height + ")")
                    .call(d3.axisBottom(this.xScale)
                        .ticks(6)
                        .tickFormat(d3.format(".0s"))

                    );

                this.container.append("g")
                    .attr("class", "y-axis")
                    .call(d3.axisLeft(this.yScale));

                this.monthsLayer = this.container.append('g')
                    .attr('class', 'months');

                this.tacticLayer = this.container.append('g')
                    .attr('class', 'tactics');

                this.coverLayer = this.container.append('g')
                    .attr('class', 'cover');

            },
            init() {
                let div = this.$refs.chart;
                this.svg = d3.select(div).append("svg")
                    .attr('fill', '#fff');
            },
            showTactic(tactic) {
                d3.selectAll('.tactic--' + tactic.id)
                    .attr('visibility', 'visible');


            },
            hideTactic(tactic) {
                d3.selectAll('.tactic--' + tactic.id)
                    .attr('visibility', 'hidden');

            }
        },
        mounted() {
            this.init();
            this.update();

            eventBus.$on('show-tactic', (tactic) => {
                this.showTactic(tactic);
            });

            eventBus.$on('hide-tactic', (tactic) => {
                this.hideTactic(tactic);
            });

            eventBus.$on('play-period', (payload) => {
                let period, start, end, time;
                period = payload.period;
                start = dateTools.getOffsetByDateString(period.start);
                end = dateTools.getOffsetByDateString(period.end);
                time = period.comment.time;
                this.play(start, end, time, payload.callback);
            });

            eventBus.$on('play-tactic', (payload) => {
                this.rewind();
            })
        },
        computed: {
            tactics() {
                return this.$store.state.tactics.all;
            },
            currentTactic() {
                return this.$store.state.settings.currentTactic;
            },
            currentPeriod() {
                return this.$store.state.settings.currentPeriod;
            }
        },
        watch: {
            // currentTactic:  {
            //     handler: function(newValue) {
            //         //this.rewind();
            //     }
            // },
            // currentPeriod:  {
            //     handler: function(newValue) {
            //         let start, end, time;
            //         start = dateTools.getOffsetByDateString(this.currentPeriod.start);
            //         end = dateTools.getOffsetByDateString(this.currentPeriod.end);
            //         time = this.currentPeriod.comment.time;
            //         this.play(start, end, time);
            //     }
            // }
        }
    }
</script>


<template>
    <div class="line-chart">
        <div
            ref="chart"
            class="line-chart__container">

        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';



    .line-chart {
        overflow: hidden;

        .line-chart__container {

            svg {

                .lines {

                    .dot {

                        .dot__visibile-area {
                            pointer-events: none;
                        }
                    }
                }

                .visor {
                    stroke-width: 1;
                    stroke: #aaa;
                }

                .x-axis, .y-axis {

                    .tick {

                        text {
                            fill: transparent;
                        }
                    }
                }

                .months {
                    .month {
                        font-size: 14px;
                        font-weight: 700;
                        fill: #000;
                        text-anchor: middle;
                    }
                }

                .events {

                    .event-group {

                        text {
                            font-size: 9px;
                            text-anchor: middle;
                        }
                    }
                }

                .cover {

                    rect {
                        fill: #fff;
                    }
                }

            }
        }
    }




    .tooltip {
        position: absolute;
        text-align: center;
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 2px;
        pointer-events: none;
        opacity: 0;
        box-shadow: 1px 1px 4px rgba(0,0,0,0.2);

        .tooltip__tactic {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 5px;
            margin-left: 4px;
            border-right: 1px solid #ddd;
        }

        .tooltip__event {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 5px;
            border-right: 1px solid #ddd;
        }

        .tooltip__date {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 5px;
        }

        .tooltip__value {
            background: #ddd;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 5px;
        }
    }
</style>