var notes = []

// for(var i = 0; i < 9; i++)
//     notes.push(new Audio('http://dl.dropbox.com/u/20485/otomata/sounds/' + (i % 9)+ '.mp3?' + i));

angular.module('dashboard')
    .directive('clouds', function() {
        return {
            restrict: 'E',
            templateUrl: 'clouds.html',
            link: function($scope, element, attrs) {
                console.log('Clouding...')

                var raindropPath = document.getElementById('raindrop').getAttribute('d');
                var cloud = document.getElementById('cloud');
                var container = d3.select('.clouds_container').append('svg');

                var onResize = () => {
                    console.log('New size: ', window.innerWidth, window.innerHeight)
                    container.attr("width", window.innerWidth).attr("height", window.innerHeight)
                };
                window.addEventListener("resize", onResize);
                onResize();


                var data = [{
                    app: 'laget.se',
                    color: 'yellow',
                }, {
                    app: 'admin',
                    color: 'green',
                }];

                var cloudGroups =
                    container
                    .selectAll('g')
                    .data(data)
                    .enter()
                    .append('g')
                    .attr("transform", (d, i) => 'translate(' + i * 300 + ',10)')


                var dropContainer = cloudGroups.append("g")
                    .attr('transform', (d, i) => 'translate(60, 0)')

                var cloudScaleBase = ' scale(0.5)';
                var cloudGroup = cloudGroups.select(function() {
                    return this.appendChild(cloud.cloneNode(true));
                })
                .attr('transform', (d, i) => cloudScaleBase);


                var texts = cloudGroup
                    .append('text')
                    .attr("x", function(d, i) { return 150; })
                    .attr("y", function(d, i) { return 80; })
                    .text(d => d.app)
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "20px")
                    .attr("fill", "rgba(0,0,0,0.3)")



                var cloudParts = cloudGroup
                    .selectAll('ellipse');

                var moveCloudPart = part => {
                    part.attr('transform', (d, i) => 'translate(0,0)' + cloudScaleBase)
                        .transition()
                        .duration(4000)
                        .ease('quad-in-out')
                        .attr('transform', (d, i) => 'translate(0,' + (10 * Math.random() - 5) + ')' + cloudScaleBase)
                        .transition()
                        .duration(4000)
                        .ease('quad-in-out')
                        .attr('transform', (d, i) => 'translate(0,0)' + cloudScaleBase)
                        .each("end", () => moveCloudPart(part));
                }

                moveCloudPart(cloudParts)

                var moveClouds = cloud => {
                    cloud.attr('transform', (d, i) => 'translate(0,0)')
                        .transition()
                        .duration((d, i) => 3000 + i * 700)
                        .ease('quad-in-out')
                        .attr('transform', (d, i) => 'translate(' + (Math.random() - 0.5) * 20 + ',' + 5 * Math.random() + 4 + ')')
                        .transition()
                        .duration(4000)
                        .ease('quad-in-out')
                        .attr('transform', (d, i) => 'translate(0,0)')
                        .each("end", () => moveClouds(cloud));
                }

                moveClouds(cloudGroup)



                var draw = function(data) {
                    var sideSpeed = Math.random() * 150;
                    dropContainer.append("path")
                        .attr('d', raindropPath)
                        .attr('transform', (d, i) => 'translate(' + sideSpeed + 20 + ', ' + 40 + ') scale(0.2) rotate(-15) ')
                        .attr("width", 11)
                        .attr("height", 11)
                        .attr("fill", function(d) {
                            return "hsl(0, 0%, " + Math.floor(data.size % 20 + 80) + "%)";
                        })
                        .transition()
                        .duration(3000)
                        .attr('transform', (d, i) => 'translate(' + sideSpeed + 20 + ' , ' + window.innerHeight + ') scale(0.3) rotate(-15) ')
                        .ease("quad-in")
                        .remove()
                };


                setInterval(function() {
                    draw({
                        speed: Math.random() * 51,
                        size: Math.random() * 255
                    });
                    //notes[Math.floor(Math.random() * notes.length)].play()
                }, 500);


            }
        };
    });
