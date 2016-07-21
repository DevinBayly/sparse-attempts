/**
 * this file is mean't to house the API skeleton for the new PSE datastructure. Ideally there needs to be several central features however they end up being coded.
 * --support for the addition of new results into the datastructure, and eventually onto the canvas
 * --support for iterative searching over each result and comparing its metrics to some user filter criteria
 * --support for iterative comparison of results and their neighbors within a certain distance, and determining whether the difference between the metrics of the compared results is above or below a user input criteria
 * ----this may include a method of grabbing all of the nearby results within some geometric area (circle or square) based on the step values that have been used to generate the different sets of results in the datagroup.
 *
 * Created by dev on 7/14/16.
 */
// would I need to be starting to think about how to make a class out of this new structure? That would allow us to perform plenty of manipulations?
// I'm currently torn between using the terminology labels vs array for describing the collection of the x&y parameters
// todo Ask about what I should do for instances of data when there are multiple results at the same point in parameter space?
//adds coordinate attribute to each of the data objects that are included in the

//this function will take in the original 1 dimensional array (seriesArray likely) and generate a matrix (sparse or condensed) that will be accessed upon plotting, filtering, and generating overlays.
//I'm just going to try a COO coordinate list of tuples, but then why would I change it from the current object array?
// do I want the data to be sorted at all? Maybe either by row or column parameter value?
function createStructure(data, xlabels, ylabels) {
    retCSR = {IA:[0],A:data,JA:[]};
    for (var i in ylabels) { //this will populate the IA array with as many entries as the # of rows + 1
        var rowCount = 0;
        data.map(function (ob) {if (ob.coords.y == ylabels[i]) {return ++rowCount}});
        retCSR.IA.push(retCSR.IA[i] + rowCount ); //this should incrementally give us the number of nonzero results in the row, adding eventuall to a final value which is the total nonzero entries
    }
    for (var ob of data) {
        retCSR.JA.push(xlabels.indexOf(ob.coords.x)); // I believe it is very important not to sort this or else the map of what ob goes with which column will be lost
    }
    return retCSR
}

//this function recreates a row from the sparse matrix and leaves undefined objects where there isn't a result. The tricky part here is to remember that the ithrow starts counting at 0
    //this function is an inclusive slice function for the compressed sparse matrix structure
function reconstructMatrixBySection(structure,startRow,endRow,startCol,endCol) { // it's also worth bearing in mind that the 0th row is the bottom, lowest y row
    var retArr = Array(), //I shouldn't include any empty results just because it will make my life harder later on.
        startInd = structure.IA[startRow],
        endInd = structure.IA[endRow+1],//normally there would need to be a -1 at the end here, but since slice isn't inclusive i took it away
        nzEles = structure.A.slice(startInd,endInd),
        colPos = structure.JA.slice(startInd,endInd);
    for (var i in colPos) {
        if (colPos[i] > endCol || colPos[i] < startCol) { // todo does this need to be inclusive or what?
            nzEles[i] = undefined//if the result belongs to a column that we aren't interested in then it shall be removed from the selection.
            // i think there could be a way to simply change the actual structure, and do away with the filtering below.
        };
    }
    //please note that retArr isn't the same as nzEles because they are different lengths for one, and retArr is sorted with duplicate dataentries (same parameter coords) paired down.
    //todo figure out whether the fact that the results at the same point get overwritten is going to cause problems later on.
        //well one thing is for sure, it won't be considered to be a closer result given that the difference between the distance for duplicate dots isn't >0 so it wont pass test below.
    //now i will filter out the undefineds

    retArr = nzEles.filter(function (ele) {if (ele != 'undefined') return ele}); //currently this only contains items in the row or column that we are interested in, pretty great huh?
    return retArr
}





//this function will be necessary because there will need to be a single array comprised of the parameter values used to generate the results.
// Think of arrays of the xparameter and yparameter values used as coordinates to position results in the canvas; these arrays need updating when more results are added.
function updateCoordinateArrays(oldArr, newArr) {
    
    var retArr = [];
    retArr = oldArr.concat(newArr);
    retArr.sort();
    for (var i in retArr) { //removes the potential for duplicates in the arr
        if (retArr.indexOf(retArr[i]) != retArr.lastIndexOf(retArr[i])) {
            retArr.splice(i,1)
        }
    }
    return retArr

}

