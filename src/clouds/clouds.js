var notes = []

for(var i = 0; i < 9; i++)
    notes.push(new Audio('http://dl.dropbox.com/u/20485/otomata/sounds/' + (i % 9)+ '.mp3?' + i));

angular.module('dashboard')
.directive('clouds', function() {
  return {
    restrict: 'E',
    templateUrl: 'clouds.html',
    link:function($scope, element, attrs){
        console.log('Clouding...')

        var raindropPath = document.getElementById('raindrop').getAttribute('d');
        var cloud = document.getElementById('cloud');
        var container = d3.select('.clouds_container').append('svg');

  var w = 1800;
  var h = 2000;
  var barPadding = 1;

  var container = container.attr("width", w).attr("height", h);
  var dropContainer = container.append("g")
  .attr('transform', (d, i) => 'translate(60, 0)')

  var cloudGroup = container.select(function() {
    return this.appendChild(cloud);
  });


  var cloudParts = cloudGroup.attr('transform', (d, i) => 'scale(0.5)')
  .selectAll('ellipse');

var moveCloudPart = part => {
    part
    .attr('transform', (d, i) => 'translate(0,0)')
    .transition()
    .duration(4000)
    .ease('quad-in-out')
    .attr('transform', (d, i) => 'translate(0,' + 20 * Math.random() + 10 + ')')
    .transition()
    .duration(4000)
    .ease('quad-in-out')
    .attr('transform', (d, i) => 'translate(0,0')
    .each("end", () => moveCloudPart(part));
    ;
}

moveCloudPart(cloudParts)

          var draw = function(data){
              var sideSpeed = Math.random() * 150;
                dropContainer.append("path")
                    .attr('d', raindropPath)
                    .attr('transform', (d, i) => 'translate(' + sideSpeed + 20 + ', ' + 40 + ') scale(0.2) rotate(-15) ')
                    .attr("width", 11)
                    .attr("height", 11)
                    .attr("fill", function(d) { return "hsl(0, 0%, " + Math.floor(data.size % 20 + 80) + "%)";})
                    .transition()
                    .duration(3000)
                    .attr('transform', (d, i) => 'translate(' + sideSpeed * 1.8 + 50 + ' , ' + 660 + ') scale(0.3) rotate(-15) ')
                    .ease("quad-in")
                    .remove()
        };


      setInterval(function(){
          draw({ speed: Math.random()*51, size: Math.random()*255 });
          notes[Math.floor(Math.random() * notes.length)].play()
      },10);


    }
  };
});
