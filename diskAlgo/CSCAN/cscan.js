function isValidInputNumbers(requestSequence, head) {
  for (i = 0; i < requestSequence.length; ++i) {
    if (requestSequence[i] > 20000 || requestSequence[i] < 0) {
      return false;
    }
  }
  if (head > 20000 || head < 0) {
    return false;
  }
  return true;
}


function cscan_man(requestSequenceCscan, headCscan) {
  requestFinalOrderCscan = [headCscan];
  tmp = 0;
  //Descending Order
  tmpAry = [];
  for(let i = 0; i < requestSequenceCscan.length; ++i) {
    tmpAry.push(requestSequenceCscan[i]);
  }
  requestSequenceCscanSorted = tmpAry.sort(function (a, b) {
    return b - a;
  });

  for (i = 0; i < requestSequenceCscanSorted.length; ++i) {
    if (headCscan > requestSequenceCscanSorted[i]) {
      tmp = i;
      break;
    }
  }
  for (i = tmp - 1; i >= 0; --i) {
    requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
  }
  if (requestFinalOrderCscan[requestFinalOrderCscan.length - 1] !== 5000) {
    requestFinalOrderCscan.push(5000);
  }
  for (i = requestSequenceCscanSorted.length - 1; i >= tmp; --i) {
    if (
        i === requestSequenceCscanSorted.length - 1 &&
        requestSequenceCscanSorted[i] !== 0
    ) {
      requestFinalOrderCscan.push(0);
    }
    requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
  }
  totalSeekCountCscan =
      Math.abs(5000 -
          headCscan +
          5000 +
          requestFinalOrderCscan[requestFinalOrderCscan.length - 1]);
  return [(totalSeekCountCscan-2), requestFinalOrderCscan];
}


function resetCscanResult() {
  let ele = document.getElementById('cscan_totalSeekCount');
  ele.innerText = '';
  ele = document.getElementById('cscan_finalOrder');
  ele.innerText = '';
  ele = document.getElementById('cscan_averageSeekCount');
  ele.innerText = '';
  //ele = document.getElementById('chartContainer');
  //ele.style.display = 'none';
  ele = document.getElementById('compareBtn');
  ele.style.display = 'none';
}

function cscan_click() {

  let requestSequenceCscan = document.getElementById("Sequence").value;
  let headCscan = document.getElementById("Head").value;
  requestSequenceCscan = requestSequenceCscan
      .split(/ |,/)
      .filter(function (character) {
        return character !== "";
      });
  if (requestSequenceCscan.length === 0) {
    alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  for (i = 0; i < requestSequenceCscan.length; ++i) {
    if (
        !Number.isInteger(+requestSequenceCscan[i]) ||
        !(+requestSequenceCscan[i] >= 0)
    ) {
      alert(
          "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
      );
      return;
    }
  }
  if (headCscan.length === 0) {
    alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  if (
      !Number.isInteger(+headCscan) || Number.isInteger(+headCscan) < 0
  ) {
    alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }
  headCscan = +headCscan;
  requestSequenceCscan = requestSequenceCscan.toString()
      .split(/ |,/)
      .filter(function (character) {
        return character !== "";
      }).map(function(a){return +a;});
  if(!isValidInputNumbers(requestSequenceCscan, headCscan)) {
    alert(
        "Got invalid input!!! Integral value(x) should be in the range 0<=x<=199"
    );
    return;
  }

  const result = cscan_man(requestSequenceCscan, headCscan);
  let ele = document.getElementById('cscan_totalSeekCount');
  ele.innerText = result[0];
  ele = document.getElementById('cscan_finalOrder');
  ele.innerText = '';
  for(h = 0; h < result[1].length; ++h) {
    if(h%6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if(h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    ele.innerText += result[1][h];
  }
  ele = document.getElementById('cscan_averageSeekCount');
  ele.innerText = (result[0]/(result[1].length-1)).toFixed(2);
  //ele = document.getElementById('chartContainer');
  ele.style.display = 'block';

  const ary = [];
  result[1].forEach(function(p) {
    ary.push({y: p});
  });

  //chart.render();
  //document.querySelector("#betweenButton").innerHTML = '<br> <div style="text-align: center">  <button type="button"  class="btn btn-outline-primary" id="compareBtn">COMPARE</button> </div>'+ '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="chartContainer2"></div><div id="title"></div><div id="answers"></div></div></div></div>' ;

  let modal = document.getElementById("myModal");

  let btn = document.getElementById("compareBtn");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    modal.style.display = "block";
    comparison_click_from_algo();
  }

  span.onclick = function() {
    modal.style.display = "none";
  }
}