//this is just a basic updater to keep track of the step values that are present in the canvas for the separate parameters
// i don't suppose that I need to make sure that the arrays have atleast 1 entry?
function updateKnownSteps(stepOb,xArr,yArr) {
    var xStep = +(xArr[1]-xArr[0]).toFixed(3), //I don't have much reason to expect that there will be less or more than 3 digits, How to predict?
        yStep = +(yArr[1]-yArr[0]).toFixed(3);
    stepOb.x.push(xStep);
    stepOb.y.push(yStep)

}

//very important to be able to add new results into the current structure whatever winds up being selected
//this could be a good place to update a list that is storing the step values that have been used so far. Probably the call to update the coordinate arrays
// i suppose this is a lot like the addition property of traditional matrices, it just needs to be tailored to work with matrices that are different sizes (controversial).
function mergeResults(newData, data) {
    //what I did in the actual html script tag was to simply concat the two arrays into one large one, and then sort on the y parameter, will it continue to be this simple?
    

}

// this function is for attaching the actual coordinate information to the data objects within data (the array of dataobs)
function addCoordinateAttr(data,xlabels,ylabels) {
    for (var ob of data) {
        ob.coords = {x:xlabels[ob.data[0][0]],y:ylabels[ob.data[0][1]]}
    }
}


//this function will gather information about the specifications that the user has selected above, and the logical relation between them (AND,OR) and will iteratively progress through the results one by one adding them to a return if they fit the search criteria
function filterResults(data) {


}

