let select = (s) => document.querySelector(s),
  selectAll = (s) => document.querySelectorAll(s),
  mainSVG = select("#mainSVG"),
  container = select("#container"),
  dot = select(".dot"),
  maxDots = 250,
  path = select("#circ"),
  allDotsArr = [],
  allShapesArr = [],
  allPathsArr = gsap.utils.toArray("#pathContainer path").reverse(),
  shapeDataCount = -1,
  allColors = ["url(#redGrad)", "#FFF"];

gsap.set("svg", {
  visibility: "visible",
});
//gsap.utils.shuffle(allPathsArr);
const setShape = (shapeData) => {
  gsap.to(allDotsArr, {
    stagger: {
      //amount: 0.75
      each: 0.0071,
    },
    //attr:{
    x: (index) => shapeData[index].data.x,
    y: (index) => shapeData[index].data.y,
    //},
    ease: "sine.inOut",
    duration: 1,
  });
};

for (var i = 0; i < maxDots; i++) {
  let clone = dot.cloneNode(true);
  container.appendChild(clone);
  allDotsArr.push(clone);
  gsap.set(clone, {
    fill: allColors[i % allColors.length],
    x: 400,
    y: 300,
    attr: {
      rx: [4, 2][i % [2, 4].length],
      //cx: 400,
      //cy: 300,
    },
    transformOrigin: "50% 50%",
  });
}

allPathsArr.forEach((path, count) => {
  let rawPath = MotionPathPlugin.getRawPath(path);
  MotionPathPlugin.cacheRawPathMeasurements(rawPath);
  let shapeArr = [];
  allShapesArr.push(shapeArr);
  for (var i = 0; i < maxDots; i++) {
    allShapesArr[count].push({
      data: MotionPathPlugin.getPositionOnPath(rawPath, i / maxDots, true),
      index: i,
    });
  }
});

const make = (e) => {
  shapeDataCount =
    shapeDataCount < allShapesArr.length - 1 ? (shapeDataCount += 1) : 0;
  setShape(allShapesArr[shapeDataCount]);
  gsap.delayedCall(2.4, make);
};
make();

gsap
  .to(allDotsArr, {
    attr: {
      rx: "+=4",
    },
    ease: "linear",
    stagger: {
      each: 0.01,
      repeat: -1,
      yoyo: true,
    },
    duration: 0.25,
  })
  .seek(100);
