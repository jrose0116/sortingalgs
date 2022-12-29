const form = document.getElementById("sort-form")
const values = document.getElementById("values");

const content = document.getElementById('sorting-container')
const next = document.getElementById('next-btn')
const prev = document.getElementById('prev-btn')
const pages = document.getElementById('pages')

var arrays = []
var arraysi = 0
var curri = []
var currj = []

form.addEventListener('submit', function() {
    var valuesString = values.value
    var arr = valuesString.split(',').map(x => Number(x))
    
    arrays = []
    arraysi = 0
    curri = []
    currj = []

    insertsort(arr)
    displayContainer(arrays[arraysi], curri[arraysi], currj[arraysi])

    if(arraysi < arrays.length - 1){
        next.classList.remove("d-none")
    }
    else{
        next.classList.add("d-none")
    }
    if(arraysi > 0){
        prev.classList.remove("d-none")
    }
    else{
        prev.classList.add("d-none")
    }
    
    pages.innerHTML = arraysi + 1 + "/" + arrays.length
    putAnswer(arrays[arrays.length-1])
})

next.addEventListener('click', function() {
    arraysi++;
    prev.classList.remove("d-none")
    if(arraysi < arrays.length - 1){
        next.classList.remove("d-none")
    }
    else{
        next.classList.add("d-none")
    }
    displayContainer(arrays[arraysi], curri[arraysi], currj[arraysi])
    pages.innerHTML = arraysi + 1 + "/" + arrays.length
})

prev.addEventListener('click', function() {
    arraysi--;
    next.classList.remove("d-none")
    if(arraysi > 0){
        prev.classList.remove("d-none")
    }
    else{
        prev.classList.add("d-none")
    }
    displayContainer(arrays[arraysi], curri[arraysi], currj[arraysi])
    pages.innerHTML = arraysi + 1 + "/" + arrays.length
})

function displayContainer(array, curri, currj){
    content.innerHTML = ""
    for (let i = 0; i < array.length; i++) {
        const col = document.createElement('div')
        col.classList.add('col', 'bg-primary','text-white','text-center', 'rounded', 'py-1', 'mx-1', 'display-5', 'mb-3')
        if(i == currj){
            col.classList.add('bg-success')
            col.classList.remove('bg-primary')
        }
        else if(i < curri || i < currj){
            col.classList.add('bg-warning')
            col.classList.remove('bg-primary')
        }
        if(currj >= array.length-1){
            col.classList.add('bg-success')
            col.classList.remove('bg-warning')
            col.classList.remove('bg-primary')
        }
        col.innerHTML = array[i]
        content.append(col)
    }
}

function insertsort(array){
    arrays.push([...array])
    var temp;
    for(let i = 1; i < array.length; i++){
        temp = array[i]
        for(var j = i-1; array[j] > temp && j >= 0; j--){
            array[j+1] = array[j]
        }
        array[j+1] = temp
        arrays.push([...array])
        if(i == 1){
            currj.push(0)
        }
        if(i<j){
            currj.push(i)
        }
        else{
            currj.push(j+1)
        }
        curri.push(i)
    }
    curri.push(-1)
    currj.push(-1)
}

function putAnswer(array){
    const col = document.createElement('div')
    col.classList.add('bg-primary', 'text-white', 'rounded', 'py-1','mx-1', 'display-5', 'mb-3', 'text-center', 'col')
    col.innerHTML = "Sorted Array: " + array.join(", ")
    answer = document.getElementById('answer')
    answer.innerHTML = ""
    answer.append(col)
}