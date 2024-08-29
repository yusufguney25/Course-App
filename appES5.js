//Object-Class
function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;

};
//UI constructor
function UI() {
};
//Add course function
UI.prototype.addCourseToLlist = function (course) {
    const list = document.getElementById('course-list');

    var html = `
        <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href ="#" class ="btn btn-danger btn-sm delete">Delete</a></td>   
        </tr>
    `;
    list.innerHTML += html;
};
UI.prototype.clearControls = function () {
    const title = document.getElementById('title').value = "";
    const instructor = document.getElementById('instructor').value = "";
    const image = document.getElementById('image').value = "";
};
//delete course function
UI.prototype.deleteCourse = function (element) {
    if (element.classList.contains('delete')) {
        element.parentElement.parentElement.remove();
    }
}
//Alerts function
UI.prototype.showAlert= function (message,className) {
    var alert =`
        <div class="alert alert-${className}">
        ${message}
        </div>
    `;

    const row = document.querySelector('.row');
    //beforeBegin,afterBegin,beforeEnd,afterEnd parametlerini bekler
    row.insertAdjacentHTML('beforeBegin',alert);

    setTimeout(()=>{
        document.querySelector('.alert').remove()
    },3000);
}

document.getElementById('new-course').addEventListener('submit', function (e) {
    //access for elements values
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;
    //Create a new course object
    const course = new Course(title, instructor, image);
    //Create a new UI object
    const ui = new UI();

    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Please complete the form', 'warning');
    } else {
        //add course to list
        ui.addCourseToLlist(course);

        //clear controls
        ui.clearControls();

        ui.showAlert('The course has been added successfully','success');

    }
    e.preventDefault();//stop submit event
});

document.getElementById('course-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('The course has been deleted','danger');
});