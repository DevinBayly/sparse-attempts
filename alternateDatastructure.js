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

//adds coordinate attribute to each of the data objects that are included in the

//this function will take in the original 1 dimensional array (seriesArray likely) and generate a matrix (sparse or condensed) that will be accessed upon plotting, filtering, and generating overlays.
//I'm just going to try a COO coordinate list of tuples, but then why would I change it from the current object array?
// do I want the data to be sorted at all? Maybe either by row or column parameter value?
function createStructure(data, xlabels, ylabels) {
    

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
function compareToNeighbors(data, xSteps, ySteps) {

    //this function is a helper for compareToNeighbors which will generate an object composed of other results within a specific distance from the result of interest (one currently being investigated out of all).
    //the current idea here is to go with a circular geometric area from which we will select all the results within the radius distance from the central result.
    //the other option which might eventually be easier is to try to use a square shape in the parameter space.***I think this is what I will lean towards***
    function geometricSelection(data, centralResult, distance) {

    }

    //this function will take whatever number of results have been selected within the distance from the focusObj (result under investigation), and will now attach distance values to each object in the geometric selection specific to the x or y parameter
    function assignDistance(focusObj, geoSelected) {

    }

}