//this function will calculate the difference between each result and its neighbors upon a selected metric. This difference will be compared to a user input value, and will dictate whether there are colored contour lines added inbetween results to help visualize the change in results based on parameter change.
//don't forget that this will need to have some sort of threshold for the number of results that are coming back from the geometric selection before proceeding
//      if there happens to be too many decrease the distance value to the next smallest step value (x&y step arrays) that exists from the calculations.
//
function compareToNeighbors(structure, stepOb, xArr, yArr) {

    //this function returns a result that has been decided to be the closest neighbor to the currently examined dot for each parameter direction, and also according to boundary rules
    function chooseClosestNeighbor(selection, currentRes, dir, hairSplitVal) {
        //dir is either going to be right or up in each case
        switch (dir) {
            case 'right': // I feel like the up and the right aren't going to be different enough, there needs to be some preference towards similar y's
                var difArr = selection.map(function (ob) {
                    var xDst = ob.coords.x - currentRes.coords.x,
                        yDst = (ob.coords.y - currentRes.coords.y) * hairSplitVal; //must scale y diff to favor the cases in the right"er direction
                        if (xDst >= 0 && yDst >= 0) {
                    return Math.sqrt(xDst * xDst + yDst * yDst)} //why doesn't js just have a syntax for power, i don't feel like invoking math?
                    return undefined
                }); // this should allow us to only get a positive float array to minimize with indexing intact for ob retrieval,
                return selection[difArr.indexOf(d3.min(difArr))];

            case 'up':
                var difArr = selection.map(function (ob) {
                    var xDst = (ob.coords.x - currentRes.coords.x) * hairSplitVal; //accentuate the differences in the x favoring results above current
                        yDst = ob.coords.y - currentRes.coords.y;
                        if (xDst >= 0 && yDst >= 0) {
                    return Math.sqrt(xDst * xDst + yDst * yDst)} //why doesn't js just have a syntax for power, i don't feel like invoking math?
                    return undefined
                }); // this should allow us to only get a positive float array to minimize with indexing intact for ob retrieval,
                return selection[difArr.indexOf(d3.min(difArr))];
        }
    }


    for (var ob of structure.A) { //do I need to sort this by x coord?
        // create some sort of control variable for the step val index
        var currentRowInd = yArr.indexOf(ob.coords.y),
            currentColInd = xArr.indexOf(ob.coords.x),
            topRowInd = yArr.length - 1,
            farRightColInd = xArr.length - 1,
            yStepInd = 0, //these will be used to control amount of results that get passed to the chooseClosestNeighbor
            xStepInd = 0;
        switch ((currentRowInd == topRowInd,
        currentColInd == farRightColInd)) { //each of these will help us to determine what kind of parameters we need to include in the calls below

            // are the breaks going to exit the switch or the while?

            case (false, false): //all non top row or right column results
                // get the selection
                var rowBoundary = yArr.indexOf(+(ob.coords.y + stepOb.y[yStepInd]).toFixed(2)), // stepOb is arranged from large to small
                    colBoundary = xArr.indexOf(+(ob.coords.x + stepOb.x[xStepInd]).toFixed(2)),
                    selectedResults = reconstructMatrixBySection(structure, currentRowInd, rowBoundary, currentColInd, colBoundary);
                selectedResults.splice(selectedResults.indexOf(ob), 1);
                while (selectedResults.length > 10 || selectedResults.length == 0 && yStepInd+xStepInd > 10) { //inner while loop is to allow the step values arr to help adjust the amount of results we get back
                    if (rowBoundary == -1) ++yStepInd;
                    if (colBoundary == -1) ++xStepInd;
                    if (selectedResults.length > 10) {
                        if (colBoundary > rowBoundary) {++xStepInd} else {++yStepInd}
                    }
                    if (!stepOb.x[xStepInd] || !stepOb.y[yStepInd]) break;
                    var rowBoundary = yArr.indexOf(+(ob.coords.y + stepOb.y[yStepInd]).toFixed(2)), // todo package the step increment in a try if there is index bugging
                        colBoundary = xArr.indexOf(+(ob.coords.x + stepOb.x[xStepInd]).toFixed(2)),
                        selectedResults = reconstructMatrixBySection(structure, currentRowInd, rowBoundary, currentColInd, colBoundary);
                    selectedResults.splice(selectedResults.indexOf(ob), 1)

                }
                var hairSplit = 1,
                    closestX = chooseClosestNeighbor(selectedResults, ob, 'right', hairSplit),
                    closestY = chooseClosestNeighbor(selectedResults, ob, 'up', hairSplit);
                // while (closestX == closestY) {
                //     ++hairSplit; // if you consult the choose neighbor code the hairsplit can be seen helping to separate the right results into a 'closer' category when we are trying to choose for the right vice verse for the up
                //     //its entirely possible that this is too small of an increase, it took the hairSplit to get to ten for this to actually result in the change I wanted
                //     closestX = chooseClosestNeighbor(selectedResults, ob, 'right', hairSplit);
                //     closestY = chooseClosestNeighbor(selectedResults, ob, 'up', hairSplit);
                // }
                // next it will be good to create some sort of actual metric comparison function to call below
                //todo maake metric comparison function
                //todo email lia asking how to get info for results metrics that arent currently available in color or rad.
                break;
            case (true, false): //top row
                var rightColBoundary = xArr.indexOf(+(ob.coords.x + stepOb.x[xStepInd]).toFixed(2)),
                    selectedResults = reconstructMatrixBySection(structure, currentRowInd, currentRowInd, currentColInd, rightColBoundary); // return only items from the row
                selectedResults.splice(selectedResults.indexOf(ob), 1);

                // while (selectedResults.length > 10 || selectedResults.length == 0) {
                //     ++xStepInd;
                //     var rightColBoundary = xArr.indexOf(+(ob.coords.x + stepOb.x[xStepInd]).toFixed(2)),
                //         selectedResults = reconstructMatrixBySection(structure, currentRowInd, currentRowInd, currentColInd, rightColBoundary);
                //     selectedResults.splice(selectedResults.indexOf(ob), 1)
                //
                //
                // }
                var hairSplit = 1,
                    closestX = chooseClosestNeighbor(selectedResults, ob, 'right', hairSplit);
                break;
            case (false, true): //right col
                var rowBoundary = yArr.indexOf(+(ob.coords.y + stepOb.y[yStepInd]).toFixed(2)),
                    selectedResults = reconstructMatrixBySection(structure, currentRowInd, rowBoundary, currentColInd, currentColInd);
                selectedResults.splice(selectedResults.indexOf(ob), 1);

                // while (selectedResults.length > 10 || selectedResults.length == 0) {
                //     ++yStepInd;
                //     var rowBoundary = yArr.indexOf(+(ob.coords.y + stepOb.y[yStepInd]).toFixed(2)),
                //         selectedResults = reconstructMatrixBySection(structure, currentRowInd, rowBoundary, currentColInd, currentColInd);
                //     selectedResults.splice(selectedResults.indexOf(ob), 1)
                //
                //
                // }
                var hairSplit = 1,
                    closestY = chooseClosestNeighbor(selectedResults, ob, 'up', hairSplit);
                break;
            // don't worry about the top right dot, it has already recieved all the comparisons that it needs
        }
    }
}









