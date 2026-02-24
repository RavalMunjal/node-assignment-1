const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const students = [
    {
        id: 1,
        name: "Aarav Sharma",
        branch: "CSE",
        semester: 8,
        cgpa: 9.3
    },
    {
        id: 2,
        name: "Ishita Verma",
        branch: "IT",
        semester: 7,
        cgpa: 8.9
    },
    {
        id: 3,
        name: "Rohan Kulkarni",
        branch: "ECE",
        semester: 6,
        cgpa: 8.4
    },
    {
        id: 4,
        name: "Meera Iyer",
        branch: "CSE",
        semester: 8,
        cgpa: 9.1
    },
    {
        id: 5,
        name: "Kunal Deshmukh",
        branch: "IT",
        semester: 5,
        cgpa: 7.8
    },
    {
        id: 6,
        name: "Ananya Reddy",
        branch: "CSE",
        semester: 6,
        cgpa: 8.7
    },
    {
        id: 7,
        name: "Vikram Patil",
        branch: "ECE",
        semester: 7,
        cgpa: 8.2
    },
    {
        id: 8,
        name: "Priyanka Nair",
        branch: "AI",
        semester: 4,
        cgpa: 8.8
    },
    {
        id: 9,
        name: "Harsh Mehta",
        branch: "Data Science",
        semester: 5,
        cgpa: 8.0
    },
    {
        id: 10,
        name: "Neha Gupta",
        branch: "CSE",
        semester: 6,
        cgpa: 7.9
    }
];


app.get("/", (req, res) => {
    res.send("Express server is running");
});


// get All Student
app.get("/students", (req, res) => {
    console.log(students)
    res.status(200).json(students);
});


// get topper With Sort() Method

// app.get("/students/topper", (req, res) => {
//     students.sort((a, b) => b.cgpa-a.cgpa);
//     let Topper = students[0];
//     res.status(200).json(Topper);
// });



// Get topper With Maximum logic

app.get("/students/topper", (req, res) => {
    let maxStudent = students[0];  

    for (let i = 1; i < students.length; i++) {
        if (students[i].cgpa > maxStudent.cgpa) {
            maxStudent = students[i];   
        }
    }

    res.status(200).json(maxStudent);
});


// Average Cgpa

app.get("/students/average", (req, res) => {
    let sum = 0;
    for (let i = 0; i < students.length; i++) {
        sum += students[i].cgpa;
    }
    let average = sum / students.length;
    res.status(200).json({
        message: "Average CGPA",
        average: Number(average.toFixed(2))
    });
});


// count student through array length

app.get("/students/count", (req, res) => {
    res.status(200).json({
        message: "Total Students",
        count: students.length
    });
});


// fiter student through BranchName

app.get("/students/branch/:branchName", (req, res) => {
    const branchName = req.params.branchName;

    const filteredStudents = students.filter(
        u => u.branch.toLowerCase() === branchName.toLowerCase()
    );

    if (filteredStudents.length === 0) {
        return res.status(404).json({ message: "No students found in this branch" });
    }

    res.status(200).json(filteredStudents);
});



// find student through id
app.get("/students/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const student = students.find(u => u.id === studentId);

    if (!student) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(student);
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});